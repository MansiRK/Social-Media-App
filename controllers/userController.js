/* eslint-disable no-underscore-dangle */
// Import
const userModel = require("../models/userModel")

// Searching user
// eslint-disable-next-line consistent-return
const searchUser = async (req, res) => {
  try {
    // Finding users
    const users = await userModel.find({
      username: {
        $regex: req.params.username,
      },
    }).limit(10).select("avatar firstname lastname followings followers ")

    // If user found
    if (users.length > 0) {
      // Response when successful
      res.status(200).json({
        message: "User searched successfully.",
        users,
      })
    }

    // If no user
    else {
      return res.status(400).json({
        message: "No user found with this username.",
      })
    }
  }
  catch (error) {
    // Response when error
    return res.status(500).json({
      message: `Failed to search user. ${error.message}`,
    })
  }
}

// Get user by ID
const getUser = async (req, res) => {
  try {
    // Find user by id,
    const user = await userModel.findById(req.params.id).select("-password")

    // If no user
    if (!user) {
      return res.status(400).json({
        message: "User does not exists.",
      })
    }

    // Response when successful
    return res.status(200).json({
      message: "User fetched successfully.",
      user,
    })
  }
  catch (error) {
    // Response when error
    return res.status(500).json({
      message: `Failed to fetch user. ${error.message}`,
    })
  }
}

// Update user by ID
const updateUser = async (req, res) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const { firstname, lastname, mobile, story, gender } = req.body

    // Check firstname
    if (!firstname) {
      return res.status(400).json({
        message: "Please enter your firstname.",
      })
    }

    // Check lastname
    if (!lastname) {
      return res.status(400).json({
        message: "Please enter your lastname.",
      })
    }

    // Find user to update
    const user = await userModel.findOneAndUpdate({
      _id: req.params.id,
    // eslint-disable-next-line object-curly-newline
    }, { firstname, lastname, gender, mobile, story }, {
      new: true,
    }).select("-password")

    // If no user
    if (!user) {
      return res.status(400).json({
        message: "No user exist with this ID",
      })
    }

    // Response when successful
    return res.status(200).json({
      message: "User updated successfully.",
      user,
    })
  }
  catch (error) {
    // Response when error
    return res.status(500).json({
      message: `Failed to update user. ${error.message}`,
    })
  }
}

// Follow user
const followUser = async (req, res) => {
  try {
    // Find user
    const user = await userModel.find({
      _id: req.params.id,
      followers: req.user._id,
    })

    // Check user in followers
    if (user.length > 0) {
      return res.status(400).json({
        message: "You are already following this user.",
      })
    }

    // Find and update other user's followers
    const newUser = await userModel.findOneAndUpdate({
      _id: req.params.id,
    }, {
      $push: {
        followers: req.user._id,
      },
    }, {
      new: true,
    }).populate("followers followings", "avatar username email firstname lastname")
      .select("-password")

    // Find and update user's followings
    await userModel.findOneAndUpdate({
      _id: req.user._id,
    }, {
      $push: {
        followings: req.params.id,
      },
    })

    // Response when successful
    return res.status(200).json({
      message: "You successfully followed this user.",
      newUser,
    })
  }
  catch (error) {
    // Response when error
    return res.status(500).json({
      message: `Failed to follow this user. ${error.message}`,
    })
  }
}

const unfollowUser = async (req, res) => {
  try {
    // Find user
    const user = await userModel.find({
      _id: req.params.id,
      followings: req.user._id,
    })

    // Check user in followings
    if (user.length === 0) {
      return res.status(400).json({
        message: "You are already not following this user.",
      })
    }

    // Find and update other user's followers
    const newUser = await userModel.findOneAndUpdate({
      _id: req.params.id,
    }, {
      $pull: {
        followers: req.user._id,
      },
    }, {
      new: true,
    }).populate("followers followings", " avatar username email firstname lastname")
      .select("-password")

    // Find and update user's followings
    await userModel.findOneAndUpdate({
      id: req.user._id,
    }, {
      $pull: {
        followings: req.params.id,
      },
    }, {
      new: true,
    })

    // Response when successful
    return res.status(200).json({
      message: "You successfully unfollowed this user.",
      newUser,
    })
  }
  catch (error) {
    // Response when error
    return res.status(500).json({
      message: `Failed to unfollow this user. ${error.message}`,
    })
  }
}

// Export
module.exports = {
  searchUser,
  getUser,
  updateUser,
  followUser,
  unfollowUser,
}