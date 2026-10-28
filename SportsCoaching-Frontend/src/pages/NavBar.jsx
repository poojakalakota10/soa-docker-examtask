import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Home from './Home.jsx'
import UserRegistration from './UserRegistration.jsx'
import UserLogin from './UserLogin.jsx'

function NavBar() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <NavLink className="brand" to="/">User Portal</NavLink>
        <nav aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/registation">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </header>
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registation" element={<UserRegistration />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default NavBar