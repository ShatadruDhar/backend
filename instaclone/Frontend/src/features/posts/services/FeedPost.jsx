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


 export async function createPost(image,caption){
    const formData=new FormData()
    formData.append("image",image)
    formData.append("caption",caption)
  try{
     const post=await api.post("/", formData)
     return post.data
 }
 catch(err){
    throw err
 }
}