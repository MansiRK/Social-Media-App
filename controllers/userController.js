// Import
const userModel = require("../models/userModel")

// Searching user
const searchUser = async(req, res) => {
    try{
        // Finding users
        const users = await userModel.find({
            username: {
                $regex: req.params.username
            }
        }).limit(10).select("firstname lastname followings followers ")

        // If user found
        if(users.length > 0){
            // Response when successful
            res.status(200).json({
                message: "User searched successfully.",
                users
            })
        }
        // If no user
        else{
            return res.status(400).json({
                message: "No user found with this username."
            })
        }
        
    }
    catch(error){
        // Response when error
        return res.status(500).json({
            message: `Failed to search user. ${error.message}`
        })
    }
}

// Get user by ID
const getUser = async(req, res) => {
    try{
        // Find user by id
        const user = await userModel.findById(req.params.id)

        // If no user 
        if(!user){
            return res.status(400).json({
                message: "User does not exists."
            })
        }

        // Response when successful
        return res.status(200).json({
            message: "User fetched successfully.",
            user
        })
    }
    catch(error){
        // Response when error
        return res.status(500).json({
            message: `Failed to fetch user. ${error.message}`
        })
    }
}

// Update user by ID
const updateUser = async(req, res) => {
    try{
        const {firstname, lastname, mobile, story, gender } = req.body

        // Check firstname
        if(!firstname){
            return res.status(400).json({
                message: "Please enter your firstname."
            })
        }

        // Check lastname
        if(!lastname){
            return res.status(400).json({
                message: "Please enter your lastname."
            })
        }

        // Find user to update
        const user = await userModel.findOneAndUpdate({
            _id: req.params.id
        },{
            firstname, lastname, gender, mobile, story
        },{
            new: true
        })

        // If no user
        if(!user){
            return res.status(400).json({
                message: "No user exist with this ID"
            })
        }

        // Response when successful
        return res.status(200).json({
            message: "User updated successfully.",
            user
        })
    }
    catch(error){
        // Response when error
        return res.status(500).json({
            message: `Failed to update user. ${error.message}`
        })

    }
}

// Follow user
const followUser = async(req, res) => {
    try{
        const user = await userModel.find({
            _id: req.params.id,
            followers: req.user._id
        })

        if(user.length > 0){
            return res.status(400).json({
                message: "You are already following this user."
            })
        }

        const newUser = await userModel.findOneAndUpdate({
            _id: req.params.id
        },{
            $push: {
                followers: req.user._id
            }
        },{
            new: true
        }).populate("followers followings", "username firstname lastname story")

        await userModel.findOneAndUpdate({
            _id: req.user._id
        },{
            $push: {
                followings: req.params.id
            }
        },{
            new: true
        })

        return res.status(200).json({
            message: "You successfully followed this user.",
            newUser
        })
    }
    catch(error){
        return res.status(500).json({
            message: `Failed to follow this user. ${error.message}`
        })
    }
}

// Export
module.exports = {
    searchUser,
    getUser, 
    updateUser,
    followUser
}