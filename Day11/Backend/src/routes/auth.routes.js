const express=require("express")
const userModel=require("../models/users.models")
const AuthRouter=express.Router()



AuthRouter.post("/register",async (req,res)=>{
const {name,email,password}=req.body
const userAlreadyExists=userModel.findOne({email})
if(userAlreadyExists){
    return res.status(409).json({
        message:"User already exists with this email address"
    })
}
const user=await userModel.create({
    name,email,password
})

res.status(201).json({
    message:"User registered successfully",
    user
})
})

module.exports=AuthRouter