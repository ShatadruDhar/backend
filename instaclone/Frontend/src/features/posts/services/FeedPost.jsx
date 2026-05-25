import axios from 'axios'
const api=axios.create({
    baseURL="http://localhost:3000/api/posts/"
})
export async function getFeed(){
 try{
        const posts=await axios.get("feed")
        return posts.data
    }
 catch(err){
   throw err
 }
}