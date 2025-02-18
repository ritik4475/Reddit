import { useQuery } from "@tanstack/react-query";
import { PiArrowFatLinesUpFill, PiArrowFatLinesDownFill } from "react-icons/pi";
import {
  DeletePost,
  GetAllPosts,
  LikePost,
  UnLikePost,
} from "../../api/postApi";
import { Link } from "react-router-dom";
import formatTime from "../../Utils/functions/formatTime";
import { FaDeleteLeft } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Posts = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["FETCH_ALL_POSTS"],
    queryFn: GetAllPosts,
  });

  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
  const handleDelete = async (_id) => {
    await toast.promise(resolveAfter3Sec, {
      pending: "Post is processing...",
      success: "Post Deleted!",
      error: "Post not processed!",
    });

    await DeletePost(_id);

    setTimeout(() => {
      refetch();
    }, 3000);
  };

  const handleUpvote = async (_id, isLike) => {
    await LikePost(_id, !isLike);

    refetch();
  };

  const handleDownvote = async (_id, isUnLike) => {
    await UnLikePost(_id, !isUnLike);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="mt-10 flex justify-center items-center">
        <p className=" text-orange-500 font-bold text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center cursor-pointer">
        <div className=" ">
          {data &&
            data.data
              .slice()
              .reverse()
              .map((content, index) => {
                return (
                  <div
                    className="flex flex-col ml-2 border border-gray-400 rounded-lg bg-white w-[650px] left-[30%] my-4 p-2"
                    key={index}
                  >
                    <div className="flex text-gray-600 mt-2 text-xs">
                      <div className="flex w-full">
                        <Link
                          to={`/profile/@${content.userName}`}
                          className=" hover:underline"
                        >
                          Posted by u/{content.userName}{" "}
                        </Link>
                        <span className="ml-3 text-xxs font-bold">
                          &#128349;{" "}
                        </span>
                        <p>{formatTime(content.createdAt)} ago</p>
                      </div>
                      <div className=" flex justify-end w-full">
                        <button onClick={() => handleDelete(content._id)}>
                          <FaDeleteLeft
                            size={22}
                            className="text-red-500 -rotate-12"
                          />
                        </button>
                        <ToastContainer hideProgressBar={true} />
                      </div>
                    </div>
                    <Link to={`post/${content._id}`}>
                      <div className="text-black mt-2 text-lg">
                        <b>{content.title}</b>
                      </div>
                      <div className="text-black mt-2">
                        {content.info && content.info}
                        <a
                          href={content.link}
                          target="_blank"
                          className=" text-blue-500 font-bold"
                        >
                          {content.link && content.link}
                        </a>
                      </div>
                      <div className=" flex justify-center">
                        {content.files &&
                          content.files.map((file, index) => {
                            return (
                              <img
                                src={file.data}
                                key={index}
                                alt="img"
                                width={400}
                              />
                            );
                          })}

                        {content.camPhoto && (
                          <img src={content.camPhoto} alt="img" width={500} />
                        )}
                      </div>
                    </Link>
                    <div className="flex mt-2">
                      <div
                        className={`flex border p-1 bg-[#E0E7F1] rounded-full ${
                          content.isLike &&
                          "bg-orange-400 shadow-md shadow-orange-400"
                        }`}
                      >
                        <button
                          onClick={() =>
                            handleUpvote(content._id, content.isLike)
                          }
                        >
                          <PiArrowFatLinesUpFill
                            size={20}
                            className={`${
                              content.isLike ? "text-red-600 scale-110" : ""
                            }`}
                          />
                        </button>
                        <p className="text-sm mr-2 text-red-600 font-semibold ml-1">
                          {content.isLike > 0 && content.likeCount}
                        </p>
                        <button
                          onClick={() =>
                            handleDownvote(content._id, content.isUnLike)
                          }
                        >
                          <PiArrowFatLinesDownFill
                            size={20}
                            className={`${
                              content.isUnLike ? "text-blue-800 scale-110" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        {data?.data.length === 0 && (
          <div className="mt-10 text-orange-500 font-bold text-lg">
            No Posts Found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
