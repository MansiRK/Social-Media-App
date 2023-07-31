// Import
const userModel = require("../models/userModel")

// Register New User
const register = async(async (req, res) => {
  try {
    const {firstname, lastname, username, password, gender} = req.body
    const newUsername = username.toLowerCase().replace(/ /g, "")

    // Finding username
    const user_name = await userModel.find({
        username: newUsername
    })
    
  }
  catch (error) {
    return res.status(500).json({
      message: `Failed to register the user: ${error.message}`,
    })
  }
  
})