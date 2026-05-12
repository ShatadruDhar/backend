const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    image:{
        type:String,
        required:[true,"A photo must be there"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"object id is required"]
    },
})

const postModel=mongoose.Model("posts",postSchema)

module.exports=postModel