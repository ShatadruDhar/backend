import { useContext, useEffect } from "react"
import { PostContext } from "../postContext"
import { getFeed, createPost, likePost, unLikePost } from "../services/FeedPost"

const UseFeed = () => {
  const context = useContext(PostContext)
  const { loading, setLoading, feed, setFeed } = context

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

  useEffect(() => {
    handleFeed()
  }, [])

  return { loading, feed, handleFeed, handleCreatePost, handleLike, handleUnLike }
}

export default UseFeed
