
const userModel = require("../models/user.models")

const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")

async function  registerController(req,res){
  const {email,password,username,profilepic,bio}=req.body
//   const emailAlreadyExists=userModel.findOne({email})
//   if(emailAlreadyExists){
//     return res.status(409).json({
//         message:"Account with this Email already exists"
//     })
//   }
//   const usernameAlreadyExists=userModel.findOne({username})
//   if(usernameAlreadyExists){
//     return res.status(409).json({
//         message:"Account with this username already exists"
//     })
//   }
  const UserAlreadyExists= await userModel.findOne({
    $or:[
        {email},{username}
    ]
  })
  if(UserAlreadyExists){
    return res.status(409).json({
        message:"User Already Exists"+(UserAlreadyExists.email==email?"Email Already Exists":"Username Already Exists")
    })
  }
  const hash=await bcrypt.hash(password,10)
  const user=await userModel.create({
    username,email,password:hash,profilepic,bio
  })
  const token=await jwt.sign({email:user.email,username:user.username,id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
  res.cookie("jwt_token",token)
  res.status(201).json({
    message:"User registered successfully",
    user:{
        email:user.email,
        username:user.username,
        bio:user.bio,
        profilepic:user.profilepic
    }
  })

}


function checktokenController (req,res){
    const token=req.cookies.jwt_token
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const user=await userModel.findById({id:decoded.id})

}

async function loginController (req,res){
const {email,password,username}=req.body
const userExists=await userModel.findOne({
    $or:[
        {email},{username}
    ]
})
if(!userExists){
    return res.status(409).json({
        message:"User doesnot Exist"
    })
}
const PasswordValid=bcrypt.compare(password,userExists.password)
if(!PasswordValid){
    return res.status(409).json({
        message:"Incorrect password"
    })
}
const token=await jwt.sign({id:userExists._id},process.env.JWT_SECRET)
res.cookie("jwt_token",token)
res.status(200).json({
    message:"User is logged in successfully",
    user:{
        username:userExists.username,
        bio:userExists.bio,
        profilepic:userExists.profilepic
    }
})
}

module.exports={
    loginController,
    registerController,
    checktokenController
}
