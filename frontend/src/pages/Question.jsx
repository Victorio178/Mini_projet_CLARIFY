import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import './Question.css'

const Question = () => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selectedDomain, setSelectedDomain] = useState('mental')

  // Questions selon le domaine
  const questionsByDomain = {
    mental: [
      "Comment évalueriez-vous votre niveau de stress ces derniers jours ?",
      "Avez-vous des difficultés à vous concentrer ou à vous souvenir des choses ?",
      "Comment évalueriez-vous la qualité de votre sommeil ?",
      "Vous sentez-vous souvent dépassé par vos responsabilités ?"
    ],
    emotions: [
      "Comment décririez-vous votre humeur générale cette semaine ?",
      "Ressentez-vous souvent de l'anxiété sans raison apparente ?",
      "Avez-vous du mal à ressentir du plaisir dans vos activités habituelles ?",
      "Vous sentez-vous fréquemment irritable ou impatient ?"
    ],
    physique: [
      "Comment évaluez-vous votre niveau d'énergie quotidien ?",
      "Avez-vous des douleurs ou tensions corporelles fréquentes ?",
      "Comment évaluez-vous la qualité de votre alimentation ?",
      "Faites-vous suffisamment d'activité physique ?"
    ]
  }

  // Options de réponse (1-4)
  const answerOptions = [
    "Très rarement / Pas du tout",
    "Parfois / Un peu",
    "Souvent / Moyennement",
    "Très souvent / Énormément"
  ]

  useEffect(() => {
    // Récupérer le domaine choisi
    const domain = localStorage.getItem('selectedDomain') || 'mental'
    setSelectedDomain(domain)
  }, [])

  const questions = questionsByDomain[selectedDomain] || questionsByDomain.mental
  const currentQuestionText = questions[currentQuestion]

  const handleAnswer = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex + 1 // Stocker 1-4
    })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculer le score
      const scores = Object.values(answers)
      const totalScore = scores.reduce((sum, score) => sum + score, 0)
      const maxScore = questions.length * 4
      const percentage = Math.round((totalScore / maxScore) * 100)

      // Sauvegarder les résultats
      localStorage.setItem('questionnaireResults', JSON.stringify({
        domain: selectedDomain,
        score: totalScore,
        percentage: percentage,
        answers: answers
      }))

      // Aller aux résultats
      navigate('/result')
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="question-page">
      <Navbar />
      
      <main className="question-main">
        <div className="question-container">
          {/* Titre */}
          <h1 className="question-title">
            Veuillez répondre à notre question pour analyse personnalisée
          </h1>

          {/* Progression */}
          <div className="progress-section">
            <div className="progress-info">
              <span>Question {currentQuestion + 1} sur {questions.length}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="question-card">
            <h2 className="question-text">{currentQuestionText}</h2>
            
            {/* Options de réponse */}
            <div className="options-grid">
              {answerOptions.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${answers[currentQuestion] === index + 1 ? 'selected' : ''}`}
                  onClick={() => handleAnswer(index)}
                >
                  <div className="option-number">{index + 1}</div>
                  <span className="option-text">{option}</span>
                  
                  {answers[currentQuestion] === index + 1 && (
                    <div className="option-check">✓</div>
                  )}
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="question-buttons">
              <Button 
                type="secondary" 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Retour
              </Button>
              
              <Button 
                type="primary" 
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
              >
                {currentQuestion === questions.length - 1 ? 'Voir les résultats' : 'Suivant'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Question