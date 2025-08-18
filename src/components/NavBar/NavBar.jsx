import { Link } from 'react-router'
const NavBar = () => {
  return (
    <>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cafes">Cafes</Link></li>
        <li><Link to="/drinks">Drinks</Link></li>
      </ul>

    </>
  )
}

export default NavBar

