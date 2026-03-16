import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="register-page">
      <Navbar />
      <div className="register-container">
        <div className="register-card">
          <h2>Créer un compte</h2>
          <p>Entrez vos détails pour sauvegarder vos résultats.</p>
          <input type="text" placeholder="Nom complet" className="reg-input" />
          <input type="tel" placeholder="Téléphone" className="reg-input" />
          <button className="google-btn">Continuer avec Google</button>
          <button className="main-btn" onClick={() => navigate('/plans')}>
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};
export default Register;