import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import './Home.scss';

// Illustrations SVG intégrées
const IllustrationMental = () => (
  <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <defs>
      <radialGradient id="g1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="200" cy="150" rx="180" ry="130" fill="url(#g1)"/>
    {/* Tête */}
    <circle cx="200" cy="110" r="55" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.6"/>
    {/* Cerveau simplifié */}
    <path d="M175 100 Q185 85 200 90 Q215 85 225 100 Q235 115 225 125 Q215 135 200 130 Q185 135 175 125 Q165 115 175 100Z" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.8"/>
    {/* Ondes de stress */}
    <path d="M140 160 Q160 150 180 160 Q200 170 220 160 Q240 150 260 160" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.7" strokeDasharray="4,3"/>
    <path d="M130 175 Q155 165 180 175 Q205 185 230 175 Q255 165 270 175" fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.5" strokeDasharray="4,3"/>
    <path d="M145 190 Q170 180 195 190 Q220 200 245 190" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.4" strokeDasharray="4,3"/>
    {/* Points lumineux */}
    <circle cx="200" cy="90" r="3" fill="#a5b4fc"/>
    <circle cx="175" cy="110" r="2" fill="#6366f1" opacity="0.8"/>
    <circle cx="225" cy="110" r="2" fill="#6366f1" opacity="0.8"/>
    {/* Texte */}
    <text x="200" y="240" textAnchor="middle" fill="#6366f1" fontSize="11" opacity="0.6" fontWeight="600" letterSpacing="3">ANALYSE EN COURS</text>
  </svg>
);

const IllustrationEmotion = () => (
  <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <defs>
      <radialGradient id="g2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="200" cy="150" rx="180" ry="130" fill="url(#g2)"/>
    {/* Visage */}
    <circle cx="200" cy="130" r="60" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.6"/>
    {/* Yeux */}
    <circle cx="182" cy="118" r="6" fill="none" stroke="#a855f7" strokeWidth="2"/>
    <circle cx="218" cy="118" r="6" fill="none" stroke="#a855f7" strokeWidth="2"/>
    <circle cx="184" cy="120" r="2.5" fill="#c084fc"/>
    <circle cx="220" cy="120" r="2.5" fill="#c084fc"/>
    {/* Sourire neutre */}
    <path d="M185 148 Q200 158 215 148" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Émotions flottantes */}
    <text x="120" y="90" fontSize="22" opacity="0.5">😔</text>
    <text x="260" y="80" fontSize="22" opacity="0.5">😊</text>
    <text x="90" y="160" fontSize="18" opacity="0.4">😤</text>
    <text x="275" y="170" fontSize="18" opacity="0.4">😌</text>
    {/* Lignes de connexion */}
    <line x1="145" y1="88" x2="175" y2="110" stroke="#a855f7" strokeWidth="1" opacity="0.3" strokeDasharray="3,3"/>
    <line x1="260" y1="82" x2="230" y2="108" stroke="#a855f7" strokeWidth="1" opacity="0.3" strokeDasharray="3,3"/>
    <text x="200" y="240" textAnchor="middle" fill="#a855f7" fontSize="11" opacity="0.6" fontWeight="600" letterSpacing="3">ÉQUILIBRE ÉMOTIONNEL</text>
  </svg>
);

const IllustrationPhysique = () => (
  <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <defs>
      <radialGradient id="g3" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="200" cy="150" rx="180" ry="130" fill="url(#g3)"/>
    {/* Corps stylisé */}
    <circle cx="200" cy="80" r="22" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.7"/>
    <line x1="200" y1="102" x2="200" y2="175" stroke="#ef4444" strokeWidth="2.5" opacity="0.6"/>
    <line x1="200" y1="120" x2="160" y2="145" stroke="#ef4444" strokeWidth="2" opacity="0.6"/>
    <line x1="200" y1="120" x2="240" y2="145" stroke="#ef4444" strokeWidth="2" opacity="0.6"/>
    <line x1="200" y1="175" x2="175" y2="215" stroke="#ef4444" strokeWidth="2" opacity="0.6"/>
    <line x1="200" y1="175" x2="225" y2="215" stroke="#ef4444" strokeWidth="2" opacity="0.6"/>
    {/* Battement de coeur */}
    <path d="M100 155 L120 155 L130 135 L145 175 L155 145 L165 165 L175 155 L300 155" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.8"/>
    {/* Énergie */}
    <circle cx="200" cy="80" r="35" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.2"/>
    <circle cx="200" cy="80" r="48" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.1"/>
    <text x="200" y="250" textAnchor="middle" fill="#ef4444" fontSize="11" opacity="0.6" fontWeight="600" letterSpacing="3">VITALITÉ PHYSIQUE</text>
  </svg>
);

const IllustrationSocial = () => (
  <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <defs>
      <radialGradient id="g4" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#22c55e" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="200" cy="150" rx="180" ry="130" fill="url(#g4)"/>
    {/* Personne centrale */}
    <circle cx="200" cy="120" r="20" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.8"/>
    <path d="M175 155 Q200 165 225 155" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.6"/>
    {/* Personnes autour */}
    <circle cx="110" cy="100" r="15" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.5"/>
    <path d="M92 128 Q110 136 128 128" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.4"/>
    <circle cx="290" cy="100" r="15" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.5"/>
    <path d="M272 128 Q290 136 308 128" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.4"/>
    <circle cx="150" cy="195" r="15" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.5"/>
    <circle cx="250" cy="195" r="15" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.5"/>
    {/* Lignes de connexion */}
    <line x1="125" y1="108" x2="178" y2="118" stroke="#22c55e" strokeWidth="1.5" opacity="0.4" strokeDasharray="4,3"/>
    <line x1="275" y1="108" x2="222" y2="118" stroke="#22c55e" strokeWidth="1.5" opacity="0.4" strokeDasharray="4,3"/>
    <line x1="163" y1="183" x2="188" y2="142" stroke="#22c55e" strokeWidth="1.5" opacity="0.4" strokeDasharray="4,3"/>
    <line x1="237" y1="183" x2="212" y2="142" stroke="#22c55e" strokeWidth="1.5" opacity="0.4" strokeDasharray="4,3"/>
    {/* Points de connexion */}
    <circle cx="200" cy="120" r="4" fill="#22c55e" opacity="0.9"/>
    <circle cx="110" cy="100" r="3" fill="#22c55e" opacity="0.6"/>
    <circle cx="290" cy="100" r="3" fill="#22c55e" opacity="0.6"/>
    <circle cx="150" cy="195" r="3" fill="#22c55e" opacity="0.6"/>
    <circle cx="250" cy="195" r="3" fill="#22c55e" opacity="0.6"/>
    <text x="200" y="250" textAnchor="middle" fill="#22c55e" fontSize="11" opacity="0.6" fontWeight="600" letterSpacing="3">CONNEXION SOCIALE</text>
  </svg>
);

const Home = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 4000], [0, -400]);
  const y2 = useTransform(scrollY, [0, 4000], [0, -800]);
  const y3 = useTransform(scrollY, [0, 4000], [0, -1200]);

  const sections = [
    {
      t: "Santé Mentale",
      i: "🧠",
      p: "Beaucoup de jeunes ont du mal à canaliser le flux constant d'informations. Le stress académique et la pression sociale créent une charge mentale invisible mais pesante. Clarify vous aide à poser des mots sur ce chaos intérieur.",
      color: "#6366f1",
      illustration: <IllustrationMental />
    },
    {
      t: "Équilibre Émotionnel",
      i: "🎭",
      p: "Les émotions ne sont pas des obstacles, mais des indicateurs. Aujourd'hui, la déconnexion avec nos propres ressentis est fréquente. Comprendre pourquoi vous vous sentez submergé est la première étape pour reprendre le contrôle.",
      color: "#a855f7",
      illustration: <IllustrationEmotion />
    },
    {
      t: "Force Physique",
      i: "💪",
      p: "Prendre soin de son corps n'est pas qu'une question d'esthétique. C'est le moteur de votre productivité. Identifiez les leviers physiques pour booster votre énergie vitale et votre concentration au quotidien.",
      color: "#ef4444",
      illustration: <IllustrationPhysique />
    },
    {
      t: "Vie Sociale",
      i: "🤝",
      p: "L'isolement est l'un des facteurs les plus sous-estimés du mal-être. Vos relations avec les autres façonnent votre équilibre mental. Clarify vous aide à identifier les dynamiques sociales qui vous nourrissent ou vous épuisent.",
      color: "#22c55e",
      illustration: <IllustrationSocial />
    },
  ];

  return (
    <div className="home-page">
      <motion.div className="star-wrap" style={{ y: y1 }}><div id="stars" className="auto" /></motion.div>
      <motion.div className="star-wrap" style={{ y: y2 }}><div id="stars2" className="auto" /></motion.div>
      <motion.div className="star-wrap" style={{ y: y3 }}><div id="stars3" className="auto" /></motion.div>

      <div className="content-overlay">
        <Navbar />

        <header className="hero-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="hero-title">
              Éclairez votre esprit avec <span className="gradient-text">Clarify</span>
            </h1>
            <p className="hero-tagline">L'équilibre au cœur de votre performance.</p>
            <p className="hero-subtitle">Faites défiler pour explorer vos catégories de santé.</p>
          </motion.div>
        </header>

        <div className="rows-container">
          {sections.map((item, idx) => (
            <motion.section
              key={idx}
              className={`full-row ${idx % 2 === 0 ? 'normal' : 'reverse'}`}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="image-side">
                <div className="image-placeholder" style={{ border: `1px solid ${item.color}22` }}>
                  {item.illustration}
                </div>
                <div className="glow-effect" style={{ background: item.color }}></div>
              </div>

              <div className="text-side">
                <span className="section-icon">{item.i}</span>
                <h2 style={{ color: item.color }}>{item.t}</h2>
                <p className="description">{item.p}</p>
                <div className="line-decor" style={{ background: item.color }}></div>
              </div>
            </motion.section>
          ))}
        </div>

        <div style={{ height: '30vh' }} />
      </div>

      <div className="footer-action">
        <button className="btn-start" onClick={() => navigate('/form')}>
          Commencer l'analyse
        </button>
      </div>
    </div>
  );
};

export default Home;