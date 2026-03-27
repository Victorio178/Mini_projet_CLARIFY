import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importation des composants globaux
import Navbar from './components/Navbar'; 

// Importation des pages (Tunnel principal)
import Home from './pages/Home';
import Form from './pages/Form';
import Question from './pages/Question';
import Result from './pages/Result';

// Importation des pages d'authentification et engagement
import Login from './pages/Login';      // AJOUTÉ ICI
import Register from './pages/Register';
import Plans from './pages/Plans';
import ChatGratuit from './pages/ChatGratuit';

function App() {
  return (
    <div className="app">
      {/* On place la Navbar ici pour qu'elle s'affiche sur TOUTES les pages */}
      <Navbar />

      <Routes>
        {/* Étape 1 : Le Test / Accueil */}
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/question" element={<Question />} />
        <Route path="/result" element={<Result />} />

        {/* Étape 2 : Authentification & Engagement */}
        {/* Correction : j'ai mis "register" en minuscule pour la cohérence des URLs */}
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/plans" element={<Plans />} />

        {/* Étape 3 : La Destination */}
        <Route path="/chat-gratuit" element={<ChatGratuit />} />
      </Routes>
    </div>
  );
}

export default App;