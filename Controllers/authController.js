const UserModel = require("../Models/userModel")
const bcrypt = require("bcrypt")

exports.registerUser = async(req, res) => {
    const {username, password, firstname, lastname} = req.body

    const newUser = new UserModel(
        {username, password, firstname, lastname}
    )
    
    // to interact with server

    try{
        await newUser.save()
        res.status(200)
        .json(newUser)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

   