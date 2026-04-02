import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Login.css'; // Assure-toi que ton CSS est bien dans ce fichier

const Login = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Connexion au compte
      const response = await axios.post('http://localhost:5000/api/users/login', {
        nom: nom.trim(),
        password: password
      });

      if (response.data.success) {
        const userNom = response.data.nom;
        localStorage.setItem('nom', userNom);

        // 2. RÉCUPÉRATION DU BILAN EN ATTENTE
        const localResults = localStorage.getItem('userResults'); 
        const localProfile = localStorage.getItem('userProfile'); 

        if (localResults && localProfile) {
          try {
            const results = JSON.parse(localResults);
            const profile = JSON.parse(localProfile);

            await axios.post('http://localhost:5000/api/resultats/save', {
              pseudo: userNom,
              ...profile,
              scores: results.scores || results,
              date: new Date().toLocaleDateString('fr-FR')
            });
            
            localStorage.removeItem('userResults');
            localStorage.removeItem('userProfile');
            console.log("✅ Bilan synchronisé !");
          } catch (parseErr) {
            console.error("Erreur synchro:", parseErr);
          }
        }

        navigate('/chat-gratuit');
        window.location.reload();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Identifiants incorrects.");
    }
  };

  return (
    <div className="login-page">
      <Navbar />
      
      <div className="login-container">
        <div className="login-card">
          <span className="login-logo-icon">C</span>
          <h2>Connexion</h2>
          <p>Heureux de vous revoir sur CLARIFY. Connectez-vous pour accéder à votre espace.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            {/* Affichage de l'erreur avec l'animation shake du CSS */}
            {error && <div className="login-error">{error}</div>}

            <div className="login-input-group">
              <label htmlFor="username">Nom d'utilisateur</label>
              <input 
                id="username"
                type="text" 
                placeholder="Ex: tendry" 
                value={nom} 
                onChange={(e) => setNom(e.target.value)} 
                required 
              />
            </div>

            <div className="login-input-group">
              <label htmlFor="password">Mot de passe</label>
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="login-submit-btn">
              Se connecter
            </button>

            <div className="login-footer">
              Pas encore de compte ? <Link to="/register">S'inscrire</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;