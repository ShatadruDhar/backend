import React from 'react'
import LoginForm from './Login'
import { Link } from 'react-router'
import axios from "axios"
import { useState } from 'react'
import ApiLayer from '../services/auth.api'
const RegisterForm = () => {
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  function SubmitHandler(e){
    e.preventDefault()
    ApiLayer.register(username,password,email)
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
