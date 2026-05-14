const express=require("express")
const postRouter=express.Router()
const postController=require("../controllers/create.post.controller")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})

postRouter.post("/",upload.single("image"),postController.postController)


module.exports=postRouter