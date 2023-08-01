// Import 
const mongoose = require("mongoose")

// Creating schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    unique: false,
    maxlength: 15,
  },
  lastname: {
    type: String,
    required: true,
    unique: false,
    maxlength: 15,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 10,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
  },
  gender: {
    type: String,
    default: "male",
  },
  mobile: {
    type: String,
    default: "",
  },
  story: {
    type: String,
    default: "",
    maxlength: 200,
  },
  followings: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  saved: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
},{
    timestamps: true
})

// Creating model
const userModel = mongoose.model("user", userSchema, "user_collection")

// Export
module.exports = userModel