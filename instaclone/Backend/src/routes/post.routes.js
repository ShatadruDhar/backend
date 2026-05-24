const express=require("express")
const postRouter=express.Router()
const postController=require("../controllers/create.post.controller")
const multer=require("multer")
const identifyUser=require("../middlewares/auth.user.middleware")
const upload=multer({storage:multer.memoryStorage()})

postRouter.post("/",upload.single("image"),identifyUser,postController.postController)

postRouter.get("/",identifyUser,postController.getPost)
postRouter.get('/feed',identifyUser,postController.getFeed)
postRouter.get("/:postId",identifyUser,postController.getParticularPost)



module.exports=postRouter