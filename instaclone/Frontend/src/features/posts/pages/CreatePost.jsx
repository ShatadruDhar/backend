import React from 'react'
import '../styles/CreatePost.scss'
import { useState,useRef } from 'react'
import UseFeed from '../hooks/UseFeed'
import { useNavigate } from 'react-router'
const CreatePost = () => {
  const [caption, setCaption]=useState("")
  const PostImageInputFileRef=useRef(null)
  const { loading, handleCreatePost } = UseFeed()
  const navigate=useNavigate()
  async function handleSubmit(e){
    e.preventDefault()
    const file=PostImageInputFileRef.current.files[0]
    await handleCreatePost(caption,file)
    navigate('/feed')
  }
  if(loading){
    return (
      <div>
        <h1>Creating Post...</h1>
      </div>
    )
  }
  return (
    <div>
      <main className='create-post'>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label className='createPost-label' htmlFor='postImg'>Create Post</label>
                <input hidden ref={PostImageInputFileRef} type='file' name='postImg' id='postImg'/>
                <input type='text' value={caption} onChange={(e)=>{setCaption(e.target.value)}} name='caption' id='caption' placeholder='Enter caption'/>
                <button className='button'>Create Post</button>
            </form>
        </div>
      </main>
    </div>
  )
}

export default CreatePost
