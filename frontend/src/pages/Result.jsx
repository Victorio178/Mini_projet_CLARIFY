import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import axios from 'axios'; // 1. Importation d'Axios
import Navbar from '../components/Navbar';
import './Result.css';

const Result = () => {
  const navigate = useNavigate();
  const [res, setRes] = useState(null);
  const [isSaved, setIsSaved] = useState(false); // État pour éviter de sauvegarder 10 fois

  useEffect(() => {
    // 2. Récupération des données fusionnées (Profil + Scores)
    const data = JSON.parse(localStorage.getItem('userResults'));
    
    if (!data || !data.scores) {
      navigate('/');
    } else {
      setRes(data);
      
      // 3. Sauvegarde automatique vers MongoDB
      if (!isSaved) {
        saveToMongo(data);
      }
    }
  }, [navigate, isSaved]);

  const saveToMongo = async (results) => {
    try {
      // ✅ Appel à ton API Node.js
      await axios.post('http://localhost:5000/api/resultats/save', {
        pseudo: results.pseudo,
        age: results.age,
        sexe: results.sexe,
        situation: results.situation,
        sommeil: results.sommeil,
        sport: results.sport,
        ecrans: results.ecrans,
        scores: results.scores,
        date: results.date || new Date().toLocaleDateString('fr-FR')
      });
      
      console.log("✅ Données sauvegardées dans MongoDB !");
      setIsSaved(true);
    } catch (error) {
      console.error("❌ Erreur lors de la sauvegarde MongoDB:", error.message);
    }
  };

  if (!res) return <div className="loading">Chargement de votre analyse...</div>;

  // --- Reste de ta logique de graphique et diagnostic (inchangée) ---
  const chartData = [
    { subject: 'Mental',   A: res.scores.mental,   fullMark: 9 },
    { subject: 'Physique', A: res.scores.physique,  fullMark: 9 },
    { subject: 'Émotion',  A: res.scores.emotion,   fullMark: 9 },
    { subject: 'Social',   A: res.scores.social,    fullMark: 9 },
  ];

  const getDiagnosis = () => {
    const s = res.scores;
    if (s.mental >= 7) return { problem: "Surcharge mentale importante.", solution: "Allégez votre emploi du temps." };
    if (s.physique >= 7) return { problem: "Épuisement physique détecté.", solution: "Priorisez le repos." };
    if (s.emotion >= 7) return { problem: "Irritabilité émotionnelle.", solution: "Pratiquez la respiration." };
    if (s.social >= 7) return { problem: "Isolement social marqué.", solution: "Contactez un proche." };
    return { problem: "Équilibre stable.", solution: "Continuez vos bonnes habitudes !" };
  };

  const getScoreLabel = (score) => {
    if (score >= 7) return { label: 'Critique', color: '#ef4444' };
    if (score >= 5) return { label: 'Modéré', color: '#f59e0b' };
    return { label: 'Bon', color: '#22c55e' };
  };

  const diagnosis = getDiagnosis();

  return (
    <div className="result-page">
      <Navbar />
      <main className="result-container">
        <header className="res-header">
          <h1>Bilan de {res.pseudo}</h1>
          <p className="subtitle">Analyse Clarify générée le {res.date}</p>
        </header>

        <div className="scores-row">
          {[
            { label: 'Mental',   value: res.scores.mental,   icon: '🧠' },
            { label: 'Physique', value: res.scores.physique,  icon: '💪' },
            { label: 'Émotion',  value: res.scores.emotion,   icon: '🎭' },
            { label: 'Social',   value: res.scores.social,    icon: '🤝' },
          ].map((s, i) => {
            const status = getScoreLabel(s.value);
            return (
              <div className="score-chip" key={i}>
                <span className="score-chip-icon">{s.icon}</span>
                <span className="score-chip-label">{s.label}</span>
                <span className="score-chip-value" style={{ color: status.color }}>
                  {s.value}/9 · {status.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="result-grid">
          <div className="card chart-card">
            <h3>Radar d'Équilibre</h3>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer>
                <RadarChart data={chartData}>
                  <PolarGrid stroke="rgba(99,102,241,0.2)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 13, fontWeight: 600 }} />
                  <PolarRadiusAxis domain={[0, 9]} tick={false} axisLine={false} />
                  <Radar dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card analysis-card">
            <h3>Diagnostic de l'IA</h3>
            <div className="diag-block problem">
              <span className="diag-label">⚠️ Problème principal</span>
              <p>{diagnosis.problem}</p>
            </div>
            <div className="diag-block solution">
              <span className="diag-label">💡 Recommandation</span>
              <p>{diagnosis.solution}</p>
            </div>
            <div className="chat-promo-card" onClick={() => navigate('/register')}>
              <h4>💬 Aller plus loin ?</h4>
              <button className="promo-btn">Débloquer le Chat</button>
            </div>
          </div>
        </div>

        <button className="back-home-btn" onClick={() => navigate('/')}>
          ↩ Refaire le test
        </button>
      </main>
    </div>
  );
};

export default Result;