import React from 'react'
import LoginForm from './Login'
import { Link } from 'react-router'
import axios from "axios"
import { useState } from 'react'
const RegisterForm = () => {
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  function SubmitHandler(e){
    e.preventDefault()
    
    axios.post("http://localhost:3000/api/auth/register",{
      username,
      email,
      password
    },{withCredentials:true}) // by default axios doesnot store cookies , withCredentials:true enables axios to do it
    .then((res)=>{
      console.log(res.data)

    })
    
  }
  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Register</h1>
          <form onSubmit={SubmitHandler} >
            <input
             onInput={(e)=>{setEmail(e.target.value)}}
             type='email'
              name='email' 
              placeholder='Enter email'
              value={email}/>
            <input
             onInput={(e)=>{setUsername(e.target.value)}}
             type='text'
              name='username'
               placeholder='Enter username'
               value={username}/>
            <input
            onInput={(e)=>{setPassword(e.target.value)}} 
            type='password'
            name='password'
            placeholder='Enter password'
            value={password}/>
          <button type='submit'>Register</button>
          </form>
          <p>Already have an account?<Link className='link' to="/login">Login</Link></p>
          
        </div>
      </main>
    </div>
  )
}

export default RegisterForm
