const imagekit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const client=new imagekit()
async function postController(req,res){

const file=client.files.upload({
    file:await toFile(Buffer.from(req.file.buffer),'file'),
    fileName:"test"
})

res.send(file)

    

} 