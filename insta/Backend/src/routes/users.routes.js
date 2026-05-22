const express=require("express")
const UserRouter=express.Router()
const UserControllers=require("../controllers/user.controller")
const identifyUser=require("../middlewares/auth.user.middleware")

UserRouter.post("/register",UserControllers.RegisterUser)

UserRouter.post("/login",UserControllers.LoginUser)

UserRouter.get("/get-me",identifyUser,UserControllers.getme)


module.exports=UserRouter