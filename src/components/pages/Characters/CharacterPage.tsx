import React from "react";

const CharacterPage: React.FC = () => {
  return (
    <div className="naruto-char-page">
      <header>
        <div className="image-header">
          <img
            src="/images/characters/naruto-uzumaki.jpg"
            alt="Naruto Uzumaki"
            className="content-header-image"
          />
          <div className="content-category-badge">Character</div>
        </div>
        <input
          type="search"
          id="site-search-bar"
          aria-label="Search Site"
          placeholder="Search for Characters, Universes, etc."
        />
        <button className="wiki-edit-button" id="page-edit-button">
          Edit Page
        </button>
      </header>

      <main id="main-content">
        <hr />
        {/* Overview Section */}

        <div className="char-image">
          <img
            src="/images/characters/naruto-uzumaki.jpg"
            aria-label="Naruto Uzumaki Image"
            alt="Naruto Uzumaki"
          />
        </div>

        {/* Alternate Forms Navigation */}
        <nav
          className="alternate-forms-nav"
          aria-label="Alternate Forms"
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            margin: "1rem 0",
          }}
        >
          <button className="alt-form-btn selected" aria-current="true">
            Kid Naruto
          </button>
          <button className="alt-form-btn">Shippuden Naruto</button>
          <button className="alt-form-btn">Adult Naruto</button>
          <button className="alt-form-btn">Kurama Mode</button>
        </nav>

        <div className="two-column-grid">
          <div className="grid-card">
            <h2>Naruto Uzumaki</h2>
            <p>
              <strong>Age:</strong> 12–13 (Part I), 15–17 (Shippuden), Adult
              (Boruto)
            </p>
            <p>
              <strong>Show(s):</strong> Naruto, Naruto Shippuden, Boruto: Naruto
              Next Generations
            </p>
            <p>
              <strong>Height:</strong> 145.3–147.5 cm (Part I), 166 cm
              (Shippuden), 180 cm (Adult)
            </p>
            <p>
              <strong>Weight:</strong> 40.1–40.6 kg (Part I), 50.9 kg
              (Shippuden), 66 kg (Adult)
            </p>

            <h2>Powers & Abilities</h2>
            <p>
              <strong>Shadow Clone Jutsu</strong>
            </p>
            <p>
              <strong>Rasengan</strong>
            </p>
            <p>
              <strong>Sage Mode</strong>
            </p>
            <p>
              <strong>Kurama Chakra Mode</strong>
            </p>
          </div>

          <div className="grid-card">
            <h3>Personality</h3>
            <p>
              Naruto is energetic, optimistic, and fiercely determined. He never
              gives up on his goals or friends, no matter the odds.
            </p>
            <p>Key personality traits include:</p>
            <p>Unyielding determination</p>
            <p>Loyalty</p>
            <p>Compassion</p>
            <p>Mischievousness</p>
          </div>
        </div>

        <hr />

        <section className="section-content">
          <h2> Show Guides</h2>
          <p>
            {" "}
            Here the community can put the most used and up to date guides on
            how to watch the shows
          </p>

          <p> idk any guides or links to them lol but they go here </p>
        </section>

        <hr />

        {/* Abilities Section */}
        <section id="abilities" className="section-content">
          <h2>Powers & Abilities</h2>
          <p>
            <strong>Shadow Clone Jutsu:</strong> Naruto can create hundreds of
            physical copies of himself for combat and strategy.
          </p>
          <p>
            <strong>Rasengan:</strong> A powerful spinning sphere of chakra
            developed by the Fourth Hokage, mastered and enhanced by Naruto.
          </p>
          <p>
            <strong>Sage Mode:</strong> Allows Naruto to sense chakra and
            greatly enhances his strength, speed, and durability.
          </p>
          <p>
            <strong>Kurama Chakra Mode:</strong> Naruto can access the chakra of
            the Nine-Tails, Kurama, granting immense power and healing.
          </p>
          <h2>Special Skills</h2>
          <p>Other notable skills and talents:</p>
          <ul>
            <li>
              <strong>Exceptional Stamina</strong> - Can fight for extended
              periods without tiring.
            </li>
            <li>
              <strong>Inspirational Leader</strong> - Inspires allies and unites
              people, even former enemies.
            </li>
            <li>
              <strong>Transformation Jutsu</strong> - Skilled in comedic and
              practical transformation techniques.
            </li>
          </ul>
        </section>
        <hr />
        {/* Relationships Section */}
        <section id="relationships" className="section-content">
          <h2>Family</h2>
          <p>
            <strong>Minato Namikaze</strong> (Father, Fourth Hokage)
          </p>
          <p>
            <strong>Kushina Uzumaki</strong> (Mother)
          </p>
          <p>
            <strong>Hinata Hyuga</strong> (Wife)
          </p>
          <p>
            <strong>Boruto Uzumaki</strong> (Son)
          </p>
          <p>
            <strong>Himawari Uzumaki</strong> (Daughter)
          </p>

          <h2>Friends & Allies</h2>
          <ul>
            <li>
              <strong>Sasuke Uchiha</strong> - Rival and close friend
            </li>
            <li>
              <strong>Sakura Haruno</strong> - Teammate and friend
            </li>
            <li>
              <strong>Kakashi Hatake</strong> - Mentor and teacher
            </li>
            <li>
              <strong>Jiraiya</strong> - Godfather and mentor
            </li>
            <li>
              <strong>Iruka Umino</strong> - First teacher and father figure
            </li>
            <li>
              <strong>Shikamaru Nara</strong> - Trusted advisor and friend
            </li>
          </ul>
          <h2>Rivals & Enemies</h2>
          <ul>
            <li>
              <strong>Sasuke Uchiha</strong> - Rival throughout childhood and
              adolescence
            </li>
            <li>
              <strong>Orochimaru</strong> - Major antagonist
            </li>
            <li>
              <strong>Pain (Nagato)</strong> - Leader of Akatsuki, fought Naruto
              in a pivotal battle
            </li>
            <li>
              <strong>Kaguya Otsutsuki</strong> - Final enemy of the Fourth
              Great Ninja War
            </li>
          </ul>
        </section>
        <hr />
        {/* Gallery Section */}
        <section id="gallery" className="section-content">
          <h2>Character Gallery</h2>
          <p>Add images of the character here.</p>
          <p>
            <em>
              Gallery functionality would be implemented in a real application.
            </em>
          </p>
        </section>
        <hr />

        {/* Contributor Footer */}
        <footer className="section-content">
          <img src="/images/users/editor-placeholder.jpg" alt="Last Editor" />
          <span>
            Last edited by <a href="/profile/editor">Last Editor Name</a> on
            2025-01-02
          </span>
          <a href="#page-history">View Page History</a>
        </footer>
      </main>
    </div>
  );
};

export default CharacterPage;
