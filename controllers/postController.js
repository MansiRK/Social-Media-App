/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
// Import
// eslint-disable-next-line import/no-extraneous-dependencies
const cloudinary = require("cloudinary").v2
const postModel = require("../models/postModel")

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

// Create post
const createPost = async (req, res) => {
  try {
    const { caption, images } = req.body

    // Check if image is present
    if (images.length === 0) {
      return res.status(400).json({
        message: "Image is compulsory to create a post.",
      })
    }

    // Check if any of the images failed to upload
    // eslint-disable-next-line function-paren-newline
    const uploadedImages = await Promise.all(
      images.map(async (imageURL) => {
        try {
          // Upload image
          const uploadResult = await cloudinary.uploader.upload(imageURL, {
            upload_preset: process.env.UPLOAD_PRESET,
          })
          return {
            // Return public id and secure url
            public_id: uploadResult.public_id,
            secure_url: uploadResult.secure_url,
          }
        }
        catch (error) {
          // Response when upload fails
          return res.status(400).json({
            message: `Failed to upload image. ${error.message}`,
          })
        }
      }))

    // New post content
    const newPost = new postModel({
      caption,
      images: uploadedImages,
      user: req.user._id,
    })

    // Save in database
    await newPost.save()

    // Response when successful
    return res.status(200).json({
      message: "You successfully created a post.",
      newPost,
    })
  }
  catch (error) {
    // Response when error
    return res.status(500).json({
      message: `Failed to create a post. ${error.message}`,
    })
  }
}

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find({
      user: [
        req.user.following,
        req.user._id,
      ],
    }).sort("-createdAt")
      .populate("user likes", "avatar firstname lastname username followers followings")

    return res.status(200).json({
      message: "All posts fetched successfully.",
      posts,
    })
  }
  catch (error) {
    return res.status(500).json({
      message: `Failed to fetch the posts. ${error.message}`,
    })
  }
}

// Export
module.exports = {
  createPost,
  getAllPosts,
}