import { jwtDecode } from 'jwt-decode'

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router"
import NavBar from "./components/NavBar/NavBar"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import Cafe from "./components/Cafe/Cafe"
import SignUp from './components/Auth/SignupForm'
import LoginForm from './components/Auth/LoginForm'
import LogoutButton from './components/Auth/LogoutButton'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import CafeDetails from './components/Cafe/CafeDetails'


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [selected, setSelected] = useState(null)

  function handleLogin(newToken) {
    setToken(newToken)
  }

  function handleLogout() {
    setToken(null)
    localStorage.removeItem('token')
  }

  if (token) {
    const decodedToken = jwtDecode(token)
    // console.log(decodedToken)
  }

  return (
    <Router>
      <div>
        {token ? <LogoutButton onLogout={handleLogout} /> : null}
        <NavBar />
        <Footer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cafes"
            element={

              <ProtectedRoute>
                <Cafe selected={selected} />
              </ProtectedRoute>
            } />
          <Route path="/cafes/:id"
            element={
              <ProtectedRoute>
                <CafeDetails />
              </ProtectedRoute>
            } />


































          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='*' element={<h1>404: Page not found</h1>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App