import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

// Vérification de l'élément root
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("L'élément avec l'ID 'root' est introuvable dans index.html.");
}

// Création de la racine React
const root = ReactDOM.createRoot(rootElement);

// Rendu de l'application
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);