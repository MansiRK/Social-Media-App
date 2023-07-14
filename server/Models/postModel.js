const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    caption: String,

    images:{
        type: Array,
        required: true,
        default: []
    },
    likes:[
        {
        type: mongoose.Types.ObjectId,
        ref: "users"
        }
    ],
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "users"
        }
    ],
    users: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
    
}, {
    timestamps: true
}
)


const PostModel = mongoose.model("Posts", PostSchema)

module.exports = PostModel