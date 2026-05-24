import { useState } from "react";
import { createContext } from "react";
import { login,register } from "./services/auth.api";
export const AuthContext=createContext()

export  function AuthProvider({children}){
const [user,setUser]=useState(null)
const [loading,setLoading]=useState(false)    

const handlelogin=async(username,password)=>{
    setLoading(true)
    try{
      const response=await login(username,password)
      setUser(response.user)
      return response
    }
    catch(err){
      setLoading(false)
      throw err
      
    }
    finally{
        setLoading(false)
    }
}
const handleregister=async(username,email,password)=> {
    setLoading(true)
    try{
     const response=await register(username,email,password)
     setUser(response.user)
     return response
    }
    catch(err){
        setLoading(false)
        throw err
    }
    finally{
        setLoading(false)
    }
    
}
return(
    <AuthContext.Provider value={{handlelogin,handleregister,loading,user}}>{children}</AuthContext.Provider>
)
}

