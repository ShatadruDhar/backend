const express=require("express")
const likeRouter=express.Router()
const likeController=require("../controllers/like.controller")
const identifyUser=require("../middlewares/auth.user.middleware")
likeRouter.post("/like/:postId",identifyUser,likeController.like)
likeRouter.post("/unlike/:postId",identifyUser,likeController.unlike)

module.exports=likeRouter