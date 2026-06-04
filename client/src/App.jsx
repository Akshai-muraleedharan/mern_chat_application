import React from 'react'
import { Routes, Route } from "react-router-dom"
import SignupPage from './pages/SignupPage'
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/signup' element={<SignupPage />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App