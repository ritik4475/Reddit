import { useState } from "react";
import { PiArrowFatLinesUpFill, PiArrowFatLinesDownFill } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { GetPostDetails } from "../../api/postApi";
import formatTime from "../../Utils/functions/formatTime";
import { RiFileEditFill } from "react-icons/ri";

const PostDetails = () => {
  const { id } = useParams();
  const [upVote, setUpvote] = useState(false);
  const [downVote, setDownvote] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["POST_DETAIL"],
    queryFn: () => GetPostDetails(id),
  });

  const handleUpvote = () => {
    setUpvote(!upVote);
    setDownvote(false);
  };

  const handleDownvote = () => {
    setDownvote(!downVote);
    setUpvote(false);
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
      <div className="flex cursor-pointer">
        <div className=" ">
          {data &&
            data.data
              .slice()
              .reverse()
              .map((content, index) => {
                return (
                  <div
                    className="flex flex-col ml-2 border border-gray-400 rounded-lg bg-white w-[700px] left-[30%] mt-4 p-2"
                    key={index}
                  >
                    <div className="flex">
                      <div className="text-gray-600 mt-2 text-xs w-full">
                        Posted by u/{content.userName}{" "}
                        <span className="ml-2 text-xxs font-bold">
                          &#128349;
                        </span>
                        {formatTime(content.createdAt)} ago
                      </div>
                      <div className="flex justify-end w-full mt-1">
                        <div>
                          <button  className="border rounded-full border-orange-500 bg-orange-100 p-1">
                            <RiFileEditFill
                              size={20}
                              className=" text-orange-500"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
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
                          return <img src={file.data} key={index} alt="img" />;
                        })}

                      {content.camPhoto && (
                        <img src={content.camPhoto} alt="img" />
                      )}
                    </div>
                    <div className="flex mt-2">
                      <div
                        className={`flex border p-1 bg-[#E0E7F1] rounded-full ${
                          upVote && "bg-orange-500"
                        }`}
                      >
                        <button onClick={handleUpvote}>
                          <PiArrowFatLinesUpFill
                            size={20}
                            className={`${
                              upVote ? "text-red-800 scale-110" : ""
                            }`}
                          />
                        </button>
                        <p className="text-sm mr-2 text-gray-700">12.4k</p>
                        <button onClick={handleDownvote}>
                          <PiArrowFatLinesDownFill
                            size={20}
                            className={`${
                              downVote ? "text-blue-800 scale-110" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        <div className="ml-10 mt-5">Comments</div>
      </div>
    </div>
  );
};

export default PostDetails;
