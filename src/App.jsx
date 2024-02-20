import { useState } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Result from './pages/Result'

import FileDropUpload from './components/FileDropUpload'



function App() {

  return (
    <>

      
      <Routes>
        <Route path='/' element={<FileDropUpload/>} />
        <Route path='/result' element={<Result />} />

      </Routes>


     
    </>
  )
}

export default App
