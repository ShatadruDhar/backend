const postModel=require("../models/post.models")
const ImageKit=require("@imagekit/nodejs")
const {toFile}=require("@imagekit/nodejs")
const imagekit=new ImageKit({
    privateKey:process.env.ImageKit_PRIVATE_KEY
})
async function PostController(req,res){
    // const {caption,image}=req.body
    const file=await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: 'test' 
    })
    res.send(file)
    // const post=postModel.create({
    //     caption,image
    // })

    // res.status(201).json({
    //     message:"Post created successfully",
    //     post
    // })
}

module.exports={
    PostController
}