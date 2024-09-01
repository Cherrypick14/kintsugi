import React from 'react';
import '../styles/styles.css';
import '../styles/features.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserSecret, 
  faShieldAlt, 
  faHeadset, 
  faHandsHelping, 
  faChartLine, 
  faGlobe 
} from '@fortawesome/free-solid-svg-icons';

const FeaturesSection = () => {
  const iconStyle = { color: 'purple' };

  return (
    <section className="section" id="features">
      <div className="container">
        <h2 className="section-title">How We Keep You Safe</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <FontAwesomeIcon icon={faUserSecret} className="feature-icon" style={iconStyle} />
            <h3>100% Anonymous Reporting</h3>
            <p>Your identity is completely protected. Report without fear, knowing your privacy is our utmost concern.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faShieldAlt} className="feature-icon" style={iconStyle} />
            <h3>Advanced Encryption</h3>
            <p>State-of-the-art blockchain technology ensures your data remains secure and tamper-proof.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faHeadset} className="feature-icon" style={iconStyle} />
            <h3>24/7 Support &amp; Counseling</h3>
            <p>Our trained professionals are here for you around the clock, providing emotional support and guidance.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faHandsHelping} className="feature-icon" style={iconStyle} />
            <h3>Comprehensive Resources</h3>
            <p>Access a wide range of support services, from legal aid to safe shelters, all in one place.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faChartLine} className="feature-icon" style={iconStyle} />
            <h3>Transparent Case Tracking</h3>
            <p>Stay informed about your case progress with our secure, anonymous tracking system.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faGlobe} className="feature-icon" style={iconStyle} />
            <h3>Multilingual Platform</h3>
            <p>Break language barriers with our platform available in multiple languages, ensuring help for all.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;