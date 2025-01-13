import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { LandingPage } from "../Components/LandingPage"
import { Signup } from "../Components/Signup"
import { Login } from "../Components/Login"
import { Homepage } from "../Components/Homepage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  )
}

export default App
