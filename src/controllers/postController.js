const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary");

//Create Post
exports.createPost = async (req, res) => {
  try {
    const { caption, photo } = req.body;

    // Upload Base64 image to Cloudinary
    const result = await cloudinary.uploader.upload(photo, {
      folder: "uploads",
    });

    const post = await Post.create({
      caption,
      photoUrl: result.secure_url,
      userId: req.user ? req.user.id : null,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Get Post
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
