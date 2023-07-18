import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Room } from './pages/Room'
import { Login } from './pages/Login'
import { Protected } from './components/Protected'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<Protected />}>
          <Route path='/' element={<Room />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
