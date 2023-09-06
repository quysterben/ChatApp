import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom"

import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/set-avatar' element={<SetAvatar />} />
        <Route path='/' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}
