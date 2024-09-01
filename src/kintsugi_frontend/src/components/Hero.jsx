// components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import '../styles/styles.css';
import '../styles/hero.css';

const HeroSection = () => {
  return (
    <header className="hero" id="home">
      <div className="container">
        <h1>Kintsugi Hub: Empowering Voices, Preserving Dignity</h1>
        <p>We believe you. Your safety and well-being are our top priority. Report with confidence, knowing you're protected every step of the way.</p>
      
         
        <Button  to="/form" className="button-primary">
        Safely Report an Incident
        </Button>
        
      </div>
    </header>
  );
};

export default HeroSection;
