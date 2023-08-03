/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
// Import
const commentModel = require("../models/commentModel")
const postModel = require("../models/postModel")

// Create comment
const createComment = async (req, res) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const { content, tag, postId, postUserId } = req.body

    // Find post
    const post = await postModel.findById(postId)

    // Check if post exists
    if (!post) {
      return res.status(400).json({
        message: "This post does not exist.",
      })
    }

    // New comment
    const newComment = new commentModel({
      user: req.user._id, content, tag, postId, postUserId,
    })

    // Find and update post
    const updatePost = await postModel.findOneAndUpdate({
      _id: postId,
    }, {
      $push: {
        comments: newComment._id,
      },
    }, {
      new: true,
    })

    // Save new comment
    await newComment.save()

    // Response when successful
    return res.status(200).json({
      message: "You created a comment successfully.",
      newComment,
      updatePost,
    })
  }
  catch (error) {
    // Response when error
    return res.status(500).json({
      message: `Failed to create a comment. ${error.message}`,
    })
  }
}

const updateComment = async (req, res) => {
  try {
    const { content } = req.body

    const newComment = await commentModel.findOneAndUpdate({
      _id: req.params.id,
      user: req.user._id,
    }, {
      content,
    }, {
      new: true,
    })

    return res.status(200).json({
      message: "You have successfully updated this comment.",
    })
  }
  catch (error) {
    return res.status(500).json({
      message: `Failed to update the comment. ${error.message}`,
    })
  }
}

// Export
module.exports = {
  createComment,
  updateComment,
}