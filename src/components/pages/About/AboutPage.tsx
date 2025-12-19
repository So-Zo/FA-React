import React from "react";
import { FaInfoCircle, FaUsers, FaCode, FaGlobe } from "react-icons/fa";
import "../../../FaShared/Css/sections.css";
import "../../../FaShared/Css/themes.css";

const AboutPage: React.FC = () => {
  return (
    <div className="page-container">
      <div
        className="about-page"
        style={{
          padding: "var(--spacing-xl)",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <header
          style={{
            textAlign: "center",
            marginBottom: "calc(var(--spacing-xl) * 1.5)",
          }}
        >
          <div
            style={{
              fontSize: "4rem",
              color: "var(--fanarc-primary-color)",
              marginBottom: "var(--spacing-md)",
            }}
          >
            <FaInfoCircle />
          </div>
          <h1 style={{ color: "var(--text-primary)" }}>About FanArcs</h1>
          <p
            style={{
              fontSize: "var(--font-size-lg)",
              color: "var(--text-secondary)",
            }}
          >
            The ultimate platform for exploring fictional universes and
            character lore
          </p>
        </header>

        <main>
          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ color: "var(--fanarc-primary-color)" }}>
              Our Mission
            </h2>
            <p style={{ color: "var(--text-primary)" }}>
              FanArcs is designed to be the comprehensive hub for exploring and
              discussing fictional characters, worlds, and universes across all
              forms of media. From anime and manga to comics, TV shows, video
              games, and beyond - we're building the definitive resource for
              character lore and universe exploration.
            </p>
          </section>

          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ color: "var(--fanarc-primary-color)" }}>
              Key Features
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "var(--spacing-lg)",
                margin: "var(--spacing-lg) 0",
              }}
            >
              <div
                style={{
                  padding: "var(--spacing-lg)",
                  backgroundColor: "var(--surface-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-lg)",
                  transition: "var(--transition-base)",
                }}
              >
                <h3 style={{ color: "var(--fanarc-primary-color)" }}>
                  <FaUsers style={{ marginRight: "var(--spacing-sm)" }} />
                  Community Hub
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Connect with fellow fans, share theories, and discuss your
                  favorite characters and worlds.
                </p>
              </div>
              <div
                style={{
                  padding: "var(--spacing-lg)",
                  backgroundColor: "var(--surface-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-lg)",
                  transition: "var(--transition-base)",
                }}
              >
                <h3 style={{ color: "var(--fanarc-primary-color)" }}>
                  <FaCode style={{ marginRight: "var(--spacing-sm)" }} />
                  Power Room
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Compare characters side-by-side with detailed breakdowns of
                  abilities, timelines, and feats.
                </p>
              </div>
              <div
                style={{
                  padding: "var(--spacing-lg)",
                  backgroundColor: "var(--surface-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-lg)",
                  transition: "var(--transition-base)",
                }}
              >
                <h3 style={{ color: "var(--fanarc-primary-color)" }}>
                  <FaGlobe style={{ marginRight: "var(--spacing-sm)" }} />
                  Wiki System
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Collaborative wiki pages for characters, worlds, and series
                  with contribution tracking.
                </p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: "var(--spacing-xl)" }}>
            <h2 style={{ color: "var(--fanarc-primary-color)" }}>
              Current Status
            </h2>
            <p style={{ color: "var(--text-primary)" }}>
              FanArcs is currently in active development. We're building core
              features and expanding our database of characters and universes.
              This is a community-driven platform, and we welcome contributions
              from fans who want to help build the ultimate fictional character
              resource.
            </p>
          </section>

          <section>
            <h2 style={{ color: "var(--fanarc-primary-color)" }}>
              Get Involved
            </h2>
            <p style={{ color: "var(--text-primary)" }}>
              Want to contribute? Check out our{" "}
              <a
                href="/contribute"
                style={{
                  color: "var(--accent-color)",
                  textDecoration: "none",
                  transition: "var(--transition-base)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent-hover)";
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--accent-color)";
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
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
