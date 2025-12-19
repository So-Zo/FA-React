import React from "react";
import "../../../FaShared/Css/sections.css";
import "../../../FaShared/Css/themes.css";

const ContributePage: React.FC = () => {
  return (
    <div className="page-container">
      <section className="content-section">
        <div className="section-header">
          <h1 style={{ color: "var(--text-primary)" }}>
            Contribute to FanArcs
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Help us build the ultimate fan database and community platform
          </p>
        </div>

        <div className="content-grid">
          <div
            className="contribution-card"
            style={{
              backgroundColor: "var(--surface-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--spacing-lg)",
              marginBottom: "var(--spacing-md)",
            }}
          >
            <h2
              style={{
                color: "var(--fanarc-primary-color)",
                marginBottom: "var(--spacing-sm)",
              }}
            >
              Content Creation
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: "var(--spacing-md)",
              }}
            >
              Add new pages, edit existing content, and help expand our wiki
              with accurate information about anime, manga, comics, TV shows,
              and video games.
            </p>
            <ul style={{ color: "var(--text-muted)" }}>
              <li>Create character profiles and detailed descriptions</li>
              <li>Add episode guides and story summaries</li>
              <li>Upload and organize media content</li>
              <li>Fact-check and improve existing pages</li>
            </ul>
          </div>

          <div
            className="contribution-card"
            style={{
              backgroundColor: "var(--surface-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--spacing-lg)",
              marginBottom: "var(--spacing-md)",
            }}
          >
            <h2
              style={{
                color: "var(--fanarc-primary-color)",
                marginBottom: "var(--spacing-sm)",
              }}
            >
              Community Moderation
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: "var(--spacing-md)",
              }}
            >
              Help maintain quality standards and create a welcoming environment
              for all fans.
            </p>
            <ul style={{ color: "var(--text-muted)" }}>
              <li>Review user submissions and edits</li>
              <li>Moderate discussions and comments</li>
              <li>Help resolve content disputes</li>
              <li>Welcome and guide new contributors</li>
            </ul>
          </div>

          <div
            className="contribution-card"
            style={{
              backgroundColor: "var(--surface-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-lg)",
              padding: "var(--spacing-lg)",
              marginBottom: "var(--spacing-md)",
            }}
          >
            <h2
              style={{
                color: "var(--fanarc-primary-color)",
                marginBottom: "var(--spacing-sm)",
              }}
            >
              Technical Contributions
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: "var(--spacing-md)",
              }}
            >
              Help improve the platform with your technical skills and
              expertise.
            </p>
            <ul style={{ color: "var(--text-muted)" }}>
              <li>Report bugs and technical issues</li>
              <li>Suggest new features and improvements</li>
              <li>Contribute to open source development</li>
              <li>Help with testing and quality assurance</li>
            </ul>
          </div>
        </div>

        <div
          className="getting-started"
          style={{
            backgroundColor: "var(--surface-primary)",
            border: "2px solid var(--accent-color)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--spacing-xl)",
            marginTop: "var(--spacing-xl)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "var(--fanarc-primary-color)",
              marginBottom: "var(--spacing-md)",
            }}
          >
            Getting Started
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: "var(--spacing-lg)",
            }}
          >
            Ready to contribute? Here's how to begin your journey with the
            FanArcs community.
          </p>

          <div
            style={{
              display: "flex",
              gap: "var(--spacing-md)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                backgroundColor: "var(--accent-color)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-lg)",
                padding: "var(--spacing-md) var(--spacing-lg)",
                cursor: "pointer",
                transition: "var(--transition-base)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent-color)")
              }
            >
              Join Our Discord
            </button>
            <button
              style={{
                backgroundColor: "transparent",
                color: "var(--accent-color)",
                border: "2px solid var(--accent-color)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--spacing-md) var(--spacing-lg)",
                cursor: "pointer",
                transition: "var(--transition-base)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--accent-color)";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--accent-color)";
              }}
            >
              Read Guidelines
            </button>
          </div>
        </div>

        <div
          className="contact-info"
          style={{
            backgroundColor: "var(--surface-secondary)",
            borderRadius: "var(--radius-lg)",
            padding: "var(--spacing-lg)",
            marginTop: "var(--spacing-lg)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "var(--font-size-sm)",
            }}
          >
            Questions about contributing? Contact us at{" "}
            <span style={{ color: "var(--accent-color)" }}>
              contribute@fanarcs.com
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContributePage;
