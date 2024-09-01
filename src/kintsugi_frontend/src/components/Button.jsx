// ButtonLink.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/button.css';   // Import your CSS file

const Button = ({ to, children, className }) => {
  return (
    <Link to={to} className={`button-link ${className}`}>
      {children}
    </Link>
  );
};

export default Button;
