const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username must be unique"],
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        unique:[true,"email must be unique"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    }
})
userSchema.pre("save",function (next){ })
userSchema.post("save",function (next){ })

const userModel=mongoose.model("users",userSchema)

module.exports=userModel