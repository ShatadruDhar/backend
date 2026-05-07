const express=require("express")
const userModel=require("../models/users.models")
const AuthRouter=express.Router()
//express.Router() is done so that we can create apis outside app.js file
const jwt=require("jsonwebtoken")
//package required to create a token
const crypto=require("crypto")
//used for password hashing so that the password stored in database cant be known if breached
//properties of hashing 1. same input=>same output
//2.output cant be reversed to input(hash cant be converted to plain text again)

AuthRouter.post("/register",async (req,res)=>{
const {name,email,password}=req.body
const userAlreadyExists=userModel.findOne({email})
//just to check we have another user with same email or not
if(userAlreadyExists){
    return res.status(409).json({
        message:"User already exists with this email address"
    })
}
const hash=crypto.createHash("md5").update(password).digest("hex")
//here password is hashed and stored into the database
const user=await userModel.create({
    name,email,hash
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

AuthRouter.post("/login",(req,res)=>{
  const {email,password}=req.body
  const user=userModel.findOne({email})
  if(!user){
    return res.status(409).json({
        message:"user doesnt exist at this email"
    })
    const passwordMatch=(user.password===crypto.createHash("md5").update(password).digest("hex"))
    if(!passwordMatch){
        return res.status(409).json({
            message:"Incorrect Password"
        })
    }
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("jwt_token",token)
    res.status(200).json({
        message:"User Logged in successfully",
        user

    })
  }
})

module.exports=AuthRouter