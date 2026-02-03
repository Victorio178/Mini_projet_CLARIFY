import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <Navbar />
      
      <main className="home-main">
        <div className="home-content">
          <h1 className="home-title">Clarify</h1>
          
          <h2 className="home-subtitle">
            Retrouvez de la clarté dans votre quotidien
          </h2>
          
          <p className="home-description">
            Identifiez vos besoins et recevez des recommandations adaptées en 3 minutes.
          </p>
          
          <div className="home-button">
            <Button type="primary" onClick={() => navigate('/form')}>
              Commencer
            </Button>
          </div>
          
          <p className="home-note">
            Gratuit, anonyme et sans inscription
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default Home