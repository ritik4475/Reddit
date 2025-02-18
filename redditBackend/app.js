const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello there!");
});

mongoose.connect(
  "mongodb+srv://ritik4475:ritik4475@cluster0.wf4c8cd.mongodb.net/userDemo?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to DB...")
);

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    userName: {
      type: String,
    },
    info: {
      type: String,
    },
    files: {
      type: Array,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    camPhoto: {
      type: String,
    },
    isLike: {
      type: Boolean,
    },
    likeCount: {
      type: Number,
    },
    unLikeCount: {
      type: Number,
    },
    isUnLike: {
      type: Boolean,
    },
    comments: {
      type: Array,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", UserSchema);
const Post = mongoose.model("Posts", PostSchema);

//signup

app.post("/signup", async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      return res.status(500).send("This Email is already Signed In!");
    }
    if (password !== confirmPassword) {
      return res
        .status(500)
        .send("Password doesn't match with confirm password");
    } else {
      const protectedpassword = await bcrypt.hash(password, 10);
      const user = new User({ email, username, password: protectedpassword });
      await user.save();
      return res.status(201).send("Welcome, You are Signed In!");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    const decryptedPassword = await bcrypt.compare(password, findUser.password);
    if (!findUser) {
      return res.status(404).send("User is not Signed In.");
    }
    if (!decryptedPassword) {
      return res.status(401).send("Incorrect Password. Try again!");
    }

    const token = jwt.sign({ userId: findUser._id }, "secrey_key", {
      expiresIn: 15 * 24 * 60 * 60 * 1000,
    }); //15 days to expire
    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      id: findUser._id,
      email: findUser.email,
      username: findUser.username,
      accessToken: token,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//logout
app.get("/logout", (req, res) => {
  res.cookie("accessToken", "", { maxAge: "1" });
  return res.status(200).send("User id Successfully Logged Out!");
});

//create post
app.post("/create-post", async (req, res) => {
  try {
    const {
      title,
      link,
      info,
      camPhoto,
      userId,
      userName,
      isLike,
      likeCount,
      isUnLike,
      unLikeCount,
    } = req.body;
    const images = req.body.files;
    const imageDocs = images.map((image) => {
      return { data: image };
    });
    const postsData = new Post({
      title,
      link,
      info,
      files: imageDocs,
      camPhoto,
      userId,
      userName,
      isLike,
      likeCount,
      isUnLike,
      unLikeCount,
    });

    if (title === "") {
      return res.status(401).send("You need to write something to post!");
    } else {
      await postsData.save();
    }

    return res.status(201).send("Post Created!");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//get all posts
app.get("/posts", async (req, res) => {
  const postData = await Post.find({});
  return res.status(200).send(postData);
});

//get post details when someClick on the post by id ---->(POSTDETAILS_PAGE)
app.post("/posts/:id", async (req, res) => {
  const { _id } = req.body;

  const postData = await Post.find({ _id });
  return res.status(200).send(postData);
});

//get all posts of specific users for by UserName ---->(PROFILE_PAGE_POSTS)
app.post("/profile/:userName", async (req, res) => {
  const { userName } = req.body;

  const postData = await Post.find({ userName });
  return res.status(200).send(postData);
});

//get userDetails
app.post("/user/:username", async (req, res) => {
  const { userName } = req.body;

  const userInfo = await User.find({ userName });
  return res.status(200).send(userInfo);
});

//edit post
app.post("/edit/:id", async (req, res) => {
  const _id = req.params.id;
  const { title, link, info, camPhoto } = req.body;

  const postsData = await Post.findById(_id);
  if(!postsData) {
    res.status(400).send("Post is not found!");
  }

  postsData.title = title;
  postsData.link = link;
  postsData.info = info;
  postsData.camPhoto = camPhoto;

  const updatedPost = await postsData.save();

  res.status(200).send(updatedPost);
});

//delete post
app.post("/delete-post", async (req, res) => {
  const { _id } = req.body;

  await Post.deleteOne({ _id });
  res.status(200).send("Successfully Deleted!");
});

//like post
app.post("/like-post", authenticateToken, async (req, res) => {
  try {
    const { _id, isLike } = req.body;

    const postData = await Post.findById(_id);

    if (isLike) {
      postData.likeCount += 1;
      postData.isLike = true;

      if (postData.isUnLike) {
        postData.isUnLike = false;
        postData.unLikeCount -= 1;
      }
    } else {
      postData.likeCount -= 1;
      postData.isLike = false;
    }

    await postData.save();

    res.status(200).send("Liked Post Successfully!");
  } catch (error) {
    res.status(200).send(error.message);
  }
});

//unlike post
app.post("/unlike-post", async (req, res) => {
  try {
    const { _id, isUnLike } = req.body;

    const postData = await Post.findById(_id);

    if (isUnLike) {
      postData.unLikeCount += 1;
      postData.isUnLike = true;

      if (postData.isLike) {
        postData.isLike = false;
        postData.likeCount -= 1;
      }
    } else {
      postData.unLikeCount -= 1;
      postData.isUnLike = false;
    }

    await postData.save();

    res.status(200).send("Liked Post Successfully!");
  } catch (error) {
    res.status(200).send(error.message);
  }
});

function authenticateToken(req, res, next) {
  console.log(req.headers["cookie"].split("=")[1]);

  next();
}

app.listen(3000, () => console.log("Connected to the server..."));
