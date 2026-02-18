import React from "react";
import { FaInfoCircle, FaUsers, FaCode, FaGlobe } from "react-icons/fa";

const AboutPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="about-page">
        <header className="about-header">
          <div className="about-icon">
            <FaInfoCircle />
          </div>
          <h1 className="about-title">About FanArcs</h1>
          <p className="about-subtitle">
            The ultimate platform for exploring fictional universes and
            character lore
          </p>
        </header>

        <main>
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              FanArcs is designed to be the comprehensive hub for exploring and
              discussing fictional characters, worlds, and universes across all
              forms of media. From anime and manga to comics, TV shows, video
              games, and beyond - we're building the definitive resource for
              character lore and universe exploration.
            </p>
          </section>

          <section className="about-section">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>
                  <FaUsers className="feature-icon" />
                  Community Hub
                </h3>
                <p>
                  Connect with fellow fans, share theories, and discuss your
                  favorite characters and worlds.
                </p>
              </div>
              <div className="feature-card">
                <h3>
                  <FaCode className="feature-icon" />
                  Power Room
                </h3>
                <p>
                  Compare characters side-by-side with detailed breakdowns of
                  abilities, timelines, and feats.
                </p>
              </div>
              <div className="feature-card">
                <h3>
                  <FaGlobe className="feature-icon" />
                  Wiki System
                </h3>
                <p>
                  Collaborative wiki pages for characters, worlds, and series
                  with contribution tracking.
                </p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Current Status</h2>
            <p>
              FanArcs is currently in active development. We're building core
              features and expanding our database of characters and universes.
              This is a community-driven platform, and we welcome contributions
              from fans who want to help build the ultimate fictional character
              resource.
            </p>
          </section>

          <section className="about-section">
            <h2>Get Involved</h2>
            <p>
              Want to contribute? Check out our{" "}
              <a href="/contribute" className="about-link">
                Contribution Guide
              </a>{" "}
              to learn how you can help expand our character database, write
              wiki entries, or contribute to the platform's development.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AboutPage;
