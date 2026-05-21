const express=require("express")
const app=express()
const UserRouter=require("./routes/users.routes")
const PostRouter=require("../src/routes/post.routes")
const followRouter=require("./routes/follow.routes")
const likeRouter=require("./routes/like.routes")
const cookieParser=require("cookie-parser")
const cors=require("cors")
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173" //done so that axios can set the cookie value in the frontend
}))
app.use("/api/auth",UserRouter)
app.use("/api/posts",PostRouter)
app.use("/api/user",followRouter)
app.use("/api/posts/",likeRouter)


module.exports=app