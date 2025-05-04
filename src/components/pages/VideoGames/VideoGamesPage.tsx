import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/VideoGamesPage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';

const VideoGamesPage: React.FC = () => {
  return (
    <div className="video-games-page">
      {/* Introduction Section */}
      <section className="intro-section">
        <div className="container">
          <h2>Level Up Your Gaming Knowledge</h2>
          <p className="intro-text">
            Explore the origins, inspirations, and development processes behind your favorite games and gaming technology.
            From retro classics to cutting-edge releases, discover the artistry and innovation that drives the gaming industry.
          </p>

          <div className="quick-links">
            <Link to="/video-games/directory" className="quick-link">
              <span className="icon">🎮</span>
              <span className="text">Games Directory</span>
            </Link>
            <Link to="/video-games/history" className="quick-link">
              <span className="icon">🕰️</span>
              <span className="text">History of Gaming</span>
            </Link>
            <Link to="/community#gaming-section" className="quick-link">
              <span className="icon">👥</span>
              <span className="text">Fan Discussions</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Evolution of Gaming Section */}
      <section className="evolution-section">
        <div className="container">
          <h2>The Evolution of Gaming</h2>
          <p>
            Video games have evolved from simple pixel-based entertainment to complex interactive experiences that
            rival cinema in their storytelling and artistic achievement. This evolution spans technological
            advancements, creative innovations, and cultural shifts.
          </p>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">1970s-1980s</div>
              <div className="timeline-content">
                <h3>The Arcade Era</h3>
                <p>
                  The birth of gaming as a mainstream entertainment medium, with arcade cabinets like Pong,
                  Space Invaders, and Pac-Man capturing the public imagination and establishing fundamental
                  gameplay concepts.
                </p>
                <div className="era-games">
                  <span className="era-game">Pong</span>
                  <span className="era-game">Space Invaders</span>
                  <span className="era-game">Pac-Man</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-year">1980s-1990s</div>
              <div className="timeline-content">
                <h3>The Console Revolution</h3>
                <p>
                  Home gaming systems from Nintendo, Sega, and others brought the arcade experience into living rooms,
                  establishing iconic franchises and expanding the possibilities of game design.
                </p>
                <div className="era-games">
                  <span className="era-game">Super Mario Bros.</span>
                  <span className="era-game">The Legend of Zelda</span>
                  <span className="era-game">Sonic the Hedgehog</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-year">1990s-2000s</div>
              <div className="timeline-content">
                <h3>The 3D Revolution</h3>
                <p>
                  The transition to 3D graphics opened new frontiers in game design, with immersive worlds and
                  more sophisticated storytelling becoming possible through technological advancements.
                </p>
                <div className="era-games">
                  <span className="era-game">Final Fantasy VII</span>
                  <span className="era-game">Metal Gear Solid</span>
                  <span className="era-game">Half-Life</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-year">2000s-2010s</div>
              <div className="timeline-content">
                <h3>The Online Era</h3>
                <p>
                  Internet connectivity transformed gaming into a social experience, with multiplayer games,
                  digital distribution, and online communities becoming central to the medium.
                </p>
                <div className="era-games">
                  <span className="era-game">World of Warcraft</span>
                  <span className="era-game">Call of Duty</span>
                  <span className="era-game">Minecraft</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-year">2010s-Present</div>
              <div className="timeline-content">
                <h3>The Modern Era</h3>
                <p>
                  Games have become more diverse, accessible, and ambitious than ever, with indie developers,
                  mobile gaming, and technological innovations like VR expanding the boundaries of the medium.
                </p>
                <div className="era-games">
                  <span className="era-game">The Last of Us</span>
                  <span className="era-game">Fortnite</span>
                  <span className="era-game">Elden Ring</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Genres Section */}
      <section className="genres-section">
        <div className="container">
          <h2>Exploring Game Genres</h2>
          <p>
            Video games encompass a vast array of genres, each offering unique experiences and appealing to
            different player preferences. From action-packed adventures to thoughtful strategy games, the
            diversity of gaming experiences continues to expand.
          </p>

          <div className="genres-grid">
            <div className="genre-card">
              <div className="genre-icon">🏆</div>
              <h3>Action & Adventure</h3>
              <p>
                Games focused on physical challenges, exploration, and combat, often featuring immersive worlds
                and narrative-driven experiences.
              </p>
              <p><strong>Notable Examples:</strong> The Legend of Zelda, Uncharted, God of War</p>
            </div>

            <div className="genre-card">
              <div className="genre-icon">🧠</div>
              <h3>Role-Playing Games</h3>
              <p>
                Games where players assume the roles of characters in a fictional setting, developing their
                abilities and navigating complex narratives.
              </p>
              <p><strong>Notable Examples:</strong> Final Fantasy, The Elder Scrolls, Mass Effect</p>
            </div>

            <div className="genre-card">
              <div className="genre-icon">🎯</div>
              <h3>First-Person Shooters</h3>
              <p>
                Action games where players experience the game from a first-person perspective, typically
                focused on weapon-based combat.
              </p>
              <p><strong>Notable Examples:</strong> DOOM, Half-Life, Call of Duty</p>
            </div>

            <div className="genre-card">
              <div className="genre-icon">♟️</div>
              <h3>Strategy</h3>
              <p>
                Games that emphasize skillful thinking and planning to achieve victory, often involving
                resource management and tactical decision-making.
              </p>
              <p><strong>Notable Examples:</strong> StarCraft, Civilization, XCOM</p>
            </div>

            <div className="genre-card">
              <div className="genre-icon">🏎️</div>
              <h3>Simulation</h3>
              <p>
                Games designed to closely simulate real-world activities or systems, from city management
                to vehicle operation.
              </p>
              <p><strong>Notable Examples:</strong> The Sims, Microsoft Flight Simulator, Cities: Skylines</p>
            </div>

            <div className="genre-card">
              <div className="genre-icon">🧩</div>
              <h3>Puzzle</h3>
              <p>
                Games that challenge players' problem-solving skills, pattern recognition, and logical thinking.
              </p>
              <p><strong>Notable Examples:</strong> Portal, Tetris, The Witness</p>
            </div>
          </div>

          <div className="cta-link">
            <Link to="/video-games/genres">Explore All Game Genres →</Link>
          </div>
        </div>
      </section>

      {/* Game Development Section */}
      <section className="development-section">
        <div className="container">
          <h2>The Art of Game Development</h2>
          <p>
            Creating video games is a complex, collaborative process that combines technical expertise, artistic
            vision, and innovative design. Modern game development brings together diverse talents to create
            interactive experiences that engage players on multiple levels.
          </p>

          <div className="dev-process">
            <div className="process-step">
              <h3>Concept & Design</h3>
              <p>
                The initial phase where the game's core concept, mechanics, and world are defined. Game designers
                create documents outlining gameplay systems, level structures, and narrative elements.
              </p>
            </div>

            <div className="process-step">
              <h3>Art & Animation</h3>
              <p>
                Artists create the visual elements of the game, from character models and environments to user
                interface elements. Animators bring these elements to life with fluid, responsive movements.
              </p>
            </div>

            <div className="process-step">
              <h3>Programming</h3>
              <p>
                Programmers build the technical foundation of the game, implementing gameplay mechanics,
                physics systems, AI behaviors, and optimizing performance across different platforms.
              </p>
            </div>

            <div className="process-step">
              <h3>Sound & Music</h3>
              <p>
                Audio designers create sound effects and ambient audio that enhance immersion, while composers
                develop musical scores that complement the game's emotional tone and narrative moments.
              </p>
            </div>

            <div className="process-step">
              <h3>Testing & Refinement</h3>
              <p>
                Quality assurance testers identify bugs and gameplay issues, while playtesting helps developers
                understand how players interact with the game, leading to refinements and balance adjustments.
              </p>
            </div>
          </div>

          <div className="dev-studios">
            <h3>Notable Development Studios</h3>
            <div className="studios-grid">
              <div className="studio-card">
                <h4>Nintendo</h4>
                <p>
                  Known for innovative gameplay, family-friendly experiences, and iconic franchises like
                  Mario, Zelda, and Pokémon.
                </p>
              </div>

              <div className="studio-card">
                <h4>Naughty Dog</h4>
                <p>
                  Acclaimed for cinematic storytelling and technical excellence in series like Uncharted
                  and The Last of Us.
                </p>
              </div>

              <div className="studio-card">
                <h4>FromSoftware</h4>
                <p>
                  Renowned for challenging, atmospheric games with distinctive gameplay philosophies,
                  including Dark Souls and Elden Ring.
                </p>
              </div>

              <div className="studio-card">
                <h4>Indie Developers</h4>
                <p>
                  Small teams creating innovative, personal games that push creative boundaries, like
                  Hollow Knight (Team Cherry) and Stardew Valley (ConcernedApe).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More sections would be added here */}
      <section className="content-section">
        <div className="container">
          <div className="section-divider">
            <span>More sections coming soon...</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoGamesPage;
