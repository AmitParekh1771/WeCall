import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Navbar from './components/Navbar'
import Join from './components/Join'
import Lobby from './components/Lobby'
import Room from './components/Room'

import './base.css'
import './wecall.css'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/lobby/:rid' element={<Lobby />} />
        <Route path='/room/:rid' element={<Room />} />
      </Routes>
    </div>
  )
}

export default App
