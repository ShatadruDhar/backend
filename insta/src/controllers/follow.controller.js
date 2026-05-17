const followModel=require("../models/follow.model")
const userModel=require("../models/users.models")
async function follow(req,res){
    const followee=req.params.username
    const follower=req.user.username
    const userExists=await userModel.findOne({username:followee})
    if(!userExists){
        return res.status(409).json({
            message:"User doesnot Exist who you want to follow"
        })
    }
    const followRecordExists=await followModel.findOne({
        $and:[
            {follower:follower},
            {followee:followee}
        ]
    })
    if(followRecordExists){
        return res.status(409).json({
            message:`You already follow ${followee}`
        })
    }
    if(follower==followee){
        return res.status(400).json({
            message:"You cant follow yourself"
        })
    }
    const followRecord=await followModel.create({follower:follower,followee:followee})
    res.status(201).json({
        message:"you followed someone",
        followRecord
    })
}

async function unfollow(req,res){
  const follower=req.user.username
  const followee=req.params.username
  
    const userExists=await userModel.findOne({username:followee})
    if(!userExists){
        return res.status(409).json({
            message:"User doesnot Exist who you want to follow"
        })
    }
   const followRecordExists=await followModel.findOne({
        $and:[
            {follower:follower},
            {followee:followee}
        ]
    })
    if(!followRecordExists){
        return res.status(200).json({
            message:`You dont  follow ${followee}`
        })
    }
    await followModel.deleteOne({follower:follower,followee:followee})
    res.status(200).json({
        message:`You unfollowed ${followee}`
    })
}

module.exports={follow,unfollow}