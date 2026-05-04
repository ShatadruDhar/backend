require("dotenv").config()
const app=require("./src/app")
const mongoose=require("mongoose")
const connectToDb=require("./src/config/database")

connectToDb()





app.listen(3000,()=>{
    console.log("The server is running in port 3000")
})