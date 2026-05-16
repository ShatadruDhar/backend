const mongoose=require("mongoose")

const followSchema=new mongoose.Schema({
    follower:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"Follower is required"]
    },
    followee:{
        
        type:Mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"Followee is required"]

    }
},{
    timestamps:true
})

const followModel=mongoose.Model("follow",followSchema)

module.exports=followModel