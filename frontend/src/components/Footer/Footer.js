import React, { useState } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000/";

const Footer = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [emaildata, setemaildata] = useState({
    emailid: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting email:', emaildata); 
    try {
      const response = await axios.post("/createsubcription", emaildata);
      console.log('Response:', response.data);
      if (response.data.success) {
        alert(response.data.message);
        setemaildata({ emailid: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
    }
  };

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleEmailChange = (e) => {
    setemaildata({ emailid: e.target.value }); 
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about-section">
          <h4 className="section-title">About Us</h4>
          <p className="section-text">
            We are committed to supporting communities in need through our charity programs. 
            Join us in making a difference by contributing to our cause.
          </p>
        </div>

        <div className="footer-section links-section">
          <h4 className="section-title">Quick Links</h4>
          <ul className="links-list">
            <li><a href="/events" className="footer-link">Events</a></li>
            <li><a href="/donate" className="footer-link">Donate</a></li>
            <li><a href="/contact" className="footer-link">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section contact-section">
          <h4 className="section-title">Contact Us</h4>
          <div className="contact-icons">
            <a 
              href="mailto:sir.dazai02@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
              onMouseEnter={() => handleMouseEnter('email')}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              {hoveredItem === 'email' && <span className="hover-text">Email Us</span>}
            </a>
            <a 
              href="tel:+1234567890" 
              className="contact-link"
              onMouseEnter={() => handleMouseEnter('phone')}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              {hoveredItem === 'phone' && <span className="hover-text">Call Us</span>}
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
              onMouseEnter={() => handleMouseEnter('facebook')}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faFacebook} className="contact-icon" />
              {hoveredItem === 'facebook' && <span className="hover-text">Facebook</span>}
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
              onMouseEnter={() => handleMouseEnter('twitter')}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faTwitter} className="contact-icon" />
              {hoveredItem === 'twitter' && <span className="hover-text">Twitter</span>}
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
              onMouseEnter={() => handleMouseEnter('instagram')}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faInstagram} className="contact-icon" />
              {hoveredItem === 'instagram' && <span className="hover-text">Instagram</span>}
            </a>
          </div>
        </div>

        <div className="footer-section subscribe-section">
          <h1 className="subscribe-title">SUBSCRIBE TO GET LATEST NEWS AND UPDATES</h1>
          <form className="subscribe-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              id="email"
              className="email-input"
              placeholder="Your email address" 
              required 
              value={emaildata.emailid}
              onChange={handleEmailChange}
            />
            <button type="submit" className="subscribe-button">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright-text">© 2024 Charity Organization. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;