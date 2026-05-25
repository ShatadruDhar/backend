import axios from 'axios'
const api=axios.create({
    baseURL:"http://localhost:3000/api/posts/",
    withCredentials:true
})
export async function getFeed(){
 try{
        const posts=await api.get("feed")
        return posts.data.posts
    }
 catch(err){
   throw err
 }
}