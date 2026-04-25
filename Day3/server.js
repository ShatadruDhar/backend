const express=require("express")

const app=express()
app.use(express.json())
//it is a middleware that is used if we want to access the data given by the user
const notes=[]

app.post("/notes",(req,res)=>{
    
    console.log(req.body)

    notes.push(req.body)

    res.send("Note Created")

})

app.get('/notes',(req,res)=>{
    res.send(notes)

})

app.delete('/notes',(req,res)=>{
    
})

app.listen(3000,()=>{
    console.log("The server is running on port 3000")
})