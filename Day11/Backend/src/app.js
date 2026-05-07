const express=require("express")
const noteModel = require("./models/note.model")
const app=express()
const AuthRouter=require("./routes/auth.routes")


app.use(express.json())

app.use("/api/auth",AuthRouter)

module.exports=app