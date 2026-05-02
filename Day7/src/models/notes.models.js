const mongoose=require("mongoose")

const notesSchema=new mongoose.Schema({
    title:String,
    description:String
})

const noteModel= mongoose.model("notes",notesSchema)
//here models are made to store a collection of data of same models like all userData
//notes is the name of the collection'

module.exports=noteModel


//Schema is the format how we will store data in a database