const imagekit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const jwt=require("jsonwebtoken")
const userModel = require("../models/users.models")
const postModel = require("../models/post.models")
const { post } = require("../routes/post.routes")
const client=new imagekit({
    privateKey:process.env.ImageKit_PRIVATE_KEY
})
const likeModel=require("../models/likes.model")
async function postController(req,res){


const file=await client.files.upload({
    file:await toFile(Buffer.from(req.file.buffer),"file"),
    fileName:"test",
    folder:"cohort-2-instaclone-posts"
})

const post=await postModel.create({
    caption:req.body.caption,
    pic:file.url,
    user:req.user.id
})

res.status(201).json({
    message:"Post created successfully",
    post
})

}

async function getPost(req,res){
    
    const posts=await postModel.find({user:req.user.id})
    res.status(200).json({
        message:"Posts fetched successfully",
        posts

    })
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


 if(post.user.toString()==req.user.id){
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

async function getFeed(req,res){
    const user=req.user
 const posts = await Promise.all((await postModel.find({}).populate("user").lean())
        .map(async (post) => {
            const isLiked = await likeModel.findOne({
                user: user.username,
                post: post._id
            })

            post.isLiked = Boolean(isLiked)

            return post
        }))



    res.status(200).json({
        message: "posts fetched successfully.",
        posts
    })
 
}



module.exports={postController,getPost,getParticularPost,getFeed}