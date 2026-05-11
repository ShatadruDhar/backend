const mongoose=require("mongoose")
const express=require("express")
const Controllers=require("../controllers/auth.controllers")
const AuthRouter=express.Router()
AuthRouter.post('/register',Controllers.registerController)

AuthRouter.get("/get-me",Controllers.checktokenController)

AuthRouter.post("/login",Controllers.loginController)


module.exports=AuthRouter