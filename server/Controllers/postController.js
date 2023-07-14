const PostModel = require("../Models/postModel")

const createPost = async(req, res) =>{
    try{
        const {caption, images} = req.body

        if(images.length === 0){
            return res.status(400).json({
                message: "Please add a image."
            })
        }
        const newPost = new PostModel({
            caption, images, users: req.users._id
        })

        await newPost.save()

        res.status(200).json({
            message: "Created a post successfully."
        })
    }
    catch(err){
        res.status(500).json({
            message: `Error in post creation. ${err.message}`
        })
    }
}

const getPosts = async(req, res) => {
    try{
        console.log(req.users)

        const posts = await PostModel.find({
            users: [...req.users.following,
            req.users._id]
        }).populate("users likes", "profilePicture username firstname lastname")

        res.json({
            message: "Successfully got the post.",
            result: posts.length,
            posts
        })
    }
    catch(err){
        res.status(500).json({
            message: `Error in getting the post. ${err.message}`
        })
    }
}

const updatePost = async(req, res) => {
    try{
        const {caption, images} = req.body

        const post = await PostModel.findOneAndUpdate({
            _id: req.params.id
        }).populate("users likes", "profilePicture username fistname lastname")

        res.status(200).json({
            message: "Post updated successfully.",
            newPost: {
                ...post._doc,
                caption,
                images
            }
        })
    }
    catch(err)
    {
       res.send(500).json({
        message: `Error in updating the post. ${err.message}`
       }) 
    }
}

const likePosts = async(req, res) => {
    try{
        await PostModel.findOneAndUpdate({
        _id: req.params.id
        },{
            $push: {
                likes: req.users._id
            }
        },{
            new: true
        })

        res.status(200).json({
            message: "Post liked successfully."
        })
    }
    catch(err){
        res.status(500).json({
            message: `Failed to like the post. ${err.message}`
        })
    }
}

module.exports= {
    createPost,
    getPosts,
    updatePost,
    likePosts
}