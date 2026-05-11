const express=require("express")
const app=express()
const AuthRouter=require("./routes/auth.routes")
const cookieParser=require("cookie-parser")
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",AuthRouter)




module.exports=app