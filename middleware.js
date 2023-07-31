// Import
const userModel = require("./models/userModel")
const jwt = require("jsonwebtoken")

// Adding middleware
const middleware = async(req, res, next) => {
    try{
        // Getting token from header
        const access_token = req.header("Authorization")

        // If no token
        if (!access_token){
            return res.status(400).json({
                message: "Invalid authentication. No token present."
            })
        }

        // Verify token
        const decode_token = jwt.verify(access_token, process.env.ACCESS_TOKEN)

        // Wrong token
        if(!decode_token){
            return res.status(400).json({
                message: "Invalid authentication. Wrong token."
            })
        }

        // Finding user
        const user = await userModel.findOne({
            _id: decode_token._id
        })

        req.user = user

        // Pass control to route handler
        next()
    }
    catch(error){
        // Response when error
        return res.status(500).json({
            message: `Authentication failed due to ${error.message}`
        } )
    }
}

// Export
module.exports = middleware