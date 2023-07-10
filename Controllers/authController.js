const UserModel = require("../Models/userModel")
const bcrypt = require("bcrypt")


// Registering new user
exports.registerUser = async (req, res) => {
    const { username, password, firstname, lastname } = req.body

    const salt = await bcrypt.genSalt(10)

    const hashed_password = await bcrypt.hash(password, salt)

    const newUser = new UserModel(
        { username, password: hashed_password, firstname, lastname }
    )

    // to interact with server

    try {
        await newUser.save()
        res.status(200)
            .json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



