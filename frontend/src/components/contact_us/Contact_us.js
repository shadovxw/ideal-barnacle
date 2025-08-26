import React from 'react';
import { motion } from 'framer-motion';
import Header from '../header/Header'; // Keep the header import
import './Contact_us.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      {/* Header at the top */}
      <Header />

      {/* Contact Info Section */}
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Connect With Us
      </motion.h1>
      <motion.p
        className="welcome-message"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
      </motion.p>

      <motion.div
        className="contact-info"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="contact-item">
          <span role="img" aria-label="email">📧</span> 
          <a href="mailto:tarekmou688@gmail.com">vyfoundation@gmail.com</a>
        </div>
        <div className="contact-item">
          <span role="img" aria-label="phone">📞</span> 
          +98989898989
        </div>
        <div className="contact-item">
          <span role="img" aria-label="behance">🎨</span> 
          <a href="https://behance.net/tareqmousselli">Behance Portfolio</a>
        </div>
        <div className="contact-item">
          <span role="img" aria-label="linkedin">🔗</span> 
          <a href="https://linkedin.com/in/tarek-mousselli-86548a238">LinkedIn Profile</a>
        </div>
        <div className="contact-item">
          <span role="img" aria-label="figma">🔗</span> 
          <a href="https://figma.com/@tarekmousselli">Figma Designs</a>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
