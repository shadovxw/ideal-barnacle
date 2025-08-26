import React, { useState } from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8080/";


const Footer = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [emaildata, setemaildata] = useState({
    emailid:""
  })

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
        console.error("Error submitting form:", error.response.data); // Log the error response
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
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            We are committed to supporting communities in need through our charity programs. 
            Join us in making a difference by contributing to our cause.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/events">Events</a></li>
            <li><a href="/donate">Donate</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-icons">
            <a 
              href="mailto:support@charity.org" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={() => handleMouseEnter('email')}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
              {hoveredItem === 'email' && <span className="hover-text">Email Us</span>}
            </a>
            <a 
              href="tel:+1234567890" 
              onMouseEnter={() => handleMouseEnter('phone')}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faPhone} size="2x" />
              {hoveredItem === 'phone' && <span className="hover-text">Call Us</span>}
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={() => handleMouseEnter('facebook')}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faFacebook} size="2x" />
              {hoveredItem === 'facebook' && <span className="hover-text">Facebook</span>}
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={() => handleMouseEnter('twitter')}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faTwitter} size="2x" />
              {hoveredItem === 'twitter' && <span className="hover-text">Twitter</span>}
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              onMouseEnter={() => handleMouseEnter('instagram')}
              onMouseLeave={handleMouseLeave}
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
              {hoveredItem === 'instagram' && <span className="hover-text">Instagram</span>}
            </a>
          </div>
        </div>

        <div className="footer-section subscribe-section">
          <h1>SUBSCRIBE TO GET LATEST NEWS AND UPDATES </h1>
          <form className="subscribe-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              id="email"
              placeholder="Your email address" 
              required 
              value = {emaildata.emailid}
              onChange={handleEmailChange}
            />
            <button type="submit" className="subscribe-button">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Charity Organization. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
