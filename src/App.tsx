import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { useEffect, useState } from 'react'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(auth === "true");
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        { isAuthenticated && (
          <>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/profile" element={<Profile/>} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App