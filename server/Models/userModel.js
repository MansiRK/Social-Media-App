const mongoose = require ("mongoose")

const UserSchema = mongoose.Schema(
{
    username: {
        type: String,
        required: true,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
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
    profilePicture : {
        type: String,
        default: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F010%2F260%2F479%2Foriginal%2Fdefault-avatar-profile-icon-of-social-media-user-in-clipart-style-vector.jpg&tbnid=t_0Cn2sPLMDzrM&vet=12ahUKEwi6jf738YqAAxXOumMGHb18AbQQMyhCegQIARBm..i&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F10260479-default-avatar-profile-icon-of-social-media-user-in-clipart-style&docid=a04dLWwJOWMiCM&w=1920&h=1920&q=default%20profile%20picture%20of%20social%20media%20accounts&ved=2ahUKEwi6jf738YqAAxXOumMGHb18AbQQMyhCegQIARBm"
    },
    coverPicture: String,
    gender: {
        type: String,
        default: "male"
    },
    about: {
        type: String,
        default: "",
        maxlength: 200
    },    
    livesIn: String,
    worksAt: String,

    followers: [
        {type: mongoose.Types.ObjectId, 
            ref: 'user'
        }
    ],
    following: [
        
    ]
},

{
    timestamps: true
}
)

const UserModel = mongoose.model("Users", UserSchema)

module.exports = UserModel