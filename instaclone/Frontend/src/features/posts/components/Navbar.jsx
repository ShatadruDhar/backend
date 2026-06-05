import React from 'react'
import '../styles/Navbar.scss'
import {useNavigate} from 'react-router'
const Navbar = () => {
    const navigate=useNavigate()
  return (

    <div>
      <div className="nav-bar">
        <button onClick={()=>{
            navigate('/create-post')
        }} className='button'>New Post</button>
      </div>
    </div>
  )
}

export default Navbar
