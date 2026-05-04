import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import './App.css'
const App = () => {
  
  const [note,setnote]=useState([])
  axios.get("http://localhost:3000/notes")
  .then((res)=>{
    setnote(res.data.note)
  })
  
  return (
    <div>
     <div className="notes">
      {note.map(note=>{
        return( <div className="note">
          <h1>{note.title}</h1>
           <p>{note.description}</p>   
        </div>    
        ) 
      })}
     </div>

      
     
     
    </div>
  )
}

export default App
