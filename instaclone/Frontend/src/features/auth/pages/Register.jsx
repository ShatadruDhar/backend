import React from 'react'
import { useState } from 'react'
import { UseAuth } from '../Hooks/UseAuth'
import {useNavigate,Link           } from 'react-router' 

const Register = () => {
    const [username,setusername]=useState("")
 const [password,setPassword]=useState('')
 const [email,setemail]=useState('')
 const navigate=useNavigate()
 const {handleregister,loading}=UseAuth()
    function SubmitHandler(e){
      e.preventDefault()
      handleregister(username,email,password)
      .then((res)=>{
        console.log(res)
        navigate('/')
      })

    }
  return (
    <div>
        <main>
        <div className="form-controller">
            <h1>Register</h1>
            <form onSubmit={SubmitHandler}>
                <input type='text' onChange={(e)=>{setusername(e.target.value)}} name='username' placeholder='Enter usename' value={username} />
                <input type='email' onChange={(e)=>{setemail(e.target.value)}} name='email' placeholder='Enter email' value={email} />
                <input type='password' onChange={(e)=>{setPassword(e.target.value)}} name='password' placeholder='Enter password'  value={password}/>
                <button className='button auth-button'>Register</button>
            </form>
            <p>Already have an Account?<Link className="link" to={"/login"}>Login</Link></p> 
        </div>
      </main>
    </div>
  )
}

export default Register
