import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Composants
import Navbar from './components/Navbar'; 

// Pages
import Home from './pages/Home';
import Form from './pages/Form';
import Question from './pages/Question';
import Result from './pages/Result';
import Login from './pages/Login'; // <--- CORRIGÉ : L majuscule
import Register from './pages/Register';
import Plans from './pages/Plans';
import ChatGratuit from './pages/ChatGratuit';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/question" element={<Question />} />
        <Route path="/result" element={<Result />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/chat-gratuit" element={<ChatGratuit />} />
      </Routes>
    </div>
  );
}

export default App;