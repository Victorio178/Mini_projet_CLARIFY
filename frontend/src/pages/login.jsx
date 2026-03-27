import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation simple côté front
    if (nom.trim().length < 2) {
      setError("Veuillez entrer un nom d'utilisateur valide.");
      return;
    }
    if (password.length < 4) {
      setError("Mot de passe incorrect. Veuillez réessayer.");
      return;
    }

    // Connexion locale (sans backend pour l'instant)
    localStorage.setItem('userPseudo', nom.trim());
    navigate('/chat-gratuit');
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <div className="login-card">

          <div className="login-logo-icon">◈</div>
          <h2>Connexion</h2>
          <p>Retrouvez vos résultats et votre historique.</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-input-group">
              <label>Nom d'utilisateur</label>
              <input
                type="text"
                placeholder="Ex: Victorio"
                value={nom}
                onChange={(e) => { setNom(e.target.value); setError(''); }}
                required
              />
            </div>
            <div className="login-input-group">
              <label>Mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                required
              />
            </div>

            {/* MESSAGE D'ERREUR */}
            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}

            <button type="submit" className="login-submit-btn">
              Se connecter →
            </button>
          </form>

          {/* <div className="login-footer">
            <span>Pas encore de compte ?</span>
            <Link to="/register"> Créer un compte</Link>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default Login;