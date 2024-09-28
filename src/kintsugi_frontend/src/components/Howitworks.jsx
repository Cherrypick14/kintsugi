import React from 'react';
import '../styles/howitworks.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser,
  faUserNurse,
  faVenus
} from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

const HowItWorks = () => {
  const iconStyle = { color: 'white' };

  return (
    <section className="section" id="howitworks">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <div className="howitworks-grid">
          
          {/* Report Incident Section */}
          <div className="howitworks-card">
            <FontAwesomeIcon icon={faUser} className="howitworks-icon" style={iconStyle} />
            <h3>Report Incident</h3>
            <p>If you've experienced any form of abuse or violence, you can easily file a report here. Your submission will be securely processed, and only authorized personnel will handle your case, ensuring your anonymity.</p>
            <Button  to="/form" className="button-primary">
            Safely Report an Incident
            </Button>
          </div>
          
          {/* Find Help Section */}
          <div className="howitworks-card">
            <FontAwesomeIcon icon={faUserNurse} className="howitworks-icon" style={iconStyle} />
            <h3>Find Help</h3>
            <p>Access immediate assistance and support. We connect you with professional services, including counseling, legal aid, and emergency response, to help you take the next steps toward safety and recovery.</p>
            <Button  to="/" className="button-primary">
             Get Assistance
            </Button>
          </div>
          
          {/* Support Groups Section */}
          <div className="howitworks-card">
            <FontAwesomeIcon icon={faVenus} className="howitworks-icon" style={iconStyle} />
            <h3>Support Groups</h3>
            <p>Join our community of survivors and allies. We offer peer-led and expert-led support groups where you can share your experiences, find emotional support, and begin your healing journey in a safe, judgment-free environment.</p>
            <Button  to="/groupmanager" className="button-primary">
             Connect
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
