// CTAButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CTAButton.css';

function CTAButton({ children, active, linkto }) {
  return(
    <Link to={linkto} className={`cta-btn ${active ? 'active' : ''}`}>
      {children}
    </Link>
  );
}

export default CTAButton;
