import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // N'oublie pas l'import !
import Navbar from '../components/Navbar';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  
  // États pour récupérer les saisies
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // ✅ Envoi vers la route de ton backend
      const response = await axios.post('http://localhost:5000/api/users/register', {
        nom: formData.nom,
        email: formData.email,
        password: formData.password
      });

      if (response.status === 201 || response.status === 200) {
        console.log("✅ Utilisateur créé dans MongoDB !");
        navigate('/plans'); 
      }
    } catch (error) {
      console.error("❌ Erreur d'inscription:", error.response?.data || error.message);
      alert("Erreur lors de la création du compte.");
    }
  };

  return (
    <div className="register-page">
      <Navbar />
      <div className="register-container">
        <form className="register-card" onSubmit={handleRegister}>
          <h2>Créer un compte</h2>
          <p>Sauvegardez vos résultats et suivez votre évolution.</p>

          <input 
            type="text" 
            name="nom"
            placeholder="Nom complet" 
            className="reg-input" 
            onChange={handleChange}
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            className="reg-input" 
            onChange={handleChange}
            required 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Mot de passe" 
            className="reg-input" 
            onChange={handleChange}
            required 
          />

          <button type="submit" className="main-btn">
            Créer mon compte →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;