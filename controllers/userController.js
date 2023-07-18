const UserModel = require('../models/userModel')


    const searchUser = async (req, res) => {
        try {
            const UserModel = await UserModel.find({ username: { $regex: req.query.username } })
                .limit(10).select("firstname lastname username avatar")

            res.status(200).json({
                message: "User searched successfully!",
                UserModel
            })

        } catch (err) {
            return res.status(500).json(
                {
                    message: `Failed to search user. ${err.message}`
                }
            )
        }
    }

    const getUser = async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id).select('-password')
                .populate("followers following", "-password")
            if (!user) {
                return res.status(400).json({ message: "User does not exist." })
            }

            res.status(200).json({ 
                message: "Fetched user successfully!",
                user 
            })

        } catch (err) {
            return res.status(500).json(
                { message: `Failed to fetch user. ${err.message }`
            })
        }
    }

    const updateUser = async (req, res) => {
        try {
            const { avatar, firstname, lastname, mobile, address, story, website, gender } = req.body
            if (!firstname) return res.status(400).json({ message: "Please add your first name." })

            if (!lastname) return res.status(400).json({ message: "Please add your last name." })


            await UserModel.findOneAndUpdate({ _id: req.user._id }, {
                avatar, firstname, lastname, mobile, address, story, website, gender
            })

            res.json({ message: "Update Success!" })

        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    const followUser = async (req, res) => {
        try {
            const user = await UserModel.find({ _id: req.params.id, followers: req.user._id })
            if (user.length > 0) return res.status(500).json({ message: "You followed this user." })

            const newUser = await UserModel.findOneAndUpdate({ _id: req.params.id }, {
                $push: { followers: req.user._id }
            }, { new: true }).populate("followers following", "-password")

            await UserModel.findOneAndUpdate({ _id: req.user._id }, {
                $push: { following: req.params.id }
            }, { new: true })

            res.json({ newUser })

        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    const unfollowUser = async (req, res) => {
        try {

            const newUser = await UserModel.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { followers: req.user._id }
            }, { new: true }).populate("followers following", "-password")

            await UserModel.findOneAndUpdate({ _id: req.user._id }, {
                $pull: { following: req.params.id }
            }, { new: true })

            res.json({ newUser })

        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    const suggestionsUser = async (req, res) => {
        try {
            const newArr = [...req.user.following, req.user._id]

            const num = req.query.num || 10

            const UserModel = await UserModel.aggregate([
                { $match: { _id: { $nin: newArr } } },
                { $sample: { size: Number(num) } },
                { $lookup: { from: 'UserModel', localField: 'followers', foreignField: '_id', as: 'followers' } },
                { $lookup: { from: 'UserModel', localField: 'following', foreignField: '_id', as: 'following' } },
            ]).project("-password")

            return res.json({
                UserModel,
                result: UserModel.length
            })

        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }



module.exports = {
    searchUser,
    getUser,
    updateUser,
    followUser,
    unfollowUser,
    suggestionsUser
}