import React from 'react'
import {useNavigate,Link} from 'react-router'
import { useState } from 'react'
import { UseAuth } from '../Hooks/UseAuth'
const Login = () => {
  const [username,setusername]=useState("")
 const [password,setPassword]=useState("")
 const navigate=useNavigate()
 const {handlelogin,loading}=UseAuth()
 if(loading){
    return(
      <h1>Loading...</h1>
    )
 }
   function SubmitHandler(e) {
    e.preventDefault()
    handlelogin(username,password)
    .then((res)=>{
        console.log(res)
        navigate('/')

    })
 }
    return (
    <div>
      <main>
        <div className="form-controller">
            <h1>Login</h1>
            <form onSubmit={SubmitHandler}>
                <input type='text' onChange={(e)=>{setusername(e.target.value)}} name='username' placeholder='Enter username' value={username} />
                <input type='password'onChange={(e)=>{setPassword(e.target.value)}} name='password' placeholder='Enter password' value={password} />
                <button className='button auth-button'>Login</button>
            </form>
            <p>Dont have an Account?<Link className='link' to={"/register"}>Register</Link></p>

        </div>
      </main>
    </div>
  )
}

export default Login
