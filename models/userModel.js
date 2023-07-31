const mongoose = require("mongoose")

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
      type: mongoose.typeOf.ObjectId,
      ref: "user",
    },
  ],
  follow: [
    {
      type: mongoose.typeOf.ObjectId,
      ref: "user",
    },
  ],
  save: [
    {
      type: mongoose.typeOf.ObjectId,
      ref: "user",
    },
  ],

})

const userModel = new mongoose.Model("user", userSchema)

module.exports = userModel