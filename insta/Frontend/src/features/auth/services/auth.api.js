import axios from 'axios'
const api=axios.create({
    baseURL:"http://localhost:3000/api/auth/",
    withCredentials:true
})
//a feature by axios which enables us to initialize some basic things that repeat in an axios and initialize it previously and use directly
export async function register(username,password,email) {
    try{
        const response=await api.post("register",{
      username,
      email,
      password
    },) // by default axios doesnot store cookies , withCredentials:true enables axios to do it
    return response.data
    }
    catch(err){
        throw err
    }
}
export async function login(username,password) {
   try{
     const response=api.post("login",{
      username,password
    })
    return response.data
   }
   
   catch(err){
    throw err
   }
}

async function getme(){
    try{
        const response=await api.get("/get-me")
        return response.data
    }
    catch(err){
      throw err
    }
}