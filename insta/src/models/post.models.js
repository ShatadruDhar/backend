const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    pic:{
        type: String,
        required:[true,"Pic is necessary"]
    },
    caption:{
      type:String,
      default:""
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
    }
})

const postModel=mongoose.model("posts",postSchema)


module.exports=postModel