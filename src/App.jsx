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
import Drink from './components/Drink/Drink'
import DrinkDetails from './components/Drink/DrinkDetails'


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [selectedCafe, setSelectedCafe] = useState(null)
  const [selectedDrink, setSelectedDrink] = useState(null)

  function handleLogin(newToken) {
    setToken(newToken)
  }

  function handleLogout() {
    setToken(null)
    localStorage.removeItem('token')
  }

  if (token) {
    const decodedToken = jwtDecode(token)
  }

  return (
    <Router>
      <div>
        {token ? <LogoutButton onLogout={handleLogout} /> : null}
        
        <Routes>

          <Route path="/login" element={<LoginForm onLogin={() => {}} />} />
          <Route path="/signup" element={<SignUp />} />


          <Route path="/" element={<Home />} />
          <Route path="/cafes"
            element={

              <ProtectedRoute>
                <Cafe selectedCafe={selectedCafe} />
              </ProtectedRoute>
            } />
          <Route path="/cafes/:id"
            element={
              <ProtectedRoute>
                <CafeDetails />
              </ProtectedRoute>
            } />






























          <Route path='/drinks'
            element=
            {<ProtectedRoute>
              <Drink
                selectedDrink={selectedDrink}
                setSelectedDrink={setSelectedDrink}
              />
            </ProtectedRoute>
            } />

          <Route path="/drinks/:id"
            element={
              <ProtectedRoute>
                <DrinkDetails />
              </ProtectedRoute>
            } />

          <Route path='*' element={<h1>404: Page not found</h1>} />
        </Routes>
        
          <Footer />
        
      </div>
    </Router>
  )
}

export default App