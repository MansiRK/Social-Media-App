const UserModel = require("../Models/userModel")

const searchUser = async(req, res) =>{
    try{
        const users = await UserModel.find({
            username: {
                $regex: req.query.username
            }
        }).limit(10).select("firstname lastname username profilePicture")
        
        if(!users){
            res.status(400).json({
                message: "Users not found."
            })
        }

        res.status(200).json({
            message: "Users found successfully.",
            users
        })
    }
    catch(err){
        return res.status(500).json({
            message: `Error in searching users. ${err.message}`
        })
    }
}


const getUser = async(req, res) =>{
    try{
        const user = await UserModel.findById(req.params._id).select("-password")
        .populate("followers following", "-password")

        if(!user){
            return res.status(400).json({
                message: "User does not exist."
            })
        }

        res.status(200).json({
            message: "Got user successfully.",
            user
        })
    }
    catch(err){
        res.status(500).json({
            message: `Error in getting the user. ${err.message}`
        })
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
            _id: req.users._id
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
            followers: req.users._id
        })

        if(user.length > 0){
            return res.status(500).json({
                message: "You are already following this user."
            })
        }

        const newUser = await UserModel.findOneAndUpdate({
            _id: req.params.id
        }, {
            $push: {
                followers: req.users._id
            }
        },{
            new: true
        }).populate("followers following", "-password")

        await UserModel.findOneAndUpdate({
            _id: req.users._id
        },{
            $push:{
                following: req.params.id
            }
        },{
            new: true
        })
        res.status(200).json({
            message: "You are now following this user.",
            newUser
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
        const notExistUser = await UserModel.find({
            _id: req.params.id,
            following: req.users._id
        })

        if(notExitUser.length < 0){
            return res.status(500).json({
                message: "You are already not following this user."
            })
        }

        const user = await UserModel.findOneAndUpdate({
            _id: req.params.id
        },{
            $pull: {
                followers: req.users._id
            }
        },{
            new: true
        })

        await UserModel.findOneAndUpdate({
            _id: req.users._id
        },{
            $pull: {
                following: req.params.id
            }
        },{
            new: true
        })

        res.status(200).json({
            message: "You successfully unfollowed this user.",
            user
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