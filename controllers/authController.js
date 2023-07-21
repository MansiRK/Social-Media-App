/* eslint-disable camelcase */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')

// eslint-disable-next-line consistent-return
const registerUser = async (req, res) => {
  try {
    const {
      firstname, lastname, username, email, password, gender,
    } = req.body
    const newUserName = username.toLowerCase().replace(/ /g, '')

    // eslint-disable-next-line camelcase
    const user_name = await UserModel.findOne({ username: newUserName })
    // eslint-disable-next-line camelcase
    if (user_name) {
      return res.status(400).json({ message: 'This user name already exists.' })
    }

    // eslint-disable-next-line camelcase
    const user_email = await UserModel.findOne({ email })
    // eslint-disable-next-line camelcase
    if (user_email) {
      return res.status(400).json({ message: 'This user email already exists.' })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    }
    // hashing password
    const salt = await bcrypt.genSalt(10)

    // eslint-disable-next-line camelcase
    const hashed_password = await bcrypt.hash(password, salt)

    const newUser = new UserModel({
      // eslint-disable-next-line camelcase
      firstname, lastname, username: newUserName, email, password: hashed_password, gender,
    })

    // eslint-disable-next-line camelcase, no-use-before-define, no-underscore-dangle
    const access_token = createAccessToken({ id: newUser._id })
    // eslint-disable-next-line camelcase, no-use-before-define, no-underscore-dangle
    const refresh_token = createRefreshToken({ id: newUser._id })

    res.cookie('refreshtoken', refresh_token, {
      httpOnly: true,
      path: '/api/refresh_token',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    })

    await newUser.save()

    res.json({
      message: 'Register Success!',
      // eslint-disable-next-line camelcase
      access_token,
      user: {
        // eslint-disable-next-line no-underscore-dangle
        ...newUser._doc,
        password: '',
      },
    })
  } catch (err) {
    return res.status(500).json(
      { message: `Failed to register. ${err.message}` },
    )
  }
}

// eslint-disable-next-line consistent-return
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })
      .populate('followers following', 'avatar username firstname lastname followers following')

    if (!user) {
      return res.status(400).json({ message: 'This email does not exist.' })
    }

    const isExist = await bcrypt.compare(password, user.password)
    if (!isExist) return res.status(400).json({ message: 'Password is incorrect.' })

    // eslint-disable-next-line no-use-before-define, no-underscore-dangle
    const access_token = createAccessToken({ id: user._id })
    // eslint-disable-next-line no-use-before-define, no-underscore-dangle
    const refresh_token = createRefreshToken({ id: user._id })

    res.cookie('refreshtoken', refresh_token, {
      httpOnly: true,
      path: '/api/refresh_token',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
    })

    res.status(200).json({
      message: 'User logged in successfully!',
      access_token,
      user: {
      // eslint-disable-next-line no-underscore-dangle
        ...user._doc,
        password: '',
      },
    })
  } catch (err) {
    return res.status(500).json(
      { message: `Failed to log in. ${err.message}` }
    )
  }
}

const logoutUser = async (req, res) => {
  try {
    res.clearCookie('refreshtoken', { path: '/api/refresh_token' })
    return res.json({ message: 'User logged out successfully.!' })
  } catch (err) {
    return res.status(500).json(
      // eslint-disable-next-line comma-dangle
      { message: `Failed to log out. ${err.message}`, }
    )
  }
}

// eslint-disable-next-line consistent-return
const generateAccessToken = async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken
    if (!rf_token) {
      return res.status(400).json({ message: 'Please login now.' },
      ),
    }

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
            if (err) {
                return res.status(400).json({ message: 'Please login now.' })
            }

            const user = await UserModel.findById(result.id).select('-password')
                .populate('followers following', 'avatar username firstname lastname followers following')

            if (!user) {
                return res.status(400).json({ message: 'This user does not exist.' })
            }

            // eslint-disable-next-line no-use-before-define
            const access_token = createAccessToken({ id: result.id })

            res.status(200).json({
                message: 'Access token generated successfully!',
                access_token,
                user
            })
        })

    } catch (err) {
        return res.status(500).json(
            { message: `Failed to generate access token. ${err.message }`
        })
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
  generateAccessToken,

}