import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import Header from '../header/Header';
import Footer from '../Footer/Footer';
import MapComponent from '../map/Map';
import Donate from '../donate/Donate';


const Home = () => {
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page-container">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
        <Header />
      </motion.div>
      <main className="main-content">
        <motion.div className="image-container" initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }}>
          <img src="photo1.jpg" alt="Charity Image" className="charity-image" />
          <div className="overlay-text">
            <h2>BECOME PART OF IMPACT WE ARE MAKING</h2>
            <motion.button
              className="image-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => scrollToSection('donate-section-abcd')}
            >
              Get Involved
            </motion.button>
          </div>
        </motion.div>
        <div className="home-content">
          <motion.section id="welcome-section" className="welcome-section" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1>Welcome to Our Charity</h1>
            <p>
              We are dedicated to making the world a better place through our community-driven efforts. Join us in our mission to help those in need and make a lasting impact.
            </p>
          </motion.section>
          <motion.section className="mission-section" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <h2>Our Mission</h2>
            <p>
              Our mission is to provide essential resources such as food, shelter, and education to underprivileged communities. With your help, we can create sustainable solutions that uplift lives.
            </p>
          </motion.section>
          <motion.section className="highlights-section" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } } }}>
            <motion.div className="highlight" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <h3>Upcoming Events</h3>
              <p>Join our upcoming charity drives and community events. Every little effort counts!</p>
            </motion.div>
            <motion.div className="highlight" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <h3>Support Our Campaigns</h3>
              <p>Support one of our ongoing campaigns and help provide for those in need.</p>
            </motion.div>
            <motion.div className="highlight" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <h3>Donate Today</h3>
              <p>Make a difference by donating to our cause. Your contribution can change lives.</p>
            </motion.div>
          </motion.section>
        </div>
        <div className="home-content">

        <Donate id="donate-section-abcd" /></div>

        <motion.div className="map-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <MapComponent />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;