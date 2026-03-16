import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import './Form.css';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pseudo: '',
    age: '',
    sexe: '',
    situation: '',
    sommeil: '',
    sport: '',
    ecrans: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'age') setError(''); // Reset erreur age
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation : Plus de 16 ans requis
    if (parseInt(formData.age) < 16) {
      setError("Désolé, vous devez avoir au moins 16 ans pour utiliser Clarify.");
      return;
    }

    // Sauvegarde des données de contexte
    localStorage.setItem('userProfile', JSON.stringify(formData));
    navigate('/Question');
  };

  return (
    <div className="form-page">
      <Navbar />
      <main className="form-container">
        <form className="consultation-form" onSubmit={handleSubmit}>
          <h2>Votre Profil de Santé</h2>
          <p className="form-intro">Ces informations permettent à notre IA d'ajuster son diagnostic.</p>

          <div className="form-section">
            <div className="input-group">
              <label>Pseudo</label>
              <input type="text" name="pseudo" required value={formData.pseudo} onChange={handleChange} placeholder="Ex: Victorio" />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Âge</label>
                <input type="number" name="age" required value={formData.age} onChange={handleChange} placeholder="ans" />
                {error && <span className="error-msg">{error}</span>}
              </div>
              <div className="input-group">
                <label>Sexe</label>
                <select name="sexe" value={formData.sexe} onChange={handleChange} required>
                  <option value="">Choisir...</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Situation actuelle</label>
              <select name="situation" value={formData.situation} onChange={handleChange} required>
                <option value="">Sélectionnez...</option>
                <option value="Etudiant">Étudiant</option>
                <option value="Employé">Employé</option>
                <option value="Sans-emploi">Sans emploi</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>Mode de vie</h3>
            
            <div className="input-group">
              <label>Heures de sommeil / nuit</label>
              <div className="radio-group">
                {['moins de 5h', '5-6h', '7-8h', 'plus de 8h'].map(val => (
                  <label key={val} className="radio-label">
                    <input type="radio" name="sommeil" value={val} onChange={handleChange} required /> {val}
                  </label>
                ))}
              </div>
            </div>

            <div className="input-group">
              <label>Activité physique</label>
              <select name="sport" value={formData.sport} onChange={handleChange} required>
                <option value="">Sélectionnez...</option>
                <option value="jamais">Jamais</option>
                <option value="1-2 fois">1-2 fois par semaine</option>
                <option value="regulier">Régulièrement</option>
              </select>
            </div>

            <div className="input-group">
              <label>Temps d'écran / jour</label>
              <select name="ecrans" value={formData.ecrans} onChange={handleChange} required>
                <option value="">Sélectionnez...</option>
                <option value="moins de 3h">Moins de 3h</option>
                <option value="3-6h">3h à 6h</option>
                <option value="plus de 6h">Plus de 6h</option>
              </select>
            </div>
          </div>

          <div className="form-footer">
            <Button type="primary">Suivant : Questionnaire Psy</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Form;