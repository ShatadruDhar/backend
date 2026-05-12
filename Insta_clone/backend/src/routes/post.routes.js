const express=require("express")
const PostController=require("../controllers/createPost.controller")
const PostRouter=express.Router()
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage})

PostRouter.post("/",upload.single("image"),PostController.PostController)

module.exports=PostRouter