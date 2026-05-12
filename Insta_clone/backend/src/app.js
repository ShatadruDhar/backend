const express=require("express")
const app=express()
const AuthRouter=require("./routes/auth.routes")
const PostRouter=require("./routes/post.routes")
const cookieParser=require("cookie-parser")
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",AuthRouter)
app.use("/api/posts",PostRouter)




module.exports=app