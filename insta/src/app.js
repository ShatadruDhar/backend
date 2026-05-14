const express=require("express")
const app=express()
const UserRouter=require("./routes/users.routes")
const PostRouter=require("../src/routes/post.routes")
const cookieParser=require("cookie-parser")

app.use("/api/posts",PostRouter())
app.use(cookieParser())

app.use("/api/auth",UserRouter)

app.use(express())


module.exports=app