const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    content: String,
    images:{
        type: Array,
        required: true
    },
    likes:[
        {
        type: mongoose.Types.ObjectId,
        ref: "user"
        }
    ],
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "user"
        }
    ],
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
    
}, {
    timestamps: true
})

const PostModel = mongoose.model("Posts", PostSchema)

module.exports = PostModel