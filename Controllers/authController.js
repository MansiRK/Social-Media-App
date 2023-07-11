const UserModel = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")


dotenv.config()

// Registering new user
const registerUser = async(req, res) => {

    // to interact with server
    try{
        const { username, email, password, firstname, lastname } = req.body

        let newUserName = username.toLowerCase().replace(/ /g, "")

        const user_name = await UserModel.findOne({username: newUserName})

        if(user_name){
            return res.status(400).json({
                message: "Username already exists"
            })
        }

        const user_email = await UserModel.findOne({email})

        if(user_email){
            return res.status(400).json({
                message: "User email already exists"
            })
        }

        if( password.length < 8 ){
            return res.status(400).json({
                message: "Password must be atleast 8 characters"
            })
        }

        //hashing password
        const salt = await bcrypt.genSalt(10)
        
        const hashed_password = await bcrypt.hash(password, salt)

        const newUser = new UserModel(
            { username: newUserName, email, password: hashed_password, firstname, lastname }
        )

        console.log(newUser)

        const access_token = createAccessToken({
            id: newUser._id
        })

        const refresh_token = createRefreshToken({
            id: newUser._id
        })

        res.cookie('refresh', refresh_token, {
            httpOnly: true,
            path: "/auth/refresh_token",
            maxAge: 30*7*24*60*60*1000 // 30 days
        })
        // console.log({access_token, refresh_token})

        // Save in database
        await newUser.save()
       
        res.status(200).json({
            message: "User registered successfully",
            access_token,
            user: {
                ...newUser._doc,
                password: ""
            }
        })

    }
    catch(err){
        res.status(500).json({
            message: `User Registration Failed. ${err.message}`
        })
    }
}

//User Login

const loginUser = async(req, res) =>{

    try{
        const {email, password} = req.body

        const user = await UserModel.findOne({
            email
        }).populate("followers following", "-password")
    
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials."
            })
        }

        const passwordExist = await bcrypt.compare(password, user.password)

        if (!user || !passwordExist){
            return res.status(400).json({
                message: "Invalid Credentials."
            })
        }

        const access_token = createAccessToken({
            id: user._id
        })

        const refresh_token = createRefreshToken({
            id: user._id
        })

        res.cookie('refresh', refresh_token, {
            httpOnly: true,
            path: "/auth/refresh_token",
            maxAge: 30*7*24*60*60*1000 // 30 days
        })
        // console.log({access_token, refresh_token})

        res.status(200).json({
            message: "User Logged In Successfully",
            access_token,
            user: {
                ...user._doc,
                password: ""
            }
        })
    }
    catch(err){
        res.status(500).json({
            message: `User Login Failed. ${err.message}`
        })
    }
}

//User Logout

const logoutUser = async(req, res) =>{

    try{

        res.clearCookie("refreshtoken",{
            path: "/auth/refresh_token"
        })

        return res.status(200).json({
            message: "User Logged Out Successfully"
        })

        
    }
    catch(err){
        res.status(500).json({
            message: `User Logout Failed. ${err.message}`
        })
    }
}

const generateAccessToken = async(req, res) => {
    try{
        const ref_token = req.cookies.refresh

        if(!ref_token){
            return res.status(400).json({
                message: "Please Login Now"
            })
        }

        jwt.verify(ref_token, process.env.MY_REFRESH_TOKEN, async(err, result)=>{
            if(err){
                return res.status(400).json({
                    message: "Please login now"
                })
            }


            console.log(result)
            const user = await UserModel.findByID(result.id).select("-password")
            .populate("followers following", "-password")

            if(!user){
                return res.status(400).json({
                    message: "This does not exists"
                })
            }

            const access_token = createAccessToken({
                id: result.id
            })
        })
        res.json({
            ref_token,
            user
        })

    }
    catch(err){
        return res.status(500).json({
            message: err.message
        })
    }
}


// Access Token

const createAccessToken = (payload) =>{
    return jwt.sign(payload, process.env.MY_ACCESS_TOKEN, {expiresIn: "1d"})
}


// Refresh Token

const createRefreshToken = (payload) =>{
    return jwt.sign(payload, process.env.MY_REFRESH_TOKEN, {expiresIn: "30d"})
}





module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    generateAccessToken
}

