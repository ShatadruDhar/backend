const express=require("express")
const PostController=require("../controllers/createPost.controller")
const PostRouter=express.Router()

PostRouter.post("/",PostController)

module.exports=PostRouter