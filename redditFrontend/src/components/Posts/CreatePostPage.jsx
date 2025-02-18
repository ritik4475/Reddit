import { HiMiniDocumentText } from "react-icons/hi2";
import { GoLink } from "react-icons/go";
import { FcAssistant } from "react-icons/fc";
import { FaImage } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdCamera } from "react-icons/md";
import Webcam from "react-webcam";
import { useState, useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { CreatePost } from "../../api/postApi";
import { useUser } from "../../Utils/hooks/useUser";
//import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePostPage = () => {
  const { user } = useUser();
  //const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    info: "",
    link: "",
    camPhoto: null,
    files: [],
    userId: user.id,
    isLike: false,
    likeCount: 0,
    isUnLike: false,
    unLikeCount: 0,
    comments: [],
    userName: user.userName,
  });
  const [selectedTab, setSelectedTab] = useState("post");
  const [showCam, setShowCam] = useState(false);
  const webcamRef = useRef(null); // create a webcam reference

  // Function to handle file input change
  const handleFileInputChange = (e) => {
    const file = Array.from(e.target.files);

    const promises = file.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener("load", (ev) => {
          resolve(ev.target.result);
        });

        reader.addEventListener("error", reject);

        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((base64Images) => {
        setPost((prev) => ({
          ...prev,
          files: [...post.files, ...base64Images],
        }));
      })
      .catch((error) => console.error(error));
  };

  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));

  const createPostMutation = useMutation({
    mutationFn: () => CreatePost(post),
    onSuccess: () => {
      console.log("Post Successfully Created!");
      //navigate('/');
      toast.promise(resolveAfter3Sec, {
        pending: "Post is processing...",
        success: "Post Created!",
        error: "Post Rejected",
      });
    },
    onError: () => {
      console.log("Unable to create a Post!");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteImage = (index) => {
    const newImages = [...post.files];
    newImages.splice(index, 1);
    setPost((prev) => ({
      ...prev,
      files: newImages,
    }));
  };

  const handleDeleteCamPhoto = () => {
    setPost((prev) => ({
      ...prev,
      camPhoto: null,
    }));
  };

  const capture = useCallback(() => {
    const imgSrc = webcamRef.current.getScreenshot();
    setPost((prev) => ({
      ...prev,
      camPhoto: imgSrc,
    }));
  }, [webcamRef]);

  const handleSubmit = (e) => {
    e.preventDefault();

    createPostMutation.mutate();
  };

  return (
    <div className="flex absolute left-[20%] mt-10">
      <div className=" w-[600px] mb-10">
        <div className=" border-b-2 border-white text-lg pb-2">Create Post</div>
        <div className="bg-white mt-8 rounded-md">
          <div className="grid grid-cols-3">
            <button
              className={`font-bold border-b-[1px] border-r-[1px] ${
                selectedTab === "post"
                  ? "border-b-blue-500 text-blue-500 border-b-[3px] bg-blue-50"
                  : "text-gray-500"
              } px-5 py-2 justify-center items-center flex`}
              onClick={() => setSelectedTab("post")}
            >
              <HiMiniDocumentText size={25} className="mr-2" />
              Post
            </button>
            <button
              className={`font-bold border-b-[1px] border-r-[1px] px-5 py-2 ${
                selectedTab === "link"
                  ? "border-b-blue-500 text-blue-500 border-b-[3px] bg-blue-50"
                  : "text-gray-500"
              } justify-center items-center flex`}
              onClick={() => setSelectedTab("link")}
            >
              <GoLink size={22} className="mr-2" />
              Link
            </button>
            <button
              className={`font-bold border-b-[1px] border-r-[1px] px-5 py-2 ${
                selectedTab === "img"
                  ? "border-b-blue-500 text-blue-500 border-b-[3px] bg-blue-50"
                  : "text-gray-500"
              } justify-center items-center flex`}
              onClick={() => setSelectedTab("img")}
            >
              <FaImage size={22} className="mr-2" />
              Img/Vids
            </button>
          </div>
          <div className="p-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                maxLength={300}
                className="rounded-md w-full p-2 border-[1px] focus:outline-[1px] text-sm"
                placeholder="Title"
                value={post.title}
                name="title"
                required
                onChange={handleChange}
              />
              <div className="flex justify-end mr-1 mt-1">
                <p className="text-gray-400 text-xs">{post.title.length}/300</p>
              </div>
              {selectedTab === "post" && (
                <textarea
                  className="rounded-md mt-5 h-[150px] w-full p-2 border-[1px] focus:outline-[1px] text-sm"
                  placeholder="Text"
                  value={post.info}
                  name="info"
                  onChange={handleChange}
                />
              )}
              {selectedTab === "link" && (
                <input
                  className="rounded-md w-full p-2 border-[1px] focus:outline-[1px] mt-5 text-sm"
                  placeholder="Link"
                  value={post.link}
                  name="link"
                  onChange={handleChange}
                />
              )}
              <div className=" rounded-md mt-5 flex justify-center items-center">
                {selectedTab === "img" && (
                  <div className="w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-54 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-blue-50 dark:hover:bg-blue-50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        accept="images/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </label>

                    <p className=" flex justify-center text-gray-500 mt-5">
                      <span>
                        ------------------------------ or
                        ------------------------------
                      </span>
                    </p>
                    <div className=" flex justify-center">
                      <button
                        className={` bg-blue-500 p-2 text-white font-bold rounded-lg mt-5 text-md flex`}
                        onClick={() => setShowCam(!showCam)}
                      >
                        <MdCamera
                          size={25}
                          className={`mr-2 ${
                            showCam
                              ? " transition-all rotate-180"
                              : "transition-all rotate-90"
                          }`}
                        />
                        {showCam ? "Close" : "Snap"}
                      </button>
                    </div>

                    {/**camera image */}
                    {showCam && (
                      <div>
                        {post.camPhoto ? (
                          <div className="flex justify-center mt-5">
                            <button
                              className=" absolute text-red-600 bg-slate-200 p-2 rounded-full right-[45%] mt-[-10px]"
                              onClick={() => handleDeleteCamPhoto()}
                            >
                              <RiDeleteBin6Fill size={20} />
                            </button>
                            <img src={post.camPhoto} alt="camPhoto" />
                          </div>
                        ) : (
                          <div className=" flex justify-center mt-5">
                            <Webcam height={400} width={400} ref={webcamRef} />
                          </div>
                        )}
                        {!post.camPhoto && (
                          <div className="flex justify-center">
                            <button
                              onClick={capture}
                              className="bg-blue-500 p-2 text-white font-bold rounded-md mt-5 text-lg"
                            >
                              Take
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/**images */}
                    {post.files.length > 0 && (
                      <div className="grid grid-cols-3 mt-5">
                        {post.files.map((image, index) => {
                          return (
                            <div key={index}>
                              <div className="flex justify-end mr-2">
                                <button
                                  className=" absolute mt-2 text-red-600 bg-slate-200 p-2 rounded-full"
                                  onClick={() => handleDeleteImage(index)}
                                >
                                  <RiDeleteBin6Fill size={20} />
                                </button>
                              </div>
                              <img src={image} alt="Selected" className="p-4" />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-2">
                <button
                  className="bg-blue-500 font-bold px-5 py-1  text-md text-white rounded-full"
                  type="submit"
                >
                  Post
                </button>
                <ToastContainer hideProgressBar={true} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="ml-10 bg-white h-full rounded-md">
        <div className="text-lg text-white font-semibold p-3 flex bg-orange-500 rounded-t-md">
          <FcAssistant size={30} className="mr-1" />
          Posting To Read_it
        </div>
        <div className="p-3">
          <div className="text-sm font-semibold my-2">
            1. Remember the human
          </div>
          <hr />
          <div className="text-sm font-semibold my-2">
            2. Behave like you would in real life
          </div>
          <hr />
          <div className="text-sm font-semibold my-2">
            3. Look for the original source of content
          </div>
          <hr />
          <div className="text-sm font-semibold my-2">
            4. Search for duplicates before posting
          </div>
          <hr />
          <div className="text-sm font-semibold my-2">
            5. Read the community’s rules
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
