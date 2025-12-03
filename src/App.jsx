import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Registration from './pages/Registration/Registration'

function App() {

  return (
    <>
    <div>
      <Routes>
        <Route
          path='/'
          element={<Login />}
        />

        <Route
          path='register'
          element={<Registration />}
        />
      </Routes>
    </div>
    </>
  )
}

export default App
