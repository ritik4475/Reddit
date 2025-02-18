import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { GetProfilePosts, GetUserDetails } from "../../api/postApi";
import formatTime from "../../Utils/functions/formatTime";
import { PiArrowFatLinesUpFill, PiArrowFatLinesDownFill } from "react-icons/pi";
import ProfileLogo from "../../assets/icons/profile_logo1.png";
import { useEffect, useState } from "react";

const ProfilePages = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const [upVote, setUpvote] = useState(false);
  const [downVote, setDownvote] = useState(false);

  const userDetails = useQuery({
    queryKey: ["FETCH_USER_DETAILS"],
    queryFn: () => GetUserDetails(id.slice(1)),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["FETCH_PROFILE_POSTS"],
    queryFn: () => GetProfilePosts(id.slice(1)),
  });

  useEffect(() => {
    if (userDetails) {
      setUserData(userDetails?.data?.data[0]);
    }
  }, [userDetails]);

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
      <div className="flex justify-center cursor-pointer">
        <div className=" ">
          <div className="ml-2 bg-orange-200 p-3 rounded-xl mt-3 grid grid-cols-2">
            <div className=" flex">
              <img
                src={ProfileLogo}
                alt="profile_img"
                width={42}
                className=" -scale-x-100"
              />
              <p className=" text-xl font-bold text-shadow-lg shadow-orange-600 h-fit ml-1 mt-1">
                u/{userData?.userName}
              </p>
            </div>
          </div>
          {data &&
            data.data
              .slice()
              .reverse()
              .map((content, index) => {
                return (
                  <div
                    className="flex flex-col ml-2 border border-gray-400 rounded-lg bg-white w-[650px] left-[30%] mb-4 mt-1 p-2"
                    key={index}
                  >
                    <div className="text-gray-600 mt-2 flex text-xs">
                      <p className=" hover:underline">
                        Posted by u/{content.userName}{" "}
                      </p>
                      <span className="ml-1 text-xxs font-bold">
                        &#128349;{" "}
                      </span>
                      {formatTime(content.createdAt)} ago
                    </div>
                    <div to={`post/${content._id}`}>
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
      </div>
      <div className=" flex justify-center">
        {data?.data.length === 0 && (
          <div className="mt-10 text-orange-500 font-bold text-lg">
            No Posts Found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePages;
