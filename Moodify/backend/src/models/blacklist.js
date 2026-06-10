const mongoose=require("mongoose")
const blacklistSchema=new mongoose.Schema({
    token:{
        required:[true,"Token is needed for blacklisting"],
        type:String,
    }
},{
    timestamps:true
})
const blacklistModel=mongoose.model("blacklist",blacklistSchema)

module.exports=blacklistModel