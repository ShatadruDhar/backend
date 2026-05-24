const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"User cant be created without a username"],
        unique:[true,"username must be unique"]
    },
    email:{
        type:String,
        required:[true,"User cant be created without a email"],
        unique:[true,"email must be unique for every account"]
    },
    password:{
        type:String,
        required:[true,"Password required"],
        select:false
    },
    profilepic:{
        type:String,
       default:"https://ik.imagekit.io/z29t3ylfi/blank-profile-picture-973460_1280.png"
    },
    bio:{
        type:String,
    }
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel