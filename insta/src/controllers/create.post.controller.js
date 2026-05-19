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

async function respondToFollow(req, res) {
  try {
    const followee = req.user.username        // logged-in user (receiving the request)
    const follower = req.params.username      // who sent the request
    const { status } = req.body               // "accepted" or "rejected"

    // 1. Validate the status value
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be 'accepted' or 'rejected'" })
    }

    // 2. Find the pending request and update it
    const updatedRecord = await followModel.findOneAndUpdate(
      { follower, followee, status: "pending" },
      { status },
      { new: true }
    )

    // 3. If nothing was found — either doesn't exist or already responded
    if (!updatedRecord) {
      return res.status(404).json({ message: "No pending follow request found from this user" })
    }

    res.status(200).json({
      message: `Follow request ${status}`,
      updatedRecord,
    })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message })
  }
}


module.exports={postController,getPost,getParticularPost,respondToFollow}