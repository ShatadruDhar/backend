import React from 'react'
import '../styles/Sidebar.scss'
import { useNavigate } from 'react-router'

const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <aside className="sidebar">
      <h2>Instagram</h2>
      <nav>
        <button onClick={() => navigate('/feed')}>🏠 Home</button>
        <button onClick={() => navigate('/create-post')}>➕ Create</button>
      </nav>
    </aside>
  )
}

export default Sidebar