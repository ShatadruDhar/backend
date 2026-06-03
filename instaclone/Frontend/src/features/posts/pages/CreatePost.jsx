import React from 'react'
import '../styles/CreatePost.scss'
const CreatePost = () => {
  return (
    <div>
      <main className='create-post'>
        <div className="form-container">
            <form onSubmit={()=>{}}>
                <label className='createPost-label' for='postImg'>Create Post</label>
                <input hidden type='file' name='postImg' id='postImg'/>
                <input type='text' name='caption' id='caption' placeholder='Enter caption'/>
                <button className='button'>Create Post</button>
            </form>
        </div>
      </main>
    </div>
  )
}

export default CreatePost
