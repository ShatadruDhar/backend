import React, { useEffect } from 'react'
import '../styles/Feed.scss'
import Posts from '../components/Posts'
import UseFeed from '../hooks/UseFeed'
import Navbar from '../components/Navbar'

const Feed = () => {
  const { feed, handleFeed, loading, handleLike, handleUnLike } = UseFeed()

  useEffect(() => {
    handleFeed()
  }, [])

  if (loading || !feed) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div>
      <main>
        <div className="feed">
          <div className="nav">
            <Navbar/>
          </div>
          <div className="posts">
            {feed.map((post) => (
              <Posts
                key={post._id}
                user={post.user}
                post={post}
                loading={loading}
                handleLike={handleLike}
                handleUnLike={handleUnLike}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Feed
