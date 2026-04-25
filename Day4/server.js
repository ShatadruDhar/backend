//server ko start karna

const app=require("./src/app")



var notes=[]
app.post('/notes',(req,res)=>{

    console.log(req.body)
    notes.push(req.body)
    res.send("Note created")
})
app.get('/notes',(req,res)=>{

    res.send(notes)
    
})
//delete using params /notes/3
app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]
    res.send("Note deleted successfully")
    res.send(notes)
})
app.patch('/notes/:index',(req,res)=>{
notes[req.params.index].description=req.body.description
res.send("Description uploaded successfully")   
})





app.listen(3000,()=>{
    console.log("Server is running at port 3000")
})