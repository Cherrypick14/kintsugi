import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faAward, faUsers } from '@fortawesome/free-solid-svg-icons';
import '../styles/styles.css';
import '../styles/trust.css';

const TrustSection = () => {
  return (
    <section className="section" id="trust">
      <div className="container">
        <h2 className="section-title">Why You Can Trust Us</h2>
        <div className="trust-grid">
          <div className="trust-item">
            <FontAwesomeIcon icon={faLock} style={{color:'purple'}}/>
            <h3>Data Protection Certified</h3>
            <p>Your information is safeguarded by international data protection standards.</p>
          </div>
          <div className="trust-item">
            <FontAwesomeIcon icon={faAward} style={{color:'purple'}}/>
            <h3>Recognized by WHO</h3>
            <p>Our platform is acknowledged by the World Health Organization for its effectiveness.</p>
          </div>
          <div className="trust-item">
            <FontAwesomeIcon icon={faUsers} style={{color:'purple'}}/>
            <h3>Community Trusted</h3>
            <p>Join thousands who have found safety and support through our platform.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;