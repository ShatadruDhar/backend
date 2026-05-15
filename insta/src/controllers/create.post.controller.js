const imagekit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const jwt=require("jsonwebtoken")
const userModel = require("../models/users.models")
const postModel = require("../models/post.models")
const { post } = require("../routes/post.routes")
const client=new imagekit({
    privateKey:process.env.ImageKit_PRIVATE_KEY
})
async function postController(req,res){

const token=req.cookies.jwt_token
if(!token){
    return res.status(401).json({
        message:"Unauthorized Access"
    })
}
let decoded=null
try{ decoded=await jwt.verify(token,process.env.JWT_SECRET)

}
catch(err){
    return res.status(401).json({
        message:"User not authorized"
    })
}

console.log(decoded.id)
const file=await client.files.upload({
    file:await toFile(Buffer.from(req.file.buffer),"file"),
    fileName:"test",
    folder:"cohort-2-instaclone-posts"
})

const post=await postModel.create({
    caption:req.body.caption,
    pic:file.url,
    user:decoded.id
})

res.status(201).json({
    message:"Post created successfully",
    post
})


}

async function getPost(req,res){
    const token=req.cookies.jwt_token
    if(!token){
    return res.status(401).json({
        message:"No token present",
    })
    let decoded=null
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            message:"Unauthorized Access"
        })
    }
    const posts=postModel.find({user:decoded.id})
    res.status(200).json({
        message:"Posts fetched successfully",
        posts

    })
}
}

async function getParticularPost(req,res){
const id=req.params.postId
try{
    const post=await postModel.findById(id)
}
catch(err){
    return res.status(404).json({
        message:"Post doesnot exist"
    })
}

const token=req.cookies.jwt_token
if(!token){
    return res.status(401).json({
        message:"No token present",
    })
}
    let decoded=null
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            message:"Unauthorized Access"
        })
    }
 if(post.user.toString()==decoded.id){
    return res.status(200).json({
        message:"This is your requested post",
        post
    })
 }   
 else{
    return res.status(403).json({
        message:"The post doesnot belong to you",
    })
 }
}


module.exports={postController,getPost,getParticularPost}