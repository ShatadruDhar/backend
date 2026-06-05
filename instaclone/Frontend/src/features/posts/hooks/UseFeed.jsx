import { useContext, useEffect } from "react"
import { PostContext } from "../postContext"
import { getFeed, createPost, likePost, unLikePost, getfollowers, getfollowee } from "../services/FeedPost"

const UseFeed = () => {
  const context = useContext(PostContext)
  const { loading, setLoading, feed, setFeed,followee,setFollowee,follower,setFollower } = context

  const handleFeed = async () => {
    setLoading(true)
    const data = await getFeed()
    setFeed(data.posts)
    setLoading(false)
  }

  const handleCreatePost = async (caption, image) => {
    setLoading(true)
    const data = await createPost(image, caption)
    setFeed([data.post, ...(feed || [])])
    setLoading(false)
  }

  const handleLike = async (postId) => {
    await likePost(postId)
    await handleFeed()
  }

  const handleUnLike = async (postId) => {
    await unLikePost(postId)
    await handleFeed()
  }

  const handleFollowers=async ()=>{
   const data=await getfollowers()
   setFollower([data.followers])
  }
  
  const handleFollowee=async ()=>{
   const data=await getfollowee()
   setFollowee([data.followee])
  }

  useEffect(() => {
    handleFeed()
  }, [])

  return { loading, feed, handleFeed, handleCreatePost, handleLike, handleUnLike,handleFollowee,handleFollowers }
}

export default UseFeed
