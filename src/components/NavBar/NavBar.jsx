import { Link } from 'react-router'
import './NavBarStyle.css'
import logo from '/images/logo.png'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import LogoutButton from '../Auth/LogoutButton'
const NavBar = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  if (token) {
    const decodedToken = jwtDecode(token)
  }
  function handleLogout() {
    setToken(null)
    localStorage.removeItem('token')
  }
  return (
    <nav className="navbar">
      <div className="nav-left">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cafes">Cafes</Link></li>

        </ul>
      </div>

      <div className="nav-logo">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </div>

      <div className="nav-right">
        <ul>
          {token ? <LogoutButton onLogout={handleLogout} /> : null}

        </ul>
      </div>
    </nav>
  )
}

export default NavBar