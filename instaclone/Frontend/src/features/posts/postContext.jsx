import { useState } from "react";
import { createContext } from "react";
import { getFeed } from "./services/FeedPost";

export const PostContext=createContext()

export function PostProvider({children}){
 const [loading,setLoading]=useState(false)
 const [posts,setPosts]=useState(null)
 const [feed,setFeed]=useState(null)
 
  const handleFeed=async ()=>{
    setLoading(true)
    try{
     const posts=await getFeed()
     setPosts(posts)
    }
    catch(err){
     setLoading(false)
     throw err
    }
    finally{
     setLoading(false)
    }
 }
 return (
    <PostContext.Provider value={{loading,posts,handleFeed}}>
        {children}
    </PostContext.Provider>
 )
}