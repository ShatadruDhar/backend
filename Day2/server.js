const express=require("express")

let server=express()

server.get('/',(req,res)=>{
    res.send("Hello World")
})
//address pe jab jate hai on port 3000 where our server is running for any request by user and resolution is sent to them as given in res.send
server.get('/about',(req,res)=>{
    res.send("About Page")
})
server.get('/home',(req,res)=>{
    res.send("home Page")
})
server.listen(3000)

//npx nodemon js file name starts running the js file and starts and restarts the server everytime we make a change in js file