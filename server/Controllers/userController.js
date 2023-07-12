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

module.exports = {
    searchUser,
    getUser,
    updateUser
}