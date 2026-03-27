import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // 1. IMPORT D'AXIOS
import Navbar from '../components/Navbar';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => { // 2. FONCTION ASYNC
    e.preventDefault();
    setError('');

    try {
      // 3. APPEL RÉEL AU BACKEND
      const response = await axios.post('http://localhost:5000/api/users/login', {
        nom: nom.trim(),
        password: password
      });

      if (response.data.success) {
        // 4. ON SAUVEGARDE LE NOM OFFICIEL DU COMPTE
        localStorage.setItem('nom', response.data.nom); 
        
        // Optionnel : on peut aussi garder le pseudo pour la compatibilité
        localStorage.setItem('userPseudo', response.data.nom);

        console.log("✅ Connecté en tant que :", response.data.nom);
        
        // 5. REDIRECTION
        navigate('/chat-gratuit');
        window.location.reload(); // Force la mise à jour de la Navbar
      }
    } catch (err) {
      // 6. GESTION DES ERREURS (Si le nom ou mdp est faux dans MongoDB)
      const messageErreur = err.response?.data?.message || "Erreur de connexion au serveur.";
      setError(messageErreur);
      console.error("❌ Échec de connexion:", messageErreur);
    }
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

            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}

            <button type="submit" className="login-submit-btn">
              Se connecter →
            </button>
          </form>

          <div className="login-footer">
             <span>Pas encore de compte ?</span>
             <Link to="/register"> Créer un compte</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;