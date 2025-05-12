import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';
import '../../../components/ui/MediaPages.css';
import '../../../components/ui/AnimePage.css';
import TableOfContents, { TocSectionProps } from '../../../components/ui/TableOfContents';

const AnimePage: React.FC = () => {
  // Define TOC sections
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Basics", anchor: "#the-basics" },
        { label: "History", anchor: "#history-of-anime" },
        { label: "Terms", anchor: "#terminology-guide" }
      ],
      deepLinks: [
        { label: "Full History", path: "/anime/history", exists: true }
      ]
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Genres", anchor: "#anime-genres" },
        { label: "Worlds", anchor: "#anime-worlds" },
        { label: "Audience", anchor: "#audience-categories" }
      ],
      deepLinks: [
        { label: "Directory", path: "/anime/directory", exists: true }
      ]
    },
    {
      title: "BEHIND THE SCENES",
      quickLinks: [
        { label: "Process", anchor: "#production-process" },
        { label: "Impact", anchor: "#cultural-impact" },
        { label: "Resources", anchor: "#learning-resources" }
      ],
      deepLinks: []
    }
  ];

  return (
    <div className="anime-page">
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
          title="Anime Encyclopedia"
          description="Use this table of contents to navigate through the anime guide."
        />



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
            <Link to="/anime/history" className="default-links">Read Full History of Anime</Link>
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

          <div id="popular-genres" className="genre-section">
            <h3>Popular Anime Genres</h3>
            <p>Discover anime series based on your preferred storytelling styles and themes:</p>

            <div className="genre-directory">
              <div className="genre-category">
                <h4>Action & Adventure</h4>
                <p>Series featuring intense battles, exploration, and physical challenges.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Naruto, One Piece, My Hero Academia</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Fantasy & Supernatural</h4>
                <p>Worlds with magic, mythical creatures, and supernatural powers.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Demon Slayer, Jujutsu Kaisen, Made in Abyss</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Slice of Life & Comedy</h4>
                <p>Everyday experiences, relationships, and humorous situations.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> K-On!, Spy x Family, Kaguya-sama: Love is War</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Drama & Romance</h4>
                <p>Emotional storytelling focused on relationships and personal growth.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Your Lie in April, Violet Evergarden, Fruits Basket</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Sci-Fi & Mecha</h4>
                <p>Futuristic technology, space exploration, and giant robots.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Steins;Gate, Cowboy Bebop, Neon Genesis Evangelion</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Mystery & Thriller</h4>
                <p>Suspenseful stories with puzzles, crimes, and psychological elements.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Death Note, Monster, Promised Neverland</li>
                </ul>
              </div>
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
                </ul>
              </div>

              <div className="genre-category">
                <h4>Shoujo (Young Women)</h4>
                <p>Aimed at girls and young women ages 12-18, often focusing on romance and emotional growth.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Fruits Basket, Sailor Moon, Ouran High School Host Club</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Seinen (Adult Men)</h4>
                <p>Targeted at adult men (18+), with more complex themes and mature content.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Berserk, Monster, Vinland Saga</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Josei (Adult Women)</h4>
                <p>Targeted at adult women (18+), featuring realistic relationships and mature themes.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Nana, Usagi Drop, Chihayafuru</li>
                </ul>
              </div>
            </div>
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
              <h3>Global Influence</h3>
              <p>
                Anime has transcended cultural boundaries to become a worldwide phenomenon. Its unique storytelling approaches and visual styles have influenced Western animation, filmmaking, and art. The global anime market was valued at over $24 billion in 2021 and continues to grow rapidly.
              </p>
              <p>
                Major streaming platforms like Netflix, Crunchyroll, and Funimation have invested heavily in anime, making it more accessible than ever to international audiences. This has led to unprecedented growth in anime fandom outside Japan.
              </p>
            </div>
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
              <h3>Cultural Exchange</h3>
              <p>
                Anime has served as a cultural ambassador for Japan, introducing international audiences to Japanese language, customs, food, history, and values. Many fans have been inspired to learn Japanese or visit Japan after developing an interest in anime.
              </p>
              <p>
                Conversely, anime has also been influenced by global cultures, incorporating elements from Western storytelling, mythology, and aesthetics to create unique cross-cultural narratives.
              </p>
              <h3>Technological Innovation</h3>
              <p>
                The anime industry has driven innovation in animation techniques, from traditional cel animation to cutting-edge CGI and digital compositing. Studios continually push boundaries in visual storytelling, influencing animation worldwide.
              </p>
              <p>
                The rise of digital distribution platforms specifically for anime has also pioneered new models for global content distribution and monetization.
              </p>
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

                </div>

                <div className="world-example">
                  <h4>One Piece's Grand Line</h4>
                  <p>A vast ocean world divided by the Grand Line, filled with islands, pirates, and mysterious Devil Fruits</p>

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

                </div>

                <div className="world-example">
                  <h4>Attack on Titan's Walled City</h4>
                  <p>A society enclosed by massive walls to protect humanity from giant humanoid creatures</p>

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
                </li>
                <li>
                  <strong>Death Note</strong> - A psychological thriller about a student who discovers a notebook that kills anyone whose name is written in it
                </li>
                <li>
                  <strong>My Hero Academia</strong> - A superhero story set in a world where most people have powers, following a powerless boy's journey to become a hero
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>Classic Series</h3>
              <p>These influential works have stood the test of time and helped shape anime as we know it today:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Cowboy Bebop</strong> - A stylish space western following bounty hunters with troubled pasts
                </li>
                <li>
                  <strong>Neon Genesis Evangelion</strong> - A psychological mecha drama that deconstructs the genre while exploring deep themes
                </li>
                <li>
                  <strong>Dragon Ball</strong> - The martial arts adventure that popularized anime worldwide
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>Recent Hits</h3>
              <p>These newer series represent the current generation of popular anime:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Demon Slayer</strong> - A visually stunning tale of a boy hunting demons in Taisho-era Japan
                </li>
                <li>
                  <strong>Jujutsu Kaisen</strong> - A dark fantasy about students battling curses with supernatural powers
                </li>
                <li>
                  <strong>Spy x Family</strong> - A charming blend of action and comedy about a spy who must create a fake family
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
            Understanding anime as a medium can enhance your appreciation of the art form.
          </p>

          <div className="resource-categories">
            <div className="resource-category">
              <h3>Recommended Books</h3>
              <ul>
                <li>"Anime: A History" by Jonathan Clements - Comprehensive overview of anime's development</li>
                <li>"The Anime Encyclopedia" by Jonathan Clements and Helen McCarthy - Reference guide to anime</li>
                <li>"Starting Point" by Hayao Miyazaki - Essays and interviews with the Studio Ghibli founder</li>
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

export default AnimePage;
