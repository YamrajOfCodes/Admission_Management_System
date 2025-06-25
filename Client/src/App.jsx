import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Landingpage from './Pages/Landing/Landingpage'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from './Pages/Dashboard/Dashboard'
import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes.jsx'

function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<Landingpage/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path='/admin' element={<DashboardPage/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App