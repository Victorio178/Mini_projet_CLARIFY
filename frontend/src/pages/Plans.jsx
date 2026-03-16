import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Plans.css';

const Plans = () => {
  const navigate = useNavigate();

  const handlePremiumClick = () => {
    alert("Le mode Premium IA arrive bientôt ! Merci de votre patience.");
  };

  return (
    <div className="plans-page">
      <Navbar />
      <main className="plans-container">
        <h1>Choisissez votre Plan</h1>
        <div className="plans-grid">
          
          {/* OPTION GRATUITE - Ouvre la page */}
          <div className="plan-card" onClick={() => navigate('/ChatGratuit')}>
            <div className="plan-badge">Disponible</div>
            <h3>Mode Gratuit</h3>
            <p>Accès au chat de bienvenue et informations.</p>
            <button className="plan-btn">Choisir Gratuit</button>
          </div>

          {/* OPTION PREMIUM - Affiche juste un message */}
          <div className="plan-card premium" onClick={handlePremiumClick}>
            <div className="plan-badge gold">Bientôt</div>
            <h3>Mode IA Avancée</h3>
            <p>Analyse clinique complète (Prochaine étape).</p>
            <button className="plan-btn">En savoir plus</button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Plans;