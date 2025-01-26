const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: { type: String, required: true },
  photoUrl: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
