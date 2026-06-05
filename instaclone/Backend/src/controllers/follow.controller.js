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
        message:`Your Follow Request was sent to ${followee}`,
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
    const actionMessage = existingRecord.status === "pending"
      ? `Follow request to ${followee} cancelled`
      : `You unfollowed ${followee}`

    res.status(200).json({
        message:actionMessage
    })
}

async function respondToFollow(req, res) {
  try {
    const followee = req.user.username        // logged-in user (receiving the request)
    const follower = req.params.username      // who sent the request
    const { status } = req.body               // "accepted" or "rejected"

    // 1. Validate the status value
    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be 'accepted' or 'rejected'" })
    }

    // 2. Find the pending request and update it
    const updatedRecord = await followModel.findOneAndUpdate(
      { follower, followee, status: "pending" },
      { status },
      { new: true }
    )

    // 3. If nothing was found — either doesn't exist or already responded
    if (!updatedRecord) {
      return res.status(404).json({ message: "No pending follow request found from this user" })
    }

    res.status(200).json({
      message: `Follow request ${status}`,
      updatedRecord,
    })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message })
  }
}

async function getfollowers(req,res) {
     const followee = req.user.username 
     const followers=await followModel.find({followee,status: "accepted"})
     res.status(200).json({
        message:"Got the followers data",
        followers
     })
}
async function getfollowee(req,res) {
     const follower = req.user.username 
     const followee=await followModel.find({follower,status: "accepted"})
     res.status(200).json({
        message:"Got the followee data",
        followee
     })
}
module.exports={follow,unfollow,respondToFollow,getfollowers,getfollowee}