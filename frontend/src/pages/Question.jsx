import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Question.css';

const Question = () => {
  const navigate = useNavigate();
  
  // États de progression
  const [domainIndex, setDomainIndex] = useState(0); // 0:Mental, 1:Physique, 2:Emotion, 3:Social
  const [currentQId, setCurrentQId] = useState('q1'); // Identifiant de la question en cours
  const [globalStep, setGlobalStep] = useState(0); // Pour la barre de progression (0 à 11)
  const [scores, setScores] = useState({ mental: 0, physique: 0, emotion: 0, social: 0 });

  // LA BASE DE DONNÉES DE L'ARBRE DE DÉCISION
  const quizFlow = [
    {
      domain: 'mental',
      name: 'Santé Mentale',
      questions: {
        q1: { text: "Vous sentez-vous souvent débordé(e) en ce moment ?", options: [{ text: "Oui, souvent", next: "q2_oui", pts: 3 }, { text: "Non, je gère", next: "q2_non", pts: 1 }] },
        q2_oui: { text: "Ce stress vient-il principalement de vos études/travail ?", options: [{ text: "Oui, la pression est forte", next: "q3_pro", pts: 3 }, { text: "Non, c'est plutôt personnel", next: "q3_perso", pts: 2 }] },
        q2_non: { text: "Avez-vous des difficultés à rester concentré(e) ?", options: [{ text: "Parfois", next: "q3_distrait", pts: 2 }, { text: "Jamais, je suis focus", next: "q3_focus", pts: 1 }] },
        q3_pro: { text: "Avez-vous l'impression de travailler sans avancer ?", options: [{ text: "Oui, c'est frustrant", pts: 3 }, { text: "Non, je reste productif", pts: 1 }] },
        q3_perso: { text: "Avez-vous du temps pour vous détendre seul(e) ?", options: [{ text: "Très peu", pts: 3 }, { text: "Assez", pts: 1 }] },
        q3_distrait: { text: "Oubliez-vous souvent des petites choses (clés, rdv) ?", options: [{ text: "Oui, souvent", pts: 3 }, { text: "Rarement", pts: 1 }] },
        q3_focus: { text: "Votre charge mentale vous semble-t-elle légère ?", options: [{ text: "Oui, tout va bien", pts: 1 }, { text: "Elle est normale", pts: 2 }] }
      }
    },
    {
      domain: 'physique',
      name: 'Santé Physique',
      questions: {
        q1: { text: "Ressentez-vous une fatigue inexpliquée la journée ?", options: [{ text: "Oui, je suis épuisé(e)", next: "q2_fatigue", pts: 3 }, { text: "Non, j'ai de l'énergie", next: "q2_forme", pts: 1 }] },
        q2_fatigue: { text: "Votre sommeil est-il agité ou trop court ?", options: [{ text: "Oui, je dors mal", next: "q3_sommeil", pts: 3 }, { text: "Je dors bien mais je reste fatigué", next: "q3_medical", pts: 2 }] },
        q2_forme: { text: "Ressentez-vous des douleurs musculaires (dos, nuque) ?", options: [{ text: "Oui, souvent", next: "q3_douleur", pts: 3 }, { text: "Non, jamais", next: "q3_sain", pts: 1 }] },
        q3_sommeil: { text: "Regardez-vous des écrans juste avant de dormir ?", options: [{ text: "Oui, toujours", pts: 3 }, { text: "Non, j'évite", pts: 1 }] },
        q3_medical: { text: "Avez-vous une alimentation équilibrée en ce moment ?", options: [{ text: "Pas vraiment", pts: 3 }, { text: "Oui, je fais attention", pts: 1 }] },
        q3_douleur: { text: "Passez-vous plus de 6 heures par jour assis(e) ?", options: [{ text: "Oui", pts: 3 }, { text: "Non", pts: 1 }] },
        q3_sain: { text: "Faites-vous du sport régulièrement ?", options: [{ text: "Oui", pts: 1 }, { text: "Non, je devrais", pts: 2 }] }
      }
    },
    {
      domain: 'emotion',
      name: 'Santé Émotionnelle',
      questions: {
        q1: { text: "Avez-vous des sautes d'humeur soudaines ?", options: [{ text: "Oui, je suis irritable", next: "q2_irritable", pts: 3 }, { text: "Non, je suis plutôt calme", next: "q2_calme", pts: 1 }] },
        q2_irritable: { text: "Vous mettez-vous en colère pour des détails ?", options: [{ text: "Oui, ça m'arrive", next: "q3_colere", pts: 3 }, { text: "Non, c'est juste de l'impatience", next: "q3_impatience", pts: 2 }] },
        q2_calme: { text: "Ressentez-vous parfois une tristesse sans raison ?", options: [{ text: "Oui, de temps en temps", next: "q3_triste", pts: 2 }, { text: "Non, je me sens bien", next: "q3_joie", pts: 1 }] },
        q3_colere: { text: "Arrivez-vous à vous calmer rapidement ?", options: [{ text: "Difficilement", pts: 3 }, { text: "Oui, assez vite", pts: 1 }] },
        q3_impatience: { text: "Avez-vous l'impression que personne ne vous comprend ?", options: [{ text: "Souvent", pts: 3 }, { text: "Non, ça va", pts: 1 }] },
        q3_triste: { text: "Avez-vous perdu l'envie de faire vos loisirs habituels ?", options: [{ text: "Oui, un peu", pts: 3 }, { text: "Non, je les fais toujours", pts: 1 }] },
        q3_joie: { text: "Êtes-vous globalement optimiste pour votre avenir ?", options: [{ text: "Oui, très", pts: 1 }, { text: "Je suis neutre", pts: 2 }] }
      }
    },
    {
      domain: 'social',
      name: 'Vie Sociale',
      questions: {
        q1: { text: "Évitez-vous les sorties avec vos amis en ce moment ?", options: [{ text: "Oui, je préfère rester seul(e)", next: "q2_isole", pts: 3 }, { text: "Non, j'aime voir du monde", next: "q2_entoure", pts: 1 }] },
        q2_isole: { text: "Est-ce par manque d'énergie ou d'envie ?", options: [{ text: "Je n'ai pas l'énergie", next: "q3_energie", pts: 3 }, { text: "Je n'en ai pas envie", next: "q3_envie", pts: 2 }] },
        q2_entoure: { text: "Avez-vous une personne de confiance à qui tout dire ?", options: [{ text: "Oui, heureusement", next: "q3_confiance", pts: 1 }, { text: "Pas vraiment", next: "q3_seul", pts: 3 }] },
        q3_energie: { text: "Répondez-vous rapidement aux messages de vos proches ?", options: [{ text: "Non, je laisse traîner", pts: 3 }, { text: "Oui, j'essaie", pts: 1 }] },
        q3_envie: { text: "Trouvez-vous les discussions des autres inintéressantes ?", options: [{ text: "Oui, souvent", pts: 3 }, { text: "Non, pas spécialement", pts: 1 }] },
        q3_confiance: { text: "Sentez-vous que cette personne vous juge parfois ?", options: [{ text: "Oui, un peu", pts: 2 }, { text: "Jamais", pts: 1 }] },
        q3_seul: { text: "Le fait de ne pas avoir de confident vous pèse-t-il ?", options: [{ text: "Oui, c'est lourd", pts: 3 }, { text: "Non, je gère seul", pts: 2 }] }
      }
    }
  ];

  const currentDomainInfo = quizFlow[domainIndex];
  const currentQuestionData = currentDomainInfo.questions[currentQId];

  const handleAnswer = (option) => {
    // 1. Mise à jour du score
    const newScores = { ...scores };
    newScores[currentDomainInfo.domain] += option.pts;
    setScores(newScores);

    // 2. Navigation vers la prochaine question
    if (option.next) {
      // S'il y a un 'next', on reste dans le même domaine
      setCurrentQId(option.next);
      setGlobalStep(globalStep + 1);
    } else {
      // Sinon (c'était la 3ème question du domaine), on passe au domaine suivant
      if (domainIndex < 3) {
        setDomainIndex(domainIndex + 1);
        setCurrentQId('q1'); // On recommence à q1 pour le nouveau domaine
        setGlobalStep(globalStep + 1);
      } else {
        // FIN DU TEST (12 questions répondues)
        const finalResults = {
          pseudo: "Utilisateur",
          scores: newScores,
          date: new Date().toLocaleDateString()
        };
        localStorage.setItem('userResults', JSON.stringify(finalResults));
        navigate('/result');
      }
    }
  };

  return (
    <div className="question-page">
      <Navbar />
      
      {/* Barre de progression sur 12 */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${((globalStep + 1) / 12) * 100}%` }}></div>
      </div>

      <div className="question-container">
        <div className="question-card">
          <div className="card-header">
            <span className="step-tag">{currentDomainInfo.name}</span>
            <span className="step-counter">Q {globalStep + 1} / 12</span>
          </div>
          
          <h2>{currentQuestionData.text}</h2>
          
          <div className="options-vertical">
            {currentQuestionData.options.map((opt, i) => (
              <button key={i} className="opt-btn" onClick={() => handleAnswer(opt)}>
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;