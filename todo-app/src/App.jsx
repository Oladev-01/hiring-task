import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LandingPage } from "./Components/LandingPage"
import { Signup } from "./Components/Signup"
import { Login } from "./Components/Login"
import { Homepage } from "./Components/Homepage"
import { About } from "./Components/About"
import { Contact } from "./Components/Contact"
import { Services } from "./Components/Services"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Homepage />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
