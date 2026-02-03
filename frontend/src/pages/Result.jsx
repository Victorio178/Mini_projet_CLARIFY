import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import './Result.css'

const Result = () => {
  const navigate = useNavigate()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      // Récupérer les données
      const domain = localStorage.getItem('selectedDomain') || 'mental'
      const userData = JSON.parse(localStorage.getItem('userData') || '{}')
      const questionnaireResults = JSON.parse(localStorage.getItem('questionnaireResults') || '{}')

      // Calculer le score (ou utiliser celui sauvegardé)
      const percentage = questionnaireResults.percentage || 65
      
      // Déterminer le niveau
      let level = ''
      if (percentage < 30) level = 'Très bon'
      else if (percentage < 50) level = 'Bon'
      else if (percentage < 70) level = 'Moyen'
      else level = 'À améliorer'

      setResult({
        domain: domain,
        score: percentage,
        level: level,
        userData: userData
      })
      
      setLoading(false)
    }, 1000)
  }, [])

  const getDomainInfo = (domain) => {
    switch(domain) {
      case 'mental': return { name: 'Santé Mentale', icon: '🧠', color: '#4F46E5' }
      case 'emotions': return { name: 'Émotions', icon: '❤️', color: '#EC4899' }
      case 'physique': return { name: 'Physique', icon: '⚡', color: '#10B981' }
      default: return { name: 'Santé Mentale', icon: '🧠', color: '#4F46E5' }
    }
  }

  const getRecommendations = (domain, level) => {
    const baseRecs = {
      mental: [
        "Pratiquez 10 minutes de méditation par jour",
        "Établissez une routine de sommeil régulière",
        "Prenez des pauses régulières pendant le travail",
        "Notez 3 choses positives chaque soir"
      ],
      emotions: [
        "Exprimez vos émotions dans un journal",
        "Pratiquez la gratitude quotidiennement",
        "Écoutez de la musique qui vous met de bonne humeur",
        "Parlez à un ami ou un proche de vos sentiments"
      ],
      physique: [
        "Marchez 30 minutes par jour",
        "Buvez 2L d'eau quotidiennement",
        "Étirez-vous chaque matin",
        "Mangez plus de fruits et légumes"
      ]
    }

    return baseRecs[domain] || baseRecs.mental
  }

  if (loading) {
    return (
      <div className="result-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Analyse de vos réponses en cours...</p>
        </div>
      </div>
    )
  }

  const domainInfo = getDomainInfo(result.domain)
  const recommendations = getRecommendations(result.domain, result.level)

  return (
    <div className="result-page">
      <Navbar />
      
      <main className="result-main">
        <div className="result-container">
          {/* Titre principal */}
          <h1 className="result-title">Votre bilan personnalisé est prêt</h1>

          {/* Score principal */}
          <div className="score-section">
            <div className="score-display">
              <div className="score-value">{result.score}/100</div>
              <div className="score-label">Votre score de clarté</div>
            </div>

            {/* Indicateur de progression */}
            <div className="progress-indicator">
              <span>Large 4/4</span>
            </div>
          </div>

          {/* Domaine et niveau */}
          <div className="domain-section">
            <div className="domain-icon-large">{domainInfo.icon}</div>
            <div className="domain-info">
              <h2 className="domain-name">{domainInfo.name}</h2>
              <div 
                className="level-badge"
                style={{ 
                  backgroundColor: domainInfo.color + '20',
                  color: domainInfo.color 
                }}
              >
                Niveau : {result.level}
              </div>
            </div>
            
            <div className="domain-percentage">
              <div className="percentage-circle">
                <span className="percentage-value">{result.score}%</span>
              </div>
              <p className="percentage-label">Votre score</p>
            </div>
          </div>

          {/* Explication */}
          <div className="explanation-section">
            <h3 className="section-title">Analyse de votre situation</h3>
            <p className="explanation-text">
              Votre score de {result.score}/100 indique que votre situation est "{result.level.toLowerCase()}".
              {result.score < 50 
                ? " C'est très encourageant ! Continuez sur cette voie."
                : " Quelques ajustements peuvent vous aider à vous sentir mieux."
              }
            </p>
          </div>

          {/* Recommandations */}
          <div className="recommendations-section">
            <h3 className="section-title">Nos recommandations pour vous</h3>
            
            <div className="recommendations-list">
              {recommendations.map((rec, index) => (
                <div key={index} className="recommendation-card">
                  <div className="recommendation-number">{index + 1}</div>
                  <p className="recommendation-text">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="result-actions">
            <Button type="secondary" onClick={() => navigate('/')}>
              Revenir au menu
            </Button>
            
            <Button type="primary" onClick={() => {
              alert('Plan généré avec succès !')
            }}>
              Recevoir mon plan
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Result