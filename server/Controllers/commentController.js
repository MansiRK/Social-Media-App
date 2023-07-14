const CommentModel = require("../Models/commentModel")
const PostModel = require("../Models/postModel")

const createComment = async (req, res) => {
    try{
        const {postId, caption, tag, reply} = req.body

        const newComment = new CommentModel({
            users: req.users._id, caption, tag, reply
        })

        await PostModel.findOneAndUpdate({
            _id: postId
        },{
            $push: {
                comments: newComment._id
            }
        },{
            new: true
        })

        await newComment.save()

        res.status(200).json({
            message: "New comment added successfully."
        })
    }
    catch(err){
        res.status(500).json({
            message: `Error in adding comment. ${err.message}`
        })
    }
}


module.exports = {
    createComment
}