import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [userName, setUserName] = useState(null); // État pour l'utilisateur
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Gestion du Thème
    const saved = localStorage.getItem('clarify-theme');
    const dark = saved !== 'light';
    setIsDark(dark);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');

    // 2. Vérification de la connexion
    const storedName = localStorage.getItem('nom');
    if (storedName) {
      setUserName(storedName);
    }

    // 3. Gestion du Scroll
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

  const handleLogout = () => {
    localStorage.clear(); // On vide tout
    setUserName(null);
    navigate('/');
    window.location.reload(); // Pour rafraîchir l'état proprement
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-symbol">◈</span>
          <span className="logo-text">Clarify</span>
        </Link>

        <div className="navbar-actions">
          {/* Bouton Thème corrigé pour éviter le chevauchement */}
          <button className="theme-toggle" onClick={toggleTheme}>
            <span className="theme-icon">{isDark ? '🌙' : '☀️'}</span>
            <span className="theme-text">{isDark ? 'Sombre' : 'Clair'}</span>
          </button>

          {/* Affichage conditionnel : Nom de l'utilisateur ou Se connecter */}
          {userName ? (
            <div className="user-profile-nav">
              <span className="nav-user-name" onClick={() => navigate('/chat-gratuit')}>
                👤 {userName}
              </span>
              <button className="btn-logout" onClick={handleLogout} title="Déconnexion">
                ✕
              </button>
            </div>
          ) : (
            <button className="btn-login" onClick={() => navigate('/login')}>
              Se connecter →
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;