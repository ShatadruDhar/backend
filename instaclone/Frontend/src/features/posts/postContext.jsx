import { createContext, useState } from "react";

export const PostContext = createContext()

export function PostProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState(null)
  const [feed, setFeed] = useState(null)
  const [follower,setFollower]=useState([])
  const [followee,setFollowee]=useState([])

  return (
    <PostContext.Provider value={{ loading, setLoading, post, setPost, feed, setFeed,followee,setFollowee,follower,setFollower }}>
      {children}
    </PostContext.Provider>
  )
}
