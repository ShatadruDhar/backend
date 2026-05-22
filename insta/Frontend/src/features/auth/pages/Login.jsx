import React from 'react'
import '../styles/form.scss'
import { Link } from 'react-router'
import RegisterForm from './Register'
import { useState } from 'react'
import axios from "axios"
import ApiLayer from '../services/auth.api'
const LoginForm = () => {
  const [password,setPassword]=useState("")
  const [username,setUsername]=useState("")
  function submitHandler(e){
    e.preventDefault()
    ApiLayer.login(username,password)

  }
  return (
    <div>
      <main>
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={submitHandler}>
            <input
             onInput={(e)=>{setUsername(e.target.value)}}
             type='text'
             name='username'
             placeholder='Enter username'
             value={username}
             />
            <input 
            onInput={(e)=>{setPassword(e.target.value)}}
            type='password'
             name='password'
              placeholder='Enter password'
              value={password} />
           <button type='submit'>Login</button>
          </form>
          <p>Dont have an account?<Link className='link' to="/register">Register</Link></p>
        </div>
      </main>
    </div>
  )
}

export default LoginForm
