import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import './Choice.css'

const Choice = () => {
  const navigate = useNavigate()
  const [selectedDomain, setSelectedDomain] = useState(null)

  const domains = [
    { id: 'mental', name: 'Santé Mentale', description: 'Stress, focus, sommeil...', icon: '🧠' },
    { id: 'emotions', name: 'Émotions', description: 'Humeur, anxiété, moral...', icon: '❤️' },
    { id: 'physique', name: 'Physique', description: 'Énergie, poids, tensions...', icon: '⚡' }
  ]

  const handleContinue = () => {
    if (selectedDomain) {
      localStorage.setItem('selectedDomain', selectedDomain)
      navigate('/question')
    } else {
      alert('Veuillez sélectionner un domaine')
    }
  }

  return (
    <div className="choice-page">
      <Navbar />
      
      <main className="choice-main">
        <div className="choice-container">
          <h1 className="choice-title">Par quoi souhaitez-vous commencer</h1>
          
          <div className="domains-grid">
            {domains.map(domain => (
              <div
                key={domain.id}
                className={`domain-card ${selectedDomain === domain.id ? 'selected' : ''}`}
                onClick={() => setSelectedDomain(domain.id)}
              >
                <div className="domain-icon">{domain.icon}</div>
                <h3 className="domain-name">{domain.name}</h3>
                <p className="domain-description">{domain.description}</p>
                
                {selectedDomain === domain.id && (
                  <div className="selection-indicator">✓</div>
                )}
              </div>
            ))}
          </div>
          
          <div className="choice-buttons">
            <Button type="secondary" onClick={() => navigate('/form')}>
              Retour
            </Button>
            
            <Button 
              type="primary" 
              onClick={handleContinue}
              disabled={!selectedDomain}
            >
              Continuer
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Choice