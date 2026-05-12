const postModel=require("../models/post.models")

async function PostController(req,res){
    const {caption,image}=req.body
    const post=postModel.create({
        caption,image
    })
    res.status(201).json({
        message:"Post created successfully",
        post
    })
}

module.exports={
    PostController
}