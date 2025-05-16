import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/VideoGamesPage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';
import TableOfContents, { TocSectionProps } from '../../../components/ui/TableOfContents';

const VideoGamesPage: React.FC = () => {
  // Define TOC sections
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Basics", anchor: "#the-basics" },
        { label: "History", anchor: "#history-of-games" },
        { label: "Terms", anchor: "#terminology-guide" }
      ],
      deepLinks: [
        { label: "Full History", path: "/video-games/history", exists: true }
      ]
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Genres", anchor: "#game-genres" },
        { label: "Worlds", anchor: "#gaming-worlds" },
        { label: "Audience", anchor: "#audience-categories" }
      ],
      deepLinks: [
        { label: "Directory", path: "/video-games/directory", exists: true }
      ]
    },
    {
      title: "BEHIND THE SCENES",
      quickLinks: [
        { label: "Development", anchor: "#development-process" },
        { label: "Impact", anchor: "#cultural-impact" },
        { label: "Resources", anchor: "#learning-resources" }
      ],
      deepLinks: []
    }
  ];

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

        <button className="wiki-edit-button" id="page-edit-button">Edit Page</button>
      </header>

      <main id="main-content">
        <hr />

        {/* New Table of Contents */}
        <TableOfContents
          sections={tocSections}
          title="Video Games Encyclopedia"
          description="Use this table of contents to navigate through the video games guide."
        />

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



          <div id="popular-genres" className="genre-section">
            <h3>Popular Game Genres</h3>
            <p>Discover games based on your preferred gameplay styles and themes:</p>

            <div className="genre-directory">
              <div className="genre-category">
                <h4>Action & Adventure</h4>
                <p>Games focused on physical challenges, exploration, and combat.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> The Legend of Zelda, Uncharted, God of War</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Role-Playing Games (RPGs)</h4>
                <p>Games where players assume the roles of characters in a fictional setting, developing their abilities and navigating complex narratives.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Final Fantasy, The Elder Scrolls, Mass Effect</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>First-Person Shooters (FPS)</h4>
                <p>Action games where players experience the game from a first-person perspective, typically focused on weapon-based combat.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> DOOM, Half-Life, Call of Duty</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Strategy</h4>
                <p>Games that emphasize skillful thinking and planning to achieve victory.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> StarCraft, Civilization, XCOM</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Simulation</h4>
                <p>Games designed to closely simulate real-world activities or systems.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> The Sims, Microsoft Flight Simulator, Cities: Skylines</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Platformers</h4>
                <p>Games where the primary challenge is navigating the character through a series of platforms and obstacles.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Super Mario Bros., Celeste, Hollow Knight</li>
                </ul>
              </div>
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
                </ul>
              </div>

              <div className="genre-category">
                <h4>Roguelikes/Roguelites</h4>
                <p>Games featuring procedurally generated levels and permanent death mechanics.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Hades, Dead Cells, The Binding of Isaac</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Souls-like</h4>
                <p>Challenging action RPGs inspired by FromSoftware's Dark Souls series.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Bloodborne, Sekiro, Elden Ring</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Immersive Sims</h4>
                <p>Games emphasizing player choice, emergent gameplay, and simulation systems.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Deus Ex, Dishonored, Prey</li>
                </ul>
              </div>
            </div>
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

          
              <h3>Artistic Expression</h3>
              <p>
                Games have emerged as a unique art form combining visual design, music, narrative, and interactivity. From the emotional storytelling of "Journey" to the atmospheric world of "Shadow of the Colossus," games create experiences that couldn't exist in any other medium.
              </p>
              <p>
                The artistic achievements of games are increasingly recognized by cultural institutions, with exhibitions at major museums like MoMA and the Smithsonian, and academic programs dedicated to game design and theory.
              </p>
            
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
            
              <h3>Technological Innovation</h3>
              <p>
                The gaming industry has driven technological advancement in numerous fields:
              </p>
              <p>
                From graphics processing to virtual reality, games push the boundaries of what's technically possible. Technologies developed for games have applications in fields ranging from medicine and military training to architecture and film production. The computational demands of gaming have accelerated advances in consumer hardware.
              </p>
            
              <h3>Educational Potential</h3>
              <p>
                Games offer unique educational opportunities through their interactive nature:
              </p>
              <p>
                Educational games make learning engaging and accessible. Simulation games like "Kerbal Space Program" teach physics and engineering principles. Complex strategy games develop critical thinking and resource management skills. Games are increasingly used in classrooms as teaching tools across various subjects.
              </p>
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
                </div>

                <div className="world-example">
                  <h4>Red Dead Redemption: The American Frontier</h4>
                  <p>A meticulously detailed recreation of the American West during the end of the outlaw era</p>
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
                </div>

                <div className="world-example">
                  <h4>Dark Souls: Lordran</h4>
                  <p>A decaying fantasy realm where architecture and item placement tell environmental stories</p>
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
                </li>
                <li>
                  <strong>Mario Kart 8</strong> - A racing game that's easy to learn but offers depth for those who want to master it
                </li>
                <li>
                  <strong>Minecraft</strong> - A sandbox game that allows players to explore and create at their own pace
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>Classic Games</h3>
              <p>These influential titles have stood the test of time and helped shape gaming as we know it today:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>The Legend of Zelda: Ocarina of Time</strong> - A groundbreaking adventure that defined 3D action games
                </li>
                <li>
                  <strong>Final Fantasy VII</strong> - A JRPG that brought the genre to mainstream Western audiences
                </li>
                <li>
                  <strong>Half-Life 2</strong> - A first-person shooter that revolutionized storytelling and physics in games
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>Recent Hits</h3>
              <p>These newer games represent the current generation of acclaimed titles:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Elden Ring</strong> - An open-world action RPG that combines exploration with challenging combat
                </li>
                <li>
                  <strong>God of War Ragnarök</strong> - An action-adventure game with a focus on combat and narrative
                </li>
                <li>
                  <strong>Hades</strong> - A roguelike action game with exceptional storytelling and character development
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <hr />

      {/* Learning Resources Section - Simplified */}
      <section id="learning-resources" className="section-content">
        <div className="container">
          <h2>Learning Resources</h2>
          <p>
            Understanding video games as a medium can enhance your appreciation of the art form.
          </p>

          <div className="resource-categories">
            <div className="resource-category">
              <h3>Recommended Books</h3>
              <ul>
                <li>"The Ultimate History of Video Games" by Steven L. Kent - Comprehensive overview of the industry's development</li>
                <li>"Blood, Sweat, and Pixels" by Jason Schreier - Behind-the-scenes look at game development</li>
                <li>"Rules of Play" by Katie Salen and Eric Zimmerman - Foundational text on game design theory</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <hr />
      </main>
    </div>
  );
};

export default VideoGamesPage;
