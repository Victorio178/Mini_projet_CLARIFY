import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './ChatGratuit.css';

const FIRST_MESSAGE = "Bonjour ! 👋 Je suis l'assistant Clarify. Je suis là pour vous aider à mieux comprendre votre bien-être.\n\nCette fonctionnalité est en cours de développement et sera disponible très prochainement. Merci pour votre patience ! 🙏";

const WAITING_REPLIES = [
  "Merci pour votre message. Cette fonctionnalité est encore en cours de développement. Elle sera disponible très bientôt ! 🚀",
  "Je vous entends ! Le chat complet arrive prochainement. Restez connecté(e) pour la mise à jour. 😊",
  "Votre message est bien reçu. Notre équipe travaille activement sur cette fonctionnalité. À très vite ! ✨",
];

let replyIndex = 0;

const ChatGratuit = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('welcome');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [displayName, setDisplayName] = useState(''); // Changé pour plus de clarté
  const bottomRef = useRef(null);

  useEffect(() => {
    // 1. PRIORITÉ ABSOLUE : Le nom saisi lors de l'inscription (Nom Complet)
    const nomInscription = localStorage.getItem('nom'); 
    
    // 2. SECOURS : Le pseudo de l'analyse ou du quiz
    const results = JSON.parse(localStorage.getItem('userResults'));
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    const pseudoAnalyse = results?.pseudo || profile?.pseudo;

    // On définit le nom qui sera affiché dans le <h1>
    const finalName = nomInscription || pseudoAnalyse || 'Ami(e)';
    
    setDisplayName(finalName);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const startChat = () => {
    setPhase('chat');
    setIsTyping(true);
    setTimeout(() => {
      setMessages([{ role: 'bot', text: FIRST_MESSAGE }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const userMsg = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = WAITING_REPLIES[replyIndex % WAITING_REPLIES.length];
      replyIndex++;
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-page">
      <Navbar />

      {phase === 'welcome' && (
        <div className="welcome-screen">
          <div className="welcome-card">
            <div className="welcome-avatar">💬</div>
            <div className="welcome-badge">Chat Gratuit</div>
            
            {/* Ici on utilise displayName qui contient le nom de l'inscription */}
            <h1>Bonjour {displayName} 👋</h1>
            
            <p>Votre espace d'écoute personnel est prêt. Notre assistant est disponible pour vous accompagner et vous aider à mieux comprendre votre bien-être.</p>

            <div className="welcome-rules">
              <div className="rule"><span className="rule-icon">🔒</span><span>Conversation confidentielle</span></div>
              <div className="rule"><span className="rule-icon">🤖</span><span>Assistant IA bienveillant</span></div>
              <div className="rule"><span className="rule-icon">⚠️</span><span>Ne remplace pas un professionnel</span></div>
            </div>

            <button className="start-chat-btn" onClick={startChat}>
              Je suis prêt(e) à commencer →
            </button>
          </div>
        </div>
      )}

      {phase === 'chat' && (
        <div className="chat-wrapper">
          <div className="chat-container">
            <div className="chat-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="status-dot"></div>
                <div>
                  <div className="chat-title">Assistant Clarify</div>
                  <div className="chat-subtitle">En ligne · Mise à jour prochaine</div>
                </div>
              </div>
              
              <button className="view-result-btn" onClick={() => navigate('/result')}>
                <span style={{ marginRight: '6px' }}>📊</span> Mon Bilan
              </button>
            </div>

            <div className="chat-box">
              {messages.map((msg, i) => (
                <div key={i} className={`msg-wrapper ${msg.role}`}>
                  {msg.role === 'bot' && <div className="bot-avatar">◈</div>}
                  <div className={`msg-bubble ${msg.role}`}>
                    {msg.text.split('\n').map((line, j) => (
                      <span key={j}>{line}{j < msg.text.split('\n').length - 1 && <br/>}</span>
                    ))}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="msg-wrapper bot">
                  <div className="bot-avatar">◈</div>
                  <div className="typing-indicator"><span></span><span></span><span></span></div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                placeholder="Écrivez votre message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={isTyping}
              />
              <button className="send-btn" onClick={handleSend} disabled={isTyping}>↑</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatGratuit;