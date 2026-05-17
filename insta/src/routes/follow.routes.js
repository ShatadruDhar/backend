const followModel=require("../models/follow.model")
const express=require("express")
const UserRouter=express.Router()
const identifyUser=require("../middlewares/auth.user.middleware")
const followController=require("../controllers/follow.controller")

UserRouter.post("/follow/:username",identifyUser,followController.follow)
UserRouter.post("/unfollow/:username",identifyUser,followController.unfollow)

module.exports=UserRouter