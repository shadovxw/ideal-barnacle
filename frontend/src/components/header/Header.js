import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header-container">
      <div className="logo-container">
        <h1 className="logo-text">VY FOUNDATION</h1>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="nav-container">
        <ul className="nav-list">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/campaign" className="nav-link">Events</Link></li>
          <li><Link to="/donatelist" className="nav-link">Donation</Link></li>
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <h2 className="mobile-nav-title">VY FOUNDATION</h2>
        </div>
        <ul className="mobile-nav-list">
          <li><Link to="/" className="mobile-nav-link" onClick={closeMenu}>
            <span className="nav-icon">🏠</span>
            Home
          </Link></li>
          <li><Link to="/campaign" className="mobile-nav-link" onClick={closeMenu}>
            <span className="nav-icon">📅</span>
            Events
          </Link></li>
          <li><Link to="/donatelist" className="mobile-nav-link" onClick={closeMenu}>
            <span className="nav-icon">💝</span>
            Donation
          </Link></li>
        </ul>
      </nav>

      {/* Mobile Overlay */}
      {isMenuOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Header;