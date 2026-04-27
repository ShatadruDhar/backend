const app=require("./src/app")
const mongoose=require("mongoose")


function connectToDb(){
    mongoose.connect("mongodb+srv://shatadrudhar10c_db_user:HsfLtkMCCBTMzX4h@cluster0.kdcsov6.mongodb.net/day6")
   .then(()=>{
    console.log("Connected to Database");
    
   })
}
connectToDb()
app.listen(3000,()=>{
    console.log("Server is running at port 3000")
})