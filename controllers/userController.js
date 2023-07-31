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
        }).limit(10).select("firstname lastname following follow ")

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

// Update user
const updateUser = async(req, res) => {
    try{
        const {firstname, lastname, mobile, story, gender } = req.body

        if(!firstname && !lastname){
            return res.status(400).json({
                message: "Please enter your firstname and lastname."
            })
        }

        const user = await userModel.findOneAndUpdate({
            _id: req.params.id
        },{
            firstname, lastname, gender, mobile, story
        },{
            new: true
        })

        return res.status(200).json({
            message: "User updated successfully.",
            user
        })
    }
    catch(error){
        return res.status(500).json({
            message: `Failed to update user. ${error.message}`
        })

    }
}

// Export
module.exports = {
    searchUser,
    getUser, 
    updateUser
}