const express=require("express")
const UserRouter=express.Router()
const UserControllers=require("../controllers/user.controller")

UserRouter.post("/register",UserControllers.RegisterUser)

UserRouter.post("/login",UserControllers.LoginUser)

UserRouter.get("/get-me",UserControllers.getme)


module.exports=UserRouter