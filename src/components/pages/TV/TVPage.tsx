import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';
import '../../../components/ui/MediaPages.css';
import '../../../components/ui/TVPage.css';

const TVPage: React.FC = () => {
  return (
    <div className="tv-page">
      <header>
        <div className="image-header">
          <img src="/images/tv/TVHeader.jpg" alt="Television Overview" />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search From TV Page"
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
            <h2>Television Encyclopedia</h2>
            <p>Welcome to our comprehensive guide to television. Use this table of contents to navigate to different sections.</p>

          <div className="toc-container">
            <div className="toc-column">
              <h3>Fundamentals</h3>
              <ul className="toc-list">
                <li><a href="#the-basics" className="default-links">The Basics</a></li>
                <li><a href="#history-of-tv" className="default-links">History of Television</a></li>
                <li><a href="#terminology-guide" className="default-links">Terminology Guide</a></li>
              </ul>
            </div>

            <div className="toc-column">
              <h3>Categories & Styles</h3>
              <ul className="toc-list">
                <li><a href="#tv-genres" className="default-links">TV Genres Guide</a></li>
                <li><a href="#tv-worlds" className="default-links">TV Worlds & Universes</a></li>
                <li><a href="#audience-categories" className="default-links">TV for Different Audiences</a></li>
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
            <h4>Looking for specific TV shows or characters?</h4>
            <p>Browse our <Link to="/tv/directory" className="default-links">TV Shows Directory</Link> to find official pages for your favorite series and characters.</p>
            <p>You can also visit our <Link to="/community#tv-section" className="default-links">Community Section</Link> to explore fan-created content about TV series, characters, and more!</p>
          </div>
        </div>
      </section>
      <hr />

      {/* The Basics Section */}
      <section id="the-basics" className="section-content">
        <div className="container">
          <h2>The Basics</h2>
          <p>
            Television is a medium that combines visual storytelling with audio to create episodic narratives that can span from a single season to decades of continuous storytelling. From broadcast networks to streaming platforms, television has evolved into one of the most influential and accessible forms of entertainment worldwide.
          </p>

          <p>
            The term "television" refers both to the technology used to transmit and receive moving images and sound, as well as to the content created for this medium. TV shows come in various formats, from half-hour sitcoms to hour-long dramas, limited series, anthologies, and reality programming.
          </p>

          <p>
            Television production occurs globally, with distinct traditions developing in different regions. American television, British television, and other national industries each have their own production models, storytelling approaches, and distribution systems. These different traditions have increasingly cross-pollinated in the global streaming era.
          </p>

          <div className="info-box">
            <h4>Key Characteristics of Television</h4>
            <ul>
              <li><strong>Episodic Storytelling:</strong> Stories told through discrete episodes that build upon each other</li>
              <li><strong>Seasonal Structure:</strong> Content typically organized into seasons of multiple episodes</li>
              <li><strong>Character Development:</strong> Extended format allows for deep character exploration over time</li>
              <li><strong>Varied Formats:</strong> From 30-minute comedies to hour-long dramas to limited series</li>
              <li><strong>Evolving Distribution:</strong> From broadcast-only to cable to streaming platforms</li>
            </ul>
          </div>

          <div className="community-connection">
            <Link to="/community#tv-basics-discussion" className="default-links">Join the Discussion on Television Basics →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* History of Television Section */}
      <section id="history-of-tv" className="section-content">
        <div className="container">
          <h2>History of Television</h2>
          <p>
            The evolution of television spans nearly a century, developing from experimental technology to the dominant entertainment medium of the 20th century and beyond. Understanding this history helps appreciate the medium's significance and influence.
          </p>

          <div className="timeline-container">
            <div className="timeline-item">
              <div className="timeline-date">1920s-1930s</div>
              <div className="timeline-content">
                <h4>Early Development</h4>
                <p>Mechanical television systems were developed in the 1920s, with electronic television emerging in the 1930s. The first regular television broadcasts began in the late 1930s in the UK and US.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1940s-1950s</div>
              <div className="timeline-content">
                <h4>The Golden Age</h4>
                <p>Television ownership exploded in the post-WWII era, particularly in the United States. This period saw the rise of variety shows, early sitcoms, and live drama anthologies like "Playhouse 90" and "The Twilight Zone."</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1960s-1970s</div>
              <div className="timeline-content">
                <h4>Social Change & Innovation</h4>
                <p>Television became a powerful force for social change, bringing the Vietnam War and Civil Rights Movement into living rooms. Color TV became standard, and groundbreaking shows like "All in the Family" and "M*A*S*H" addressed social issues.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1980s</div>
              <div className="timeline-content">
                <h4>Cable Revolution</h4>
                <p>The rise of cable television expanded viewing options dramatically. MTV changed music promotion forever, while channels like HBO began offering content that couldn't be shown on broadcast networks.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">1990s-2000s</div>
              <div className="timeline-content">
                <h4>Quality TV Era</h4>
                <p>Shows like "The Sopranos," "The Wire," and "Buffy the Vampire Slayer" pushed the boundaries of television storytelling. Reality TV emerged as a dominant format with shows like "Survivor" and "American Idol."</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-date">2010s-Present</div>
              <div className="timeline-content">
                <h4>Streaming Revolution</h4>
                <p>Netflix, Hulu, Amazon Prime, and other streaming services transformed how television is produced, distributed, and consumed. Binge-watching became common, and the distinction between TV and film began to blur.</p>
              </div>
            </div>
          </div>

          <div className="key-figures">
            <h3>Key Figures in Television History</h3>
            <div className="figure-cards">
              <div className="figure-card">
                <h4>Philo Farnsworth (1906-1971)</h4>
                <p>Inventor who created the first fully electronic television system in 1927, laying the groundwork for modern television technology.</p>
              </div>

              <div className="figure-card">
                <h4>Lucille Ball (1911-1989)</h4>
                <p>Star of "I Love Lucy" and co-founder of Desilu Productions, one of the first successful independent television production companies. Her innovations in multi-camera filming and syndication shaped the industry.</p>
              </div>

              <div className="figure-card">
                <h4>Norman Lear (1922-)</h4>
                <p>Producer who revolutionized television with socially conscious sitcoms like "All in the Family," "The Jeffersons," and "Maude," addressing previously taboo topics on primetime TV.</p>
              </div>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#tv-history" className="default-links">Explore Fan Discussions on Television History →</Link>
            <Link to="/community#legendary-tv-creators" className="default-links">See Fan Tributes to Legendary Creators →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Terminology Guide Section */}
      <section id="terminology-guide" className="section-content">
        <div className="container">
          <h2>Television Terminology Guide</h2>
          <p>
            The world of television has developed its own unique vocabulary. Understanding these terms will enhance your appreciation and help you navigate discussions about TV.
          </p>

          <div className="terminology-container">
            <div className="terminology-category">
              <h3>Format & Production Terms</h3>
              <dl className="terminology-list">
                <dt>Pilot</dt>
                <dd>The first episode of a series, often produced to convince networks to order a full season</dd>

                <dt>Series</dt>
                <dd>A set of related episodes with the same characters and continuing storylines</dd>

                <dt>Season</dt>
                <dd>A group of episodes produced and broadcast during a specific time period</dd>

                <dt>Showrunner</dt>
                <dd>The person with overall creative authority and management responsibility for a TV series</dd>

                <dt>Syndication</dt>
                <dd>The licensing of television programs to multiple broadcasting stations</dd>
              </dl>
            </div>

            <div className="terminology-category">
              <h3>Narrative & Structure Terms</h3>
              <dl className="terminology-list">
                <dt>Arc</dt>
                <dd>A storyline that extends over multiple episodes or seasons</dd>

                <dt>Bottle Episode</dt>
                <dd>An episode confined to one location, often produced to save budget</dd>

                <dt>Cliffhanger</dt>
                <dd>An unresolved ending designed to create suspense and encourage viewers to return</dd>

                <dt>Cold Open</dt>
                <dd>A scene before the opening credits or title sequence</dd>

                <dt>Crossover</dt>
                <dd>When characters from one show appear in another show</dd>
              </dl>
            </div>

            <div className="terminology-category">
              <h3>Industry & Broadcast Terms</h3>
              <dl className="terminology-list">
                <dt>Nielsen Ratings</dt>
                <dd>The system used to measure television viewership in the United States</dd>

                <dt>Sweeps</dt>
                <dd>Periods when ratings are measured to set advertising rates</dd>

                <dt>Upfronts</dt>
                <dd>Annual presentations where networks showcase their upcoming programming to advertisers</dd>

                <dt>Jump the Shark</dt>
                <dd>The point when a show begins to decline in quality, named after a Happy Days episode</dd>

                <dt>Binge-watching</dt>
                <dd>Watching multiple episodes of a show in rapid succession</dd>
              </dl>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#tv-terminology" className="default-links">See Fan Discussions on TV Terminology →</Link>
            <Link to="/community#tv-viewing-guide" className="default-links">Explore Fan-Created TV Viewing Guide →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* TV Genres Guide Section */}
      <section id="tv-genres" className="section-content">
        <div className="container">
          <h2>Television Genres Guide</h2>
          <p>
            Television encompasses a diverse range of genres and formats, each with unique characteristics and storytelling approaches.
            This guide will help you understand the different types of TV shows and find series that match your interests.
          </p>

          <div className="genre-navigation">
            <h3>Quick Navigation</h3>
            <div className="genre-nav-buttons">
              <a href="#scripted-genres" className="default-links">Scripted Genres</a>
              <a href="#unscripted-genres" className="default-links">Unscripted Genres</a>
              <Link to="/tv/directory#genres" className="default-links">Full Genre Directory →</Link>
            </div>
          </div>

          <div id="scripted-genres" className="genre-section">
            <h3>Scripted Genres</h3>
            <p>These genres feature fictional narratives with written scripts and professional actors:</p>

            <div className="genre-directory">
              <div className="genre-category">
                <h4>Drama</h4>
                <p>Character-driven narratives that explore complex emotions, relationships, and conflicts.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Breaking Bad, The Crown, This Is Us</li>
                  <li><Link to="/tv/directory#genres" className="default-links">Explore Drama TV →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Comedy</h4>
                <p>Shows designed to make viewers laugh, typically with humorous situations and characters.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> The Office, Friends, Brooklyn Nine-Nine</li>
                  <li><Link to="/tv/directory#genres" className="default-links">Explore Comedy TV →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Science Fiction</h4>
                <p>Shows that explore speculative concepts, futuristic technology, and alternate realities.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Star Trek, The Expanse, Doctor Who</li>
                  <li><Link to="/tv/directory#genres" className="default-links">Explore Science Fiction TV →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Crime/Procedural</h4>
                <p>Focuses on solving crimes, often with a case-of-the-week format.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Law & Order, CSI, Criminal Minds</li>
                  <li><Link to="/tv/directory#genres" className="default-links">Explore Crime TV →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Fantasy</h4>
                <p>Features magical elements, mythical creatures, and supernatural phenomena.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Game of Thrones, The Witcher, Supernatural</li>
                  <li><Link to="/tv/directory#genres" className="default-links">Explore Fantasy TV →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Horror</h4>
                <p>Designed to frighten viewers with supernatural or psychological threats.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> The Haunting of Hill House, American Horror Story</li>
                  <li><Link to="/tv/directory#genres" className="default-links">Explore Horror TV →</Link></li>
                </ul>
              </div>
            </div>

            <div className="view-more-container">
              <Link to="/tv/directory#genres" className="view-more-button">View All Genres in Directory</Link>
            </div>
          </div>

          <div id="unscripted-genres" className="genre-section">
            <h3>Unscripted Genres</h3>
            <p>These genres feature real people rather than actors, though they may follow structured formats:</p>

            <div className="genre-directory">
              <div className="genre-category">
                <h4>Reality Competition</h4>
                <p>Shows where contestants compete for prizes, often involving elimination formats.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Survivor, The Amazing Race, Top Chef</li>
                  <li><Link to="/tv/directory#unscripted" className="default-links">Explore Reality Competitions →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Documentary Series</h4>
                <p>In-depth explorations of real events, people, or phenomena.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Planet Earth, Making a Murderer, The Last Dance</li>
                  <li><Link to="/tv/directory#unscripted" className="default-links">Explore Documentary Series →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Talk Shows</h4>
                <p>Programs featuring hosts interviewing guests or presenting entertainment.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> The Tonight Show, The View, The Daily Show</li>
                  <li><Link to="/tv/directory#unscripted" className="default-links">Explore Talk Shows →</Link></li>
                </ul>
              </div>

              <div className="genre-category">
                <h4>Reality Lifestyle</h4>
                <p>Shows following the lives of real people, either celebrities or ordinary individuals.</p>
                <ul className="show-list">
                  <li><strong>Notable Examples:</strong> Keeping Up with the Kardashians, Queer Eye</li>
                  <li><Link to="/tv/directory#unscripted" className="default-links">Explore Reality Lifestyle Shows →</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="genre-resources">
            <h3>Finding Your Perfect TV Shows</h3>
            <p>Not sure where to start? Here are some resources to help you discover television shows based on your interests:</p>
            <ul className="resource-links">
              <li><Link to="/tv/directory" className="default-links">Browse Our TV Shows Directory</Link></li>
              <li><Link to="/tv/directory#popular-series" className="default-links">Popular Series for Beginners</Link></li>
              <li><Link to="/tv/directory#genres" className="default-links">Browse by Genre</Link></li>
            </ul>
          </div>
        </div>
      </section>
      <hr />

      {/* Production Process Section */}
      <section id="production-process" className="section-content">
        <div className="container">
          <h2>Television Production Process</h2>
          <p>
            Creating a television show is a complex, collaborative process involving multiple stages and specialized teams. Understanding how TV is made provides insight into the artistry and effort behind your favorite series.
          </p>

          <div className="production-stages">
            <div className="production-stage">
              <h3>1. Development</h3>
              <ul>
                <li><strong>Concept Creation:</strong> Developing the initial idea for a series</li>
                <li><strong>Pitching:</strong> Presenting the concept to networks or streaming platforms</li>
                <li><strong>Pilot Order:</strong> Getting approval to produce a pilot episode</li>
                <li><strong>Pilot Production:</strong> Creating the first episode to demonstrate the show's potential</li>
              </ul>
            </div>

            <div className="production-stage">
              <h3>2. Pre-Production</h3>
              <ul>
                <li><strong>Writers' Room:</strong> Team of writers developing scripts and story arcs</li>
                <li><strong>Casting:</strong> Finding actors for each role</li>
                <li><strong>Location Scouting:</strong> Finding places to film</li>
                <li><strong>Set Design:</strong> Creating the physical environments for the show</li>
              </ul>
            </div>

            <div className="production-stage">
              <h3>3. Production</h3>
              <ul>
                <li><strong>Principal Photography:</strong> Filming the actual episodes</li>
                <li><strong>Direction:</strong> Guiding actors and crew to realize the script</li>
                <li><strong>Cinematography:</strong> Capturing the visual elements of the show</li>
                <li><strong>Sound Recording:</strong> Capturing dialogue and ambient sound</li>
              </ul>
            </div>

            <div className="production-stage">
              <h3>4. Post-Production</h3>
              <ul>
                <li><strong>Editing:</strong> Assembling footage into coherent episodes</li>
                <li><strong>Visual Effects:</strong> Adding computer-generated elements</li>
                <li><strong>Sound Design:</strong> Creating and mixing audio elements</li>
                <li><strong>Music:</strong> Adding original score or licensed music</li>
              </ul>
            </div>

            <div className="production-stage">
              <h3>5. Distribution</h3>
              <ul>
                <li><strong>Marketing:</strong> Promoting the show to potential viewers</li>
                <li><strong>Broadcasting/Streaming:</strong> Making the show available to audiences</li>
                <li><strong>International Sales:</strong> Licensing the show to foreign markets</li>
                <li><strong>Merchandising:</strong> Creating products based on the show</li>
              </ul>
            </div>
          </div>

          <div className="info-box">
            <h4>Major Television Networks & Platforms</h4>
            <div className="studio-grid">
              <div className="studio-item">
                <h5>Traditional Networks</h5>
                <p>Broadcast television channels available over the air</p>
                <p><strong>Examples:</strong> ABC, NBC, CBS, FOX, BBC</p>
              </div>

              <div className="studio-item">
                <h5>Cable Networks</h5>
                <p>Specialized channels available through cable or satellite subscriptions</p>
                <p><strong>Examples:</strong> HBO, AMC, FX, Showtime</p>
              </div>

              <div className="studio-item">
                <h5>Streaming Platforms</h5>
                <p>Internet-based services offering on-demand content</p>
                <p><strong>Examples:</strong> Netflix, Hulu, Amazon Prime Video, Disney+</p>
              </div>

              <div className="studio-item">
                <h5>Production Studios</h5>
                <p>Companies that create television content</p>
                <p><strong>Examples:</strong> Warner Bros. Television, Universal Television, BBC Studios</p>
              </div>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#tv-production" className="default-links">Explore Fan Discussions on TV Production →</Link>
            <Link to="/community#favorite-networks" className="default-links">See Fan Rankings of TV Networks →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Cultural Impact Section */}
      <section id="cultural-impact" className="section-content">
        <div className="container">
          <h2>Cultural Impact of Television</h2>
          <p>
            Television has been one of the most influential cultural forces of the past century, shaping public opinion, reflecting and challenging social norms, and creating shared cultural experiences across diverse audiences.
          </p>

          <div className="impact-areas">
            <div className="impact-area">
              <h3>Social Influence</h3>
              <p>
                Television has played a crucial role in shaping public discourse and social change. From coverage of the Civil Rights Movement to groundbreaking shows like "All in the Family" addressing racism and "Will & Grace" normalizing LGBTQ+ characters, TV has both reflected and influenced social attitudes.
              </p>
              <p>
                News programming has been particularly influential, with events like the Kennedy assassination, the Moon landing, 9/11, and countless political moments experienced collectively through television, creating shared national and global experiences.
              </p>
            </div>

            <div className="impact-area">
              <h3>Language & Popular Culture</h3>
              <p>
                Television has introduced countless catchphrases, references, and cultural touchstones into everyday language:
              </p>
              <ul>
                <li><strong>Catchphrases:</strong> From "D'oh!" (The Simpsons) to "How you doin'?" (Friends) to "Winter is coming" (Game of Thrones)</li>
                <li><strong>Character Archetypes:</strong> Creating recognizable types that influence how we understand personality traits</li>
                <li><strong>Fashion Trends:</strong> From Rachel Green's hairstyle to Miami Vice suits</li>
                <li><strong>Cultural References:</strong> TV shows provide a common language of references across generations</li>
              </ul>
            </div>

            <div className="impact-area">
              <h3>Technological Evolution</h3>
              <p>
                Television has both driven and adapted to technological change:
              </p>
              <p>
                From the transition to color broadcasting to the shift from analog to digital signals, from VCRs allowing time-shifting to DVRs and streaming services enabling on-demand viewing, television has continuously evolved. Each technological shift has changed not just how we watch but what we watch and how stories are told.
              </p>
            </div>

            <div className="impact-area">
              <h3>Global Reach</h3>
              <p>
                Television has connected cultures across national boundaries:
              </p>
              <p>
                American shows have influenced global culture, while international programming like British dramas, Scandinavian noir, Korean dramas, and Japanese anime have found worldwide audiences. Streaming platforms have accelerated this cross-cultural exchange, making television increasingly global rather than national in scope.
              </p>
            </div>
          </div>

          <div className="community-connection">
            <Link to="/community#tv-impact" className="default-links">Join Discussions on Television's Cultural Impact →</Link>
            <Link to="/community#tv-moments" className="default-links">Explore Fan Discussions of Iconic TV Moments →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* TV Worlds & Universes Section */}
      <section id="tv-worlds" className="section-content">
        <div className="container">
          <h2>Television Worlds & Universes</h2>
          <p>
            Television's long-form storytelling allows for the creation of rich, detailed fictional worlds that can be explored over many episodes and seasons. These worlds become immersive environments that viewers can return to again and again.
          </p>

          <div className="world-categories">
            <div className="world-category">
              <h3>Expansive Fictional Universes</h3>
              <p>Complex worlds with their own histories, geographies, and rules</p>
              <div className="world-examples">
                <div className="world-example">
                  <h4>The Star Trek Universe</h4>
                  <p>A future where humanity has joined a galactic community, spanning multiple series across different time periods and locations</p>
                  <Link to="/tv/directory#universes" className="default-links">Explore the Star Trek Universe in Shows Directory →</Link>
                </div>

                <div className="world-example">
                  <h4>The Arrowverse</h4>
                  <p>A shared universe of DC Comics-based shows including Arrow, The Flash, Supergirl, and Legends of Tomorrow</p>
                  <Link to="/tv/directory#universes" className="default-links">Discover the Arrowverse in Shows Directory →</Link>
                </div>
              </div>
            </div>

            <div className="world-category">
              <h3>Richly Detailed Settings</h3>
              <p>Specific locations with distinctive characteristics and atmospheres</p>
              <div className="world-examples">
                <div className="world-example">
                  <h4>Westeros (Game of Thrones)</h4>
                  <p>A medieval fantasy continent with complex political systems, diverse cultures, and supernatural elements</p>
                  <Link to="/tv/directory#universes" className="default-links">Explore Westeros in Shows Directory →</Link>
                </div>

                <div className="world-example">
                  <h4>Twin Peaks</h4>
                  <p>A small town with surreal elements and dark secrets lurking beneath its seemingly idyllic surface</p>
                  <Link to="/tv/directory#universes" className="default-links">Discover Twin Peaks in Shows Directory →</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="world-building-elements">
            <h3>Elements of Television World-Building</h3>
            <ul>
              <li><strong>Consistent Rules:</strong> Establishing how the world works and maintaining those rules</li>
              <li><strong>History & Lore:</strong> Creating backstories and events that happened before the show begins</li>
              <li><strong>Cultural Details:</strong> Developing customs, languages, and social structures</li>
              <li><strong>Physical Environments:</strong> Designing distinctive locations and settings</li>
              <li><strong>Recurring Elements:</strong> Using visual motifs, music, and other elements to create a cohesive world</li>
            </ul>
          </div>

          <div className="community-connection">
            <h4>Explore Television Worlds in Our Shows Directory</h4>
            <p>Our shows directory features official information about your favorite TV universes, including character profiles, location guides, timelines, and more!</p>
            <Link to="/tv/directory" className="default-links">Browse All TV Shows →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Audience Categories Section */}
      <section id="audience-categories" className="section-content">
        <div className="container">
          <h2>Television for Different Audiences</h2>
          <p>
            Television offers content for viewers of all ages, interests, and preferences. Whether you're looking for family-friendly entertainment, sophisticated drama, or niche content, there's something for everyone.
          </p>

          <div className="audience-categories">
            <div className="audience-category">
              <h3>For Beginners</h3>
              <p>These acclaimed series are excellent entry points to quality television:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Breaking Bad</strong> - Vince Gilligan's transformation story of a high school teacher turned drug kingpin
                  <Link to="/tv/directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>The Office</strong> - A mockumentary-style workplace comedy that balances cringe humor with heart
                  <Link to="/tv/directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>Stranger Things</strong> - A nostalgic 1980s-set supernatural mystery with interdimensional threats
                  <Link to="/tv/directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>Classic Series</h3>
              <p>These influential works have stood the test of time and helped shape television as we know it today:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>The Wire</strong> - David Simon's intricate examination of Baltimore's institutions and the people within them
                  <Link to="/tv/directory#eras" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>The Sopranos</strong> - David Chase's groundbreaking mob drama that revolutionized television storytelling
                  <Link to="/tv/directory#eras" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>Twin Peaks</strong> - David Lynch's surreal mystery that pushed the boundaries of television
                  <Link to="/tv/directory#eras" className="default-links">View Series Details →</Link>
                </li>
              </ul>
            </div>

            <div className="audience-category">
              <h3>Recent Hits</h3>
              <p>These newer series represent the current generation of acclaimed television:</p>
              <ul className="recommendation-list">
                <li>
                  <strong>Succession</strong> - A darkly comic drama about a dysfunctional media dynasty family
                  <Link to="/tv/directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>Ted Lasso</strong> - A heartwarming comedy about an American football coach managing a British soccer team
                  <Link to="/tv/directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
                <li>
                  <strong>The White Lotus</strong> - Mike White's satirical anthology series set at a luxury resort chain
                  <Link to="/tv/directory#popular-series" className="default-links">View Series Details →</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="community-connection">
            <h4>Find Your Next Favorite TV Show</h4>
            <p>Looking for more TV shows to watch? Browse our comprehensive shows directory to discover series based on your interests and preferences.</p>
            <Link to="/tv/directory" className="default-links">Browse All TV Shows →</Link>
          </div>
        </div>
      </section>
      <hr />

      {/* Learning Resources Section */}
      <section id="learning-resources" className="section-content">
        <div className="container">
          <h2>Learning Resources</h2>
          <p>
            Whether you're new to television analysis or looking to deepen your knowledge, these resources will help you navigate and appreciate the world of TV.
          </p>

          <div className="resource-categories">
            <div className="resource-category">
              <h3>Understanding Television</h3>
              <div className="resource-items">
                <div className="resource-item">
                  <h4>Television Analysis Basics</h4>
                  <p>An introduction to analyzing television shows, including visual storytelling, narrative structure, and thematic elements.</p>
                  <Link to="/community#tv-analysis-basics" className="default-links">Read the Guide →</Link>
                </div>

                <div className="resource-item">
                  <h4>The Evolution of Television</h4>
                  <p>An overview of how television has changed over time, from broadcast networks to the streaming era.</p>
                  <Link to="/community#tv-evolution" className="default-links">Read the Guide →</Link>
                </div>
              </div>
            </div>

            <div className="resource-category">
              <h3>Finding What to Watch</h3>
              <div className="resource-items">
                <div className="resource-item">
                  <h4>TV Show Recommendation Tool</h4>
                  <p>An interactive tool to help you find television shows based on your preferences and interests.</p>
                  <Link to="/community#tv-recommendation-tool" className="default-links">Use the Tool →</Link>
                </div>

                <div className="resource-item">
                  <h4>Essential TV Shows by Decade</h4>
                  <p>Curated lists of influential and significant television shows from each decade.</p>
                  <Link to="/community#tv-by-decade" className="default-links">View the Lists →</Link>
                </div>
              </div>
            </div>

            <div className="resource-category">
              <h3>Deepening Your Knowledge</h3>
              <div className="resource-items">
                <div className="resource-item">
                  <h4>Television Production Insights</h4>
                  <p>Detailed information about how television shows are created, from writing to filming to post-production.</p>
                  <Link to="/community#tv-production-insights" className="default-links">Explore Production Resources →</Link>
                </div>

                <div className="resource-item">
                  <h4>Television History Deep Dives</h4>
                  <p>In-depth explorations of significant periods, movements, and innovations in television history.</p>
                  <Link to="/community#tv-history-deep-dives" className="default-links">Learn More →</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="community-resources">
            <h3>Community-Created Resources</h3>
            <p>Our community members have created valuable resources to help fellow television fans:</p>
            <div className="community-resource-grid">
              <div className="community-resource">
                <h4>Fan-Made Episode Guides</h4>
                <p>Detailed guides to television series, including episode summaries and analysis</p>
                <Link to="/community#episode-guides" className="default-links">See Episode Guides →</Link>
              </div>

              <div className="community-resource">
                <h4>TV Show Collections</h4>
                <p>Curated lists of television shows based on themes, genres, or recommendations for specific interests</p>
                <Link to="/community#tv-collections" className="default-links">Browse Collections →</Link>
              </div>

              <div className="community-resource">
                <h4>TV Discussion Guides</h4>
                <p>Resources for hosting television viewing clubs or discussion groups</p>
                <Link to="/community#tv-discussion-guides" className="default-links">Get Discussion Guides →</Link>
              </div>

              <div className="community-resource">
                <h4>TV Glossary</h4>
                <p>An extensive dictionary of television-related terms maintained by community members</p>
                <Link to="/community#tv-glossary" className="default-links">View Glossary →</Link>
              </div>
            </div>
          </div>

          <div className="community-connection">
            <h4>Contribute Your Knowledge</h4>
            <p>Have expertise or insights about television you'd like to share? Join our community and contribute to our growing collection of television resources!</p>
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
                <li><Link to="/metaverse">Metaverse 🎮</Link></li>
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

export default TVPage;
