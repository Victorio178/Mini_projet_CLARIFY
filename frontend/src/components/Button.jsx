import React from 'react'
import './Button.css'

const Button = ({ children, type = 'primary', onClick, disabled = false }) => {
  const buttonClass = `btn btn-${type} ${disabled ? 'disabled' : ''}`
  
  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button