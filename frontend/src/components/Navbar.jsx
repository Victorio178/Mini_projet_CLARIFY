import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('clarify-theme');
    const dark = saved !== 'light'; // dark par défaut
    setIsDark(dark);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.setAttribute('data-theme', newIsDark ? 'dark' : 'light');
    localStorage.setItem('clarify-theme', newIsDark ? 'dark' : 'light');
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          <span className="logo-symbol">◈</span>
          <span className="logo-text">Clarify</span>
        </Link>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? '🌙 Sombre' : '☀️ Clair'}
          </button>
          <button className="btn-login" onClick={() => navigate('/login')}>
            Se connecter →
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;