// Import
const mongoose = require("mongoose")

// Creating schema
const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  reply: {
    type: mongoose.Types.ObjectId,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  tag: {
    type: Object,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  postId: {
    type: mongoose.Types.ObjectId,
  },
  postUserId: {
    type: mongoose.Types.ObjectId,
  },
}, {
  timestamps: true,
})

// Creating model
const commentModel = mongoose.model("comment", commentSchema, "comment_collection")

// Export
module.exports = commentModel