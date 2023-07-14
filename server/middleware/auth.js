const UserModel = require("../Models/userModel")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const auth = async (req, res) => {
    try{

        const token = req.header("Authorization")

        if(!token){
            return res.status(400).json({
                message: "Invalid Authentication."
            })
        }

        const decoded = jwt.verify(token, process.env.MY_ACCESS_TOKEN)

        if(!decoded){
            return res.status(400).json({
                message: "Invalid Authentication"
            })
        }

        const user = await UserModel.findOne({
            _id: decoded.id
        })

        req.users = user

        next()

    }
    catch(err)
    {
        return res.status(500).json({
            message: `Error in Authentication. ${err.message}`
        })
    }
}

module.exports = auth