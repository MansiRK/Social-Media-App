// Import
const userModel = require("../models/userModel")
const dotenv = require("dotenv")

// To access variables in env
dotenv.config()

// Register New User
const register = async(async (req, res) => {
  try {
    const {firstname, lastname, username, password, gender} = req.body
    const newUsername = username.toLowerCase().replace(/ /g, "")

    // Finding username
    const user_name = await userModel.find({
        username: newUsername
    })

    if (user_name){
        return res.status(400).json({
            message: "This username already exist. Try with new username."
        })
    }

    // Finding email
    const user_email = await userModel.find({
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
        firstname, lastname, username: newUsername, password: hash_password, gender
    })

    // Access token
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: "1d"
    })

    // Refresh token
    const refresh_token = jwt.sing(payload, process.env.REFRESH_TOKEN, {
        expiresIn: "30d"
    })

    // Storing refresh token in cookie
    res.cookie("refresh-token", refresh_token, {
        httpOnly: true,
        path: "api/auth/refresh-token",
        maxAge: 30*60*60*24*1000, // 2592000000ms i.e 30 days
    })

  }
  catch (error) {
    return res.status(500).json({
      message: `Failed to register the user: ${error.message}`,
    })
  }
  
})

module.exports = {
    register
} 