import { BrowserRouter as Router, Routes, Route } from "react-router"
import NavBar from "./components/NavBar/NavBar"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import Cafe from "./components/Cafe/Cafe"

const App = () => {
  return (
    <Router>
      <NavBar />
      <Footer />
      <Routes>
        <Route path="/" element={<Home/> }/>
        <Route path="/cafes" element={<Cafe />} />
      </Routes>
    </Router>
  )
}

export default App