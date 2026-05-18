const likeModel=require("../models/likes.model")
const postModel = require("../models/post.models")


async function like(req, res) {
    const postId = req.params.postId
    const username = req.user.username

    try {
        const postExists = await postModel.findById(postId)
        if (!postExists) {
            return res.status(404).json({ message: "Post not found" })
        }

        const alreadyLiked = await likeModel.findOne({
            $and: [{ post: postId }, { user: username }]
        })
        if (alreadyLiked) {
            return res.status(200).json({ message: "Already Liked" })
        }

        const like = await likeModel.create({ post: postId, user: username })
        res.status(201).json({ message: "You liked the post", like })

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({ message: "Post not found" })
        }
        res.status(500).json({ message: "Internal server error" })
    }
}

async function unlike(req, res) {
    const username = req.user.username
    const postId = req.params.postId

    try {
        const postExists = await postModel.findById(postId)
        if (!postExists) {
            return res.status(404).json({ message: "Post not found" })
        }

        const alreadyLiked = await likeModel.findOne({
            $and: [{ user: username }, { post: postId }]
        })
        if (!alreadyLiked) {
            return res.status(200).json({ message: "You don't like this post" })
        }

        await likeModel.deleteOne({ post: postId, user: username })
        res.status(200).json({ message: "You unliked the post" })

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({ message: "Post not found" })
        }
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports={like,unlike}