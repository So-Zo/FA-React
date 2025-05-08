import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/WorldsUniversesPage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';
import TableOfContents, { TocSectionProps } from '../../../components/ui/TableOfContents';

const WorldsUniversesPage: React.FC = () => {
  // Define TOC sections
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Basics", anchor: "#the-basics" },
        { label: "History", anchor: "#history" },
        { label: "Terms", anchor: "#terminology-guide" }
      ],
      deepLinks: [
        { label: "World's Directory", path: "/worlds-universes/directory", exists: true }
      ]
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Genre", anchor: "#genres-guide" },
        { label: "Style", anchor: "#worlds-universes" },
        { label: "Audience", anchor: "#audience-categories" }
      ],
      deepLinks: []
    },
    {
      title: "BEHIND THE SCENES",
      quickLinks: [
        { label: "How", anchor: "#production-process" },
        { label: "Impact", anchor: "#cultural-impact" },
        { label: "Resources", anchor: "#learning-resources" }
      ],
      deepLinks: []
    }
  ];

  return (
    <div className="worlds-universes-page">
        <header>
        <div className="image-header">
          <img src="/images/WorldsUniverses/VideoGamesHeader.jpg" alt="Worlds and Universes Overview" />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search From Video Games Page"
          placeholder="Search for Characters, Universes, etc."
        />

        <button className="wiki-edit-button" id="page-edit-button">Edit Page</button>
      </header>

      {/* New Table of Contents */}
      <TableOfContents
        sections={tocSections}
        title="Worlds & Universes Encyclopedia"
        description="Use this table of contents to navigate through the worlds and universes guide."
      />

      {/* Community Connection */}
      <section className="section-content">
        <div className="container">
          <div className="community-connection">
            <h4>Looking for specific fictional worlds or universes?</h4>
            <p>Browse our <Link to="/worlds-universes/directory" className="default-links">Worlds & Universes Directory</Link> to find official pages for your favorite fictional realms and settings.</p>
          </div>
        </div>
      </section>

      {/* The Basics Section */}
      <section id="the-basics" className="section-content">
        <div className="container">
          <h2>The Basics</h2>
          <p>
            Fictional worlds and universes are the imagined settings where stories take place. They range from small, focused environments like a single town or school to vast, complex universes spanning multiple planets, dimensions, or timelines. These worlds provide the foundation for characters to interact, conflicts to arise, and stories to unfold.
          </p>

          <p>
            The most compelling fictional worlds feel authentic and lived-in, with their own internal logic, rules, and consistency. They often feature unique geography, history, cultures, technologies, and sometimes even laws of physics that differ from our own reality.
          </p>

          <p>
            While some fictional worlds exist within a single work, many expand across multiple stories, media formats, and even franchises. These interconnected universes allow for crossovers, shared continuity, and the exploration of different perspectives within the same setting.
          </p>






        </div>
      </section>

      {/* History Section */}
      <section id="history" className="section-content">
        <div className="container">
          <h2>History of Fictional Worlds</h2>
          <p>
            The creation and development of fictional worlds has evolved significantly throughout literary and media history. Understanding this evolution helps appreciate the depth and complexity of modern fictional universes.
          </p>

          <div className="timeline-container">
            <div className="timeline-item">
              <div className="timeline-date">Ancient Times</div>
              <div className="timeline-content">
                <h4>Mythological Worlds</h4>
                <p>The earliest fictional worlds appeared in mythology and religious texts, with elaborate cosmologies like Mount Olympus, Asgard, and various underworlds. These mythic realms established many patterns still used in world-building today.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Medieval Period</div>
              <div className="timeline-content">
                <h4>Epic Sagas & Legends</h4>
                <p>Works like Beowulf, The Divine Comedy, and Arthurian legends created detailed settings with their own rules and geography, though they were often connected to the real world rather than being fully separate realms.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">19th Century</div>
              <div className="timeline-content">
                <h4>Literary Worlds</h4>
                <p>Authors began creating more detailed fictional settings, from the realistic but fictional counties in Jane Austen's works to the fantastical lands in Lewis Carroll's "Alice in Wonderland" and L. Frank Baum's Oz.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Early-Mid 20th Century</div>
              <div className="timeline-content">
                <h4>The Foundation of Modern World-Building</h4>
                <p>J.R.R. Tolkien revolutionized fictional world creation with Middle-earth, developing comprehensive languages, histories, and maps. H.P. Lovecraft's Cthulhu Mythos and Robert E. Howard's Hyborian Age established shared universe concepts.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Late 20th Century</div>
              <div className="timeline-content">
                <h4>Multimedia Expansion</h4>
                <p>Fictional worlds expanded beyond books into film, television, and games. Star Wars, Star Trek, and various comic book universes developed vast continuities spanning multiple media formats and decades of storytelling.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">21st Century</div>
              <div className="timeline-content">
                <h4>Transmedia Universes</h4>
                <p>The rise of planned transmedia franchises like the Marvel Cinematic Universe, complex TV worlds like Game of Thrones/A Song of Ice and Fire, and interactive worlds in video games have pushed world-building to new heights of complexity and audience engagement.</p>
              </div>
            </div>
          </div>

          <div className="key-figures">
            <h3>Key Figures in World-Building History</h3>
            <div className="figure-cards">
              <div className="figure-card">
                <h4>J.R.R. Tolkien (1892-1973)</h4>
                <p>Creator of Middle-earth, Tolkien established the template for modern fantasy world-building with his meticulous attention to languages, mythology, and history. His approach to creating a world with depth and internal consistency remains influential.</p>
              </div>

              <div className="figure-card">
                <h4>George Lucas (1944-)</h4>
                <p>The Star Wars universe pioneered the concept of a cohesive fictional galaxy with diverse planets, species, and technologies that could support countless stories across multiple media formats.</p>
              </div>

              <div className="figure-card">
                <h4>Stan Lee & Jack Kirby</h4>
                <p>These comic creators helped establish the Marvel Universe, demonstrating how multiple character stories could exist in a shared world with crossover potential and consistent internal logic.</p>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Terminology Guide Section */}
      <section id="terminology-guide" className="section-content">
        <div className="container">
          <h2>World-Building Terminology Guide</h2>
          <p>
            The field of fictional world creation has developed its own specialized vocabulary. Understanding these terms will enhance your appreciation of fictional worlds and help you navigate discussions about them.
          </p>

          <div className="terminology-container">
            <div className="terminology-category">
              <h3>World Structure Terms</h3>
              <dl className="terminology-list">
                <dt>Universe/Multiverse</dt>
                <dd>The entire fictional reality; a multiverse contains multiple universes with different rules or timelines</dd>

                <dt>Setting</dt>
                <dd>The specific time and place where a story occurs within a larger world</dd>

                <dt>Canon</dt>
                <dd>The official events, characters, and details that are considered part of the legitimate world</dd>

                <dt>Continuity</dt>
                <dd>The consistency of facts, events, and character details across different stories in the same world</dd>

                <dt>Retcon</dt>
                <dd>Retroactive continuity - changing previously established facts in a fictional world</dd>
              </dl>
            </div>

            <div className="terminology-category">
              <h3>World Types & Approaches</h3>
              <dl className="terminology-list">
                <dt>Secondary World</dt>
                <dd>A completely fictional reality not connected to our world (e.g., Middle-earth, Westeros)</dd>

                <dt>Alternate History</dt>
                <dd>A world that diverges from real history at a specific point (e.g., The Man in the High Castle)</dd>

                <dt>Shared Universe</dt>
                <dd>A setting where multiple stories by different creators take place (e.g., Marvel Universe)</dd>

                <dt>Soft World-Building</dt>
                <dd>Approach that focuses on impression and feeling rather than specific details and rules</dd>

                <dt>Hard World-Building</dt>
                <dd>Approach that emphasizes logical consistency, detailed rules, and comprehensive background</dd>
              </dl>
            </div>

            <div className="terminology-category">
              <h3>Narrative & Meta Terms</h3>
              <dl className="terminology-list">
                <dt>Lore</dt>
                <dd>The collective history, legends, and knowledge within a fictional world</dd>

                <dt>Expanded Universe</dt>
                <dd>Additional content that extends a fictional world beyond its original medium</dd>

                <dt>Worldbuilding Bible</dt>
                <dd>Document containing all the rules, history, and details of a fictional world</dd>

                <dt>Easter Egg</dt>
                <dd>Hidden reference or detail in a fictional world that rewards attentive audiences</dd>

                <dt>Handwavium</dt>
                <dd>Elements of a world deliberately left unexplained or glossed over</dd>
              </dl>
            </div>
          </div>


        </div>
      </section>

      {/* Genres Guide Section */}
      <section id="genres-guide" className="section-content">
        <div className="container">
          <h2>Fictional Worlds Genres Guide</h2>
          <p>
            Fictional worlds span a diverse range of genres and styles, each with unique characteristics and appeal.
            This guide will help you understand the different types of fictional universes and find worlds that match your interests.
          </p>



          <div id="world-types" className="genre-section">
            <h3>Types of Fictional Worlds</h3>
            <p>Discover fictional universes based on their fundamental nature and relationship to reality:</p>

            <div className="genre-directory">
              <div className="genre-category">
                <h4>Fantasy Worlds</h4>
                <p>Realms with magical elements, mythical creatures, and supernatural forces.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Middle-earth (Lord of the Rings), Westeros (Game of Thrones), Hogwarts (Harry Potter)</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Science Fiction Universes</h4>
                <p>Settings that explore advanced technology, space travel, and scientific concepts.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Star Trek, Foundation, Dune</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Dystopian/Post-Apocalyptic</h4>
                <p>Worlds depicting societies in decline, collapse, or recovery after catastrophe.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Panem (The Hunger Games), The Wasteland (Fallout), The Road</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Alternate History</h4>
                <p>Worlds that diverge from our timeline at specific historical points.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> The Man in the High Castle, Watchmen, Fatherland</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Urban Fantasy</h4>
                <p>Modern settings with supernatural or magical elements hidden within everyday reality.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> The World of Harry Dresden, Neverwhere, Buffy the Vampire Slayer</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Superhero Universes</h4>
                <p>Worlds populated by individuals with extraordinary abilities and their impact on society.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Marvel Universe, DC Universe, The Boys</li>
                </ul>
              </div>
            </div>
          </div>

          <div id="media-formats" className="genre-section">
            <h3>Worlds Across Media Formats</h3>
            <p>Fictional universes often originate in specific media but may expand across multiple formats:</p>

            <div className="genre-directory">
              <div className="genre-category">
                <h4>Literary Worlds</h4>
                <p>Universes that originated in novels, short stories, or other written works.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Discworld, The Culture, Earthsea</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Cinematic Universes</h4>
                <p>Interconnected film franchises sharing characters and continuity.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Marvel Cinematic Universe, Star Wars, MonsterVerse</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Gaming Worlds</h4>
                <p>Universes created for or primarily known through video games.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> The Elder Scrolls, Mass Effect, Hyrule (Legend of Zelda)</li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Transmedia Universes</h4>
                <p>Worlds designed from the beginning to span multiple media formats.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> The Matrix, Defiance, Quantum Break</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="genre-resources">
            <h3>Finding Your Perfect Fictional World</h3>
            <p>Not sure where to start? Browse our <Link to="/worlds-universes/directory" className="default-links">Worlds & Universes Directory</Link> to discover fictional universes based on your interests.</p>
          </div>
        </div>
      </section>

      {/* World-Building Section */}
      <section id="production-process" className="section-content">
        <div className="container">
          <h2>The Art of World-Building</h2>
          <p>
            World-building is the process of constructing an imaginary world with coherent qualities such as geography,
            history, culture, and ecology. The most compelling fictional universes feel alive and authentic, with
            internal logic and consistency that allows audiences to immerse themselves fully.
          </p>

          <div className="worldbuilding-elements">
            <div className="element-card">
              <h3>Geography & Environment</h3>
              <p>
                The physical spaces where stories unfold, including landscapes, cities, planets, and dimensions.
                Well-crafted environments reflect their inhabitants and histories, shaping the stories that can be told.
              </p>
              <div className="examples">
                <h4>Notable Examples:</h4>
                <ul>
                  <li>Middle-earth's diverse regions in Lord of the Rings</li>
                  <li>The detailed school grounds of Hogwarts in Harry Potter</li>
                  <li>The distinctive planets of Star Wars</li>
                </ul>
              </div>
            </div>

            <div className="element-card">
              <h3>History & Lore</h3>
              <p>
                The backstory and mythology that gives depth to a fictional world. Rich histories create context
                for current events and provide opportunities for prequels, spinoffs, and expanded storytelling.
              </p>
              <div className="examples">
                <h4>Notable Examples:</h4>
                <ul>
                  <li>The extensive timeline of Middle-earth spanning thousands of years</li>
                  <li>Marvel's evolving continuity across decades of comics</li>
                  <li>The ancient histories and myths in Game of Thrones</li>
                </ul>
              </div>
            </div>

            <div className="element-card">
              <h3>Social Structures & Culture</h3>
              <p>
                The societies, governments, religions, and cultural practices that shape how characters interact.
                These elements add authenticity and create natural sources of conflict and drama.
              </p>
              <div className="examples">
                <h4>Notable Examples:</h4>
                <ul>
                  <li>The Houses and political systems of Dune</li>
                  <li>The distinct cultures of different nations in Avatar: The Last Airbender</li>
                  <li>The complex social hierarchy in Bridgerton</li>
                </ul>
              </div>
            </div>

            <div className="element-card">
              <h3>Rules & Systems</h3>
              <p>
                The consistent laws that govern how the world works, particularly regarding magic, technology,
                or supernatural elements. Well-defined systems create boundaries that make stories more compelling.
              </p>
              <div className="examples">
                <h4>Notable Examples:</h4>
                <ul>
                  <li>The detailed magic system in Brandon Sanderson's Cosmere</li>
                  <li>The rules of bending in Avatar: The Last Airbender</li>
                  <li>The consistent technology in Star Trek</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Impact Section */}
      <section id="cultural-impact" className="section-content">
        <div className="container">
          <h2>Cultural Impact of Fictional Worlds</h2>
          <p>
            Fictional worlds have evolved from simple settings to significant cultural forces, influencing art, entertainment, technology, and social interaction worldwide.
          </p>

          <div className="impact-areas">
            <div className="impact-area">
              <h3>Artistic & Creative Influence</h3>
              <p>
                Compelling fictional worlds inspire creators across all media. From Tolkien's influence on fantasy literature and games to Star Wars' impact on filmmaking and visual effects, these worlds establish templates that shape entire genres.
              </p>
              <p>
                The most influential fictional universes create new visual languages, storytelling approaches, and world-building techniques that are adopted by subsequent creators, establishing lasting legacies in creative fields.
              </p>
            </div>

            <div className="impact-area">
              <h3>Fan Communities & Participatory Culture</h3>
              <p>
                Fictional worlds foster vibrant communities characterized by:
              </p>
              <ul>
                <li><strong>Fan Fiction & Art:</strong> Creative works that expand or reimagine established worlds</li>
                <li><strong>Conventions & Events:</strong> Gatherings where fans celebrate shared interests in fictional universes</li>
                <li><strong>Cosplay:</strong> Fans embodying characters from their favorite worlds</li>
                <li><strong>Online Communities:</strong> Forums, social media groups, and websites dedicated to discussing fictional worlds</li>
              </ul>
            </div>

            <div className="impact-area">
              <h3>Economic Impact</h3>
              <p>
                Successful fictional worlds generate massive economic activity through:
              </p>
              <p>
                Merchandise ranging from toys and clothing to home decor and collectibles. Tourism to filming locations, theme parks, and exhibitions. Transmedia expansion across books, films, games, and other formats. Long-term franchise value that can span decades or even generations.
              </p>
            </div>

            <div className="impact-area">
              <h3>Cultural Reference Points</h3>
              <p>
                Fictional worlds provide shared cultural touchstones that transcend national and linguistic boundaries. Elements from these worlds enter everyday language and become shorthand for complex ideas.
              </p>
              <p>
                Terms like "Jedi mind trick," "Catch-22," "Big Brother," or "Mordor" are understood by millions who may never have experienced the original works. Visual iconography from fictional worlds appears in advertising, political discourse, and other cultural contexts.
              </p>
            </div>
          </div>


        </div>
      </section>

      {/* Iconic Universes Section */}
      <section id="worlds-universes" className="section-content">
        <div className="container">
          <h2>Iconic Fictional Universes</h2>
          <p>
            Some fictional universes have transcended their original medium to become cultural touchstones,
            expanding across books, films, television, games, and more. These expansive worlds continue to
            grow and evolve, captivating new generations of fans.
          </p>

          <div className="universes-showcase">
            <div className="universe-card">
              <h3>Marvel Cinematic Universe</h3>
              <p>
                A shared universe centered on superhero films and TV series based on Marvel Comics characters.
                The MCU has revolutionized franchise storytelling with its interconnected narratives across
                multiple films and series.
              </p>
              <div className="universe-stats">
                <div className="stat">
                  <span className="stat-label">Origin:</span>
                  <span className="stat-value">Comics (1939), MCU (2008)</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Media:</span>
                  <span className="stat-value">Films, TV, Comics, Games</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Key Locations:</span>
                  <span className="stat-value">Earth-616, Asgard, Wakanda</span>
                </div>
              </div>
              <Link to="/worlds-universes/marvel" className="universe-link">Explore Marvel Universe →</Link>
            </div>

            <div className="universe-card">
              <h3>Star Wars Universe</h3>
              <p>
                A space opera epic set "a long time ago in a galaxy far, far away," featuring the struggle
                between the light and dark sides of the Force. The Star Wars universe spans millennia of
                galactic history across multiple eras.
              </p>
              <div className="universe-stats">
                <div className="stat">
                  <span className="stat-label">Origin:</span>
                  <span className="stat-value">Film (1977)</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Media:</span>
                  <span className="stat-value">Films, TV, Books, Comics, Games</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Key Locations:</span>
                  <span className="stat-value">Tatooine, Coruscant, Death Star</span>
                </div>
              </div>
              <Link to="/worlds-universes/star-wars" className="universe-link">Explore Star Wars Universe →</Link>
            </div>

            <div className="universe-card">
              <h3>Middle-earth</h3>
              <p>
                J.R.R. Tolkien's meticulously crafted fantasy world, home to hobbits, elves, dwarves, and men.
                Middle-earth features a comprehensive mythology, multiple languages, and thousands of years of history.
              </p>
              <div className="universe-stats">
                <div className="stat">
                  <span className="stat-label">Origin:</span>
                  <span className="stat-value">Books (1937)</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Media:</span>
                  <span className="stat-value">Books, Films, TV, Games</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Key Locations:</span>
                  <span className="stat-value">The Shire, Mordor, Gondor</span>
                </div>
              </div>
              <Link to="/worlds-universes/middle-earth" className="universe-link">Explore Middle-earth →</Link>
            </div>
          </div>

          <div className="cta-link">
            <Link to="/worlds-universes/directory">Explore All Fictional Universes →</Link>
          </div>
        </div>
      </section>

      {/* Audience Categories Section */}
      <section id="audience-categories" className="section-content">
        <div className="container">
          <h2>Worlds for Different Audiences</h2>
          <p>
            Fictional worlds cater to diverse audiences with varying interests, preferences, and experience levels. Whether you're new to exploring fictional universes or a seasoned world-hopper, there are worlds designed to appeal to you.
          </p>

          <div className="audience-categories">
            <div className="audience-category">
              <h3>For Newcomers to Fictional Worlds</h3>
              <p>These accessible worlds serve as excellent entry points, featuring clear rules and engaging narratives:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Harry Potter's Wizarding World</strong> - A magical world hidden within our own, with clear rules and a gradual introduction to its complexities
                </li>
                <li>
                  <strong>The World of Avatar: The Last Airbender</strong> - A fantasy world with distinct nations based on elemental powers and accessible themes
                </li>
                <li>
                  <strong>The MCU</strong> - A superhero universe that gradually introduces its concepts through interconnected but individually accessible stories
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>For World-Building Enthusiasts</h3>
              <p>These richly detailed worlds reward deep exploration and analysis:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Middle-earth</strong> - Tolkien's meticulously crafted world with comprehensive languages, histories, and maps
                </li>
                <li>
                  <strong>Dune's Universe</strong> - Frank Herbert's complex ecological and political world spanning thousands of years
                </li>
                <li>
                  <strong>The Cosmere</strong> - Brandon Sanderson's interconnected universe with multiple planetary systems and magic systems
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>For Multimedia Explorers</h3>
              <p>These worlds span multiple media formats, allowing fans to engage through their preferred medium:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Star Wars Universe</strong> - Accessible through films, TV series, books, comics, games, and more
                </li>
                <li>
                  <strong>The Witcher's World</strong> - Available through books, games, and TV series, each offering different entry points
                </li>
                <li>
                  <strong>Pokémon World</strong> - Accessible through games, animated series, trading cards, and more
                </li>
              </ul>
            </div>
          </div>

          <div className="community-connection">
            <h4>Find Your Perfect Fictional World</h4>
            <p>Looking for more worlds to explore? Browse our <Link to="/worlds-universes/directory" className="default-links">Worlds & Universes Directory</Link> to discover fictional universes based on your interests.</p>
          </div>
        </div>
      </section>

      {/* Learning Resources Section - Simplified */}
      <section id="learning-resources" className="section-content">
        <div className="container">
          <h2>Learning Resources</h2>
          <p>
            Understanding fictional worlds and world-building can enhance your appreciation of these creative universes.
          </p>

          <div className="resource-categories">
            <div className="resource-category">
              <h3>Recommended Books</h3>
              <ul>
                <li>"On Writing" by Stephen King - Insights on storytelling that apply to world-building</li>
                <li>"The Guide to Writing Fantasy and Science Fiction" by Philip Athans - Comprehensive guide to creating fictional worlds</li>
                <li>"Wonderbook" by Jeff VanderMeer - Illustrated guide to creating imaginative fiction</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <hr />
    </div>
  );
};

export default WorldsUniversesPage;
