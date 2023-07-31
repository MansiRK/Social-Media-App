const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: false,
        maxlength: 15
    },
    lastname: {
        type: String,
        required: true,
        unique: false,
        maxlength: 15
    },
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10
    },
    
})