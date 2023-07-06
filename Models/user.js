const mongoose = require ("mongoose")

const UserSchema = mongoose.Schema(
{
    username: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePicture : String,
    coverPicture: String,
    about: String,
    livesIn: String,
    worksAt: String,

    followers: [],
    following: []
},

{
    timestamps: true
}
)
