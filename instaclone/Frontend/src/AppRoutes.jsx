import {BrowserRouter,Route,Routes} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Feed from './features/posts/pages/Feed'
 const AppRoutes=()=>{
 return (
    <BrowserRouter>
 <Routes>
   <Route path='/login' element={<Login/>}></Route>
   <Route path='/register' element={<Register/>}></Route>
   <Route path='/' element={<h1>Welcome to the website</h1>}></Route>
   <Route path='/feed' element={<Feed/>}></Route>
 </Routes>
 </BrowserRouter>
 )
}

export default AppRoutes