import axios from "axios";

/**@description */
/**signup user */
export const SignUp = async (userData) => {
    const response = await axios.post('http://localhost:3000/signup',
        userData,
    );
    return response;
};

/**@description */
/**login user */
export const LogIn = async (userData) => {
    const response = await axios.post('http://localhost:3000/login',
        userData,
    );
    return response;
};

/**@description */
/**login user */
export const LogOut = async () => {
    const response = await axios('http://localhost:3000/logout');
    window.localStorage.removeItem('userData');
    return response;
};

/**@description */
/**create post */
export const CreatePost = async (data) => {
    const response = await axios.post('http://localhost:3000/create-post', 
    data,
    );
    return response;
};

/**@description */
/**get all posts */
export const GetAllPosts = async () => {
    const response = await axios.get('http://localhost:3000/posts');
    return response;
};

/**@description */
/**get post details */
export const GetPostDetails = async (id) => {
    const response = await axios.post(`http://localhost:3000/posts/${id}`,{
    "_id": id,
});
    return response;
};

/**@description */
/**get all posts for profile page */
export const GetProfilePosts = async (userName) => {
    const response = await axios.post(`http://localhost:3000/profile/${userName}`,{
    "userName": userName,
});
    return response;
};

/**@description */
/**get user Details */
export const GetUserDetails = async (userName) => {
    const response = await axios.post(`http://localhost:3000/user/${userName}`,{
    "userName": userName,
});
    return response;
};

/**@description */
/**delete post */
export const DeletePost = async (_id) => {
    const response = await axios.post(`http://localhost:3000/delete-post`,{
    _id,
});
    return response;
};

/**@description */
/**like post */
export const LikePost = async (_id, isLike) => {
    const response = await axios.post(`http://localhost:3000/like-post`,{
    _id,
    isLike,
});
    return response;
};

/**@description */
/**unlike post */
export const UnLikePost = async (_id, isUnLike) => {
    const response = await axios.post(`http://localhost:3000/unlike-post`,{
    _id,
    isUnLike,
});
    return response;
};