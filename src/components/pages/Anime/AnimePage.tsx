import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';
import '../../../components/ui/MediaPages.css';
import '../../../components/ui/AnimePage.css';

const AnimePage: React.FC = () => {
  return (
    <div className="anime-page">
      <header>
        <div className="image-header">
          <img src="/images/anime/AnimeHeader.jpg" alt="Anime Overview" />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search From Anime Page"
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
            <h2>Anime Encyclopedia</h2>
            <p>Welcome to our comprehensive guide to anime. Use this table of contents to navigate to different sections.</p>

          <div className="toc-container">
            <div className="toc-column">
              <h3>Fundamentals</h3>
              <ul className="toc-list">
                <li><a href="#the-basics" className="default-links">The Basics</a></li>
                <li><a href="#history-of-anime" className="default-links">History of Anime</a> (<Link to="/anime/history" className="default-links">Full History</Link>)</li>
                <li><a href="#terminology-guide" className="default-links">Terminology Guide</a></li>
              </ul>
            </div>

            <div className="toc-column">
              <h3>Categories & Styles</h3>
              <ul className="toc-list">
                <li><a href="#anime-genres" className="default-links">Anime Genres Guide</a></li>
                <li><a href="#anime-worlds" className="default-links">Anime Worlds & Universes</a></li>
                <li><a href="#audience-categories" className="default-links">Anime for Different Audiences</a></li>
              </ul>
            </div>

            <div className="toc-column">
              <h3>Behind the Scenes</h3>
              <ul className="toc-list">
                <li><a href="#production-process" className="default-links">Production Process</a></li>
                <li><a href="#cultural-impact" className="default-links">Cultural Impact</a></li>
                <li><a href="#learning-resources" className="default-links">Learning Resources</a></li>
              </ul>
            </div>
          </div>

          <div className="info-card">
            <h4>Looking for specific anime shows or characters?</h4>
            <p>Browse our <Link to="/anime/directory" className="default-links">Anime Shows Directory</Link> to find official pages for your favorite series and characters.</p>
            <p>You can also visit our <Link to="/community#anime-section" className="default-links">Community Section</Link> to explore fan-created content about anime series, characters, and more!</p>
          </div>
        </div>
      </section>
      <hr />

      {/* The Basics Section */}
      <section id="the-basics" className="section-content">
        <div className="container">
          <h2>The Basics</h2>
          <p>
            "Anime" refers to animation originating from Japan. In Japan itself, the term "anime" (アニメ) is used for all animation regardless of origin, but internationally it has come to specifically mean Japanese-style animation. This distinctive art form is characterized by colorful graphics, vibrant characters, and fantastical themes.
          </p>
          <p>
            While anime is primarily produced in Japan, it has inspired animation studios worldwide. South Korea, China, and other countries have developed their own anime-influenced animation industries. Korean animation is often referred to as "aeni," while Chinese animation may be called "donghua."
          </p>
          <p>
            Anime is closely related to manga (Japanese comics), with many anime series being adaptations of popular manga. However, there are also original anime productions created specifically for television or film. For more on the relationship between anime and manga, see our <Link to="/manga" className="default-links">Manga page</Link>.
          </p>

          <div className="info-card">
            <h4>Key Characteristics of Anime</h4>
            <ul>
              <li><strong>Visual Style:</strong> Distinctive art style with exaggerated features like large eyes, colorful hair, and simplified facial expressions</li>
              <li><strong>Storytelling:</strong> Often features complex narratives that can span multiple episodes or seasons</li>
              <li><strong>Cultural Elements:</strong> Incorporates Japanese cultural references, traditions, and values</li>
              <li><strong>Diverse Genres:</strong> Covers a wide range of genres from action and romance to science fiction and slice of life</li>
              <li><strong>Target Demographics:</strong> Different anime are created for specific age groups and genders</li>
            </ul>
          </div>

          <p className="section-link">
            <Link to="/community#anime-basics-discussion" className="default-links">Join the Discussion on Anime Basics</Link>
          </p>
        </div>
      </section>
      <hr />

      {/* History of Anime Section */}
      <section id="history-of-anime" className="section-content">
        <div className="container">
          <h2>History of Anime</h2>
          <p>
            The evolution of anime spans over a century, developing from simple animations to the global cultural phenomenon it is today. Understanding this history helps appreciate the art form's significance and influence.
          </p>

          <div className="timeline-container">
            <div className="timeline-item">
              <div className="timeline-date">1917</div>
              <div className="timeline-content">
                <h4>Early Beginnings</h4>
                <p>The earliest known Japanese animations date back to 1917, with short works like "Namakura Gatana" (Blunt Sword) by Junichi Kouchi being among the first examples.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1930s-40s</div>
              <div className="timeline-content">
                <h4>Propaganda Era</h4>
                <p>During World War II, animation was largely used for propaganda purposes, with works supporting Japan's war efforts.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1950s-60s</div>
              <div className="timeline-content">
                <h4>The Tezuka Revolution</h4>
                <p>Osamu Tezuka, often called the "God of Manga," revolutionized both manga and anime with works like "Astro Boy" (1963), establishing many of the visual styles and storytelling approaches that would define anime.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1970s-80s</div>
              <div className="timeline-content">
                <h4>The Golden Age</h4>
                <p>This period saw the rise of robot/mecha anime like "Mobile Suit Gundam" and space operas like "Space Battleship Yamato." The 1980s brought landmark films like Hayao Miyazaki's "Nausicaä of the Valley of the Wind" and the cyberpunk classic "Akira."</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1990s</div>
              <div className="timeline-content">
                <h4>Global Expansion</h4>
                <p>Anime began to gain significant international popularity with series like "Dragon Ball Z," "Sailor Moon," and "Pokémon." Studio Ghibli films gained critical acclaim worldwide.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2000s-Present</div>
              <div className="timeline-content">
                <h4>Digital Era & Mainstream Acceptance</h4>
                <p>The transition to digital animation techniques, the rise of streaming platforms, and increasing global accessibility have made anime a mainstream entertainment medium worldwide. Hits like "Attack on Titan," "Demon Slayer," and "My Hero Academia" have achieved unprecedented international success.</p>
              </div>
            </div>
          </div>

          <h3>Key Figures in Anime History</h3>
          <div className="profile-card-grid">
            <div className="profile-card">
              <div className="profile-card-content">
                <h4 className="profile-card-title">Osamu Tezuka (1928-1989)</h4>
                <p className="profile-card-text">Known as the "God of Manga" and "Father of Anime," Tezuka created the distinctive large-eyed character style and pioneered story-driven animation with works like "Astro Boy" and "Kimba the White Lion."</p>
              </div>
            </div>

            <div className="profile-card">
              <div className="profile-card-content">
                <h4 className="profile-card-title">Hayao Miyazaki (1941-)</h4>
                <p className="profile-card-text">Co-founder of Studio Ghibli and creator of acclaimed films like "Spirited Away," "My Neighbor Totoro," and "Princess Mononoke." His works are known for their rich storytelling, environmental themes, and strong female characters.</p>
              </div>
            </div>

            <div className="profile-card">
              <div className="profile-card-content">
                <h4 className="profile-card-title">Mamoru Oshii (1951-)</h4>
                <p className="profile-card-text">Director known for philosophical and visually stunning works like "Ghost in the Shell" and "Patlabor," which have influenced science fiction cinema worldwide.</p>
              </div>
            </div>
          </div>

          <p className="section-links">
            <Link to="/anime/history" className="default-links">Read Full History of Anime</Link> |
            <Link to="/community#anime-history" className="default-links">Explore Fan Discussions</Link> |
            <Link to="/community#legendary-anime-creators" className="default-links">See Fan Tributes to Creators</Link>
          </p>
        </div>
      </section>
      <hr />

      {/* Terminology Guide Section */}
      <section id="terminology-guide" className="section-content">
        <div className="container">
          <h2>Anime Terminology Guide</h2>
          <p>
            The world of anime has developed its own unique vocabulary. Understanding these terms will enhance your appreciation and help you navigate discussions about anime.
          </p>

          <div className="terminology-container">
            <div className="terminology-category">
              <h3>Format & Production Terms</h3>
              <dl className="terminology-list">
                <dt>Cour</dt>
                <dd>A unit of television broadcasting, typically 11-13 episodes (about 3 months of weekly episodes)</dd>

                <dt>OVA/OAV</dt>
                <dd>Original Video Animation/Original Animation Video - Anime released directly to video/DVD without prior TV broadcast</dd>

                <dt>ONA</dt>
                <dd>Original Net Animation - Anime released directly to internet streaming platforms</dd>

                <dt>Sakuga</dt>
                <dd>Exceptionally high-quality animation sequences that stand out for their fluid motion and detail</dd>

                <dt>Mangaka</dt>
                <dd>A manga artist/author whose work may be adapted into anime</dd>
              </dl>
            </div>

            <div className="terminology-category">
              <h3>Storytelling & Content Terms</h3>
              <dl className="terminology-list">
                <dt>Filler</dt>
                <dd>Episodes or content not present in the original source material, often created to give the source material time to advance</dd>

                <dt>Canon</dt>
                <dd>Official content that is considered part of the main storyline</dd>

                <dt>Fanservice</dt>
                <dd>Content specifically included to please fans, often referring to sexually suggestive scenes</dd>

                <dt>Trope</dt>
                <dd>Common storytelling devices or character archetypes that appear frequently in anime</dd>

                <dt>Isekai</dt>
                <dd>A genre where protagonists are transported to another world</dd>
              </dl>
            </div>

            <div className="terminology-category">
              <h3>Character & Expression Terms</h3>
              <dl className="terminology-list">
                <dt>Chibi</dt>
                <dd>A super-deformed, childlike version of a character often used for comedic effect</dd>

                <dt>Tsundere</dt>
                <dd>A character who is initially cold or hostile before gradually showing a warmer side</dd>

                <dt>Yandere</dt>
                <dd>A character who appears loving but becomes violently possessive or psychotic</dd>

                <dt>Kawaii</dt>
                <dd>The quality of being cute or adorable</dd>

                <dt>Senpai/Kohai</dt>
                <dd>Senior/junior relationship in school or workplace settings</dd>
              </dl>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#anime-terminology" className="default-links">See Fan Discussions on Anime Terminology</Link>
            <Link to="/community#anime-slang" className="default-links">Explore Fan-Created Anime Slang Dictionary</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Anime Genres Guide Section */}
      <section id="anime-genres" className="section-content">
        <div className="container">
          <h2>Anime Genres Guide</h2>
          <p>
            Anime encompasses a diverse range of genres and storytelling styles, each with unique characteristics and appeal.
            This guide will help you understand the different types of anime and find shows that match your interests.
          </p>

          <div className="genre-navigation">
            <h3>Quick Navigation</h3>
            <div className="genre-nav-buttons">
              <a href="#popular-genres" className="default-links">Popular Genres</a>
              <a href="#demographic-genres" className="default-links">Demographic Categories</a>
              <Link to="/anime/directory#genres" className="default-links">Full Genre Directory →</Link>
            </div>
          </div>

          <div id="popular-genres" className="genre-section">
            <h3>Popular Anime Genres</h3>
            <p>Discover anime series based on your preferred storytelling styles and themes:</p>

            <div className="genre-directory">
              <div className="genre-category">
                <h4>Action & Adventure</h4>
                <p>Series featuring intense battles, exploration, and physical challenges.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Naruto, One Piece, My Hero Academia</li>
                  <li><Link to="/anime/directory#genres" className="default-links">Explore Action & Adventure Anime →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Fantasy & Supernatural</h4>
                <p>Worlds with magic, mythical creatures, and supernatural powers.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Demon Slayer, Jujutsu Kaisen, Made in Abyss</li>
                  <li><Link to="/anime/directory#genres" className="default-links">Explore Fantasy & Supernatural Anime →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Slice of Life & Comedy</h4>
                <p>Everyday experiences, relationships, and humorous situations.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> K-On!, Spy x Family, Kaguya-sama: Love is War</li>
                  <li><Link to="/anime/directory#genres" className="default-links">Explore Slice of Life & Comedy Anime →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Drama & Romance</h4>
                <p>Emotional storytelling focused on relationships and personal growth.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Your Lie in April, Violet Evergarden, Fruits Basket</li>
                  <li><Link to="/anime/directory#genres" className="default-links">Explore Drama & Romance Anime →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Sci-Fi & Mecha</h4>
                <p>Futuristic technology, space exploration, and giant robots.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Steins;Gate, Cowboy Bebop, Neon Genesis Evangelion</li>
                  <li><Link to="/anime/directory#genres" className="default-links">Explore Sci-Fi & Mecha Anime →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Mystery & Thriller</h4>
                <p>Suspenseful stories with puzzles, crimes, and psychological elements.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Death Note, Monster, Promised Neverland</li>
                  <li><Link to="/anime/directory#genres" className="default-links">Explore Mystery & Thriller Anime →</Link></li>
                </ul>
              </div>
            </div>

            <div className="view-more-container">
              <Link to="/anime/directory#genres" className="view-more-button">View All Genres in Directory</Link>
            </div>
          </div>

          <div id="demographic-genres" className="genre-section">
            <h3>Demographic Categories</h3>
            <p>Anime is often categorized by its target audience in Japan, though fans of all types enjoy them worldwide:</p>

            <div className="genre-directory">
              <div className="genre-category">
                <h4>Shounen (Young Men)</h4>
                <p>Aimed at boys and young men ages 12-18, featuring action, adventure, and coming-of-age themes.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Naruto, One Piece, My Hero Academia</li>
                  <li><Link to="/anime/directory#genres" className="default-links">Explore Shounen Anime →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Shoujo (Young Women)</h4>
                <p>Aimed at girls and young women ages 12-18, often focusing on romance and emotional growth.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Fruits Basket, Sailor Moon, Ouran High School Host Club</li>
                  <li><Link to="/anime/directory#genres" className="default-links">Explore Shoujo Anime →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Seinen (Adult Men)</h4>
                <p>Targeted at adult men (18+), with more complex themes and mature content.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Berserk, Monster, Vinland Saga</li>
                  <li><Link to="/anime/directory#genres" className="default-links">Explore Seinen Anime →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Josei (Adult Women)</h4>
                <p>Targeted at adult women (18+), featuring realistic relationships and mature themes.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Nana, Usagi Drop, Chihayafuru</li>
                  <li><Link to="/anime/directory#genres" className="default-links">Explore Josei Anime →</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="genre-resources">
            <h3>Finding Your Perfect Anime</h3>
            <p>Not sure where to start? Here are some resources to help you discover anime based on your interests:</p>
            <ul className="resource-links">
              <li><Link to="/anime/directory" className="default-links">Browse Our Anime Shows Directory</Link></li>
              <li><Link to="/anime/directory#popular-series" className="default-links">Popular Series for Beginners</Link></li>
              <li><Link to="/anime/directory#genres" className="default-links">Browse by Genre</Link></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Production Process Section */}
      <section id="production-process" className="section-content">
        <div className="container">
          <h2>Anime Production Process</h2>
          <p>
            Creating anime is a complex, collaborative process involving multiple stages and specialized teams. Understanding how anime is made provides insight into the artistry and effort behind your favorite series.
          </p>

          <div className="production-stages">
            <div className="production-stage">
              <h3>1. Pre-Production</h3>
              <ul>
                <li><strong>Planning:</strong> Determining the concept, target audience, budget, and schedule</li>
                <li><strong>Script Writing:</strong> Creating the story, dialogue, and scene descriptions</li>
                <li><strong>Character Design:</strong> Developing the visual appearance and personalities of characters</li>
                <li><strong>Storyboarding:</strong> Creating visual outlines of each scene with camera angles and movements</li>
              </ul>
            </div>

            <div className="production-stage">
              <h3>2. Production</h3>
              <ul>
                <li><strong>Layout:</strong> Determining the positioning of characters and objects in each scene</li>
                <li><strong>Key Animation:</strong> Drawing the important frames that define major movements</li>
                <li><strong>In-between Animation:</strong> Creating the frames between key animations for smooth movement</li>
                <li><strong>Background Art:</strong> Creating the environments and settings</li>
                <li><strong>Coloring:</strong> Adding colors to the line art (traditionally done by hand, now often digital)</li>
              </ul>
            </div>

            <div className="production-stage">
              <h3>3. Post-Production</h3>
              <ul>
                <li><strong>Compositing:</strong> Combining animated characters with backgrounds and effects</li>
                <li><strong>Voice Acting:</strong> Recording dialogue and character voices</li>
                <li><strong>Sound Design:</strong> Creating and adding sound effects</li>
                <li><strong>Music:</strong> Composing and recording background music and theme songs</li>
                <li><strong>Editing:</strong> Assembling all elements into the final product</li>
              </ul>
            </div>
          </div>

          <h4>Key Studios in Anime Production</h4>
          <div className="info-card-grid">
            <div className="info-card">
              <h5>Studio Ghibli</h5>
              <p>Known for high-quality feature films with rich storytelling and beautiful animation</p>
              <p><strong>Notable Works:</strong> Spirited Away, My Neighbor Totoro, Princess Mononoke</p>
            </div>

            <div className="info-card">
              <h5>Kyoto Animation</h5>
              <p>Renowned for exceptional animation quality and attention to detail</p>
              <p><strong>Notable Works:</strong> Violet Evergarden, A Silent Voice, K-On!</p>
            </div>

            <div className="info-card">
              <h5>MAPPA</h5>
              <p>Modern studio known for taking on challenging and diverse projects</p>
              <p><strong>Notable Works:</strong> Attack on Titan (Final Season), Jujutsu Kaisen, Chainsaw Man</p>
            </div>

            <div className="info-card">
              <h5>Bones</h5>
              <p>Known for action-packed series with fluid animation</p>
              <p><strong>Notable Works:</strong> Fullmetal Alchemist: Brotherhood, My Hero Academia, Mob Psycho 100</p>
            </div>
          </div>

          <p className="section-links">
            <Link to="/community#animation-techniques" className="default-links">Explore Animation Techniques</Link> |
            <Link to="/community#favorite-studios" className="default-links">See Fan Rankings of Studios</Link>
          </p>
        </div>
      </section>
      <hr />

      {/* Cultural Impact Section */}
      <section id="cultural-impact" className="section-content">
        <div className="container">
          <h2>Cultural Impact of Anime</h2>
          <p>
            Anime has grown from a niche Japanese medium to a global cultural phenomenon, influencing art, entertainment, fashion, and technology worldwide.
          </p>

          <div className="impact-areas">
            <div className="impact-area">
              <h3>Global Influence</h3>
              <p>
                Anime has transcended cultural boundaries to become a worldwide phenomenon. Its unique storytelling approaches and visual styles have influenced Western animation, filmmaking, and art. The global anime market was valued at over $24 billion in 2021 and continues to grow rapidly.
              </p>
              <p>
                Major streaming platforms like Netflix, Crunchyroll, and Funimation have invested heavily in anime, making it more accessible than ever to international audiences. This has led to unprecedented growth in anime fandom outside Japan.
              </p>
            </div>

            <div className="impact-area">
              <h3>Fan Culture</h3>
              <p>
                Anime has fostered vibrant fan communities worldwide, characterized by:
              </p>
              <ul>
                <li><strong>Conventions:</strong> Events like Anime Expo, Comiket, and Anime Japan attract hundreds of thousands of attendees</li>
                <li><strong>Cosplay:</strong> The practice of dressing as anime characters has become a major creative subculture</li>
                <li><strong>Fan Art & Fan Fiction:</strong> Fans create their own artwork and stories based on anime properties</li>
                <li><strong>Online Communities:</strong> Forums, social media groups, and websites dedicated to discussing and celebrating anime</li>
              </ul>
            </div>

            <div className="impact-area">
              <h3>Cultural Exchange</h3>
              <p>
                Anime has served as a cultural ambassador for Japan, introducing international audiences to Japanese language, customs, food, history, and values. Many fans have been inspired to learn Japanese or visit Japan after developing an interest in anime.
              </p>
              <p>
                Conversely, anime has also been influenced by global cultures, incorporating elements from Western storytelling, mythology, and aesthetics to create unique cross-cultural narratives.
              </p>
            </div>

            <div className="impact-area">
              <h3>Technological Innovation</h3>
              <p>
                The anime industry has driven innovation in animation techniques, from traditional cel animation to cutting-edge CGI and digital compositing. Studios continually push boundaries in visual storytelling, influencing animation worldwide.
              </p>
              <p>
                The rise of digital distribution platforms specifically for anime has also pioneered new models for global content distribution and monetization.
              </p>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#anime-impact" className="default-links">Join Discussions on Anime's Cultural Impact</Link>
            <Link to="/community#anime-conventions" className="default-links">Explore Fan Convention Experiences</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Anime Worlds & Universes Section */}
      <section id="anime-worlds" className="section-content">
        <div className="container">
          <h2>Anime Worlds & Universes</h2>
          <p>
            One of anime's greatest strengths is its ability to create immersive, richly detailed fictional worlds. From post-apocalyptic landscapes to magical realms, these universes captivate viewers with their depth and creativity.
          </p>

          <div className="world-categories">
            <div className="world-category">
              <h3>Fantasy Realms</h3>
              <p>Magical worlds with their own rules, creatures, and power systems</p>
              <div className="world-examples">
                <div className="world-example">
                  <h4>The World of Naruto</h4>
                  <p>A world of ninja villages where shinobi harness chakra to perform supernatural abilities</p>
                  <Link to="/anime/directory#universes" className="default-links">Explore the Naruto Universe in Shows Directory</Link>
                </div>

                <div className="world-example">
                  <h4>One Piece's Grand Line</h4>
                  <p>A vast ocean world divided by the Grand Line, filled with islands, pirates, and mysterious Devil Fruits</p>
                  <Link to="/anime/directory#universes" className="default-links">Discover the Grand Line in Shows Directory</Link>
                </div>
              </div>
            </div>

            <div className="world-category">
              <h3>Futuristic Settings</h3>
              <p>Advanced technological societies, dystopian futures, and space frontiers</p>
              <div className="world-examples">
                <div className="world-example">
                  <h4>Ghost in the Shell's Cyber Society</h4>
                  <p>A future where human consciousness can be digitized and cybernetic enhancements are commonplace</p>
                  <Link to="/anime/directory#universes" className="default-links">Explore Cyber Society in Shows Directory</Link>
                </div>

                <div className="world-example">
                  <h4>Attack on Titan's Walled City</h4>
                  <p>A society enclosed by massive walls to protect humanity from giant humanoid creatures</p>
                  <Link to="/anime/directory#universes" className="default-links">Discover the Walls in Shows Directory</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="world-building-elements">
            <h3>Elements of Anime World-Building</h3>
            <ul>
              <li><strong>Power Systems:</strong> Unique rules governing special abilities (chakra, nen, quirks, etc.)</li>
              <li><strong>Social Structures:</strong> Hierarchies, organizations, and political systems</li>
              <li><strong>Geography:</strong> Distinctive locations, landscapes, and environments</li>
              <li><strong>History & Lore:</strong> Backstories, legends, and historical events that shape the world</li>
              <li><strong>Technology & Magic:</strong> Tools, weapons, and supernatural elements unique to the setting</li>
            </ul>
          </div>

          <div className="info-card">
            <h4>Explore Anime Worlds in Our Shows Directory</h4>
            <p>Our shows directory features official information about your favorite anime universes, including character profiles, location guides, power system explanations, and more!</p>
            <p><Link to="/anime/directory" className="default-links">Browse All Anime Shows</Link></p>
          </div>
        </div>
      </section>
      <hr />

      {/* Audience Categories Section */}
      <section id="audience-categories" className="section-content">
        <div className="container">
          <h2>Anime for Different Audiences</h2>
          <p>
            One of anime's strengths is its diversity, offering content for viewers of all ages, interests, and experience levels. Whether you're new to anime or a seasoned fan, there's something for everyone.
          </p>

          <div className="audience-categories">
            <div className="audience-category">
              <h3>For Beginners</h3>
              <p>These accessible series serve as excellent entry points to anime, featuring compelling stories and universal themes:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Fullmetal Alchemist: Brotherhood</strong> - A perfect blend of action, drama, and fantasy with a complete, satisfying story
                  <Link to="/anime/directory#popular-series" className="default-links">View Show Details</Link>
                </li>
                <li>
                  <strong>Death Note</strong> - A psychological thriller about a student who discovers a notebook that kills anyone whose name is written in it
                  <Link to="/anime/directory#popular-series" className="default-links">View Show Details</Link>
                </li>
                <li>
                  <strong>My Hero Academia</strong> - A superhero story set in a world where most people have powers, following a powerless boy's journey to become a hero
                  <Link to="/anime/directory#popular-series" className="default-links">View Show Details</Link>
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>Classic Series</h3>
              <p>These influential works have stood the test of time and helped shape anime as we know it today:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Cowboy Bebop</strong> - A stylish space western following bounty hunters with troubled pasts
                  <Link to="/anime/directory#eras" className="default-links">View Show Details</Link>
                </li>
                <li>
                  <strong>Neon Genesis Evangelion</strong> - A psychological mecha drama that deconstructs the genre while exploring deep themes
                  <Link to="/anime/directory#eras" className="default-links">View Show Details</Link>
                </li>
                <li>
                  <strong>Dragon Ball</strong> - The martial arts adventure that popularized anime worldwide
                  <Link to="/anime/directory#eras" className="default-links">View Show Details</Link>
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>Recent Hits</h3>
              <p>These newer series represent the current generation of popular anime:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Demon Slayer</strong> - A visually stunning tale of a boy hunting demons in Taisho-era Japan
                  <Link to="/anime/directory#popular-series" className="default-links">View Show Details</Link>
                </li>
                <li>
                  <strong>Jujutsu Kaisen</strong> - A dark fantasy about students battling curses with supernatural powers
                  <Link to="/anime/directory#popular-series" className="default-links">View Show Details</Link>
                </li>
                <li>
                  <strong>Spy x Family</strong> - A charming blend of action and comedy about a spy who must create a fake family
                  <Link to="/anime/directory#popular-series" className="default-links">View Show Details</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="info-card">
            <h4>Find Your Next Favorite Anime</h4>
            <p>Looking for more anime to watch? Browse our comprehensive shows directory to discover series based on your interests and preferences.</p>
            <p><Link to="/anime/directory" className="default-links">Browse All Anime Shows</Link></p>
          </div>
        </div>
      </section>
      <hr />

      {/* Learning Resources Section */}
      <section id="learning-resources" className="section-content">
        <div className="container">
          <h2>Learning Resources</h2>
          <p>
            Whether you're new to anime or looking to deepen your knowledge, these resources will help you navigate and appreciate the world of anime.
          </p>

          <h3>Beginner's Guides</h3>
          <div className="info-card-grid">
            <div className="info-card">
              <h4>Getting Started with Anime</h4>
              <p>A comprehensive introduction to anime for complete beginners, covering basic terminology, common genres, and recommended first series.</p>
              <p><Link to="/community#anime-beginners-guide" className="default-links">Read the Guide</Link></p>
            </div>

            <div className="info-card">
              <h4>Anime Viewing Guide</h4>
              <p>Information on where to watch anime legally, understanding subtitles vs. dubbing, and how to keep track of series you're watching.</p>
              <p><Link to="/community#anime-viewing-guide" className="default-links">Read the Guide</Link></p>
            </div>
          </div>

          <h3>Finding What to Watch</h3>
          <div className="info-card-grid">
            <div className="info-card">
              <h4>Anime Recommendation Flowchart</h4>
              <p>An interactive tool to help you find anime based on your preferences and interests.</p>
              <p><Link to="/community#anime-flowchart" className="default-links">Use the Flowchart</Link></p>
            </div>

            <div className="info-card">
              <h4>Seasonal Anime Guide</h4>
              <p>Information about the seasonal nature of anime releases and highlights from current and upcoming seasons.</p>
              <p><Link to="/community#seasonal-anime" className="default-links">View Current Season</Link></p>
            </div>
          </div>

          <h3>Deepening Your Knowledge</h3>
          <div className="info-card-grid">
            <div className="info-card">
              <h4>Anime Analysis Resources</h4>
              <p>Guides to understanding anime on a deeper level, including visual techniques, storytelling patterns, and cultural context.</p>
              <p><Link to="/community#anime-analysis" className="default-links">Explore Analysis Resources</Link></p>
            </div>

            <div className="info-card">
              <h4>Japanese Language in Anime</h4>
              <p>Introduction to common Japanese phrases and concepts encountered in anime, and how anime can be used as a language learning tool.</p>
              <p><Link to="/community#anime-japanese" className="default-links">Learn More</Link></p>
            </div>
          </div>

          <h3>Community-Created Resources</h3>
          <p>Our community members have created valuable resources to help fellow anime fans:</p>
          <div className="info-card-grid">
            <div className="info-card">
              <h4>Fan-Made Viewing Orders</h4>
              <p>Guides for navigating complex franchises with multiple seasons, films, and spin-offs</p>
              <p><Link to="/community#viewing-orders" className="default-links">See Viewing Orders</Link></p>
            </div>

            <div className="info-card">
              <h4>Anime Watchlists</h4>
              <p>Curated lists of anime based on themes, genres, or recommendations for specific interests</p>
              <p><Link to="/community#anime-watchlists" className="default-links">Browse Watchlists</Link></p>
            </div>

            <div className="info-card">
              <h4>Anime Discussion Guides</h4>
              <p>Resources for hosting anime viewing parties or discussion groups</p>
              <p><Link to="/community#discussion-guides" className="default-links">Get Discussion Guides</Link></p>
            </div>

            <div className="info-card">
              <h4>Anime Glossary</h4>
              <p>An extensive dictionary of anime-related terms maintained by community members</p>
              <p><Link to="/community#anime-glossary" className="default-links">View Glossary</Link></p>
            </div>
          </div>

          <div className="info-card">
            <h4>Contribute Your Knowledge</h4>
            <p>Have expertise or insights about anime you'd like to share? Join our community and contribute to our growing collection of anime resources!</p>
            <p><Link to="/community#contribute-resources" className="default-links">Contribute to Resources</Link></p>
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

export default AnimePage;
