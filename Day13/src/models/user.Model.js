const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    email:{
     type:String,
     unique:[true,"Account exists with this email"]
    },
    name:String,
    password:String
})

const userModel=mongoose.Model("users",userSchema)

module.exports=userModel