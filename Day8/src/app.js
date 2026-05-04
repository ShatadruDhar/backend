const express=require("express")

const app=express()
const noteModel=require("./models/notes.models")
app.use(express.json())

app.post("/notes",async (req,res)=>{
    const {title,description}=req.body
    const note=await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"Note created successfully",
        note
    })
})
app.get("/notes",async (req,res)=>{
    
    const note=await noteModel.find()
    res.status(200).json({
        message:"Note fetched successfully",
        note
    })
})
app.delete("/notes/:index",async (req,res)=>{
    const id=req.params.index
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Note deleted successfully",
        
    })
})

app.patch("/notes/:index",async (req,res)=>{
    const id=req.params.index
    const description=req.body.description
    await noteModel.findByIdAndUpdate(id,{description}
        
  )
  res.status(200).json(
    message="Note updated"
  )

})
module.exports=app