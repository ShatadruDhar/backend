const express=require("express")
const Userrouter=express.Router()
const userMiddleware=require("../middleware/auth.user")
const UserControllers=require("../controllers/user.controllers");
const userControllers = require("../controllers/user.controllers");
Userrouter.post("/register",userControllers.registerUser)
Userrouter.post("/login",userControllers.loginUser)
Userrouter.get("/get-me",userMiddleware.getMe,userControllers.getMe)
Userrouter.get("/logout",UserControllers.logout)
module.exports=Userrouter;