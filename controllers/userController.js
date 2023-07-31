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
        }).limit(10)

        // If no user
        if(!users){
            return res.status(400).json({
                message: "No user find with this username."
            })
        }

        // Response when successful
        res.status(200).json({
            message: "User searched successfully.",
            users
        })
    }
    catch(error){
        // Response when error
        res.status(500).json({
            message: `Failed to search user. ${error.message}`
        })
    }
}

// Export
module.exports = {
    searchUser
}