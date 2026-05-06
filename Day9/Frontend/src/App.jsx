import { useState,useEffect } from 'react'
import React from 'react'
import './App.css'
import axios from 'axios'

const App = () => {
  const [note,setnote]=useState([])
  function fetchNotes(){
      axios.get("https://cohort-2-xsdc.onrender.com/notes")
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
 
 axios.post("https://cohort-2-xsdc.onrender.com/notes",{
  title:title.value,
  description:description.value
 })
 .then((res)=>{
  console.log(res.data)
  fetchNotes()
 })
}
function deleteNote(id){
  axios.delete(`https://cohort-2-xsdc.onrender.com/notes/${id}`)
  .then((res)=>{
    fetchNotes()
  })

}
const [SelectedId,setSelectedId]=useState()
const [showForm,setShowForm]=useState(false)
function UpdateHandler(e){
e.preventDefault()

const {desc}=e.target.elements

 axios.patch("https://cohort-2-xsdc.onrender.com/notes/"+SelectedId,{
    description:desc.value
  })
  .then((res)=>{
    fetchNotes()
    setShowForm(false)
  })


}
function UpdateNote(id){
  setShowForm(true)
  setSelectedId(id);
}
  return (
    <div>
      <form className='note-create-form' onSubmit={submitHandler}>
        <input type='text' placeholder='Enter title' name='title' ></input>
        <input type='text' placeholder='Enter description' name='description' ></input>
        <button>Create note</button> 
      </form>
      <div className="notes">
      { showForm &&(
                  <form onSubmit={UpdateHandler}>
            <input type='text' name='desc' placeholder='Write new description'></input>
            <button type='submit'>Update Desription</button>
          </form>
       )
      }
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
