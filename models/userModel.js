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
  },
  gender: {
    type: String,
    default: "male",
  },
  mobile: {
    type: String,
    default: "",
  },
  following: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  follow: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  save: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
},{
    timestamps: true
})

// Creating model
const userModel = new mongoose.model("user", userSchema)

// Export
module.exports = userModel