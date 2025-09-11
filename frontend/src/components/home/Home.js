
import React, { lazy, Suspense } from "react";
import "./Home.css";
import Header from "../header/Header";
import Footer from "../Footer/Footer";
import MapComponent from "../map/Map";
import Donate from "../donate/Donate";

const ProtectedDonate = lazy(() => import("../context/privateRoute"));

const Home = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="page-container">
      <Header />

      <main className="main-content">
        <div className="image-container">
          <img src="photo1.jpg" alt="Charity Image" className="charity-image" />
          <div className="overlay-text">
            <h2 className="hero-title">BECOME PART OF IMPACT WE ARE MAKING</h2>
            <button
              className="image-button"
              onClick={() => scrollToSection("donate-section-abcd")}
            >
              Get Involved
            </button>
          </div>
        </div>

        <div className="home-content">
          <section id="welcome-section" className="welcome-section">
            <h1 className="welcome-title">Welcome to Our Charity</h1>
            <p className="welcome-text">
              We are dedicated to making the world a better place through our community-driven efforts.
              Join us in our mission to help those in need and make a lasting impact.
            </p>
          </section>

          <section className="mission-section">
            <h2 className="mission-title">Our Mission</h2>
            <p className="mission-text">
              Our mission is to provide essential resources such as food, shelter, and education to
              underprivileged communities. With your help, we can create sustainable solutions that uplift lives.
            </p>
          </section>

          <section className="highlights-section">
            <div className="highlight">
              <h3 className="highlight-title">Upcoming Events</h3>
              <p className="highlight-text">Join our upcoming charity drives and community events. Every little effort counts!</p>
            </div>
            <div className="highlight">
              <h3 className="highlight-title">Support Our Campaigns</h3>
              <p className="highlight-text">Support one of our ongoing campaigns and help provide for those in need.</p>
            </div>
            <div className="highlight">
              <h3 className="highlight-title">Donate Today</h3>
              <p className="highlight-text">Make a difference by donating to our cause. Your contribution can change lives.</p>
            </div>
          </section>
        </div>

        <div className="home-content">
          <div id="donate-section-abcd">
            <Suspense fallback={<div>Please log in and verify your email to make a donation...</div>}>
            <ProtectedDonate roles={["user", "admin"]}>
              <Donate />
            </ProtectedDonate>           
            </Suspense>

          </div>
        </div>

        <div className="map-container">
          <MapComponent />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
