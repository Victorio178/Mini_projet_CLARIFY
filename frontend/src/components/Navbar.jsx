import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          {/* <span className="logo-icon">🧠</span> */}
          <span className="logo-text">Clarify</span>
        </Link>
        
        <div className="navbar-language">
          <span>🇫🇷 Français</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar