const express=require("express")
const app=express()
const UserRouter=require("./routes/users.routes")
const PostRouter=require("../src/routes/post.routes")
const cookieParser=require("cookie-parser")
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",UserRouter)
app.use("/api/posts",PostRouter)




module.exports=app