const express=require("express")
const userModel=require("../models/users.models")
const AuthRouter=express.Router()
//express.Router() is done so that we can create apis outside app.js file
const jwt=require("jsonwebtoken")
//package required to create a token


AuthRouter.post("/register",async (req,res)=>{
const {name,email,password}=req.body
const userAlreadyExists=userModel.findOne({email})
//just to check we have another user with same email or not
if(userAlreadyExists){
    return res.status(409).json({
        message:"User already exists with this email address"
    })
}
const user=await userModel.create({
    name,email,password
})
const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET)
//here we create a token and sign it with a JWT_SECRET code kept in .env to identify that this user data stored in the database was done by us


res.token("jwt_token",token)
//using this line we store the jwt token in the cookie storage so that when whenever the user does any request the database takes the jwt_token from cookie storage to identify the(Authenticate) the user who is making the request 
res.status(201).json({
    message:"User registered successfully",
    user,
    token
})
})

module.exports=AuthRouter