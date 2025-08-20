import { useNavigate } from 'react-router'
import '../NavBar/NavBarStyle.css'

function LogoutButton({ onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    onLogout()
    navigate('/login')
  }

  return (
    <button className='logout-btn'
      onClick={handleLogout} 
    >
      Logout
    </button>
  )
}

export default LogoutButton