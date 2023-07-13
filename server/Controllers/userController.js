const UserModel = require("../Models/userModel")

const searchUser = async(req, res) =>{
    try{
        const users = await UserModel.find({
            username: {
                $regex: req.query.username
            }
        }).limit(10).select("firstname lastname username profilePicture")
    }
    catch(err){
        return res.status(500).json({
            message: `Error in searching User. ${err.message}`
        })
    }
}


const getUser = async(req, res) =>{
    try{
        const user = await UserModel.findById(req.params.id).select("-password")
        .populate("followers following", "-password")

        if(!user){
            return res.status(400).json({
                message: `User does not exist. ${err.message}`
            })
        }
    }
    catch(err){
        
    }
} 

const updateUser = async(req, res) =>{
    try{
        const {profilePicture, coverPicture, firstname, lastname, about, livesIn, worksAt, gender} = req.body
        
        if(!firstname && !lastname) {
            return res.status(400).json({
                message: "Please add your full name."
            })
        }

        await UserModel.findOneAndUpdate({
            _id: req.user._id
        },{
            profilePicture, coverPicture, firstname, lastname, about, livesIn, worksAt, gender
        })

        res.json({
            message: "Updated Profile Successfully."
        })
    }
    catch(err){
        return res.status(500).json({
            message: `Failed to update profile. ${err.message}`
        })
    }
}

const followUser = async(req, res) => {
    try{
        const user = await UserModel.find({
            _id: req.params.id,
            followers: req.user._id
        })

        if(user.length > 0){
            return res.status(500).json({
                message: "You are already following this user."
            })
        }

        await UserModel.findOneAndUpdate({
            _id: req.params.id
        }, {
            $push: {
                followers: req.user._id
            }
        },{
            new: true
        })

        await UserModel.findOneAndUpdate({
            _id: req.user._id
        },{
            $push:{
                following: req.params.id
            }
        },{
            new: true
        })
        res.status(200).json({
            message: "You are now following this user."
        })
    }
    catch(err){
        res.status(500).json({
            message: `Error in following user. ${err.message}`
        })
    }
}

const unfollowUser = async(req, res) => {
    try{
        await UserModel.findOneAndUpdate({
            _id: req.params.id
        },{
            $pull: {
                followers: req.user._id
            }
        },{
            new: true
        })

        await UserModel.findOneAndUpdate({
            _id: req.user._id
        },{
            $pull: {
                following: req.params.id
            }
        },{
            new: true
        })

        res.status(200).json({
            message: "You successfully unfollowed this user."
        })
    }
    catch(err){
        res.status(500).json({
            message: `Error in unfollowing the user. ${err.message}`
        })
    }
}

module.exports = {
    searchUser,
    getUser,
    updateUser,
    followUser,
    unfollowUser
}