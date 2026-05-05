import { useState,useEffect } from 'react'
import React from 'react'
import './App.css'
import axios from 'axios'

const App = () => {
  const [note,setnote]=useState([])
  function fetchNotes(){
      axios.get("http://localhost:3000/notes")
  .then((res)=>{
    setnote(res.data.note)    
  })
  }
  useEffect(()=>{
   fetchNotes()
  },[])

  // Because of this useEffect is used
//  Render → API call
// API call → setnote()
// setnote() → re-render
// Re-render → API call AGAIN ❗
// Repeat forever 
function submitHandler(e){
  e.preventDefault()
 const {title,description}=e.target.elements
 
 axios.post("http://localhost:3000/notes",{
  title:title.value,
  description:description.value
 })
 .then((res)=>{
  console.log(res.data)
  fetchNotes()
 })
}
function deleteNote(id){
  axios.delete(`http://localhost:3000/notes/${id}`)
  .then((res)=>{
    fetchNotes()
  })

}
const [desc,setDesc]=useState("")
function UpdateHandler(e){
e.preventDefault()
const {desc}=e.target.elements
setDesc(desc.value)

}
function UpdateNote(id){
  <form>
    <input type='text' name='desc' placeholder='Write new description'></input>
    <button onSubmit={UpdateHandler}>Update Desription</button>
  </form>
  axios.patch("http://localhost:3000/notes/"+id,{
    description:desc
  })
  .then((res)=>{
    fetchNotes()
  })

}
  return (
    <div>
      <form className='note-create-form' onSubmit={submitHandler}>
        <input type='text' placeholder='Enter title' name='title' ></input>
        <input type='text' placeholder='Enter description' name='description' ></input>
        <button>Create note</button> 
      </form>
      <div className="notes">
        {
          note.map(note=>{
            return <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
             <div className="btns">
               <button onClick={()=>{deleteNote(note._id)}}>Delete</button>
              <button onClick={()=>{UpdateNote(note._id)}}>Update</button>
             </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default App
