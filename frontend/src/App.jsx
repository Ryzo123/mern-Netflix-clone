import { useEffect, useState } from 'react'
import Homepge from './pages/home/Homepge'
import Signuppage from './pages/Signuppage'
import Loginpage from './pages/Loginpage'
import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authuser'
import { Loader } from 'lucide-react'
import WatchPage from './pages/WatchPage'
import SearchPage from './pages/SearchPage'
import HistoryPage from './pages/HistoryPage'
import NotFoundPage from './pages/NotFoundPage'






function App() {
 
const {user, isCheckingAuth,authCheck}=useAuthStore()




useEffect(()=>{
  authCheck();
},[authCheck])
if(isCheckingAuth){
  return (
    <div className='h-screen'>
      <div className='flex justify-center items-center bg-black h-full'> 
        <Loader className='animate-spin text-red-600 size-10'></Loader>
      </div>

    </div>
  )
}
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepge/>}/>
      <Route path='/signin' element={!user?<Loginpage/>:<Navigate to={"/"}/>}/>
      <Route path='/signup' element={!user?<Signuppage/>:<Navigate to={"/"}/>}/>
      <Route path='/watch/:id' element={user?<WatchPage/>:<Navigate to={"/signin"}/>}/>

      <Route path='/search' element={user?<SearchPage/>:<Navigate to={"/signin"}/>}/>
      <Route path='/history' element={user?<HistoryPage/>:<Navigate to={"/signin"}/>}/>
      <Route path='/*' element={<NotFoundPage/>}/>
    </Routes>
    <Footer/>
    <Toaster/>
    </>
  )
}

export default App
