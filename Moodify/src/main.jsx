import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FaceExpressionDetector from './features/expression/Expression.jsx'

createRoot(document.getElementById('root')).render(
  <FaceExpressionDetector/>
)
