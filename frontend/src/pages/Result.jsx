import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import Navbar from '../components/Navbar';
import './Result.css';

const Result = () => {
  const navigate = useNavigate();
  const [res, setRes] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userResults'));
    if (!data) {
      navigate('/'); 
    } else {
      setRes(data);
    }
  }, [navigate]);

  if (!res) return null;

  // Maximum 9 points par domaine (3 questions x 3 points max)
  const chartData = [
    { subject: 'Mental', A: res.scores.mental, fullMark: 9 },
    { subject: 'Physique', A: res.scores.physique, fullMark: 9 },
    { subject: 'Emotion', A: res.scores.emotion, fullMark: 9 },
    { subject: 'Social', A: res.scores.social, fullMark: 9 },
  ];

  // Le moteur de diagnostic psychologique
  const getDiagnosis = () => {
    const s = res.scores;
    
    // On vérifie le score le plus critique (au-dessus de 6 sur 9)
    if (s.mental >= 7) {
      return { 
        problem: "Surcharge mentale importante détectée.", 
        solution: "Vous devez impérativement alléger votre emploi du temps et apprendre à dire non. Votre esprit a besoin d'une pause immédiate." 
      };
    }
    if (s.physique >= 7) {
      return { 
        problem: "Épuisement physique et fatigue accumulée.", 
        solution: "Votre corps tire la sonnette d'alarme. Vous devez revoir votre cycle de sommeil et limiter les écrans le soir." 
      };
    }
    if (s.emotion >= 7) {
      return { 
        problem: "Instabilité émotionnelle et irritabilité.", 
        solution: "Vos émotions débordent. Il est recommandé de pratiquer la cohérence cardiaque (respiration) pendant 5 minutes chaque jour." 
      };
    }
    if (s.social >= 7) {
      return { 
        problem: "Isolement social marqué.", 
        solution: "Vous avez tendance à vous renfermer. Essayez de contacter au moins une personne de confiance cette semaine pour en parler." 
      };
    }
    
    // Si tout est en dessous de 7
    return { 
      problem: "Votre équilibre global semble stable.", 
      solution: "Continuez vos bonnes habitudes ! Quelques exercices de relaxation peuvent vous aider à optimiser votre bien-être." 
    };
  };

  const diagnosis = getDiagnosis();

  return (
    <div className="result-page">
      <Navbar />
      <main className="result-container">
        
        <header className="res-header">
          <h1>Bilan de {res.pseudo}</h1>
          <p className="subtitle">Analyse clinique complétée le {res.date}</p>
        </header>

        <div className="result-grid">
          
          {/* Le Radar Chart */}
          <div className="card chart-card">
            <h3>Radar d'Équilibre (sur 9)</h3>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer>
                <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{fill: '#475569', fontSize: 13, fontWeight: 600}} />
                  <PolarRadiusAxis domain={[0, 9]} tick={false} axisLine={false} />
                  <Radar dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Le Diagnostic de l'IA */}
          <div className="card analysis-card">
            <h3>Diagnostic de l'IA</h3>
            
            <div className="diag-block problem">
              <span className="diag-label">⚠️ Votre problème principal :</span>
              <p>{diagnosis.problem}</p>
            </div>
            
            <div className="diag-block solution">
              <span className="diag-label">💡 Recommandation :</span>
              <p>{diagnosis.solution}</p>
            </div>
            
            {/* L'appel à l'action pour continuer dans le tunnel */}
            <div className="chat-promo-card" onClick={() => navigate('/Register')}>
              <h4>💬 Discuter avec l'IA</h4>
              <p>Clarify peut créer un plan d'action sur-mesure pour vous aider à aller mieux.</p>
              <button className="promo-btn">Débloquer le Chat</button>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;