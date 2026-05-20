const mongoose=require("mongoose")

const followSchema=new mongoose.Schema({
    follower:{
        type:String,
        ref:"users",
        required:[true,"Follower is required"]
    },
    followee:{
        
        type:String,
        ref:"users",
        required:[true,"Followee is required"]

    },
    status:{
        type:String,
        default:"pending",
        enum:{
            values:["accepted","rejected","pending"],
            message:"Status can only be accepted rejected or pending"
        }
    }
    //task to implement
},{
    timestamps:true
})
followSchema.index({follower:1,followee:1},{unique:true})

const followModel=mongoose.model("follow",followSchema)

module.exports=followModel