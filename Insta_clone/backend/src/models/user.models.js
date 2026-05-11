const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:[true,"Email is associated to an account"],
        required:true
    },

    username:{
        type:String,
        unique:[true,"Not a unique username"],
        required:[true,"Username is required"]
    },

    password:{
        type:String,
        required:[true,"Password is required"]
    },

    bio:String,

    profilepic:{
        type:String,
        default:"https://ik.imagekit.io/z29t3ylfi/blank-profile-picture-973460_1280.png"
    }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel