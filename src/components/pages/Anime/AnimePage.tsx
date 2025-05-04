import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/AnimePage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';

const AnimePage: React.FC = () => {
  return (
    <div className="anime-page">
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

          <div className="community-connection">
            <h4>Looking for specific anime shows or characters?</h4>
            <p>Browse our <Link to="/anime/directory" className="default-links">Anime Shows Directory</Link> to find official pages for your favorite series and characters.</p>
            <p>You can also visit our <Link to="/community#anime-section" className="default-links">Community Section</Link> to explore fan-created content about anime series, characters, and more!</p>
          </div>
        </div>
      </section>

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

          <div className="info-box">
            <h4>Key Characteristics of Anime</h4>
            <ul>
              <li><strong>Visual Style:</strong> Distinctive art style with exaggerated features like large eyes, colorful hair, and simplified facial expressions</li>
              <li><strong>Storytelling:</strong> Often features complex narratives that can span multiple episodes or seasons</li>
              <li><strong>Cultural Elements:</strong> Incorporates Japanese cultural references, traditions, and values</li>
              <li><strong>Diverse Genres:</strong> Covers a wide range of genres from action and romance to science fiction and slice of life</li>
              <li><strong>Target Demographics:</strong> Different anime are created for specific age groups and genders</li>
            </ul>
          </div>

          <div className="community-connection">
            <Link to="/community#anime-basics-discussion" className="default-links">Join the Discussion on Anime Basics</Link>
          </div>
        </div>
      </section>

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

          <div className="key-figures">
            <h3>Key Figures in Anime History</h3>
            <div className="figure-cards">
              <div className="figure-card">
                <h4>Osamu Tezuka (1928-1989)</h4>
                <p>Known as the "God of Manga" and "Father of Anime," Tezuka created the distinctive large-eyed character style and pioneered story-driven animation with works like "Astro Boy" and "Kimba the White Lion."</p>
              </div>

              <div className="figure-card">
                <h4>Hayao Miyazaki (1941-)</h4>
                <p>Co-founder of Studio Ghibli and creator of acclaimed films like "Spirited Away," "My Neighbor Totoro," and "Princess Mononoke." His works are known for their rich storytelling, environmental themes, and strong female characters.</p>
              </div>

              <div className="figure-card">
                <h4>Mamoru Oshii (1951-)</h4>
                <p>Director known for philosophical and visually stunning works like "Ghost in the Shell" and "Patlabor," which have influenced science fiction cinema worldwide.</p>
              </div>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/anime/history" className="default-links">Read Full History of Anime</Link>
            <Link to="/community#anime-history" className="default-links">Explore Fan Discussions on Anime History</Link>
            <Link to="/community#legendary-anime-creators" className="default-links">See Fan Tributes to Legendary Creators</Link>
          </div>
        </div>
      </section>

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

      {/* More sections would be added here */}
      <section className="section-content">
        <div className="container">
          <div className="section-divider">
            <span>More sections coming soon...</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimePage;
