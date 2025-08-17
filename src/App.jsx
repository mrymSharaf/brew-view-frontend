import { BrowserRouter as Router, Routes, Route } from "react-router"
import NavBar from "../components/NavBar/NavBar"
import Footer from "../components/Footer/Footer"

const App = () => {
  return (
    <Router>
      <NavBar />
      <Footer />
      <Routes>
        <Route>

        </Route>
      </Routes>
    </Router>
  )
}

export default App