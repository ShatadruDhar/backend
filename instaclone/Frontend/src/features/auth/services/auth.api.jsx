import axios from 'axios'
const api=axios.create({
    withCredentials:true,
    baseURL:"http://localhost:3000/api/auth/"
})

export async function register(username,email,password){
 try{
   const response=await api.post("/register",{
    username,email,password
   })
   return response.data
 }
 catch(err){
  throw err
 }
}
export async function login(username,password){
 try{
   const response=await api.post("/login",{
    username,password
   })
   return response.data
 }
 catch(err){
  throw err
 }
}
 export async function getme() {
  try{
        const response=api.get('/get-me')
    return response.data
  }
    catch(err){
        throw err
    }
 }