require("dotenv").config()
const app=require("./src/app")
const mongoose=require("mongoose")



function connectToDb(){
    mongoose.connect(MONGO_URI)
   .then(()=>{
    console.log("Connected to Database");
    
   })
}
connectToDb()
app.listen(3000,()=>{
    console.log("Server is running at port 3000")
})