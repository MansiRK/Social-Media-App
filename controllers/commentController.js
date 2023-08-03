/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
// Import
const commentModel = require("../models/commentModel")
const postModel = require("../models/postModel")

const createComment = async (req, res) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const { content, reply, tag, postId, postUserId } = req.body

    const post = await postModel.findById(postId)

    if (!post) {
      return res.status(400).json({
        message: "This post does not exist.",
      })
    }

    if (reply) {
      const comment = await commentModel.findById(reply)

      if (!comment) {
        return res.status(400).json({
          message: "There is no comment to reply.",
        })
      }
    }

    const newComment = new commentModel({
      user: req.user._id, content, reply, tag, postId, postUserId,
    })

    const updatePost = await postModel.findOneAndUpdate({
      _id: postId,
    }, {
      $push: {
        comments: newComment._id,
      },
    }, {
      new: true,
    })

    await newComment.save()

    return res.status(200).json({
      message: "You created a comment successfully.",
      newComment,
      updatePost,
    })
  }
  catch (error) {
    return res.status(500).json({
      message: `Failed to create a comment. ${error.message}`,
    })
  }
}

// Export
module.exports = {
  createComment,
}