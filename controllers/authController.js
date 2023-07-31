// Import
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

// To access variables in env
dotenv.config()

// Register New User
const register = async (req, res) => {
  try {
    const {firstname, lastname, username, email, password, gender} = req.body
    const newUsername = username.toLowerCase().replace(/ /g, "")

    // Finding username
    const user_name = await userModel.findOne({
        username: newUsername
    })

    if (user_name){
        return res.status(400).json({
            message: "This username already exist. Try with new username."
        })
    }

    // Finding email
    const user_email = await userModel.findOne({
        email
    })

    if(user_email){
        return res.status(400).json({
            message: "This email already exist. Try with new email."
        })
    }
    
    // Checking password length
    if(password.length < 8){
        return res.status(400).json({
            message: "Your password must be atleast 8 characters."
        })
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10)

    const hash_password = await bcrypt.hash(password, salt)

    // New user
    const newUser = new userModel({
        firstname, lastname, username: newUsername, email, password: hash_password, gender
    })

    // Access token
    const access_token = createAccessToken({
            id: newUser._id
        })

    // Refresh token
    const refresh_token = createRefreshToken({
        id: newUser._id
    })

    // Storing refresh token in cookie
    res.cookie("refresh-token", refresh_token, {
        httpOnly: true,
        path: "/api/auth/refresh-token",
        maxAge: 30*60*60*24*1000, // 2592000000ms i.e 30 days
    })

    // Save user in database
    await newUser.save()

    return res.status(200).json({
        message: "User registered successfully.",
        access_token,
        newUser,
        password: ""
    })

  }
  catch (error) {
    return res.status(500).json({
      message: `Failed to register the user: ${error.message}`,
    })
}
}

const createAccessToken = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "1d"
})

const createRefreshToken = (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: "30d"
})

module.exports = {
    register
} 