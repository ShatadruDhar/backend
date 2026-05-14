const express=require("express")
const postRouter=express.Router()
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage})

postRouter.post("/",upload.single("image"),)


module.exports=postRouter