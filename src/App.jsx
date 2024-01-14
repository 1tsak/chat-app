import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { Room } from './pages/Room'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Protected } from './components/Protected'
import { AuthProvider } from './utils/AuthContext'
import { Video } from './pages/Video'
import { VideoSpace } from './pages/VideoSpace'


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<Protected />}>
            <Route path='/' element={<Room />} />
            <Route path='/video' element={<Video />} />
            <Route path='/room/:roomName' element={<VideoSpace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
