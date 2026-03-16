import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Navbar />

      <main className="home-container">
        <section className="hero">
          <div className="hero-content">
            <span className="badge">Évaluation Santé 2026</span>
            <h1 className="hero-title">
              Éclairez votre esprit avec <span className="text-gradient">Clarify</span>
            </h1>
            <p className="hero-subtitle">
              Une analyse profonde de votre bien-être. Basé sur des protocoles cliniques, 
              Clarify vous aide à comprendre l'équilibre entre votre corps et votre esprit.
            </p>

            <div className="features-grid">
              <div className="feature-card">
                <div className="icon">🧠</div>
                <h3>Mental</h3>
                <p>Analyse du stress et de la charge cognitive.</p>
              </div>
              <div className="feature-card">
                <div className="icon">🌱</div>
                <h3>Social</h3>
                <p>Évaluation de votre entourage et soutien.</p>
              </div>
            </div>

            <div className="hero-actions">
              <Button type="primary" onClick={() => navigate('/Form')}>
                Démarrer mon bilan
              </Button>
              <p className="time-info">⏱️ Prend moins de 2 minutes</p>
            </div>
          </div>

          <div className="hero-visual">
            {/* Ici tu pourras mettre une illustration ou le graphique radar en exemple */}
            <div className="abstract-shape"></div>
          </div>
        </section>

        <footer className="home-footer">
          <p className="disclaimer">
            <strong>Note importante :</strong> Cet outil est à visée informative. 
            Il ne remplace pas un diagnostic médical professionnel.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Home;