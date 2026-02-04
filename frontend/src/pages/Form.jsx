import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import './Form.css'

const Form = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    pseudo: '',
    age: '',
    taille: '',
    poids: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Sauvegarder dans localStorage
    localStorage.setItem('userData', JSON.stringify(formData))
    
    
    navigate('/Question')
  }

  return (
    <div className="form-page">
      <Navbar />
      
      <main className="form-main">
        <div className="form-container">
          <h1 className="form-title">Parlez-nous un peu de vous</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nom</label>
              <input
                type="text"
                name="pseudo"
                placeholder="pseudo"
                value={formData.pseudo}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Âge</label>
              <input
                type="number"
                name="age"
                placeholder="ans"
                value={formData.age}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Taille</label>
              <input
                type="number"
                name="taille"
                placeholder="cm"
                value={formData.taille}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Poids</label>
              <input
                type="number"
                name="poids"
                placeholder="kg"
                value={formData.poids}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-note">
              <p>
                Ces données nous aident à calculer des indices précis (comme l'IMC) 
                pour adapter nos conseils physiques.
              </p>
            </div>
            
            <div className="form-buttons">
              <Button type="secondary" onClick={() => navigate('/Choice')}>
                Retour
              </Button>
              
              <Button type="primary">
                Suivant
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Form