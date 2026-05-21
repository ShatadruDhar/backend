import React from 'react'
import '../styles/form.scss'
import { Link } from 'react-router'
import RegisterForm from './Register'
import { useState } from 'react'
import axios from "axios"
const LoginForm = () => {
  const [password,setPassword]=useState("")
  const [username,setUsername]=useState("")
  function submitHandler(e){
    e.preventDefault()
    axios.post("http://localhost:3000/api/auth/login",{
      username,password
    },{withCredentials:true})
     .then((res)=>{
      console.log(res.data)
     })

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
