const PostModel = require('../models/postModel')
const CommentModel = require('../models/commentModel')
const UserModel = require('../models/userModel')

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}


const createPost = async (req, res) => {
    try {
        const { content, images } = req.body

        if (images.length === 0){
            return res.status(400).json(
                { message: "Please add your photo." 
            })
        }

        const newPost = new PostModel({
            content, images, user: req.user._id
        })
        await newPost.save()

        resstatus(200).json({
            message: 'Created post successfully!',
            newPost: {
                ...newPost._doc,
                user: req.user
            }
        })
    } catch (err) {
        return res.status(500).json(
            { message: `Failed to create post. ${err.message }`
        })
    }
}

const getPosts = async (req, res) => {
    try {
        const features = new APIfeatures(PostModel.find({
            user: [...req.user.following, req.user._id]
        }), req.query).paginating()

        const PostModel = await features.query.sort('-createdAt')
            .populate("user likes", "avatar username firstname lastname followers")
            .populate({
                path: "CommentModel",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

        res.staus(200).json({
            message: 'Fetched posts successfully!',
            result: PostModel.length,
            PostModel
        })

    } catch (err) {
        return res.status(500).json({ message: `Failed to fetch posts. ${err.message }`
    })
    }
}

const updatePost = async (req, res) => {
    try {
        const { content, images } = req.body

        const post = await PostModel.findOneAndUpdate({ _id: req.params.id }, {
            content, images
        }).populate("user likes", "avatar username firstname lastname")
            .populate({
                path: "CommentModel",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

        res.status(200).json({
            message: "Updated post successfully!",
            newPost: {
                ...post._doc,
                content, images
            }
        })
    } catch (err) {
        return res.status(500).json(
            { message: `Failed to update post. ${err.message }`
        })
    }
}

const likePost = async (req, res) => {
    try {
        const post = await PostModel.find({ _id: req.params.id, likes: req.user._id })
        if (post.length > 0) {
            return res.status(400).json({ message: "You liked this post." })
        }

        const like = await PostModel.findOneAndUpdate({ _id: req.params.id }, {
            $push: { likes: req.user._id }
        }, { new: true })

        if (!like) {
            return res.status(400).json({ message: 'This post does not exist.' })
        }

        res.status(200).json(
            { message: 'Liked post successfully!' 
        })

    } catch (err) {
        return res.status(500).json({ message: `Failed to like post. ${err.message }`
    })
    }
}

const unLikePost = async (req, res) => {
    try {

        const like = await PostModel.findOneAndUpdate({ _id: req.params.id }, {
            $pull: { likes: req.user._id }
        }, { new: true })

        if (!like) {
            return res.status(400).json(
                { message: 'This post does not exist.' 
            })
        }

        res.status(200).json(
            { message: 'UnLiked post successfully!'
         })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to unlike post. ${err.message }`
        })
    }
}

const getUserPost = async (req, res) => {
    try {
        const features = new APIfeatures(PostModel.find({ user: req.params.id }), req.query)
            .paginating()
        const PostModel = await features.query.sort("-createdAt")

        res.status(200).json({
            message: "Fetched single user posts successfully!",
            PostModel,
            result: PostModel.length
        })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to fetch posts. ${err.message }`
        })
    }
}

const getPost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id)
            .populate("user likes", "avatar username firstname lastname followers")
            .populate({
                path: "CommentModel",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

        if (!post) {
            return res.status(400).json(
                { message: 'This post does not exist.' 
            })
        }

        res.status(200).json({
            message: "Fetched single post successfully!",
            post
        })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to fetch single post. ${err.message }`
        })
    }
}

const getPostExplore = async (req, res) => {
    try {

        const newArr = [...req.user.following, req.user._id]

        const num = req.query.num || 9

        const PostModel = await PostModel.aggregate([
            { $match: { user: { $nin: newArr } } },
            { $sample: { size: Number(num) } },
        ])

        return res.status(200).json({
            message: 'Fetched posts from explore successfully!',
            result: PostModel.length,
            PostModel
        })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to fetch posts from explore. ${err.message }`
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await PostModel.findOneAndDelete({ _id: req.params.id, user: req.user._id })
        await CommentModel.deleteMany({ _id: { $in: post.CommentModel } })

        res.status(200).json({
            message: 'Deleted post successfully!',
            newPost: {
                ...post,
                user: req.user
            }
        })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to delete post. ${err.message }`
        })
    }
}

const savePost = async (req, res) => {
    try {
        const user = await UserModel.find({ _id: req.user._id, saved: req.params.id })
        if (user.length > 0) {
            return res.status(400).json({ message: "You saved this post." })
        }

        const save = await UserModel.findOneAndUpdate({ _id: req.user._id }, {
            $push: { saved: req.params.id }
        }, { new: true })

        if (!save) {
            return res.status(400).json({ message: 'This user does not exist.' })
        }

        res.status(200).json(
            { message: 'Saved post successfully!' 
        })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to save post. ${err.message }`
        })
    }
}

const unSavePost = async (req, res) => {
    try {
        const save = await UserModel.findOneAndUpdate({ _id: req.user._id }, {
            $pull: { saved: req.params.id }
        }, { new: true })

        if (!save) {
            return res.status(400).json({ message: 'This user does not exist.' })
        }

        res.status(200).json(
            { message: 'Unsaved post successfully!' 
        })

    } catch (err) {
        return res.status(500).json({
            message: `Failed to unsave post. ${err.message }`
        })
    }
}

const getSavePosts = async (req, res) => {
    try {
        const features = new APIfeatures(PostModel.find({
            _id: { $in: req.user.saved }
        }), req.query).paginating()

        const savePostModel = await features.query.sort("-createdAt")

        res.status(200).json({
            message: "Fetched saved posts successfully!",
            savePostModel,
            result: savePostModel.length
        })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to fetch saved posts. ${err.message }`
        })
    }
}


module.exports = {
    createPost,
    getPost,
    updatePost,
    likePost,
    unLikePost,
    getUserPost,
    getPosts,
    getPostExplore,
    deletePost,
    savePost,
    unSavePost,
    getSavePosts
}