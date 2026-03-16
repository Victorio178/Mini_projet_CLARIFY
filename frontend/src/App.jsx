import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Importation des pages du tunnel principal
import Home from './pages/Home'
import Form from './pages/Form'
import Question from './pages/Question'
import Result from './pages/Result'

// Importation du tunnel post-résultat
import Register from './pages/Register'
import Plans from './pages/Plans'
import ChatGratuit from './pages/ChatGratuit'

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Étape 1 : Le Test */}
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/question" element={<Question />} />
        <Route path="/result" element={<Result />} />

        {/* Étape 2 : L'Engagement */}
        <Route path="/Register" element={<Register />} />
        <Route path="/plans" element={<Plans />} />

        {/* Étape 3 : La Destination */}
        {/* Note : Le mode Premium déclenche une alerte dans Plans.jsx, 
            donc pas besoin de route ChatIA pour l'instant */}
        <Route path="/ChatGratuit" element={<ChatGratuit />} />
      </Routes>
    </div>
  )
}

export default App