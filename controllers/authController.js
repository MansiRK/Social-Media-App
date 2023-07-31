// Import
// const dotenv = require("dotenv")
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const cookieparser = require("cookie-parser")

const app = express()
// To access variables in env
// dotenv.config()
app.use(cookieparser())

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
    res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        path: "/api/auth/refresh_token",
        maxAge: 30*60*60*24*1000, // 2592000000ms i.e 30 days
    })

    // Save user in database
    await newUser.save()

    // Response when successful
    return res.status(200).json({
        message: "User registered successfully.",
        access_token,
        newUser,
        password: ""
    })

  }
  catch (error) {
    // Response when error
    return res.status(500).json({
      message: `Failed to register the user. ${error.message}`,
    })
}
}

const login = async(req, res) => {
    try {
        const {username, password} = req.body

        // Finding username
        const usernameExist = await userModel.findOne({
            username
        })

        if (!usernameExist) {
            res.status(400).json({
                message: "Username does not exist. Use correct username."
            })
        }

        // Comparing password
        const passwordExist = await bcrypt.compare(password, usernameExist.password)

        if(!passwordExist){
            res.status(400).json({
                message: "Password does not match. Please try again."
            })
        }

        // Access token
        const access_token = createAccessToken({
            id: usernameExist._id
        })

        // Refresh token
        const refresh_token = createRefreshToken({
            id: usernameExist._id
        })

        // Storing refresh token in cookie
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            path: "/api/auth/refresh_token",
            maxAge: 30*60*60*24*1000, // 2592000000ms i.e 30 days
        })

        // Response when successful
        return res.status(200).json({
            message: "User logged in successfully.",
            access_token,
            usernameExist,
            password: ""
        })
    }

    catch (error) {
    // Response when error
        return res.status(500).json({
            message: `Failed to log in the user. ${error.message}`
        })
    }
}

const logout = async(req, res) => {
    try{
        // Clearing the refresh token from cookie
        res.clearCookie("refresh_token", {
            path: "/api/auth/refresh_token"
        })

        // Response when successful
        return res.status(200).json({
            message: "User logged out successfully."
        })
    }
    catch(error) {
    // Response when error
        return res.status(500).json({
            message: `Failed to logout the user. ${error.message}`
        })
    }
}

const recreateAccessToken = async(req, res) => {
    try{
        const ref_token = req.cookies.refresh_token

        if(!ref_token){
            return res.status(400).json({
                message: "There is no refresh token. Please login now."
            })
        }

        jwt.verify(ref_token, process.env.REFRESH_TOKEN, 
            async(error, result) => {
                if(error){
                    return res.status(400).json({
                        message: "Refresh token is invalid. Please login now."
                    })
                }

                const user = await userModel.findById(result.id)

                if(!user){
                    return res.status(400).json({
                        message: "This user does not exist."
                    })
                }

                const access_token = createAccessToken({
                    id: result.id
                })

                return res.status(200).json({
                    message: "Access token created successfully.",
                    access_token
                })
            })
    }
    catch(error){
        return res.status(400).json({
            message: `Failed to create access token. ${error.message}`
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
    register,
    login, 
    logout,
    recreateAccessToken
} 