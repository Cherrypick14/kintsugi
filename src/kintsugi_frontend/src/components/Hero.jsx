// components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import '../styles/styles.css';
import '../styles/hero.css';

const HeroSection = () => {
  return (
    <header className="hero" id="home">
      <div className="container1">
        <h1>Kintsugi Hub: Empowering Voices,<br /> Preserving Dignity</h1>
        <p>We believe you. Your safety and well-being are our top priority.<br></br> Report with confidence, knowing you're protected every step of the way.</p>
      
        <div className="button-container">
            <Button to="/learn" className="button-primary">
              Learn More About Your Rights
            </Button>
            <Button to="/donate" className="button-donate">
              Donate
          </Button>
      </div>
        
      </div>
    </header>
  );
};

export default HeroSection;
