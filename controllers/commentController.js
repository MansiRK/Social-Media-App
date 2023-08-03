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

// Update comment by ID
const updateComment = async (req, res) => {
  try {
    const { content } = req.body

    // Find and update comment
    const updatedComment = await commentModel.findOneAndUpdate({
      _id: req.params.id,
      user: req.user._id,
    }, {
      content,
    }, {
      new: true,
    })

    // Response when successful
    return res.status(200).json({
      message: "You have successfully updated this comment.",
      updatedComment,
    })
  }
  catch (error) {
    // Response when error
    return res.status(500).json({
      message: `Failed to update the comment. ${error.message}`,
    })
  }
}

// Like comment by ID
const likeComment = async (req, res) => {
  try {
    // Find comment
    const commentExist = await commentModel.findById({
      _id: req.params.id,
    })

    // Check if exist
    if (!commentExist) {
      return res.status(400).json({
        message: "No comment exists with this ID.",
      })
    }

    // Find comment in likes
    const comment = await commentModel.find({
      _id: req.params.id,
      likes: req.user._id,
    })

    // Check if already liked
    if (comment.length > 0) {
      return res.status(400).json({
        message: "You have already liked this comment.",
      })
    }

    // Find and update comment
    const likedComment = await commentModel.findOneAndUpdate({
      _id: req.params.id,
    }, {
      $push: {
        likes: req.user._id,
      },
    }, {
      new: true,
    }).populate("likes user", "avatar username email firstname lastname followers followings")

    // Response when successful
    return res.status(200).json({
      message: "You successfully liked this comment.",
      likedComment,
    })
  }
  catch (error) {
    // Response when error
    return res.status(500).json({
      message: `Failed to like this post. ${error.message}`,
    })
  }
}

const unlikeComment = async (req, res) => {
  try {
    const commentExist = await commentModel.findById({
      _id: req.params.id,
    })

    if (!commentExist) {
      return res.status(400).json({
        message: "No comment exists with this ID",
      })
    }

    const comment = await commentModel.findById({
      _id: req.params.id,
      likes: req.user._id,
    })

    if (comment.length === 0) {
      return res.status(400).json({
        message: "You have not liked this comment to unlike it.",
      })
    }

    const unlikedComment = await commentModel.findOneAndUpdate({
      _id: req.params.id,
    }, {
      $pull: {
        likes: req.user._id,
      },
    }, {
      new: true,
    }).populate("likes user", "avatar username email firstname lastname followers followings")

    return res.status(200).json({
      message: "You have successfully unliked this comment.",
      unlikedComment,
    })
  }
  catch (error) {
    return res.status(500).json({
      message: `Failed to unlike this comment. ${error.message}`,
    })
  }
}

// Export
module.exports = {
  createComment,
  updateComment,
  likeComment,
  unlikeComment,
}