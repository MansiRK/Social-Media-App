const mongoose = require("mongoose")


const CommentSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    tag: Object,
    reply: mongoose.Types.ObjectId,
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "users"
        }
    ],
    users: {
            type: mongoose.Types.ObjectId,
            ref: "users"
        }
    
},{
    timestamps: true
})

const CommentModel = mongoose.model("Comments", CommentSchema)

module.exports = CommentModel