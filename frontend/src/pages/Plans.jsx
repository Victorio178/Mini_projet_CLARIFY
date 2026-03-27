import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Plans.css';

const Plans = () => {
  const navigate = useNavigate();

  const handlePremiumClick = () => {
    alert("Le mode Premium IA arrive bientôt ! Merci de votre patience.");
  };

  const freeFeatures = [
    "✓ Chat de bienvenue personnalisé",
    "✓ Résultats de votre bilan",
    "✓ Recommandations de base",
    "✓ Accès illimité au questionnaire",
  ];

  const premiumFeatures = [
    "✦ Analyse clinique approfondie",
    "✦ Plan d'action sur-mesure",
    "✦ Suivi de votre évolution",
    "✦ IA conversationnelle avancée",
  ];

  return (
    <div className="plans-page">
      <Navbar />
      <main className="plans-container">
        <div className="plans-header">
          <span className="plans-tag">Votre parcours</span>
          <h1>Choisissez votre Plan</h1>
          <p>Commencez gratuitement, évoluez à votre rythme.</p>
        </div>

        <div className="plans-grid">

          {/* GRATUIT */}
          <div className="plan-card" onClick={() => navigate('/chat-gratuit')}>
            <div className="plan-badge free">Disponible</div>
            <div className="plan-icon">🌱</div>
            <h3>Mode Gratuit</h3>
            <div className="plan-price">
              <span className="price">0 €</span>
              <span className="period">/ toujours</span>
            </div>
            <p className="plan-desc">Idéal pour découvrir Clarify et obtenir un premier aperçu de votre bien-être.</p>
            <ul className="plan-features">
              {freeFeatures.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <button className="plan-btn free-btn">Commencer gratuitement →</button>
          </div>

          {/* PREMIUM */}
          <div className="plan-card premium" onClick={handlePremiumClick}>
            <div className="plan-badge gold">Bientôt disponible</div>
            <div className="plan-icon">⚡</div>
            <h3>Mode IA Avancée</h3>
            <div className="plan-price">
              <span className="price">Pro</span>
              <span className="period">/ bientôt</span>
            </div>
            <p className="plan-desc">Une analyse clinique complète avec un plan d'action personnalisé par notre IA.</p>
            <ul className="plan-features">
              {premiumFeatures.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <button className="plan-btn premium-btn">Être notifié au lancement</button>
          </div>

        </div>

        <p className="plans-note">⚠️ Clarify ne remplace pas un avis médical professionnel.</p>
      </main>
    </div>
  );
};

export default Plans;