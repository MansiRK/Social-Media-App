const CommentModel = require('../models/commentModel')
const PostModel = require('../models/postModel')



const createComment = async (req, res) => {
    try {
        const { postId, content, tag, reply, postUserId } = req.body

        const post = await PostModel.findById(postId)
        if (!post) {
            return res.status(400).json(
                { message: "This post does not exist." 
            })
        }

        if (reply) {
            const comment = await CommentModel.findById(reply)
            if (!comment) return res.status(400).json(
                { message: "This comment does not exist." 
            })
        }

        const newComment = new CommentModel({
            user: req.user._id, content, tag, reply, postUserId, postId
        })

        await PostModel.findOneAndUpdate({ _id: postId }, {
            $push: { comments: newComment._id }
        }, { new: true })

        await newComment.save()

        res.status(200).json(
            { message: "Comment created successfully! ",
            newComment 
        })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to create comment. ${err.message}`
            })
    }
}

const updateComment = async (req, res) => {
    try {
        const { content } = req.body

        await CommentModel.findOneAndUpdate({
            _id: req.params.id, user: req.user._id
        }, { content })

        res.status(200).json(
            {
                 message: 'Comment updated successfully!'
                 })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to update comment. ${err.message }`
        })
    }
}

const likeComment = async (req, res) => {
    try {
        const comment = await CommentModel.find({ _id: req.params.id, likes: req.user._id })
        if (comment.length > 0) {
            return res.status(400).json({ message: "You liked this post." })
        }

        await CommentModel.findOneAndUpdate({ _id: req.params.id }, {
            $push: { likes: req.user._id }
        }, { new: true })

        res.status(200).json(
            { message: 'Liked comment successfully!' 
        })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to like comment. ${err.message }`
        })
    }
}

const unLikeComment = async (req, res) => {
    try {

        await CommentModel.findOneAndUpdate({ _id: req.params.id }, {
            $pull: { likes: req.user._id }
        }, { new: true })

        res.status(200).json(
            { message: 'Unliked comment successfully!' 
        })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to unlike comment. ${err.message }`
        })
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment = await CommentModel.findOneAndDelete({
            _id: req.params.id,
            $or: [
                { user: req.user._id },
                { postUserId: req.user._id }
            ]
        })

        await PostModel.findOneAndUpdate({ _id: comment.postId }, {
            $pull: { comments: req.params.id }
        })

        res.status(200).json(
            { message: 'Deleted comment successfully!' 
        })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to delete comment. ${err.message }`
        })
    }
}



module.exports = {
    createComment,
    unLikeComment,
    likeComment,
    updateComment,
    deleteComment
}