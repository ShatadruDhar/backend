const userModel=require("../models/auth.user.model")
const jwt=require("jsonwebtoken");
const blacklistModel = require("../models/blacklist");

async function getMe(req,res,next){
    const token=req.cookies.token;
    const blacklisted=await blacklistModel.findOne({token})
    if(blacklisted){
        return res.status(401).json({
            message:"user is blacklisted"
        })
    }
    if(!token){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }
   try{
     const decoded=jwt.verify(token,process.env.JWT_SECRET)
     req.user=decoded
     next()
    }
   catch(err){
    return res.status(401).json({
        message:"Invalid token"
    })
   }
}

module.exports={getMe}