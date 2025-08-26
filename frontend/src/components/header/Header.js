import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'; 


const Header = () => {


  return (
    <header className="header-container">
      <div className="logo-container">
        <img src="logo2.png" alt="Website Logo" className="logo" />
      </div>
      <nav className="nav-container">
        <ul className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/campaign">Events</Link></li>
          <li><Link to="/donatelist">Donation</Link></li>
        </ul>
      </nav>
      

    </header>
  );
};

export default Header;
