const mongoose=require("mongoose")

const likeSchema=new mongoose.Schema({
    post:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"posts"
    },
    user:{
        type:String,
    }
},{
    timestamps:true
})

likeSchema.index({post:1,user:1},{unique:true})

const likeModel=mongoose.model("likes",likeSchema)

module.exports=likeModel