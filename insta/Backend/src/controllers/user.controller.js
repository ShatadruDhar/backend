const userModel=require("../models/users.models")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")

async function RegisterUser(req,res){
const {username,password,profilepic,bio,email}=req.body
const userExists=await userModel.findOne({
    $or:[{username},{email}]
})
if(userExists){
 return res.status(409).json({
    message:"Same username or email cant have another account"
 })
}
const hash=await bcryptjs.hash(password,10)
const user=await userModel.create({
    email,username,password:hash,profilepic,bio
})
const token=jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"1d"})
res.cookie("jwt_token",token)
res.status(201).json({
    message:"User registered successfully",
    user:{
        username:user.username,
        profilepic:user.profilepic,
        email:user.email,
        bio:user.bio 
    }
})
}

async function LoginUser(req,res){
  const {username,email,password}=req.body
  const user=await userModel.findOne({
    $or:[{username},{email}]
  })
  if(!user){
     return res.status(409).json({
    message:"user doesnot exist"
   })
  }
  const passwordValid=bcryptjs.compare(password,user.password)
  if(!passwordValid){
     return res.status(409).json({
    message:"Password Invalid"
   })
  }
  const token=jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET)
  res.cookie("jwt_token",token)
  res.status(200).json({
    message:"User logged in successfully",
    user:{
        username:user.username,
        profilepic:user.profilepic,
        email:user.email,
        bio:user.bio 
    }
  })
}

async function getme(req,res){
    const userId=req.user.id
    const user=await userModel.findById(userId)
    res.status(200).json({
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profilepic:user.profilepic
        }
    }) 
} 

module.exports={
    RegisterUser,LoginUser,getme
}