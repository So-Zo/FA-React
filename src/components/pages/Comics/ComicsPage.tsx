import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/ComicsPage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';

const ComicsPage: React.FC = () => {
  return (
    <div className="comics-page">
      <header>
        <div className="image-header">
          <img src="/images/comics/ComicsHeader.jpg" alt="Comics Overview" />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search From Comics Page"
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
          <h2>Comics Encyclopedia</h2>
          <p>Welcome to our comprehensive guide to comics. Use this table of contents to navigate to different sections.</p>

          <div className="toc-container">
            <div className="toc-column">
              <h3>Fundamentals</h3>
              <ul className="toc-list">
                <li><a href="#the-basics" className="default-links">The Basics</a></li>
                <li><a href="#history-of-comics" className="default-links">History of Comics</a> (<Link to="/comics/history" className="default-links">Full History</Link>)</li>
                <li><a href="#terminology-guide" className="default-links">Terminology Guide</a></li>
              </ul>
            </div>

            <div className="toc-column">
              <h3>Categories & Styles</h3>
              <ul className="toc-list">
                <li><a href="#comics-genres" className="default-links">Comics Genres Guide</a></li>
                <li><a href="#comics-worlds" className="default-links">Comics Worlds & Universes</a></li>
                <li><a href="#audience-categories" className="default-links">Comics for Different Audiences</a></li>
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
            <h4>Looking for specific comic series or characters?</h4>
            <p>Browse our <Link to="/comics/directory" className="default-links">Comics Shows Directory</Link> to find official pages for your favorite series and characters.</p>
            <p>You can also visit our <Link to="/community#comics-section" className="default-links">Community Section</Link> to explore fan-created content about comic series, characters, and more!</p>
          </div>
        </div>
      </section>
      <hr />

      {/* The Basics Section */}
      <section id="the-basics" className="section-content">
        <div className="container">
          <h2>The Basics</h2>
          <p>
            Comics are a medium that uses a sequence of panels of images combined with text to tell a story. While often associated with superhero stories, comics encompass a vast range of genres, styles, and formats, from newspaper strips and graphic novels to webcomics and digital publications.
          </p>

          <p>
            The term "comics" refers to the medium itself rather than a specific genre or style. Comics have evolved into a sophisticated storytelling form with their own visual language, conventions, and traditions. They combine elements of literature and visual art to create a unique narrative experience.
          </p>

          <p>
            Comics are created and published around the world, with distinct traditions developing in different regions. American comics, European comics (particularly Franco-Belgian bandes dessinées), and Japanese manga each have their own stylistic approaches and publishing formats. For more on Japanese comics, see our <Link to="/manga" className="default-links">Manga page</Link>.
          </p>

          <div className="info-box">
            <h4>Key Characteristics of Comics</h4>
            <ul>
              <li><strong>Sequential Art:</strong> Stories told through a sequence of panels that show progression of time and action</li>
              <li><strong>Word-Image Integration:</strong> Text and images work together to convey meaning and narrative</li>
              <li><strong>Panel Composition:</strong> The arrangement, size, and shape of panels affect pacing and storytelling</li>
              <li><strong>Gutters:</strong> The spaces between panels where readers mentally connect the action</li>
              <li><strong>Speech Bubbles & Captions:</strong> Conventions for showing dialogue, thoughts, and narration</li>
            </ul>
          </div>

          <div className="community-connection">
            <Link to="/community#comics-basics-discussion" className="default-links">Join the Discussion on Comics Basics →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* History of Comics Section */}
      <section id="history-of-comics" className="section-content">
        <div className="container">
          <h2>History of Comics</h2>
          <p>
            The evolution of comics spans centuries, developing from early sequential art to the diverse global medium it is today. Understanding this history helps appreciate the art form's significance and influence.
          </p>

          <div className="timeline-container">
            <div className="timeline-item">
              <div className="timeline-date">Early Precursors</div>
              <div className="timeline-content">
                <h4>Sequential Art Beginnings</h4>
                <p>Sequential art has ancient roots, from Egyptian hieroglyphics to medieval tapestries like the Bayeux Tapestry, which told stories through sequences of images.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">18th-19th Century</div>
              <div className="timeline-content">
                <h4>Early Political Cartoons & Illustrated Stories</h4>
                <p>Artists like William Hogarth created sequential narrative art, while Rodolphe Töpffer is often credited with creating the first modern comic strips in the 1830s with his "picture stories."</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">Late 19th-Early 20th Century</div>
              <div className="timeline-content">
                <h4>Newspaper Comics Era</h4>
                <p>The Yellow Kid (1895) is often cited as the first recurring comic character in American newspapers. This period saw the rise of newspaper comic strips like "Little Nemo in Slumberland" and "Krazy Kat."</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1930s-1950s</div>
              <div className="timeline-content">
                <h4>The Golden Age of Comics</h4>
                <p>The debut of Superman in Action Comics #1 (1938) launched the superhero genre and the comic book industry. This era saw the creation of iconic characters like Batman, Wonder Woman, and Captain America.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1950s-1970s</div>
              <div className="timeline-content">
                <h4>Comics Code Era & Underground Comix</h4>
                <p>Following concerns about comic content, the Comics Code Authority was established in 1954, restricting content. In response, underground comix emerged in the 1960s, exploring adult themes and countercultural ideas.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1980s-1990s</div>
              <div className="timeline-content">
                <h4>Graphic Novel Revolution</h4>
                <p>Works like "Watchmen," "The Dark Knight Returns," and "Maus" elevated comics to literary status. This period saw more mature, complex storytelling and the rise of independent publishers.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2000s-Present</div>
              <div className="timeline-content">
                <h4>Digital Age & Mainstream Recognition</h4>
                <p>Webcomics, digital distribution, and the massive success of comic book adaptations in film and television have brought comics to wider audiences. Graphic novels are now recognized as legitimate literature and taught in schools and universities.</p>
              </div>
            </div>
          </div>

          <div className="key-figures">
            <h3>Key Figures in Comics History</h3>
            <div className="figure-cards">
              <div className="figure-card">
                <h4>Jack Kirby (1917-1994)</h4>
                <p>Co-creator of numerous iconic characters for Marvel and DC, including Captain America, the Fantastic Four, and the New Gods. Known for his dynamic art style and innovative storytelling techniques.</p>
              </div>

              <div className="figure-card">
                <h4>Will Eisner (1917-2005)</h4>
                <p>Pioneer of the graphic novel format with "A Contract with God" (1978). His work on "The Spirit" newspaper insert revolutionized storytelling techniques. The Eisner Awards, comics' highest honor, are named after him.</p>
              </div>

              <div className="figure-card">
                <h4>Alan Moore (1953-)</h4>
                <p>Writer of groundbreaking works like "Watchmen," "V for Vendetta," and "From Hell," which pushed the boundaries of comics storytelling and helped establish comics as a medium for serious literary expression.</p>
              </div>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/comics/history" className="default-links">Read Full History of Comics →</Link>
            <Link to="/community#comics-history" className="default-links">Explore Fan Discussions on Comics History →</Link>
            <Link to="/community#legendary-comics-creators" className="default-links">See Fan Tributes to Legendary Creators →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Terminology Guide Section */}
      <section id="terminology-guide" className="section-content">
        <div className="container">
          <h2>Comics Terminology Guide</h2>
          <p>
            The world of comics has developed its own unique vocabulary. Understanding these terms will enhance your appreciation and help you navigate discussions about comics.
          </p>

          <div className="terminology-container">
            <div className="terminology-category">
              <h3>Format & Publication Terms</h3>
              <dl className="terminology-list">
                <dt>Comic Book</dt>
                <dd>A periodical publication containing sequential art storytelling, typically 20-32 pages</dd>

                <dt>Graphic Novel</dt>
                <dd>A longer-form comic work with a complete story, often published as a single volume</dd>

                <dt>Trade Paperback</dt>
                <dd>A collection of previously published comic book issues in a single volume</dd>

                <dt>Webcomic</dt>
                <dd>Comics published primarily on the internet</dd>

                <dt>Variant Cover</dt>
                <dd>Alternative cover artwork for the same issue, often produced in limited quantities</dd>
              </dl>
            </div>

            <div className="terminology-category">
              <h3>Visual & Storytelling Terms</h3>
              <dl className="terminology-list">
                <dt>Panel</dt>
                <dd>Individual framed image in a comic</dd>

                <dt>Gutter</dt>
                <dd>The space between panels where readers mentally connect the action</dd>

                <dt>Splash Page</dt>
                <dd>A full-page illustration, often used for dramatic effect</dd>

                <dt>Speech Bubble</dt>
                <dd>Enclosed area containing character dialogue</dd>

                <dt>Thought Bubble</dt>
                <dd>Cloud-like bubble showing a character's thoughts</dd>
              </dl>
            </div>

            <div className="terminology-category">
              <h3>Industry & Collection Terms</h3>
              <dl className="terminology-list">
                <dt>Golden Age</dt>
                <dd>The period from the late 1930s to early 1950s in American comics</dd>

                <dt>Silver Age</dt>
                <dd>The period from the mid-1950s to early 1970s, marked by the revival of superhero comics</dd>

                <dt>Back Issue</dt>
                <dd>A previously published comic book issue</dd>

                <dt>Pull List</dt>
                <dd>A list of titles a customer regularly purchases at a comic shop</dd>

                <dt>Direct Market</dt>
                <dd>The distribution system of selling comics primarily through specialty comic book stores</dd>
              </dl>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#comics-terminology" className="default-links">See Fan Discussions on Comics Terminology →</Link>
            <Link to="/community#comics-reading-guide" className="default-links">Explore Fan-Created Comics Reading Guide →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Comics Genres Guide Section */}
      <section id="comics-genres" className="section-content">
        <div className="container">
          <h2>Comics Genres Guide</h2>
          <p>
            Comics encompass a diverse range of genres and storytelling styles, each with unique characteristics and appeal.
            This guide will help you understand the different types of comics and find series that match your interests.
          </p>

          <div className="genre-navigation">
            <h3>Quick Navigation</h3>
            <div className="genre-nav-buttons">
              <a href="#popular-genres" className="default-links">Popular Genres</a>
              <a href="#publishing-formats" className="default-links">Publishing Formats</a>
              <Link to="/comics/directory#genres" className="default-links">Full Genre Directory →</Link>
            </div>
          </div>

          <div id="popular-genres" className="genre-section">
            <h3>Popular Comics Genres</h3>
            <p>Discover comics series based on your preferred storytelling styles and themes:</p>

            <div className="genre-directory">
              <div className="genre-category">
                <h4>Superhero</h4>
                <p>Stories featuring characters with extraordinary abilities who typically fight crime and protect the innocent.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Batman, Spider-Man, X-Men, Wonder Woman</li>
                  <li><Link to="/comics/directory#genres" className="default-links">Explore Superhero Comics →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Science Fiction</h4>
                <p>Comics that explore futuristic concepts, technology, space travel, and speculative ideas.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Saga, Transmetropolitan, Y: The Last Man</li>
                  <li><Link to="/comics/directory#genres" className="default-links">Explore Science Fiction Comics →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Horror</h4>
                <p>Comics designed to evoke fear, dread, or psychological disturbance through disturbing imagery.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> The Walking Dead, Hellblazer, Locke & Key</li>
                  <li><Link to="/comics/directory#genres" className="default-links">Explore Horror Comics →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Crime/Noir</h4>
                <p>Dark, gritty stories focusing on criminal activity, detectives, and moral ambiguity.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Criminal, Sin City, Gotham Central</li>
                  <li><Link to="/comics/directory#genres" className="default-links">Explore Crime Comics →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Fantasy</h4>
                <p>Set in magical worlds with elements like magic, mythical creatures, and supernatural powers.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Fables, Sandman, Monstress</li>
                  <li><Link to="/comics/directory#genres" className="default-links">Explore Fantasy Comics →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Slice of Life/Memoir</h4>
                <p>Stories about everyday experiences or autobiographical accounts of the creator's life.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Blankets, Fun Home, Persepolis</li>
                  <li><Link to="/comics/directory#genres" className="default-links">Explore Slice of Life Comics →</Link></li>
                </ul>
              </div>
            </div>

            <div className="view-more-container">
              <Link to="/comics/directory#genres" className="view-more-button">View All Genres in Directory</Link>
            </div>
          </div>

          <div id="publishing-formats" className="genre-section">
            <h3>Publishing Formats</h3>
            <p>Comics are published in various formats, each with their own storytelling approaches and audience:</p>

            <div className="genre-directory">
              <div className="genre-category">
                <h4>Monthly Comic Books</h4>
                <p>Serialized stories published in individual issues, typically 20-32 pages.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Most superhero titles from Marvel and DC</li>
                  <li><Link to="/comics/directory#formats" className="default-links">Explore Monthly Comics →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Graphic Novels</h4>
                <p>Longer-form comics published as complete works in a single volume.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Maus, Persepolis, Blankets</li>
                  <li><Link to="/comics/directory#formats" className="default-links">Explore Graphic Novels →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Webcomics</h4>
                <p>Comics published primarily online, often with unique digital formats.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> XKCD, Homestuck, The Oatmeal</li>
                  <li><Link to="/comics/directory#formats" className="default-links">Explore Webcomics →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Newspaper Strips</h4>
                <p>Short-form comics published in newspapers, typically in a few panels.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Calvin and Hobbes, Peanuts, Dilbert</li>
                  <li><Link to="/comics/directory#formats" className="default-links">Explore Newspaper Comics →</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="genre-resources">
            <h3>Finding Your Perfect Comics</h3>
            <p>Not sure where to start? Here are some resources to help you discover comics based on your interests:</p>
            <ul className="resource-links">
              <li><Link to="/comics/directory" className="default-links">Browse Our Comics Shows Directory</Link></li>
              <li><Link to="/comics/directory#popular-series" className="default-links">Popular Series for Beginners</Link></li>
              <li><Link to="/comics/directory#genres" className="default-links">Browse by Genre</Link></li>
            </ul>
          </div>
        </div>
      </section>
      <hr />

      {/* Production Process Section */}
      <section id="production-process" className="section-content">
        <div className="container">
          <h2>Comics Production Process</h2>
          <p>
            Creating comics is a collaborative process that combines artistic skill with storytelling ability. Understanding how comics are made provides insight into the craft and effort behind your favorite series.
          </p>

          <div className="production-stages">
            <div className="production-stage">
              <h3>1. Writing & Planning</h3>
              <ul>
                <li><strong>Script:</strong> The writer creates a script detailing the story, dialogue, and panel descriptions</li>
                <li><strong>Plot:</strong> In some workflows, especially the "Marvel Method," the writer provides a plot outline rather than a full script</li>
                <li><strong>Editorial Direction:</strong> Editors work with writers to develop stories that fit within larger publishing plans</li>
              </ul>
            </div>

            <div className="production-stage">
              <h3>2. Artwork Creation</h3>
              <ul>
                <li><strong>Penciling:</strong> The penciler draws the initial artwork based on the script or plot</li>
                <li><strong>Inking:</strong> The inker adds definition, depth, and contrast to the penciled artwork</li>
                <li><strong>Coloring:</strong> The colorist adds colors to the inked artwork, establishing mood and atmosphere</li>
                <li><strong>Lettering:</strong> The letterer adds dialogue, captions, sound effects, and other text elements</li>
              </ul>
            </div>

            <div className="production-stage">
              <h3>3. Publication & Distribution</h3>
              <ul>
                <li><strong>Editing:</strong> Final review and adjustments before publication</li>
                <li><strong>Printing:</strong> Physical production of comic books or graphic novels</li>
                <li><strong>Digital Formatting:</strong> Preparation for digital distribution platforms</li>
                <li><strong>Distribution:</strong> Delivery to comic shops, bookstores, and digital platforms</li>
              </ul>
            </div>
          </div>

          <div className="info-box">
            <h4>Major Comics Publishers</h4>
            <div className="studio-grid">
              <div className="studio-item">
                <h5>Marvel Comics</h5>
                <p>Known for superhero universes and characters like Spider-Man, X-Men, and Avengers</p>
                <p><strong>Founded:</strong> 1939 (as Timely Comics)</p>
              </div>

              <div className="studio-item">
                <h5>DC Comics</h5>
                <p>Home to iconic characters like Superman, Batman, and Wonder Woman</p>
                <p><strong>Founded:</strong> 1934 (as National Allied Publications)</p>
              </div>

              <div className="studio-item">
                <h5>Image Comics</h5>
                <p>Creator-owned publisher known for innovative series and creator rights</p>
                <p><strong>Founded:</strong> 1992</p>
              </div>

              <div className="studio-item">
                <h5>Dark Horse Comics</h5>
                <p>Known for creator-owned titles, licensed properties, and diverse genres</p>
                <p><strong>Founded:</strong> 1986</p>
              </div>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#comics-creation" className="default-links">Explore Fan Discussions on Comics Creation →</Link>
            <Link to="/community#favorite-publishers" className="default-links">See Fan Rankings of Comics Publishers →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Cultural Impact Section */}
      <section id="cultural-impact" className="section-content">
        <div className="container">
          <h2>Cultural Impact of Comics</h2>
          <p>
            Comics have evolved from simple entertainment to a significant cultural force, influencing art, literature, film, television, and popular culture worldwide.
          </p>

          <div className="impact-areas">
            <div className="impact-area">
              <h3>Media Influence</h3>
              <p>
                Comics have become a primary source material for film and television adaptations, with superhero movies dominating global box office receipts and comic-based TV shows proliferating across streaming platforms. The visual storytelling techniques pioneered in comics have influenced filmmaking, animation, and digital media.
              </p>
              <p>
                The Marvel Cinematic Universe, based on Marvel Comics characters, has become the highest-grossing film franchise in history, demonstrating the mainstream appeal of comic book narratives and characters.
              </p>
            </div>

            <div className="impact-area">
              <h3>Literary Recognition</h3>
              <p>
                Comics have gained increasing recognition as a legitimate literary form:
              </p>
              <ul>
                <li><strong>Critical Acclaim:</strong> Works like "Maus," "Persepolis," and "Fun Home" have received major literary awards</li>
                <li><strong>Academic Study:</strong> Comics are now studied in universities and have spawned scholarly journals and conferences</li>
                <li><strong>Library Collections:</strong> Libraries have expanded their graphic novel collections, recognizing their value in promoting literacy</li>
                <li><strong>Literary Crossover:</strong> Established literary authors have embraced the comics medium</li>
              </ul>
            </div>

            <div className="impact-area">
              <h3>Social Commentary</h3>
              <p>
                Throughout their history, comics have addressed social issues and political concerns, sometimes overtly and sometimes through allegory:
              </p>
              <p>
                From early Superman stories tackling corrupt politicians to X-Men exploring prejudice and civil rights, comics have provided a platform for examining complex social issues. Underground comix of the 1960s and 70s directly challenged social norms, while contemporary graphic novels often address topics like identity, trauma, and social justice.
              </p>
            </div>

            <div className="impact-area">
              <h3>Fan Culture</h3>
              <p>
                Comics have fostered vibrant fan communities and conventions:
              </p>
              <p>
                Comic-Con International in San Diego began as a small gathering of comics fans and has grown into one of the world's largest pop culture events. Comics fandom has pioneered practices now common across media fandoms, including collecting, cosplay, fan fiction, and detailed analysis of fictional universes.
              </p>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#comics-impact" className="default-links">Join Discussions on Comics' Cultural Impact →</Link>
            <Link to="/community#comics-adaptations" className="default-links">Explore Fan Discussions of Comics Adaptations →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Comics Worlds & Universes Section */}
      <section id="comics-worlds" className="section-content">
        <div className="container">
          <h2>Comics Worlds & Universes</h2>
          <p>
            One of the most distinctive aspects of comics is the creation of vast, interconnected fictional universes where multiple characters and stories coexist and interact. These shared universes have become complex narrative ecosystems with their own histories, geographies, and rules.
          </p>

          <div className="world-categories">
            <div className="world-category">
              <h3>Superhero Universes</h3>
              <p>Expansive shared worlds where multiple superhero characters and teams coexist</p>
              <div className="world-examples">
                <div className="world-example">
                  <h4>Marvel Universe</h4>
                  <p>Home to the Avengers, X-Men, Spider-Man, and thousands of other characters, with a history spanning from ancient times to the far future</p>
                  <Link to="/comics/directory#universes" className="default-links">Explore the Marvel Universe in Shows Directory →</Link>
                </div>

                <div className="world-example">
                  <h4>DC Universe</h4>
                  <p>Setting for Superman, Batman, Wonder Woman, and the Justice League, featuring a multiverse of parallel realities</p>
                  <Link to="/comics/directory#universes" className="default-links">Discover the DC Universe in Shows Directory →</Link>
                </div>
              </div>
            </div>

            <div className="world-category">
              <h3>Independent Comics Worlds</h3>
              <p>Unique fictional settings created outside the major superhero publishers</p>
              <div className="world-examples">
                <div className="world-example">
                  <h4>Hellboy Universe</h4>
                  <p>Mike Mignola's dark fantasy world blending folklore, Lovecraftian horror, and pulp adventure</p>
                  <Link to="/comics/shows-directory#universes" className="default-links">Explore the Hellboy Universe in Shows Directory →</Link>
                </div>

                <div className="world-example">
                  <h4>The World of Saga</h4>
                  <p>Brian K. Vaughan and Fiona Staples' space fantasy featuring an interstellar war between magic and technology</p>
                  <Link to="/comics/shows-directory#universes" className="default-links">Discover the World of Saga in Shows Directory →</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="world-building-elements">
            <h3>Elements of Comics World-Building</h3>
            <ul>
              <li><strong>Continuity:</strong> The internal consistency and chronology of events within a fictional universe</li>
              <li><strong>Crossovers:</strong> Stories where characters from different series meet and interact</li>
              <li><strong>Retcons:</strong> Retroactive continuity changes that alter previously established facts</li>
              <li><strong>Multiverses:</strong> Systems of parallel universes allowing for alternate versions of characters and worlds</li>
              <li><strong>Fictional Geography:</strong> Invented locations like Gotham City, Metropolis, or Wakanda</li>
            </ul>
          </div>

          <div className="community-connection">
            <h4>Explore Comics Worlds in Our Shows Directory</h4>
            <p>Our shows directory features official information about your favorite comics universes, including character profiles, location guides, timelines, and more!</p>
            <Link to="/comics/shows-directory" className="default-links">Browse All Comics Shows →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Audience Categories Section */}
      <section id="audience-categories" className="section-content">
        <div className="container">
          <h2>Comics for Different Audiences</h2>
          <p>
            Comics offer content for readers of all ages, interests, and experience levels. Whether you're new to comics or a seasoned fan, there's something for everyone.
          </p>

          <div className="audience-categories">
            <div className="audience-category">
              <h3>For Beginners</h3>
              <p>These accessible series serve as excellent entry points to comics, featuring compelling stories and universal themes:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Watchmen</strong> - Alan Moore and Dave Gibbons' groundbreaking deconstruction of the superhero genre
                  <Link to="/comics/shows-directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>Saga</strong> - Brian K. Vaughan and Fiona Staples' epic space fantasy about a family caught between warring factions
                  <Link to="/comics/shows-directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>Maus</strong> - Art Spiegelman's Pulitzer Prize-winning memoir about his father's experiences during the Holocaust
                  <Link to="/comics/shows-directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>Classic Series</h3>
              <p>These influential works have stood the test of time and helped shape comics as we know it today:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Batman: Year One</strong> - Frank Miller and David Mazzucchelli's definitive Batman origin story
                  <Link to="/comics/shows-directory#eras" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>The Dark Phoenix Saga</strong> - Chris Claremont and John Byrne's classic X-Men storyline
                  <Link to="/comics/shows-directory#eras" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>Sandman</strong> - Neil Gaiman's epic fantasy series that redefined the possibilities of the comics medium
                  <Link to="/comics/shows-directory#eras" className="default-links">View Series Details →</Link>
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>Recent Hits</h3>
              <p>These newer series represent the current generation of popular comics:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Monstress</strong> - Marjorie Liu and Sana Takeda's dark fantasy epic with stunning artwork
                  <Link to="/comics/shows-directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>Something is Killing the Children</strong> - James Tynion IV's horror series about monsters only children can see
                  <Link to="/comics/shows-directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>Die</strong> - Kieron Gillen and Stephanie Hans' dark take on fantasy role-playing games
                  <Link to="/comics/shows-directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="community-connection">
            <h4>Find Your Next Favorite Comics</h4>
            <p>Looking for more comics to read? Browse our comprehensive shows directory to discover series based on your interests and preferences.</p>
            <Link to="/comics/shows-directory" className="default-links">Browse All Comics Shows →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Learning Resources Section */}
      <section id="learning-resources" className="section-content">
        <div className="container">
          <h2>Learning Resources</h2>
          <p>
            Whether you're new to comics or looking to deepen your knowledge, these resources will help you navigate and appreciate the world of comics.
          </p>

          <div className="resource-categories">
            <div className="resource-category">
              <h3>Beginner's Guides</h3>
              <div className="resource-items">
                <div className="resource-item">
                  <h4>Getting Started with Comics</h4>
                  <p>A comprehensive introduction to comics for complete beginners, covering basic terminology, common genres, and recommended first reads.</p>
                  <Link to="/community#comics-beginners-guide" className="default-links">Read the Guide →</Link>
                </div>

                <div className="resource-item">
                  <h4>Comics Reading Guide</h4>
                  <p>Information on how to read and interpret the visual language of comics, including panel flow, artistic techniques, and storytelling conventions.</p>
                  <Link to="/community#understanding-comics-guide" className="default-links">Read the Guide →</Link>
                </div>
              </div>
            </div>

            <div className="resource-category">
              <h3>Finding What to Read</h3>
              <div className="resource-items">
                <div className="resource-item">
                  <h4>Comics Recommendation Flowchart</h4>
                  <p>An interactive tool to help you find comics based on your preferences and interests.</p>
                  <Link to="/community#comics-flowchart" className="default-links">Use the Flowchart →</Link>
                </div>

                <div className="resource-item">
                  <h4>New Release Guide</h4>
                  <p>Information about new and upcoming comics releases from major and independent publishers.</p>
                  <Link to="/community#comics-releases" className="default-links">View Current Releases →</Link>
                </div>
              </div>
            </div>

            <div className="resource-category">
              <h3>Deepening Your Knowledge</h3>
              <div className="resource-items">
                <div className="resource-item">
                  <h4>Comics Analysis Resources</h4>
                  <p>Guides to understanding comics on a deeper level, including visual techniques, storytelling patterns, and cultural context.</p>
                  <Link to="/community#comics-analysis" className="default-links">Explore Analysis Resources →</Link>
                </div>

                <div className="resource-item">
                  <h4>Comics History Deep Dives</h4>
                  <p>Detailed explorations of significant periods, movements, and innovations in comics history.</p>
                  <Link to="/community#comics-history-deep-dives" className="default-links">Learn More →</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="community-resources">
            <h3>Community-Created Resources</h3>
            <p>Our community members have created valuable resources to help fellow comics fans:</p>
            <div className="community-resource-grid">
              <div className="community-resource">
                <h4>Fan-Made Reading Orders</h4>
                <p>Guides for navigating complex superhero continuity and long-running series</p>
                <Link to="/community#reading-orders" className="default-links">See Reading Orders →</Link>
              </div>

              <div className="community-resource">
                <h4>Comics Collections</h4>
                <p>Curated lists of comics based on themes, genres, or recommendations for specific interests</p>
                <Link to="/community#comics-collections" className="default-links">Browse Collections →</Link>
              </div>

              <div className="community-resource">
                <h4>Comics Discussion Guides</h4>
                <p>Resources for hosting comics reading clubs or discussion groups</p>
                <Link to="/community#discussion-guides" className="default-links">Get Discussion Guides →</Link>
              </div>

              <div className="community-resource">
                <h4>Comics Glossary</h4>
                <p>An extensive dictionary of comics-related terms maintained by community members</p>
                <Link to="/community#comics-glossary" className="default-links">View Glossary →</Link>
              </div>
            </div>
          </div>

          <div className="community-connection">
            <h4>Contribute Your Knowledge</h4>
            <p>Have expertise or insights about comics you'd like to share? Join our community and contribute to our growing collection of comics resources!</p>
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
            <p><span>📧</span> contact@fanarc.com</p>
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

export default ComicsPage;
