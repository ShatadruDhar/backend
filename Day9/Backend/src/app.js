const express=require("express")
const cors=require("cors")
const app=express()
const noteModel=require("./models/note.model")
app.use(express.json())
app.use(cors())

app.post("/notes",async  (req,res)=>{
    const {title,description}=req.body
    await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"Note Created Successfully"
    })
})

app.get("/notes",async  (req,res)=>{

    const note=await noteModel.find()
    res.status(200).json({
        message:"Note Fetched Successfully",
        note
    })
})


app.delete("/notes/:id",async  (req,res)=>{
    const id=req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"Note Deleted Successfully"
    })
})

app.patch("/notes/:id",async  (req,res)=>{
    const id=req.params.id
    const {description}=req.body
    await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:"Note Updated Successfully"
    })
})





module.exports=app