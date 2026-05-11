const express=require("express")
const Authrouter=express.Router()
const userModel=require("../models/user.Model")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")
Authrouter.post("/register",async(req,res)=>{
    const {email,name,password}=req.body
    const UserAlreadyExists=userModel.findOne({email})
    if(UserAlreadyExists){
        return res.status(409).json({
            message:"User already exists with this email"
        })
    }
    const hash=crypto.createHash("md5").update(password).digest("hex")
    const user=await userModel.create({
        name,email,hash
    })
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("jwt_token",token)
    res.status(201).json({
        message:"User registered successfully",
        
    })

})

Authrouter.post("/login",(req,res)=>{
    const {email,password}=req.body
    const User=userModel.findOne({email})
    if(!User){
        return res.status(409).json({
            message:"User doesnot Exist"
        })
    }
    if(User.password!=crypto.createHash("md5").update(password).digest("hex")){
        return res.status(409).json({
            message:"Password incorrect"
        })
    }
    const token=jwt.sign({id:User._id},process.env.JWT_SECRET)
    res.cookie("jwt_token",token)
    res.status(201).json({
        message:"User logged in successfully"
    })

})
Authrouter.get("/get-me",async(req,res)=>{
   const token=req.cookies.jwt_token
   const decoded=jwt.verify(token,process.env.JWT_SECRET)
   const user= await userModel.findById(decoded.id)
   res.json({
    email:user.email,
    password:user.password
   })
})

Authrouter.post("/login",(req,res)=>{
    const {}

})
module.exports=Authrouter