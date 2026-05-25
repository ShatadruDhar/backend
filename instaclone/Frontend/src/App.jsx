import React from 'react'
import AppRoutes from './AppRoutes'
import './features/auth/styles/form.scss'
import { AuthProvider } from './features/auth/auth.context'
import { PostProvider } from './features/posts/postContext'
const App = () => {
  return (
    <div>
       <AuthProvider>
        <PostProvider>
          <AppRoutes/>
        </PostProvider>
       </AuthProvider>
    </div>
  )
}

export default App
