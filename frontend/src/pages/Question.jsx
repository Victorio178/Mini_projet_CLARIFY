import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Question.css';

const Question = () => {
  const navigate = useNavigate();
  
  const [domainIndex, setDomainIndex] = useState(0); 
  const [currentQId, setCurrentQId] = useState('q1'); 
  const [globalStep, setGlobalStep] = useState(0); 
  const [scores, setScores] = useState({ mental: 0, physique: 0, emotion: 0, social: 0 });

  // ARBRE DE DÉCISION BASÉ SUR LE CBI ET DASS-21
  const quizFlow = [
    {
      domain: 'mental',
      name: 'Charge Cognitive',
      questions: {
        q1: { text: "Avez-vous l'impression que votre esprit est 'embrumé' en ce moment ?", options: [{ text: "Souvent", next: "q2_brouillard", pts: 3 }, { text: "Rarement", next: "q2_clair", pts: 1 }] },
        q2_brouillard: { text: "Cette sensation bloque-t-elle vos prises de décision ?", options: [{ text: "Oui, je n'arrive plus à choisir", next: "q3_paralysie", pts: 3 }, { text: "Non, je continue d'avancer", next: "q3_lent", pts: 2 }] },
        q2_clair: { text: "Arrivez-vous à vous concentrer plus de 20 minutes sans interruption ?", options: [{ text: "Oui, facilement", next: "q3_focus", pts: 1 }, { text: "C'est un combat quotidien", next: "q3_distrait", pts: 3 }] },
        q3_paralysie: { text: "Agissez-vous souvent par 'pilote automatique' ?", options: [{ text: "Oui, sans réfléchir", pts: 3 }, { text: "Non, je reste conscient", pts: 1 }] },
        q3_lent: { text: "Oubliez-vous des choses simples (clés, mots) ?", options: [{ text: "Oui, de plus en plus", pts: 3 }, { text: "Non, ma mémoire est stable", pts: 1 }] },
        q3_focus: { text: "Votre esprit se sent-il reposé le matin ?", options: [{ text: "Oui", pts: 1 }, { text: "Déjà saturé", pts: 2 }] },
        q3_distrait: { text: "Le moindre bruit vous dérange-t-il ?", options: [{ text: "Énormément", pts: 3 }, { text: "Un peu", pts: 2 }] }
      }
    },
    {
      domain: 'physique',
      name: 'Signaux Somatiques',
      questions: {
        q1: { text: "Ressentez-vous une fatigue que le sommeil ne semble pas dissiper ?", options: [{ text: "Oui, une fatigue de fond", next: "q2_fatigue", pts: 3 }, { text: "Non, je récupère bien", next: "q2_forme", pts: 1 }] },
        q2_fatigue: { text: "Votre corps exprime-t-il des tensions (mâchoires, dos) ?", options: [{ text: "Oui, je suis crispé(e)", next: "q3_tension", pts: 3 }, { text: "Non, mon corps est détendu", next: "q3_mou", pts: 1 }] },
        q2_forme: { text: "Votre énergie fluctue-t-elle brutalement ?", options: [{ text: "Oui, des gros coups de barre", next: "q3_crash", pts: 2 }, { text: "C'est stable", next: "q3_sain", pts: 1 }] },
        q3_tension: { text: "Avez-vous souvent des maux de tête inexpliqués ?", options: [{ text: "Oui, régulièrement", pts: 3 }, { text: "Rarement", pts: 1 }] },
        q3_mou: { text: "Ressentez-vous une lourdeur dans vos membres ?", options: [{ text: "Oui", pts: 3 }, { text: "Non", pts: 1 }] },
        q3_crash: { text: "Avez-vous besoin de stimulants (café, sucre) ?", options: [{ text: "Beaucoup", pts: 3 }, { text: "Peu", pts: 1 }] },
        q3_sain: { text: "Faites-vous attention à votre posture ?", options: [{ text: "Oui", pts: 1 }, { text: "Je devrais", pts: 2 }] }
      }
    },
    {
      domain: 'emotion',
      name: 'Régulation Émotionnelle',
      questions: {
        q1: { text: "Comment réagissez-vous face à un petit imprévu ?", options: [{ text: "Je m'irrite vite", next: "q2_irritable", pts: 3 }, { text: "Je reste calme", next: "q2_calme", pts: 1 }] },
        q2_irritable: { text: "Cette irritation se transforme-t-elle en colère ?", options: [{ text: "Oui, c'est incontrôlable", next: "q3_colere", pts: 3 }, { text: "Non, c'est juste passager", next: "q3_impatience", pts: 2 }] },
        q2_calme: { text: "Ressentez-vous une sorte d'indifférence émotionnelle ?", options: [{ text: "Oui, plus rien ne me touche", next: "q3_vide", pts: 3 }, { text: "Non, je suis bien", next: "q3_joie", pts: 1 }] },
        q3_colere: { text: "Regrettez-vous souvent vos paroles ?", options: [{ text: "Souvent", pts: 3 }, { text: "Rarement", pts: 1 }] },
        q3_impatience: { text: "Le monde vous semble-t-il trop lent ?", options: [{ text: "Oui, tout m'énerve", pts: 3 }, { text: "Non", pts: 1 }] },
        q3_vide: { text: "Avez-vous perdu l'envie de rire ?", options: [{ text: "Un peu", pts: 3 }, { text: "Non, j'ai de l'humour", pts: 1 }] },
        q3_joie: { text: "Avez-vous des projets qui vous font plaisir ?", options: [{ text: "Oui, plusieurs", pts: 1 }, { text: "Pas vraiment", pts: 2 }] }
      }
    },
    {
      domain: 'social',
      name: 'Vie Sociale',
      questions: {
        q1: { text: "Le contact avec les autres vous demande-t-il un effort ?", options: [{ text: "Oui, c'est épuisant", next: "q2_isole", pts: 3 }, { text: "Non, ça me booste", next: "q2_entoure", pts: 1 }] },
        q2_isole: { text: "Avez-vous tendance à annuler vos sorties au dernier moment ?", options: [{ text: "Oui, souvent", next: "q3_annule", pts: 3 }, { text: "Non, j'assume", next: "q3_force", pts: 2 }] },
        q2_entoure: { text: "Avez-vous quelqu'un qui écoute sans juger ?", options: [{ text: "Oui", next: "q3_confiance", pts: 1 }, { text: "Pas vraiment", next: "q3_seul", pts: 3 }] },
        q3_annule: { text: "Vous sentez-vous mieux une fois seul(e) ?", options: [{ text: "Oui, un soulagement", pts: 3 }, { text: "Non, coupable", pts: 1 }] },
        q3_force: { text: "Jouez-vous un rôle (masque) en public ?", options: [{ text: "Tout le temps", pts: 3 }, { text: "Rarement", pts: 1 }] },
        q3_confiance: { text: "Parlez-vous de vos doutes à cette personne ?", options: [{ text: "Oui", pts: 1 }, { text: "C'est difficile", pts: 2 }] },
        q3_seul: { text: "La solitude vous pèse-t-elle ?", options: [{ text: "Oui", pts: 3 }, { text: "Non, je préfère", pts: 2 }] }
      }
    }
  ];

  const currentDomainInfo = quizFlow[domainIndex];
  const currentQuestionData = currentDomainInfo.questions[currentQId];

  const handleAnswer = (option) => {
    const newScores = { ...scores };
    newScores[currentDomainInfo.domain] += option.pts;
    setScores(newScores);

    if (option.next) {
      setCurrentQId(option.next);
      setGlobalStep(globalStep + 1);
    } else {
      if (domainIndex < 3) {
        setDomainIndex(domainIndex + 1);
        setCurrentQId('q1');
        setGlobalStep(globalStep + 1);
      } else {
        const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
        const finalResults = {
          ...userProfile,
          scores: newScores,
          date: new Date().toLocaleDateString('fr-FR')
        };
        localStorage.setItem('userResults', JSON.stringify(finalResults));
        navigate('/result');
      }
    }
  };

  return (
    <div className="question-page">
      <Navbar />
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