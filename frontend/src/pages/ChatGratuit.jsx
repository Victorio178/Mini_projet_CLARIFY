import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import './ChatGratuit.css';

const ChatGratuit = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("Utilisateur");
  const scrollRef = useRef();

  // Charger le nom de l'utilisateur au démarrage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userResults'));
    if (data && data.pseudo) setUserName(data.pseudo);
    
    // Message de bienvenue automatique
    setMessages([
      { role: 'bot', text: `Bonjour ${data?.pseudo || ''}, bienvenue sur Clarify Gratuit !` }
    ]);
  }, []);

  // Auto-scroll vers le bas à chaque nouveau message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Ajouter le message de l'utilisateur
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");

    // 2. Réponse automatique du Bot après un court délai
    setTimeout(() => {
      let botResponse = "";
      if (currentInput.toLowerCase().includes("bonjour") || currentInput.toLowerCase().includes("salut")) {
        botResponse = `Bonjour ${userName}, je peux vous aider, mais pour une analyse complète, il faudra attendre la prochaine mise à jour !`;
      } else {
        botResponse = "C'est noté. Je traite votre demande, mais ce module est encore en construction.";
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 1000);
  };

  return (
    <div className="chat-page">
      <Navbar />
      <div className="chat-wrapper">
        <div className="chat-container">
          <div className="chat-header">
            <div className="status-dot"></div>
            Assistant Clarify (Gratuit)
          </div>
          
          <div className="chat-box">
            {messages.map((m, i) => (
              <div key={i} className={`msg-wrapper ${m.role}`}>
                <div className={`msg-bubble ${m.role}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Écrivez votre message..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="send-btn">Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatGratuit;