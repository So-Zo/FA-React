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
      <header>
        <div className="image-header">
          <img src="/images/video-games/VideoGamesHeader.jpg" alt="Video Games Overview" />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search From Video Games Page"
          placeholder="Search for Characters, Universes, etc."
        />
      </header>

      <div className="accessibility-container">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <button className="keyboard-shortcuts-link" onClick={() => console.log('Keyboard shortcuts')}>
          <span>⌨️</span> Keyboard shortcuts
        </button>
        <button className="wiki-edit-button" id="page-edit-button">Edit Page</button>
      </div>

      <main id="main-content">
        <hr />

        {/* Table of Contents */}
        <section id="table-of-contents" className="section-content">
        <div className="container">
          <h2>Video Games Encyclopedia</h2>
          <p>Welcome to our comprehensive guide to video games. Use this table of contents to navigate to different sections.</p>

          <div className="toc-container">
            <div className="toc-column">
              <h3>Fundamentals</h3>
              <ul className="toc-list">
                <li><a href="#the-basics" className="default-links">The Basics</a></li>
                <li><a href="#history-of-games" className="default-links">History of Video Games</a></li>
                <li><a href="#terminology-guide" className="default-links">Terminology Guide</a></li>
              </ul>
            </div>

            <div className="toc-column">
              <h3>Categories & Styles</h3>
              <ul className="toc-list">
                <li><a href="#game-genres" className="default-links">Game Genres Guide</a></li>
                <li><a href="#gaming-worlds" className="default-links">Gaming Worlds & Universes</a></li>
                <li><a href="#audience-categories" className="default-links">Games for Different Audiences</a></li>
              </ul>
            </div>

            <div className="toc-column">
              <h3>Behind the Scenes</h3>
              <ul className="toc-list">
                <li><a href="#development-process" className="default-links">Game Development Process</a></li>
                <li><a href="#cultural-impact" className="default-links">Cultural Impact</a></li>
                <li><a href="#learning-resources" className="default-links">Learning Resources</a></li>
              </ul>
            </div>
          </div>

          <div className="community-connection">
            <h4>Looking for specific games or characters?</h4>
            <p>Browse our <Link to="/video-games/directory" className="default-links">Video Games Directory</Link> to find official pages for your favorite games and characters.</p>
            <p>You can also visit our <Link to="/community#video-games-section" className="default-links">Community Section</Link> to explore fan-created content about games, characters, and more!</p>
          </div>
        </div>
      </section>
      <hr />

      {/* The Basics Section */}
      <section id="the-basics" className="section-content">
        <div className="container">
          <h2>The Basics</h2>
          <p>
            Video games are interactive electronic games played on various platforms including consoles, computers, mobile devices, and virtual reality systems. They combine elements of storytelling, art, music, and technology to create immersive experiences that engage players through challenges, narratives, and social interaction.
          </p>

          <p>
            The term "video game" encompasses a vast range of experiences, from simple puzzle games to complex open-world adventures, competitive multiplayer titles, and narrative-driven epics. Games can be played solo, cooperatively with friends, or competitively against other players around the world.
          </p>

          <p>
            Game development occurs globally, with major studios, independent creators, and everything in between contributing to a diverse ecosystem of interactive entertainment. The industry continues to evolve rapidly with advances in technology enabling increasingly sophisticated and immersive experiences.
          </p>

          <div className="info-box">
            <h4>Key Characteristics of Video Games</h4>
            <ul>
              <li><strong>Interactivity:</strong> Players directly influence the experience through their actions and decisions</li>
              <li><strong>Challenge:</strong> Games present obstacles that require skill, strategy, or problem-solving to overcome</li>
              <li><strong>Feedback Systems:</strong> Games provide immediate responses to player actions</li>
              <li><strong>Goals:</strong> Most games have objectives that give players direction and purpose</li>
              <li><strong>Immersion:</strong> Games create engaging worlds that captivate players' attention and imagination</li>
            </ul>
          </div>

          <div className="community-connection">
            <Link to="/community#video-games-basics-discussion" className="default-links">Join the Discussion on Video Game Basics →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* History of Video Games Section */}
      <section id="history-of-games" className="section-content">
        <div className="container">
          <h2>History of Video Games</h2>
          <p>
            The evolution of video games spans over half a century, developing from simple electronic experiments to one of the world's largest entertainment industries. Understanding this history helps appreciate the medium's significance and influence.
          </p>

          <div className="timeline-container">
            <div className="timeline-item">
              <div className="timeline-date">1950s-1960s</div>
              <div className="timeline-content">
                <h4>Early Beginnings</h4>
                <p>The first video games were developed in academic and research settings. "Tennis for Two" (1958) and "Spacewar!" (1962) were among the earliest electronic games, created on oscilloscopes and mainframe computers.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1970s</div>
              <div className="timeline-content">
                <h4>Arcade & Home Console Birth</h4>
                <p>The first commercial arcade games appeared, with Pong (1972) achieving massive success. The Atari 2600 (1977) brought video games into homes, while Space Invaders (1978) sparked the golden age of arcade games.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1980s</div>
              <div className="timeline-content">
                <h4>Golden Age & Crash</h4>
                <p>The early 1980s saw the peak of arcade gaming and the rise of iconic games like Pac-Man and Donkey Kong. The North American video game crash of 1983 nearly destroyed the industry before Nintendo's NES revitalized the market in 1985.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1990s</div>
              <div className="timeline-content">
                <h4>3D Revolution</h4>
                <p>The transition from 2D to 3D graphics transformed gaming, with titles like Doom, Super Mario 64, and Final Fantasy VII defining new possibilities. The Sony PlayStation challenged Nintendo's dominance, while PC gaming evolved with CD-ROM technology.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2000s</div>
              <div className="timeline-content">
                <h4>Online & Casual Expansion</h4>
                <p>Online gaming became mainstream with broadband internet, while mobile phones introduced gaming to new audiences. The Nintendo Wii's motion controls and accessible games broadened the demographic appeal of video games.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2010s-Present</div>
              <div className="timeline-content">
                <h4>Digital Distribution & New Frontiers</h4>
                <p>Digital storefronts transformed distribution, indie games flourished, and free-to-play models emerged. Virtual reality, cloud gaming, and mobile experiences continue to expand the definition of video games, while esports has grown into a global phenomenon.</p>
              </div>
            </div>
          </div>

          <div className="key-figures">
            <h3>Key Figures in Video Game History</h3>
            <div className="figure-cards">
              <div className="figure-card">
                <h4>Ralph Baer (1922-2014)</h4>
                <p>Often called the "Father of Video Games," Baer invented the first home video game console, the Magnavox Odyssey, released in 1972.</p>
              </div>

              <div className="figure-card">
                <h4>Shigeru Miyamoto (1952-)</h4>
                <p>Nintendo's legendary designer who created iconic franchises including Mario, The Legend of Zelda, and Donkey Kong, revolutionizing game design principles.</p>
              </div>

              <div className="figure-card">
                <h4>Roberta Williams (1953-)</h4>
                <p>Pioneer of graphic adventure games who co-founded Sierra On-Line and created the King's Quest series, helping establish narrative-driven gaming.</p>
              </div>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#video-games-history" className="default-links">Explore Fan Discussions on Video Game History →</Link>
            <Link to="/community#legendary-game-creators" className="default-links">See Fan Tributes to Legendary Creators →</Link>
            <Link to="/video-games/history" className="default-links">Read Full History of Video Games →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Terminology Guide Section */}
      <section id="terminology-guide" className="section-content">
        <div className="container">
          <h2>Video Game Terminology Guide</h2>
          <p>
            The world of video games has developed its own unique vocabulary. Understanding these terms will enhance your appreciation and help you navigate discussions about games.
          </p>

          <div className="terminology-container">
            <div className="terminology-category">
              <h3>Game Design Terms</h3>
              <dl className="terminology-list">
                <dt>Gameplay</dt>
                <dd>The specific ways players interact with a game and the challenges they face</dd>

                <dt>Mechanics</dt>
                <dd>The rules and systems that govern how a game functions</dd>

                <dt>Level Design</dt>
                <dd>The creation of environments, challenges, and progression in a game</dd>

                <dt>Procedural Generation</dt>
                <dd>Algorithmically creating game content rather than manually designing it</dd>

                <dt>Hitbox</dt>
                <dd>An invisible shape used to detect collisions between game objects</dd>
              </dl>
            </div>

            <div className="terminology-category">
              <h3>Player Experience Terms</h3>
              <dl className="terminology-list">
                <dt>HUD (Heads-Up Display)</dt>
                <dd>On-screen information showing player status, objectives, and other data</dd>

                <dt>Grinding</dt>
                <dd>Repetitive gameplay to gain experience, items, or currency</dd>

                <dt>Metagame</dt>
                <dd>Strategic elements that exist outside the explicit rules of the game</dd>

                <dt>Respawn</dt>
                <dd>When a character returns to the game after being defeated</dd>

                <dt>Permadeath</dt>
                <dd>When character death is permanent with no respawn option</dd>
              </dl>
            </div>

            <div className="terminology-category">
              <h3>Technical & Industry Terms</h3>
              <dl className="terminology-list">
                <dt>Engine</dt>
                <dd>Software framework used to create and develop video games</dd>

                <dt>Frame Rate</dt>
                <dd>The frequency at which frames are displayed, measured in frames per second (FPS)</dd>

                <dt>DLC (Downloadable Content)</dt>
                <dd>Additional content released after a game's initial launch</dd>

                <dt>Early Access</dt>
                <dd>When a game is released to players before its official completion</dd>

                <dt>Microtransactions</dt>
                <dd>Small purchases within a game for virtual items or advantages</dd>
              </dl>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#video-games-terminology" className="default-links">See Fan Discussions on Gaming Terminology →</Link>
            <Link to="/community#gaming-guide" className="default-links">Explore Fan-Created Gaming Guide →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Game Genres Guide Section */}
      <section id="game-genres" className="section-content">
        <div className="container">
          <h2>Game Genres Guide</h2>
          <p>
            Video games encompass a diverse range of genres and formats, each with unique characteristics and appeal.
            This guide will help you understand the different types of games and find titles that match your interests.
          </p>

          <div className="genre-navigation">
            <h3>Quick Navigation</h3>
            <div className="genre-nav-buttons">
              <a href="#popular-genres" className="default-links">Popular Genres</a>
              <a href="#emerging-genres" className="default-links">Emerging Genres</a>
              <Link to="/video-games/directory#genres" className="default-links">Full Genre Directory →</Link>
            </div>
          </div>

          <div id="popular-genres" className="genre-section">
            <h3>Popular Game Genres</h3>
            <p>Discover games based on your preferred gameplay styles and themes:</p>

            <div className="genre-directory">
              <div className="genre-category">
                <h4>Action & Adventure</h4>
                <p>Games focused on physical challenges, exploration, and combat.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> The Legend of Zelda, Uncharted, God of War</li>
                  <li><Link to="/video-games/directory#genres" className="default-links">Explore Action & Adventure Games →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Role-Playing Games (RPGs)</h4>
                <p>Games where players assume the roles of characters in a fictional setting, developing their abilities and navigating complex narratives.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Final Fantasy, The Elder Scrolls, Mass Effect</li>
                  <li><Link to="/video-games/directory#genres" className="default-links">Explore RPGs →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>First-Person Shooters (FPS)</h4>
                <p>Action games where players experience the game from a first-person perspective, typically focused on weapon-based combat.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> DOOM, Half-Life, Call of Duty</li>
                  <li><Link to="/video-games/directory#genres" className="default-links">Explore FPS Games →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Strategy</h4>
                <p>Games that emphasize skillful thinking and planning to achieve victory.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> StarCraft, Civilization, XCOM</li>
                  <li><Link to="/video-games/directory#genres" className="default-links">Explore Strategy Games →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Simulation</h4>
                <p>Games designed to closely simulate real-world activities or systems.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> The Sims, Microsoft Flight Simulator, Cities: Skylines</li>
                  <li><Link to="/video-games/directory#genres" className="default-links">Explore Simulation Games →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Platformers</h4>
                <p>Games where the primary challenge is navigating the character through a series of platforms and obstacles.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Super Mario Bros., Celeste, Hollow Knight</li>
                  <li><Link to="/video-games/directory#genres" className="default-links">Explore Platformers →</Link></li>
                </ul>
              </div>
            </div>

            <div className="view-more-container">
              <Link to="/video-games/directory#genres" className="view-more-button">View All Genres in Directory</Link>
            </div>
          </div>

          <div id="emerging-genres" className="genre-section">
            <h3>Emerging & Hybrid Genres</h3>
            <p>The gaming landscape continues to evolve with new and hybrid genres:</p>

            <div className="genre-directory">
              <div className="genre-category">
                <h4>Battle Royale</h4>
                <p>Competitive games where many players fight to be the last person or team standing.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Fortnite, PUBG, Apex Legends</li>
                  <li><Link to="/video-games/directory#genres" className="default-links">Explore Battle Royale Games →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Roguelikes/Roguelites</h4>
                <p>Games featuring procedurally generated levels and permanent death mechanics.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Hades, Dead Cells, The Binding of Isaac</li>
                  <li><Link to="/video-games/directory#genres" className="default-links">Explore Roguelikes →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Souls-like</h4>
                <p>Challenging action RPGs inspired by FromSoftware's Dark Souls series.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Bloodborne, Sekiro, Elden Ring</li>
                  <li><Link to="/video-games/directory#genres" className="default-links">Explore Souls-like Games →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Immersive Sims</h4>
                <p>Games emphasizing player choice, emergent gameplay, and simulation systems.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Deus Ex, Dishonored, Prey</li>
                  <li><Link to="/video-games/directory#genres" className="default-links">Explore Immersive Sims →</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="genre-resources">
            <h3>Finding Your Perfect Games</h3>
            <p>Not sure where to start? Here are some resources to help you discover games based on your interests:</p>
            <ul className="resource-links">
              <li><Link to="/video-games/directory" className="default-links">Browse Our Video Games Directory</Link></li>
              <li><Link to="/video-games/directory#popular-games" className="default-links">Popular Games for Beginners</Link></li>
              <li><Link to="/video-games/directory#genres" className="default-links">Browse by Genre</Link></li>
            </ul>
          </div>
        </div>
      </section>
      <hr />

      {/* Game Development Process Section */}
      <section id="development-process" className="section-content">
        <div className="container">
          <h2>Game Development Process</h2>
          <p>
            Creating video games is a complex, collaborative process that combines technical expertise, artistic vision, and innovative design. Understanding how games are made provides insight into the craft and effort behind your favorite titles.
          </p>

          <div className="production-stages">
            <div className="production-stage">
              <h3>1. Concept & Pre-Production</h3>
              <ul>
                <li><strong>Concept Development:</strong> Creating the initial game idea and core mechanics</li>
                <li><strong>Game Design Document:</strong> Outlining gameplay, story, characters, and world</li>
                <li><strong>Prototyping:</strong> Building simple versions to test core gameplay concepts</li>
                <li><strong>Technical Planning:</strong> Determining technology needs and development approach</li>
              </ul>
            </div>

            <div className="production-stage">
              <h3>2. Production</h3>
              <ul>
                <li><strong>Programming:</strong> Creating the code that powers the game's systems</li>
                <li><strong>Art Creation:</strong> Developing visual assets, from characters to environments</li>
                <li><strong>Level Design:</strong> Building the game's spaces and challenges</li>
                <li><strong>Audio Design:</strong> Creating sound effects, music, and voice acting</li>
                <li><strong>Narrative Development:</strong> Writing dialogue, cutscenes, and story elements</li>
              </ul>
            </div>

            <div className="production-stage">
              <h3>3. Testing & Refinement</h3>
              <ul>
                <li><strong>Quality Assurance:</strong> Finding and fixing bugs and technical issues</li>
                <li><strong>Playtesting:</strong> Gathering feedback on gameplay experience</li>
                <li><strong>Balancing:</strong> Adjusting difficulty, progression, and game systems</li>
                <li><strong>Optimization:</strong> Improving performance across target platforms</li>
              </ul>
            </div>

            <div className="production-stage">
              <h3>4. Release & Post-Launch</h3>
              <ul>
                <li><strong>Marketing & Distribution:</strong> Promoting and delivering the game to players</li>
                <li><strong>Launch:</strong> Releasing the game to the public</li>
                <li><strong>Updates & Patches:</strong> Addressing issues discovered after release</li>
                <li><strong>DLC & Expansions:</strong> Creating additional content to extend the game</li>
                <li><strong>Community Support:</strong> Engaging with players and addressing feedback</li>
              </ul>
            </div>
          </div>

          <div className="info-box">
            <h4>Game Development Roles</h4>
            <div className="roles-grid">
              <div className="role-item">
                <h5>Game Designer</h5>
                <p>Creates gameplay systems, mechanics, and rules that define the player experience</p>
              </div>

              <div className="role-item">
                <h5>Programmer</h5>
                <p>Writes code that implements gameplay features, graphics, AI, and other technical elements</p>
              </div>

              <div className="role-item">
                <h5>Artist</h5>
                <p>Creates visual elements including characters, environments, animations, and UI</p>
              </div>

              <div className="role-item">
                <h5>Sound Designer</h5>
                <p>Develops audio elements including music, sound effects, and voice acting</p>
              </div>

              <div className="role-item">
                <h5>Producer</h5>
                <p>Manages the development process, schedules, resources, and team coordination</p>
              </div>

              <div className="role-item">
                <h5>Quality Assurance</h5>
                <p>Tests the game to identify bugs, balance issues, and gameplay problems</p>
              </div>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#game-development" className="default-links">Explore Fan Discussions on Game Development →</Link>
            <Link to="/community#game-dev-resources" className="default-links">See Community Game Development Resources →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Cultural Impact Section */}
      <section id="cultural-impact" className="section-content">
        <div className="container">
          <h2>Cultural Impact of Video Games</h2>
          <p>
            Video games have evolved from simple entertainment to a significant cultural force, influencing art, education, technology, and social interaction worldwide.
          </p>

          <div className="impact-areas">
            <div className="impact-area">
              <h3>Artistic Expression</h3>
              <p>
                Games have emerged as a unique art form combining visual design, music, narrative, and interactivity. From the emotional storytelling of "Journey" to the atmospheric world of "Shadow of the Colossus," games create experiences that couldn't exist in any other medium.
              </p>
              <p>
                The artistic achievements of games are increasingly recognized by cultural institutions, with exhibitions at major museums like MoMA and the Smithsonian, and academic programs dedicated to game design and theory.
              </p>
            </div>

            <div className="impact-area">
              <h3>Social Connection</h3>
              <p>
                Video games have created new forms of social interaction and community:
              </p>
              <ul>
                <li><strong>Online Communities:</strong> Games like World of Warcraft and Fortnite function as social spaces where millions gather</li>
                <li><strong>Collaborative Play:</strong> Cooperative games encourage teamwork and communication</li>
                <li><strong>Esports:</strong> Competitive gaming has grown into a global phenomenon with professional players and massive audiences</li>
                <li><strong>Streaming Culture:</strong> Platforms like Twitch have created new forms of entertainment and community around games</li>
              </ul>
            </div>

            <div className="impact-area">
              <h3>Technological Innovation</h3>
              <p>
                The gaming industry has driven technological advancement in numerous fields:
              </p>
              <p>
                From graphics processing to virtual reality, games push the boundaries of what's technically possible. Technologies developed for games have applications in fields ranging from medicine and military training to architecture and film production. The computational demands of gaming have accelerated advances in consumer hardware.
              </p>
            </div>

            <div className="impact-area">
              <h3>Educational Potential</h3>
              <p>
                Games offer unique educational opportunities through their interactive nature:
              </p>
              <p>
                Educational games make learning engaging and accessible. Simulation games like "Kerbal Space Program" teach physics and engineering principles. Complex strategy games develop critical thinking and resource management skills. Games are increasingly used in classrooms as teaching tools across various subjects.
              </p>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#games-impact" className="default-links">Join Discussions on Games' Cultural Impact →</Link>
            <Link to="/community#games-art" className="default-links">Explore Fan Discussions of Games as Art →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Gaming Worlds & Universes Section */}
      <section id="gaming-worlds" className="section-content">
        <div className="container">
          <h2>Gaming Worlds & Universes</h2>
          <p>
            Video games create some of the most immersive and detailed fictional worlds in any medium, allowing players to not just observe but inhabit and interact with these environments.
          </p>

          <div className="world-categories">
            <div className="world-category">
              <h3>Expansive Open Worlds</h3>
              <p>Vast, explorable environments that give players freedom to chart their own path</p>
              <div className="world-examples">
                <div className="world-example">
                  <h4>The Elder Scrolls: Tamriel</h4>
                  <p>A continent with diverse regions, cultures, and thousands of years of detailed history</p>
                  <Link to="/video-games/directory#universes" className="default-links">Explore Tamriel in Games Directory →</Link>
                </div>

                <div className="world-example">
                  <h4>Red Dead Redemption: The American Frontier</h4>
                  <p>A meticulously detailed recreation of the American West during the end of the outlaw era</p>
                  <Link to="/video-games/directory#universes" className="default-links">Discover the Frontier in Games Directory →</Link>
                </div>
              </div>
            </div>

            <div className="world-category">
              <h3>Richly Detailed Settings</h3>
              <p>Focused environments with exceptional depth and atmosphere</p>
              <div className="world-examples">
                <div className="world-example">
                  <h4>BioShock: Rapture</h4>
                  <p>An underwater city built as a libertarian utopia that descended into chaos</p>
                  <Link to="/video-games/directory#universes" className="default-links">Explore Rapture in Games Directory →</Link>
                </div>

                <div className="world-example">
                  <h4>Dark Souls: Lordran</h4>
                  <p>A decaying fantasy realm where architecture and item placement tell environmental stories</p>
                  <Link to="/video-games/directory#universes" className="default-links">Discover Lordran in Games Directory →</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="world-building-elements">
            <h3>Elements of Game World-Building</h3>
            <ul>
              <li><strong>Environmental Storytelling:</strong> Using the environment itself to convey narrative</li>
              <li><strong>Lore & History:</strong> Creating backstories and events that happened before the game begins</li>
              <li><strong>Interactive Systems:</strong> Developing rules and mechanics that make the world feel alive</li>
              <li><strong>Atmosphere:</strong> Using visuals, sound, and music to create a distinctive mood</li>
              <li><strong>NPC Ecosystems:</strong> Populating the world with characters that have their own routines and relationships</li>
            </ul>
          </div>

          <div className="community-connection">
            <h4>Explore Gaming Worlds in Our Directory</h4>
            <p>Our games directory features official information about your favorite gaming universes, including character profiles, location guides, timelines, and more!</p>
            <Link to="/video-games/directory" className="default-links">Browse All Game Worlds →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Audience Categories Section */}
      <section id="audience-categories" className="section-content">
        <div className="container">
          <h2>Games for Different Audiences</h2>
          <p>
            Video games offer experiences for players of all ages, skill levels, and interests. Whether you're new to gaming or a seasoned player, there's something for everyone.
          </p>

          <div className="audience-categories">
            <div className="audience-category">
              <h3>For Beginners</h3>
              <p>These accessible games serve as excellent entry points to gaming, featuring intuitive controls and welcoming gameplay:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Portal</strong> - A first-person puzzle game with a gradual learning curve and engaging story
                  <Link to="/video-games/directory#popular-games" className="default-links">View Game Details →</Link>
                </li>
                <li>
                  <strong>Mario Kart 8</strong> - A racing game that's easy to learn but offers depth for those who want to master it
                  <Link to="/video-games/directory#popular-games" className="default-links">View Game Details →</Link>
                </li>
                <li>
                  <strong>Minecraft</strong> - A sandbox game that allows players to explore and create at their own pace
                  <Link to="/video-games/directory#popular-games" className="default-links">View Game Details →</Link>
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>Classic Games</h3>
              <p>These influential titles have stood the test of time and helped shape gaming as we know it today:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>The Legend of Zelda: Ocarina of Time</strong> - A groundbreaking adventure that defined 3D action games
                  <Link to="/video-games/directory#classics" className="default-links">View Game Details →</Link>
                </li>
                <li>
                  <strong>Final Fantasy VII</strong> - A JRPG that brought the genre to mainstream Western audiences
                  <Link to="/video-games/directory#classics" className="default-links">View Game Details →</Link>
                </li>
                <li>
                  <strong>Half-Life 2</strong> - A first-person shooter that revolutionized storytelling and physics in games
                  <Link to="/video-games/directory#classics" className="default-links">View Game Details →</Link>
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>Recent Hits</h3>
              <p>These newer games represent the current generation of acclaimed titles:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Elden Ring</strong> - An open-world action RPG that combines exploration with challenging combat
                  <Link to="/video-games/directory#popular-games" className="default-links">View Game Details →</Link>
                </li>
                <li>
                  <strong>God of War Ragnarök</strong> - An action-adventure game with a focus on combat and narrative
                  <Link to="/video-games/directory#popular-games" className="default-links">View Game Details →</Link>
                </li>
                <li>
                  <strong>Hades</strong> - A roguelike action game with exceptional storytelling and character development
                  <Link to="/video-games/directory#popular-games" className="default-links">View Game Details →</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="community-connection">
            <h4>Find Your Next Favorite Game</h4>
            <p>Looking for more games to play? Browse our comprehensive directory to discover titles based on your interests and preferences.</p>
            <Link to="/video-games/directory" className="default-links">Browse All Games →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Learning Resources Section */}
      <section id="learning-resources" className="section-content">
        <div className="container">
          <h2>Learning Resources</h2>
          <p>
            Whether you're new to gaming or looking to deepen your knowledge, these resources will help you navigate and appreciate the world of video games.
          </p>

          <div className="resource-categories">
            <div className="resource-category">
              <h3>Getting Started</h3>
              <div className="resource-items">
                <div className="resource-item">
                  <h4>Gaming for Beginners</h4>
                  <p>A comprehensive introduction to video games for complete beginners, covering basic controls, common genres, and recommended first games.</p>
                  <Link to="/community#gaming-beginners-guide" className="default-links">Read the Guide →</Link>
                </div>

                <div className="resource-item">
                  <h4>Gaming Platforms Explained</h4>
                  <p>Information about different gaming platforms (PC, consoles, mobile) and their strengths and weaknesses.</p>
                  <Link to="/community#gaming-platforms" className="default-links">Read the Guide →</Link>
                </div>
              </div>
            </div>

            <div className="resource-category">
              <h3>Finding What to Play</h3>
              <div className="resource-items">
                <div className="resource-item">
                  <h4>Game Recommendation Tool</h4>
                  <p>An interactive tool to help you find games based on your preferences and interests.</p>
                  <Link to="/community#game-finder" className="default-links">Use the Tool →</Link>
                </div>

                <div className="resource-item">
                  <h4>New Release Guide</h4>
                  <p>Information about new and upcoming game releases across all platforms.</p>
                  <Link to="/community#game-releases" className="default-links">View Current Releases →</Link>
                </div>
              </div>
            </div>

            <div className="resource-category">
              <h3>Deepening Your Knowledge</h3>
              <div className="resource-items">
                <div className="resource-item">
                  <h4>Game Analysis Resources</h4>
                  <p>Guides to understanding games on a deeper level, including design principles, narrative techniques, and artistic elements.</p>
                  <Link to="/community#game-analysis" className="default-links">Explore Analysis Resources →</Link>
                </div>

                <div className="resource-item">
                  <h4>Game Development Basics</h4>
                  <p>Introduction to how games are made, for those interested in the creative process behind their favorite titles.</p>
                  <Link to="/community#game-dev-basics" className="default-links">Learn More →</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="community-resources">
            <h3>Community-Created Resources</h3>
            <p>Our community members have created valuable resources to help fellow gamers:</p>
            <div className="community-resource-grid">
              <div className="community-resource">
                <h4>Game Guides & Walkthroughs</h4>
                <p>Detailed guides to help navigate challenging games and discover hidden content</p>
                <Link to="/community#game-guides" className="default-links">See Game Guides →</Link>
              </div>

              <div className="community-resource">
                <h4>Game Collections</h4>
                <p>Curated lists of games based on themes, genres, or recommendations for specific interests</p>
                <Link to="/community#game-collections" className="default-links">Browse Collections →</Link>
              </div>

              <div className="community-resource">
                <h4>Gaming Discussion Guides</h4>
                <p>Resources for hosting game clubs or discussion groups</p>
                <Link to="/community#discussion-guides" className="default-links">Get Discussion Guides →</Link>
              </div>

              <div className="community-resource">
                <h4>Gaming Glossary</h4>
                <p>An extensive dictionary of gaming-related terms maintained by community members</p>
                <Link to="/community#gaming-glossary" className="default-links">View Glossary →</Link>
              </div>
            </div>
          </div>

          <div className="community-connection">
            <h4>Contribute Your Knowledge</h4>
            <p>Have expertise or insights about games you'd like to share? Join our community and contribute to our growing collection of gaming resources!</p>
            <Link to="/community#contribute-resources" className="default-links">Contribute to Resources →</Link>
          </div>
        </div>
      </section>
      <hr />
      </main>

      {/* Footer Section */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-section footer-about">
            <img src="/images/logo-image.jpg" alt="FanArcs Logo" className="footer-logo" />
            <p>FanArcs is your go-to platform for exploring and sharing content across anime, manga, comics, TV, and more. Join our community of passionate fans!</p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook">📘</a>
              <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
              <a href="#" className="social-icon" aria-label="Instagram">📷</a>
              <a href="#" className="social-icon" aria-label="Discord">💬</a>
            </div>
          </div>

          <div className="footer-section footer-contact">
            <h3>Contact Us</h3>
            <p><span>📧</span> contact@fanarcs.com</p>
            <p><span>📱</span> (555) 123-4567</p>
            <p><span>🏢</span> 123 Fan Street, Anime City</p>

            <h3>Newsletter</h3>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" aria-label="Email for newsletter" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 FanArcs. All rights reserved.</p>
          <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <a href="#">Cookie Policy</a></p>
        </div>

        {/* Bottom navigation bar */}
        <div className="bottom-navigation">
          <Link to="/" className="nav-home-button" aria-label="Go Home">🏠</Link>
          <Link to="/community" className="nav-social-button" aria-label="Go to Community">👥</Link>
          <Link to="/profile" className="nav-profile-button" aria-label="Profile Page">👤</Link>
          <div className="nav-search-popup" onClick={() => console.log('Toggle search popup')}>
            <span>🔍</span>
          </div>

          <div className="hamburger-menu-icon" aria-label="Open navigation menu">
            <div className="hamburger-bar"></div>
            <div className="hamburger-bar"></div>
            <div className="hamburger-bar"></div>
          </div>
        </div>

        {/* The navigation menu that will show/hide */}
        <nav className="main-navigation">
          <ul>
            {/* Categories dropdown */}
            <li>
              <button
                className="nav-dropdown-toggle"
                aria-expanded="false"
                aria-controls="categories-dropdown"
              >
                Categories <span>►</span>
              </button>
              <ul className="nav-dropdown-menu" id="categories-dropdown">
                <li><Link to="/anime">Anime 🌸</Link></li>
                <hr />
                <li><Link to="/comics">Comics 💥</Link></li>
                <hr />
                <li><Link to="/manga">Manga 📖</Link></li>
                <hr />
                <li><Link to="/tv">Television 📺</Link></li>
                <hr />
                <li><Link to="/video-games">Video Games 🎮</Link></li>
                <hr />
                <li>
                  <Link to="/worlds-universes">Worlds & Universes 🌌</Link>
                </li>
              </ul>
            </li>

            {/* FanArcs Info dropdown */}
            <li>
              <button
                className="nav-dropdown-toggle"
                aria-expanded="false"
                aria-controls="info-dropdown"
              >
                FanArcs Info <span>►</span>
              </button>
              <ul className="nav-dropdown-menu" id="info-dropdown">
                <li><Link to="/about">About 🔎</Link></li>
                <li><Link to="/contribute">Help FanArcs ⁉️</Link></li>
                <li><Link to="/community">Community 👥</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default VideoGamesPage;
