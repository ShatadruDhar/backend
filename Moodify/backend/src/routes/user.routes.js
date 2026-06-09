const express=require("express")
const Userrouter=express.Router()
const UserControllers=require("../controllers/user.controllers");
const userControllers = require("../controllers/user.controllers");
Userrouter.post("/register",userControllers.registerUser)
Userrouter.post("/login",userControllers.loginUser)


module.exports=Userrouter;