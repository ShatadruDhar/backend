import React from 'react'
import AppRoutes from './AppRoutes'
import './features/auth/styles/form.scss'
import { AuthProvider } from './features/auth/auth.context'
const App = () => {
  return (
    <div>
       <AuthProvider>
        <AppRoutes/>
       </AuthProvider>
    </div>
  )
}

export default App
