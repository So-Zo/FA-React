import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/VideoGamesPage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';

const VideoGamesHistory: React.FC = () => {
  return (
    <div className="video-games-page video-games-history-page">
      <header>
        <div className="image-header">
          <img src="/images/video-games/VideoGamesHistoryHeader.jpg" alt="History of Video Games" />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search From Video Games Page"
          placeholder="Search for Characters, Universes, etc."
        />

        <button className="wiki-edit-button" id="page-edit-button">Edit Page</button>
      </header>

      <main id="main-content">
        <section className="content-header">
          <h1 className="content-title">History of Video Games</h1>
          <p className="content-meta">A comprehensive exploration of video games' evolution through the decades</p>
        </section>

        {/* 1. Intro Overview */}
        <section className="section-content" id="intro-overview">
          <h2>Introduction to Video Games History</h2>

          <h3>What is this page?</h3>
          <p>
            This page offers a comprehensive overview of video games' historical development, from their earliest
            technological beginnings to the current era. We explore the key innovations, creators, technological advances,
            and cultural shifts that have shaped this interactive medium into a global entertainment phenomenon.
          </p>

          <p>
            Video games have evolved from simple electronic experiments in research labs to one of the world's largest
            entertainment industries, influencing not just how we play but also how we tell stories, socialize, and even
            how we learn. This history traces that remarkable journey.
          </p>

          <h3>What this page doesn't try to do</h3>
          <p>
            This page doesn't attempt to catalog every video game ever created or provide exhaustive details about each
            historical period. It doesn't focus exclusively on any single platform or genre. Instead, it aims to provide
            a balanced overview of video games' development, highlighting key developments, influential works, and major
            shifts in the medium's evolution. For more detailed information about specific eras, creators, or works,
            please explore the linked resources and dedicated pages throughout the site.
          </p>
        </section>

        {/* 2. Timeline Breakdown */}
        <section className="section-content" id="timeline-breakdown">
          <h2>Timeline Breakdown</h2>

          <div className="timeline-container">
            <div className="timeline-item">
              <div className="timeline-date">1950s-1960s</div>
              <div className="timeline-content">
                <h3>Early Beginnings</h3>
                <p>
                  The earliest video games emerged from academic and research settings, where scientists and engineers
                  experimented with interactive electronic entertainment on the primitive computers of the day.
                </p>
                <p>
                  <strong>Key Developments:</strong>
                </p>
                <ul>
                  <li>
                    <strong>Tennis for Two (1958)</strong> - Created by William Higinbotham at Brookhaven National Laboratory,
                    this oscilloscope-based tennis game is one of the earliest known electronic games
                  </li>
                  <li>
                    <strong>Spacewar! (1962)</strong> - Developed by Steve Russell and others at MIT on a PDP-1 computer,
                    this space combat game became influential in early computing circles
                  </li>
                  <li>
                    <strong>Brown Box (1967-68)</strong> - Ralph Baer's prototype for the first home video game console,
                    which would later become the Magnavox Odyssey
                  </li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1970s</div>
              <div className="timeline-content">
                <h3>Arcade & Home Console Birth</h3>
                <p>
                  The 1970s saw video games emerge as a commercial medium with the rise of arcade games and the first
                  home consoles, establishing many of the business and design foundations that would shape the industry.
                </p>
                <p>
                  <strong>Key Developments:</strong>
                </p>
                <ul>
                  <li>
                    <strong>Computer Space (1971)</strong> - The first commercially sold arcade video game, created by Nolan Bushnell
                  </li>
                  <li>
                    <strong>Pong (1972)</strong> - Atari's simple table tennis game became the first commercially successful arcade video game
                  </li>
                  <li>
                    <strong>Magnavox Odyssey (1972)</strong> - The first commercial home video game console
                  </li>
                  <li>
                    <strong>Atari 2600 (1977)</strong> - Revolutionary console with interchangeable cartridges that brought arcade-style
                    games into homes
                  </li>
                  <li>
                    <strong>Space Invaders (1978)</strong> - Taito's alien-shooting game sparked the golden age of arcade games
                  </li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1980s</div>
              <div className="timeline-content">
                <h3>Golden Age & Crash</h3>
                <p>
                  The early 1980s represented the golden age of arcade gaming, followed by a devastating industry crash
                  in North America and then a renaissance led by Nintendo.
                </p>
                <p>
                  <strong>Key Developments:</strong>
                </p>
                <ul>
                  <li>
                    <strong>Pac-Man (1980)</strong> - Namco's iconic maze game became a cultural phenomenon
                  </li>
                  <li>
                    <strong>Donkey Kong (1981)</strong> - Introduced Mario (originally "Jumpman") and showcased Shigeru Miyamoto's design genius
                  </li>
                  <li>
                    <strong>Video Game Crash (1983)</strong> - Market oversaturation and low-quality games led to a collapse of the North American video game industry
                  </li>
                  <li>
                    <strong>Nintendo Entertainment System (1985)</strong> - Revitalized the home console market with quality control and iconic games
                  </li>
                  <li>
                    <strong>The Legend of Zelda (1986)</strong> - Pioneered open-world adventure and battery-backed save systems
                  </li>
                  <li>
                    <strong>Tetris (1984/1989)</strong> - Alexey Pajitnov's puzzle game became universally appealing, especially when bundled with the Game Boy
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="read-full-history">
            <Link to="/video-games#history-of-games" className="default-links">Return to Video Games Overview</Link>
          </div>
        </section>

        {/* 3. Resources Section */}
        <section className="section-content" id="resources">
          <h2>Resources for Further Exploration</h2>
          <p>
            For those interested in learning more about video game history, here are some valuable resources:
          </p>

          <div className="resources-grid">
            <div className="resource-category">
              <h3>Books</h3>
              <ul>
                <li>"The Ultimate History of Video Games" by Steven L. Kent</li>
                <li>"Masters of Doom" by David Kushner</li>
                <li>"Console Wars" by Blake J. Harris</li>
                <li>"Replay: The History of Video Games" by Tristan Donovan</li>
              </ul>
            </div>

            <div className="resource-category">
              <h3>Documentaries</h3>
              <ul>
                <li>"High Score" (Netflix series)</li>
                <li>"Video Games: The Movie"</li>
                <li>"The King of Kong: A Fistful of Quarters"</li>
                <li>"Indie Game: The Movie"</li>
              </ul>
            </div>

            <div className="resource-category">
              <h3>Museums & Archives</h3>
              <ul>
                <li>The Strong National Museum of Play (Rochester, NY)</li>
                <li>The National Videogame Museum (Frisco, TX)</li>
                <li>The Internet Archive's Software Library</li>
                <li>The Video Game History Foundation</li>
              </ul>
            </div>


          </div>
        </section>
      </main>
    </div>
  );
};

export default VideoGamesHistory;
