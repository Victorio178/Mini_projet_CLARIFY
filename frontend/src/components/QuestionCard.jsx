import React from 'react'
import './QuestionCard.css'

const QuestionCard = ({ question, options, selectedAnswer, onSelect }) => {
  return (
    <div className="question-card">
      <h3 className="question-text">{question}</h3>
      
      <div className="options-list">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-item ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => onSelect(index)}
          >
            <div className="option-letter">
              {String.fromCharCode(65 + index)} {/* A, B, C, D */}
            </div>
            <span className="option-content">{option}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuestionCard