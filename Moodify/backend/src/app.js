require('dotenv').config();
const express=require("express")
const cookieParser = require("cookie-parser");
const UserRouter=require("./routes/user.routes")
const app=express()
app.use(cookieParser());
app.use(express.json());
app.use("/auth/api",UserRouter)


module.exports=app