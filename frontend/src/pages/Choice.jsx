import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Choice.css';

const Choice = () => {
  const navigate = useNavigate();

  return (
    <div className="choice-page">
      <Navbar />
      <div className="choice-container">
        <h1>Choisissez votre expérience</h1>
        <div className="choice-grid">
          <div className="card-option" onClick={() => navigate('/ChatGratuit')}>
            <div className="label">Standard</div>
            <h3>Mode Gratuit</h3>
            <p>Accès aux fonctions de base du chat.</p>
            <button className="opt-btn">Sélectionner</button>
          </div>

          <div className="card-option premium" onClick={() => navigate('/ChatIA')}>
            <div className="label gold">Premium</div>
            <h3>Mode IA Avancée</h3>
            <p>Analyse clinique et suivi 24h/24.</p>
            <button className="opt-btn">Débloquer maintenant</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Choice;