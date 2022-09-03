import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './components/Login/Login'
import Navbar from './components/Navbar'
import JoinMeet from './components/JoinMeet'
import Lobby from './components/Lobby'
import RoomSelection from './components/RoomSelection'

import './base.css'
import './wecall.css'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/join' element={<JoinMeet />} />
        <Route path='/lobby' element={<Lobby />} />
        <Route path='/roomselection/:rid' element={<RoomSelection />} />
      </Routes>
    </div>
  )
}

export default App
