import React from 'react'
import '../styles/Feed.scss'
import Posts from '../components/Posts'
import { useEffect } from 'react'
import UseFeed from '../hooks/UseFeed'
import Navbar from '../components/Navbar'
const Feed = () => {
  const {loading,posts,handleFeed}=UseFeed()
  useEffect(()=>{
    handleFeed()
  },[])
  if(loading|| !posts){
    return (
      <h1>Loading...</h1>
    )
  }
  console.log(posts);
  

  return (
    <div>
      <main>
        <div className="feed">
          <div className="nav">
            <Navbar/>
          </div>
            <div className="posts">
              { posts.map(post=>{
                  return (
                    <Posts user={post.user} post={post}/>
                  )
               })}
            </div>
        </div>
      </main>
    </div>
  )
}

export default Feed
