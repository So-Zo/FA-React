import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';
import '../../../components/ui/MediaPages.css';
import '../../../components/ui/MangaPage.css';

const MangaPage: React.FC = () => {
  return (
    <div className="manga-page">
      <header role="banner">
        <div className="header-image">
          <img src="/images/manga/MangaHeader.jpg" alt="Manga Overview" />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search From Manga Page"
          placeholder="Search for Characters, Universes, etc."
          data-search-type="manga"
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
          <h2>Manga Encyclopedia</h2>
          <p>Welcome to our comprehensive guide to manga. Use this table of contents to navigate to different sections.</p>

          <div className="toc-container">
            <div className="toc-column">
              <h3>Fundamentals</h3>
              <ul className="toc-list">
                <li><a href="#the-basics" className="default-links">The Basics</a></li>
                <li><a href="#history-of-manga" className="default-links">History of Manga</a> (<Link to="/manga/history" className="default-links">Full History</Link>)</li>
                <li><a href="#terminology-guide" className="default-links">Terminology Guide</a></li>
              </ul>
            </div>

            <div className="toc-column">
              <h3>Categories & Styles</h3>
              <ul className="toc-list">
                <li><a href="#manga-genres" className="default-links">Manga Genres Guide</a></li>
                <li><a href="#manga-worlds" className="default-links">Manga Worlds & Universes</a></li>
                <li><a href="#audience-categories" className="default-links">Manga for Different Audiences</a></li>
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

          <div className="community-connection">
            <h4>Looking for specific manga series or characters?</h4>
            <p>Browse our <Link to="/manga/directory" className="default-links">Manga Shows Directory</Link> to find official pages for your favorite series and characters.</p>
            <p>You can also visit our <Link to="/community#manga-section" className="default-links">Community Section</Link> to explore fan-created content about manga series, characters, and more!</p>
          </div>
        </div>
      </section>
      <hr />

      {/* The Basics Section */}
      <section id="the-basics" className="section-content">
        <div className="container">
          <h2>The Basics</h2>
          <p>
            "Manga" refers to comics or graphic novels originating from Japan. In Japan, the term "manga" (漫画) is used for all comics regardless of origin, but internationally it has come to specifically mean Japanese-style comics. This distinctive art form is characterized by its unique visual style, storytelling techniques, and diverse genres.
          </p>

          <p>
            While manga is primarily produced in Japan, it has inspired comic artists worldwide. Korean comics are often referred to as "manhwa," while Chinese comics may be called "manhua." These neighboring traditions share some visual elements with manga but have their own distinct characteristics.
          </p>

          <p>
            Manga is closely related to anime (Japanese animation), with many anime series being adaptations of popular manga. However, the manga medium has its own unique strengths, including distinctive art styles, pacing, and storytelling approaches. For more on the relationship between manga and anime, see our <Link to="/anime" className="default-links">Anime page</Link>.
          </p>

          <div className="info-box">
            <h4>Key Characteristics of Manga</h4>
            <ul>
              <li><strong>Reading Direction:</strong> Traditional manga is read right-to-left, opposite to Western comics</li>
              <li><strong>Visual Style:</strong> Distinctive art style with expressive eyes, simplified facial features, and dynamic action lines</li>
              <li><strong>Storytelling:</strong> Often features long-form narratives that can span dozens or even hundreds of volumes</li>
              <li><strong>Publication Format:</strong> Typically serialized in magazines before being collected into tankōbon (collected volumes)</li>
              <li><strong>Diverse Genres:</strong> Covers an extremely wide range of genres and topics for all ages and interests</li>
            </ul>
          </div>

          <div className="community-connection">
            <Link to="/community#manga-basics-discussion" className="default-links">Join the Discussion on Manga Basics →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* History of Manga Section */}
      <section id="history-of-manga" className="section-content">
        <div className="container">
          <h2>History of Manga</h2>
          <p>
            The evolution of manga spans centuries, developing from traditional Japanese art to the global cultural phenomenon it is today. Understanding this history helps appreciate the art form's significance and influence.
          </p>

          <div className="timeline-container">
            <div className="timeline-item">
              <div className="timeline-date">12th Century</div>
              <div className="timeline-content">
                <h4>Early Beginnings</h4>
                <p>The earliest precursors to manga can be traced back to the 12th century with the Chōjū-giga (Animal Scrolls), which depicted animals behaving as humans in a satirical manner.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">17th-19th Century</div>
              <div className="timeline-content">
                <h4>Ukiyo-e & Kibyōshi</h4>
                <p>Ukiyo-e woodblock prints and kibyōshi (yellow-cover books) featured illustrations with text, establishing narrative art traditions that would influence modern manga.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Early 20th Century</div>
              <div className="timeline-content">
                <h4>Western Influence</h4>
                <p>Japanese artists began incorporating elements from Western comics and cartoons, creating early comic strips for newspapers and magazines.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1950s-60s</div>
              <div className="timeline-content">
                <h4>The Tezuka Revolution</h4>
                <p>Osamu Tezuka, often called the "God of Manga," revolutionized the medium with works like "Astro Boy" and "Princess Knight," establishing many of the visual styles and storytelling approaches that would define manga.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1970s-80s</div>
              <div className="timeline-content">
                <h4>Diversification</h4>
                <p>This period saw the rise of diverse genres and demographics, including shōjo manga (girls' comics) by artists like Moto Hagio and Keiko Takemiya, and seinen manga (men's comics) exploring more mature themes.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1990s-Present</div>
              <div className="timeline-content">
                <h4>Global Expansion & Digital Era</h4>
                <p>Manga gained significant international popularity with series like "Dragon Ball," "Sailor Moon," and "Naruto." The transition to digital creation techniques and online distribution has further expanded manga's global reach and accessibility.</p>
              </div>
            </div>
          </div>

          <div className="key-figures">
            <h3>Key Figures in Manga History</h3>
            <div className="figure-cards">
              <div className="figure-card">
                <h4>Osamu Tezuka (1928-1989)</h4>
                <p>Known as the "God of Manga," Tezuka created over 700 manga series including "Astro Boy," "Black Jack," and "Buddha." His cinematic storytelling techniques and innovative visual style revolutionized the medium.</p>
              </div>

              <div className="figure-card">
                <h4>Rumiko Takahashi (1957-)</h4>
                <p>One of the most successful manga artists in history, Takahashi created popular series like "Inuyasha," "Ranma ½," and "Urusei Yatsura," known for their blend of comedy, action, and romance.</p>
              </div>

              <div className="figure-card">
                <h4>Naoki Urasawa (1960-)</h4>
                <p>Creator of critically acclaimed series like "Monster," "20th Century Boys," and "Pluto," known for complex psychological narratives and realistic art style.</p>
              </div>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/manga/history" className="default-links">Read Full History of Manga →</Link>
            <Link to="/community#manga-history" className="default-links">Explore Fan Discussions on Manga History →</Link>
            <Link to="/community#legendary-manga-creators" className="default-links">See Fan Tributes to Legendary Creators →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Terminology Guide Section */}
      <section id="terminology-guide" className="section-content">
        <div className="container">
          <h2>Manga Terminology Guide</h2>
          <p>
            The world of manga has developed its own unique vocabulary. Understanding these terms will enhance your appreciation and help you navigate discussions about manga.
          </p>

          <div className="terminology-container">
            <div className="terminology-category">
              <h3>Format & Publication Terms</h3>
              <dl className="terminology-list">
                <dt>Tankōbon</dt>
                <dd>Collected volumes of manga chapters that were previously serialized in magazines</dd>

                <dt>Mangaka</dt>
                <dd>A manga artist/author</dd>

                <dt>Yonkoma</dt>
                <dd>Four-panel comic strips, often used for gag manga</dd>

                <dt>Doujinshi</dt>
                <dd>Self-published manga, often created by fans of existing works</dd>

                <dt>Gekiga</dt>
                <dd>Dramatic, mature manga aimed at adult audiences</dd>
              </dl>
            </div>

            <div className="terminology-category">
              <h3>Visual & Storytelling Terms</h3>
              <dl className="terminology-list">
                <dt>Furigana</dt>
                <dd>Small hiragana characters printed above kanji to indicate pronunciation</dd>

                <dt>Sound Effects</dt>
                <dd>Stylized text representing sounds, often integrated into the artwork</dd>

                <dt>Panels</dt>
                <dd>Individual frames that contain the manga's illustrations</dd>

                <dt>Speech Bubbles</dt>
                <dd>Enclosed areas containing character dialogue</dd>

                <dt>Thought Bubbles</dt>
                <dd>Cloud-like bubbles showing a character's thoughts</dd>
              </dl>
            </div>

            <div className="terminology-category">
              <h3>Demographic Categories</h3>
              <dl className="terminology-list">
                <dt>Shōnen</dt>
                <dd>Manga targeted primarily at boys and young men (ages 12-18)</dd>

                <dt>Shōjo</dt>
                <dd>Manga targeted primarily at girls and young women (ages 12-18)</dd>

                <dt>Seinen</dt>
                <dd>Manga targeted at adult men (18+)</dd>

                <dt>Josei</dt>
                <dd>Manga targeted at adult women (18+)</dd>

                <dt>Kodomomuke</dt>
                <dd>Manga for young children</dd>
              </dl>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#manga-terminology" className="default-links">See Fan Discussions on Manga Terminology →</Link>
            <Link to="/community#manga-reading-guide" className="default-links">Explore Fan-Created Manga Reading Guide →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Manga Genres Guide Section */}
      <section id="manga-genres" className="section-content">
        <div className="container">
          <h2>Manga Genres Guide</h2>
          <p>
            Manga encompasses a diverse range of genres and storytelling styles, each with unique characteristics and appeal.
            This guide will help you understand the different types of manga and find series that match your interests.
          </p>

          <div className="genre-navigation">
            <h3>Quick Navigation</h3>
            <div className="genre-nav-buttons">
              <a href="#popular-genres" className="default-links">Popular Genres</a>
              <a href="#demographic-genres" className="default-links">Demographic Categories</a>
              <Link to="/manga/directory#genres" className="default-links">Full Genre Directory →</Link>
            </div>
          </div>

          <div id="popular-genres" className="genre-section">
            <h3>Popular Manga Genres</h3>
            <p>Discover manga series based on your preferred storytelling styles and themes:</p>

            <div className="genre-directory">
              <div className="genre-category">
                <h4>Shōnen Battle</h4>
                <p>Action-focused manga featuring protagonists who grow stronger through training and combat.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Dragon Ball, One Piece, Naruto, My Hero Academia</li>
                  <li><Link to="/manga/directory#genres" className="default-links">Explore Shōnen Battle Manga →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Slice of Life</h4>
                <p>Focuses on the everyday experiences of characters, often with a warm or comedic tone.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Yotsuba&!, Barakamon, Silver Spoon</li>
                  <li><Link to="/manga/directory#genres" className="default-links">Explore Slice of Life Manga →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Horror</h4>
                <p>Designed to evoke fear through disturbing imagery and unsettling narratives.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Junji Ito's works (Uzumaki, Tomie), Parasyte</li>
                  <li><Link to="/manga/directory#genres" className="default-links">Explore Horror Manga →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Romance</h4>
                <p>Focuses on romantic relationships between characters and emotional connections.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Kimi ni Todoke, Horimiya, Kaguya-sama</li>
                  <li><Link to="/manga/directory#genres" className="default-links">Explore Romance Manga →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Fantasy</h4>
                <p>Set in fantastical worlds with elements like magic and supernatural powers.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Berserk, Made in Abyss, The Ancient Magus' Bride</li>
                  <li><Link to="/manga/directory#genres" className="default-links">Explore Fantasy Manga →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Sports</h4>
                <p>Centers around competitive sports and athletes, focusing on teamwork and growth.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Haikyuu!!, Slam Dunk, Blue Lock</li>
                  <li><Link to="/manga/directory#genres" className="default-links">Explore Sports Manga →</Link></li>
                </ul>
              </div>
            </div>

            <div className="view-more-container">
              <Link to="/manga/directory#genres" className="view-more-button">View All Genres in Directory</Link>
            </div>
          </div>

          <div id="demographic-genres" className="genre-section">
            <h3>Demographic Categories</h3>
            <p>Manga is often categorized by its target audience in Japan, though fans of all types enjoy them worldwide:</p>

            <div className="genre-directory">
              <div className="genre-category">
                <h4>Shōnen (Young Men)</h4>
                <p>Aimed at boys and young men ages 12-18, featuring action, adventure, and coming-of-age themes.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> One Piece, Naruto, My Hero Academia</li>
                  <li><Link to="/manga/directory#demographics" className="default-links">Explore Shōnen Manga →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Shōjo (Young Women)</h4>
                <p>Aimed at girls and young women ages 12-18, often focusing on romance and emotional growth.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Fruits Basket, Ouran High School Host Club, Nana</li>
                  <li><Link to="/manga/directory#demographics" className="default-links">Explore Shōjo Manga →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Seinen (Adult Men)</h4>
                <p>Targeted at adult men (18+), with more complex themes and mature content.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Berserk, Vagabond, Vinland Saga</li>
                  <li><Link to="/manga/directory#demographics" className="default-links">Explore Seinen Manga →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Josei (Adult Women)</h4>
                <p>Targeted at adult women (18+), featuring realistic relationships and mature themes.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Chihayafuru, Honey and Clover, Wotakoi</li>
                  <li><Link to="/manga/directory#demographics" className="default-links">Explore Josei Manga →</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="genre-resources">
            <h3>Finding Your Perfect Manga</h3>
            <p>Not sure where to start? Here are some resources to help you discover manga based on your interests:</p>
            <ul className="resource-links">
              <li><Link to="/manga/directory" className="default-links">Browse Our Manga Shows Directory</Link></li>
              <li><Link to="/manga/directory#popular-series" className="default-links">Popular Series for Beginners</Link></li>
              <li><Link to="/manga/directory#genres" className="default-links">Browse by Genre</Link></li>
            </ul>
          </div>
        </div>
      </section>
      <hr />

      {/* Production Process Section */}
      <section id="production-process" className="section-content">
        <div className="container">
          <h2>Manga Production Process</h2>
          <p>
            Creating manga is a labor-intensive process that combines artistic skill with storytelling ability. Understanding how manga is made provides insight into the craft and effort behind your favorite series.
          </p>

          <div className="production-stages">
            <div className="production-stage">
              <h3>1. Planning & Story Development</h3>
              <ul>
                <li><strong>Concept Creation:</strong> Developing the initial idea, characters, and world</li>
                <li><strong>Plotting:</strong> Outlining the story arc and individual chapters</li>
                <li><strong>Character Design:</strong> Creating the visual appearance and personalities of characters</li>
                <li><strong>Editor Consultation:</strong> Working with editors to refine the concept and approach</li>
              </ul>
            </div>

            <div className="production-stage">
              <h3>2. Drawing Process</h3>
              <ul>
                <li><strong>Thumbnailing:</strong> Creating rough sketches of page layouts</li>
                <li><strong>Penciling:</strong> Drawing detailed pencil versions of each page</li>
                <li><strong>Inking:</strong> Tracing over pencil lines with ink for final line art</li>
                <li><strong>Screentoning:</strong> Adding patterns and shading for depth and texture</li>
                <li><strong>Lettering:</strong> Adding dialogue, sound effects, and other text</li>
              </ul>
            </div>

            <div className="production-stage">
              <h3>3. Publication</h3>
              <ul>
                <li><strong>Serialization:</strong> Publishing chapters in weekly or monthly magazines</li>
                <li><strong>Tankōbon Collection:</strong> Compiling chapters into collected volumes</li>
                <li><strong>Digital Distribution:</strong> Releasing manga through online platforms</li>
                <li><strong>Translation:</strong> Adapting manga for international audiences</li>
              </ul>
            </div>
          </div>

          <div className="info-box">
            <h4>Major Manga Publishers</h4>
            <div className="studio-grid">
              <div className="studio-item">
                <h5>Shueisha</h5>
                <p>Publisher of Weekly Shōnen Jump, the most popular manga magazine</p>
                <p><strong>Notable Series:</strong> One Piece, Naruto, Demon Slayer</p>
              </div>

              <div className="studio-item">
                <h5>Kodansha</h5>
                <p>One of Japan's largest publishing companies</p>
                <p><strong>Notable Series:</strong> Attack on Titan, Fairy Tail, The Seven Deadly Sins</p>
              </div>

              <div className="studio-item">
                <h5>Shogakukan</h5>
                <p>Major publisher with diverse manga offerings</p>
                <p><strong>Notable Series:</strong> Detective Conan, Inuyasha, Doraemon</p>
              </div>

              <div className="studio-item">
                <h5>Hakusensha</h5>
                <p>Known for shōjo and josei manga</p>
                <p><strong>Notable Series:</strong> Berserk, Ouran High School Host Club, Fruits Basket</p>
              </div>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#manga-creation" className="default-links">Explore Fan Discussions on Manga Creation →</Link>
            <Link to="/community#favorite-publishers" className="default-links">See Fan Rankings of Manga Publishers →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Cultural Impact Section */}
      <section id="cultural-impact" className="section-content">
        <div className="container">
          <h2>Cultural Impact of Manga</h2>
          <p>
            Manga has grown from a Japanese medium to a global cultural phenomenon, influencing art, entertainment, fashion, and technology worldwide.
          </p>

          <div className="impact-areas">
            <div className="impact-area">
              <h3>Global Influence</h3>
              <p>
                Manga has transcended cultural boundaries to become a worldwide phenomenon. Its unique storytelling approaches and visual styles have influenced comics, animation, and art globally. The international manga market continues to grow rapidly, with translations available in dozens of languages.
              </p>
              <p>
                Major publishers and digital platforms have made manga more accessible than ever to international audiences. This has led to unprecedented growth in manga fandom outside Japan.
              </p>
            </div>

            <div className="impact-area">
              <h3>Fan Culture</h3>
              <p>
                Manga has fostered vibrant fan communities worldwide, characterized by:
              </p>
              <ul>
                <li><strong>Conventions:</strong> Events like Comiket in Japan and manga sections at comic conventions worldwide</li>
                <li><strong>Cosplay:</strong> Fans dressing as their favorite manga characters</li>
                <li><strong>Fan Art & Doujinshi:</strong> Fan-created artwork and comics based on existing manga</li>
                <li><strong>Online Communities:</strong> Forums, social media groups, and websites dedicated to discussing and celebrating manga</li>
              </ul>
            </div>

            <div className="impact-area">
              <h3>Cultural Exchange</h3>
              <p>
                Manga has served as a cultural ambassador for Japan, introducing international audiences to Japanese language, customs, food, history, and values. Many fans have been inspired to learn Japanese or visit Japan after developing an interest in manga.
              </p>
              <p>
                Conversely, manga has also been influenced by global cultures, incorporating elements from Western storytelling, mythology, and aesthetics to create unique cross-cultural narratives.
              </p>
            </div>

            <div className="impact-area">
              <h3>Artistic Influence</h3>
              <p>
                Manga's distinctive visual style has influenced artists worldwide, creating hybrid forms like OEL (Original English Language) manga and the global rise of webtoons. The visual language of manga—including speed lines, expressive eyes, and symbolic emotional cues—has been adopted by artists across different media.
              </p>
              <p>
                The rise of digital creation tools and distribution platforms has further expanded manga's influence, allowing creators from around the world to adopt and adapt manga techniques.
              </p>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#manga-impact" className="default-links">Join Discussions on Manga's Cultural Impact →</Link>
            <Link to="/community#manga-conventions" className="default-links">Explore Fan Convention Experiences →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Manga Worlds & Universes Section */}
      <section id="manga-worlds" className="section-content">
        <div className="container">
          <h2>Manga Worlds & Universes</h2>
          <p>
            One of manga's greatest strengths is its ability to create immersive, richly detailed fictional worlds. From post-apocalyptic landscapes to magical realms, these universes captivate readers with their depth and creativity.
          </p>

          <div className="world-categories">
            <div className="world-category">
              <h3>Fantasy Realms</h3>
              <p>Magical worlds with their own rules, creatures, and power systems</p>
              <div className="world-examples">
                <div className="world-example">
                  <h4>The World of One Piece</h4>
                  <p>A vast ocean world divided by the Grand Line, filled with islands, pirates, and mysterious Devil Fruits</p>
                  <Link to="/manga/directory#universes" className="default-links">Explore the Grand Line in Shows Directory →</Link>
                </div>

                <div className="world-example">
                  <h4>Berserk's Dark Fantasy World</h4>
                  <p>A medieval European-inspired dark fantasy realm where humans struggle against demonic forces</p>
                  <Link to="/manga/directory#universes" className="default-links">Discover the World of Berserk in Shows Directory →</Link>
                </div>
              </div>
            </div>

            <div className="world-category">
              <h3>Futuristic Settings</h3>
              <p>Advanced technological societies, dystopian futures, and space frontiers</p>
              <div className="world-examples">
                <div className="world-example">
                  <h4>Akira's Neo-Tokyo</h4>
                  <p>A cyberpunk metropolis rebuilt after a catastrophic explosion, filled with biker gangs, government experiments, and psychic powers</p>
                  <Link to="/manga/directory#universes" className="default-links">Explore Neo-Tokyo in Shows Directory →</Link>
                </div>

                <div className="world-example">
                  <h4>Attack on Titan's Walled Society</h4>
                  <p>A society enclosed by massive walls to protect humanity from giant humanoid creatures</p>
                  <Link to="/manga/directory#universes" className="default-links">Discover the Walls in Shows Directory →</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="world-building-elements">
            <h3>Elements of Manga World-Building</h3>
            <ul>
              <li><strong>Power Systems:</strong> Unique rules governing special abilities (chakra, nen, quirks, etc.)</li>
              <li><strong>Social Structures:</strong> Hierarchies, organizations, and political systems</li>
              <li><strong>Geography:</strong> Distinctive locations, landscapes, and environments</li>
              <li><strong>History & Lore:</strong> Backstories, legends, and historical events that shape the world</li>
              <li><strong>Visual Aesthetics:</strong> Distinctive architectural styles, fashion, and design elements</li>
            </ul>
          </div>

          <div className="community-connection">
            <h4>Explore Manga Worlds in Our Shows Directory</h4>
            <p>Our shows directory features official information about your favorite manga universes, including character profiles, location guides, power system explanations, and more!</p>
            <Link to="/manga/directory" className="default-links">Browse All Manga Shows →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Audience Categories Section */}
      <section id="audience-categories" className="section-content">
        <div className="container">
          <h2>Manga for Different Audiences</h2>
          <p>
            One of manga's strengths is its diversity, offering content for readers of all ages, interests, and experience levels. Whether you're new to manga or a seasoned fan, there's something for everyone.
          </p>

          <div className="audience-categories">
            <div className="audience-category">
              <h3>For Beginners</h3>
              <p>These accessible series serve as excellent entry points to manga, featuring compelling stories and universal themes:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Death Note</strong> - A psychological thriller about a student who discovers a notebook that kills anyone whose name is written in it
                  <Link to="/manga/directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>Fullmetal Alchemist</strong> - A perfect blend of action, drama, and fantasy with a complete, satisfying story
                  <Link to="/manga/directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>Yotsuba&!</strong> - A heartwarming slice-of-life series about an energetic young girl discovering the world
                  <Link to="/manga/directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>Classic Series</h3>
              <p>These influential works have stood the test of time and helped shape manga as we know it today:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Astro Boy</strong> - Osamu Tezuka's groundbreaking series about a robot boy with human emotions
                  <Link to="/manga/directory#eras" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>Dragon Ball</strong> - Akira Toriyama's martial arts adventure that popularized manga worldwide
                  <Link to="/manga/directory#eras" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>Akira</strong> - Katsuhiro Otomo's cyberpunk masterpiece that revolutionized manga storytelling
                  <Link to="/manga/directory#eras" className="default-links">View Series Details →</Link>
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>Recent Hits</h3>
              <p>These newer series represent the current generation of popular manga:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Demon Slayer</strong> - A visually stunning tale of a boy hunting demons in Taisho-era Japan
                  <Link to="/manga/directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>Jujutsu Kaisen</strong> - A dark fantasy about students battling curses with supernatural powers
                  <Link to="/manga/directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>Spy x Family</strong> - A charming blend of action and comedy about a spy who must create a fake family
                  <Link to="/manga/directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="community-connection">
            <h4>Find Your Next Favorite Manga</h4>
            <p>Looking for more manga to read? Browse our comprehensive shows directory to discover series based on your interests and preferences.</p>
            <Link to="/manga/directory" className="default-links">Browse All Manga Shows →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Learning Resources Section */}
      <section id="learning-resources" className="section-content">
        <div className="container">
          <h2>Learning Resources</h2>
          <p>
            Whether you're new to manga or looking to deepen your knowledge, these resources will help you navigate and appreciate the world of manga.
          </p>

          <div className="resource-categories">
            <div className="resource-category">
              <h3>Beginner's Guides</h3>
              <div className="resource-items">
                <div className="resource-item">
                  <h4>Getting Started with Manga</h4>
                  <p>A comprehensive introduction to manga for complete beginners, covering basic terminology, common genres, and recommended first series.</p>
                  <Link to="/community#manga-beginners-guide" className="default-links">Read the Guide →</Link>
                </div>

                <div className="info-box resource-item">
                  <h4>How to Read Manga</h4>
                  <p>Information on the right-to-left reading direction, understanding panel flow, and interpreting visual cues specific to manga.</p>
                  <Link to="/community#manga-reading-guide" className="default-links">Read the Guide →</Link>
                </div>
              </div>
            </div>

            <div className="resource-category">
              <h3>Finding What to Read</h3>
              <div className="resource-items">
                <div className="resource-item">
                  <h4>Manga Recommendation Flowchart</h4>
                  <p>An interactive tool to help you find manga based on your preferences and interests.</p>
                  <Link to="/community#manga-flowchart" className="default-links">Use the Flowchart →</Link>
                </div>

                <div className="resource-item">
                  <h4>Manga Release Guide</h4>
                  <p>Information about new and upcoming manga releases in both Japan and internationally.</p>
                  <Link to="/community#manga-releases" className="default-links">View Current Releases →</Link>
                </div>
              </div>
            </div>

            <div className="resource-category">
              <h3>Deepening Your Knowledge</h3>
              <div className="resource-items">
                <div className="resource-item">
                  <h4>Manga Analysis Resources</h4>
                  <p>Guides to understanding manga on a deeper level, including visual techniques, storytelling patterns, and cultural context.</p>
                  <Link to="/community#manga-analysis" className="default-links">Explore Analysis Resources →</Link>
                </div>

                <div className="resource-item">
                  <h4>Japanese Language in Manga</h4>
                  <p>Introduction to common Japanese phrases and concepts encountered in manga, and how manga can be used as a language learning tool.</p>
                  <Link to="/community#manga-japanese" className="default-links">Learn More →</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="community-resources">
            <h3>Community-Created Resources</h3>
            <p>Our community members have created valuable resources to help fellow manga fans:</p>
            <div className="community-resource-grid">
              <div className="community-resource">
                <h4>Fan-Made Reading Orders</h4>
                <p>Guides for navigating complex series with multiple spin-offs and related titles</p>
                <Link to="/community#reading-orders" className="default-links">See Reading Orders →</Link>
              </div>

              <div className="community-resource">
                <h4>Manga Collections</h4>
                <p>Curated lists of manga based on themes, genres, or recommendations for specific interests</p>
                <Link to="/community#manga-collections" className="default-links">Browse Collections →</Link>
              </div>

              <div className="community-resource">
                <h4>Manga Discussion Guides</h4>
                <p>Resources for hosting manga reading clubs or discussion groups</p>
                <Link to="/community#discussion-guides" className="default-links">Get Discussion Guides →</Link>
              </div>

              <div className="community-resource">
                <h4>Manga Glossary</h4>
                <p>An extensive dictionary of manga-related terms maintained by community members</p>
                <Link to="/community#manga-glossary" className="default-links">View Glossary →</Link>
              </div>
            </div>
          </div>

          <div className="community-connection">
            <h4>Contribute Your Knowledge</h4>
            <p>Have expertise or insights about manga you'd like to share? Join our community and contribute to our growing collection of manga resources!</p>
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

export default MangaPage;
