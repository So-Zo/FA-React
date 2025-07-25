import React from 'react';
import { Link } from 'react-router-dom';
import TableOfContents, { TocSectionProps } from '../../../components/ui/TableOfContents';

const TVPage: React.FC = () => {
  // Define TOC sections
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Basics", anchor: "#the-basics" },
        { label: "History", anchor: "#history-of-tv" },
        { label: "Terms", anchor: "#terminology-guide" }
      ],
      deepLinks: [
        { label: "Full History", path: "/tv/history", exists: true }
      ]
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Genres", anchor: "#tv-genres" },
        { label: "Worlds", anchor: "#tv-worlds" },
        { label: "Audience", anchor: "#audience-categories" }
      ],
      deepLinks: [
        { label: "Directory", path: "/tv/directory", exists: true }
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
    <div className="tv-page">
      <header>
        <div className="image-header">
          <img src="/images/TV/TVHeader.jpg" alt="Television Overview" />
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
          title="TV Encyclopedia"
          description="Use this table of contents to navigate through the TV guide."
        />

      <hr />

      {/* The Basics Section */}
      <section id="the-basics" className="section-content">
        
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
      </section>
      <hr />

      {/* History of Television Section */}
      <section id="history-of-tv" className="section-content">
       
          <h2>History of Television</h2>
          <p>
            The evolution of television spans nearly a century, developing from experimental technology to the dominant entertainment medium of the 20th century and beyond. Understanding this history helps appreciate the medium's significance and influence.
          </p>


                <h4>Early Development 1920-1930s</h4>
                <p>Mechanical television systems were developed in the 1920s, with electronic television emerging in the 1930s. The first regular television broadcasts began in the late 1930s in the UK and US.</p>
              

                <h4>The Golden Age 1940s-1950s</h4>
                <p>Television ownership exploded in the post-WWII era, particularly in the United States. This period saw the rise of variety shows, early sitcoms, and live drama anthologies like "Playhouse 90" and "The Twilight Zone."</p>
              


                <h4>Social Change & Innovation 1960s-1970s</h4>
                <p>Television became a powerful force for social change, bringing the Vietnam War and Civil Rights Movement into living rooms. Color TV became standard, and groundbreaking shows like "All in the Family" and "M*A*S*H" addressed social issues.</p>
             


                <h4>Cable Revolution 1980s</h4>
                <p>The rise of cable television expanded viewing options dramatically. MTV changed music promotion forever, while channels like HBO began offering content that couldn't be shown on broadcast networks.</p>
              


                <h4>Quality TV Era 1990s-2000s</h4>
                <p>Shows like "The Sopranos," "The Wire," and "Buffy the Vampire Slayer" pushed the boundaries of television storytelling. Reality TV emerged as a dominant format with shows like "Survivor" and "American Idol."</p>
             


                <h4>Streaming Revolution 2010s-Present</h4>
                <p>Netflix, Hulu, Amazon Prime, and other streaming services transformed how television is produced, distributed, and consumed. Binge-watching became common, and the distinction between TV and film began to blur.</p>
              

          <h3>Key Figures in Television History</h3>
          <div className="profile-card-grid">
            <div className="profile-card">
              <div className="profile-card-content">
                <h4 className="profile-card-title">Philo Farnsworth (1906-1971)</h4>
                <p className="profile-card-text">Inventor who created the first fully electronic television system in 1927, laying the groundwork for modern television technology.</p>
              </div>
            </div>
            <div className="profile-card">
              <div className="profile-card-content">
                <h4 className="profile-card-title">Lucille Ball (1911-1989)</h4>
                <p className="profile-card-text">Star of "I Love Lucy" and co-founder of Desilu Productions, one of the first successful independent television production companies. Her innovations in multi-camera filming and syndication shaped the industry.</p>
              </div>
            </div>
            <div className="profile-card">
              <div className="profile-card-content">
                <h4 className="profile-card-title">Norman Lear (1922-)</h4>
                <p className="profile-card-text">Producer who revolutionized television with socially conscious sitcoms like "All in the Family," "The Jeffersons," and "Maude," addressing previously taboo topics on primetime TV.</p>
              </div>
            </div>
          </div>
          <p className="section-links">
            <Link to="/tv/history" className="default-links">Read Full History of Television</Link>
          </p>
      </section>
      <hr />

      {/* Terminology Guide Section */}
      <section id="terminology-guide" className="section-content">
        
          <h2>Television Terminology Guide</h2>
          <p>
            The world of television has developed its own unique vocabulary. Understanding these terms will enhance your appreciation and help you navigate discussions about TV.
          </p>

          
              <h3>Format & Production Terms</h3>
          <div className="two-column-grid">
            <div className="grid-block">
              <dt>Pilot</dt>
              <dd>The first episode of a series, often produced to convince networks to order a full season</dd>
              <dt>Series</dt>
              <dd>A set of related episodes with the same characters and continuing storylines</dd>
              <dt>Season</dt>
              <dd>A group of episodes produced and broadcast during a specific time period</dd>
            </div>
            <div className="grid-block">
              <dt>Showrunner</dt>
              <dd>The person with overall creative authority and management responsibility for a TV series</dd>
              <dt>Syndication</dt>
              <dd>The licensing of television programs to multiple broadcasting stations</dd>
            </div>
          </div>

          <h3>Narrative & Structure Terms</h3>
          <div className="two-column-grid">
            <div className="grid-block">
              <dt>Arc</dt>
              <dd>A storyline that extends over multiple episodes or seasons</dd>
              <dt>Bottle Episode</dt>
              <dd>An episode confined to one location, often produced to save budget</dd>
              <dt>Cliffhanger</dt>
              <dd>An unresolved ending designed to create suspense and encourage viewers to return</dd>
            </div>
            <div className="grid-block">
              <dt>Cold Open</dt>
              <dd>A scene before the opening credits or title sequence</dd>
              <dt>Crossover</dt>
              <dd>When characters from one show appear in another show</dd>
            </div>
          </div>

          <h3>Industry & Broadcast Terms</h3>
          <div className="two-column-grid">
            <div className="grid-block">
              <dt>Nielsen Ratings</dt>
              <dd>The system used to measure television viewership in the United States</dd>
              <dt>Sweeps</dt>
              <dd>Periods when ratings are measured to set advertising rates</dd>
              <dt>Upfronts</dt>
              <dd>Annual presentations where networks showcase their upcoming programming to advertisers</dd>
            </div>
            <div className="grid-block">
              <dt>Jump the Shark</dt>
              <dd>The point when a show begins to decline in quality, named after a Happy Days episode</dd>
              <dt>Binge-watching</dt>
              <dd>Watching multiple episodes of a show in rapid succession</dd>
            </div>
          </div>
      </section>
      <hr />

      {/* TV Genres Guide Section */}
      <section id="tv-genres" className="section-content">
        <h2>Television Genres Guide</h2>
        <p>
          Television encompasses a diverse range of genres and formats, each with unique characteristics and storytelling approaches.
          This guide will help you understand the different types of TV shows and find series that match your interests.
        </p>

        <h3>Scripted Genres</h3>
        <p>These genres feature fictional narratives with written scripts and professional actors:</p>
        <div className="three-column-grid">
          <div className="grid-card">
            <h4>Drama</h4>
            <p>Character-driven narratives that explore complex emotions, relationships, and conflicts.</p>
            <ul>
              <li><strong>Notable Examples:</strong> Breaking Bad, The Crown, This Is Us</li>
            </ul>
          </div>
          <div className="grid-card">
            <h4>Comedy</h4>
            <p>Shows designed to make viewers laugh, typically with humorous situations and characters.</p>
            <ul>
              <li><strong>Notable Examples:</strong> The Office, Friends, Brooklyn Nine-Nine</li>
            </ul>
          </div>
          <div className="grid-card">
            <h4>Science Fiction</h4>
            <p>Shows that explore speculative concepts, futuristic technology, and alternate realities.</p>
            <ul>
              <li><strong>Notable Examples:</strong> Star Trek, The Expanse, Doctor Who</li>
            </ul>
          </div>
          <div className="grid-card">
            <h4>Crime/Procedural</h4>
            <p>Focuses on solving crimes, often with a case-of-the-week format.</p>
            <ul>
              <li><strong>Notable Examples:</strong> Law & Order, CSI, Criminal Minds</li>
            </ul>
          </div>
          <div className="grid-card">
            <h4>Fantasy</h4>
            <p>Features magical elements, mythical creatures, and supernatural phenomena.</p>
            <ul>
              <li><strong>Notable Examples:</strong> Game of Thrones, The Witcher, Supernatural</li>
            </ul>
          </div>
          <div className="grid-card">
            <h4>Horror</h4>
            <p>Designed to frighten viewers with supernatural or psychological threats.</p>
            <ul>
              <li><strong>Notable Examples:</strong> The Haunting of Hill House, American Horror Story</li>
            </ul>
          </div>
        </div>

        <h3>Unscripted Genres</h3>
        <p>These genres feature real people rather than actors, though they may follow structured formats:</p>
        <div className="three-column-grid">
          <div className="grid-card">
            <h4>Reality Competition</h4>
            <p>Shows where contestants compete for prizes, often involving elimination formats.</p>
            <ul>
              <li><strong>Notable Examples:</strong> Survivor, The Amazing Race, Top Chef</li>
            </ul>
          </div>
          <div className="grid-card">
            <h4>Documentary Series</h4>
            <p>In-depth explorations of real events, people, or phenomena.</p>
            <ul>
              <li><strong>Notable Examples:</strong> Planet Earth, Making a Murderer, The Last Dance</li>
            </ul>
          </div>
          <div className="grid-card">
            <h4>Talk Shows</h4>
            <p>Programs featuring hosts interviewing guests or presenting entertainment.</p>
            <ul>
              <li><strong>Notable Examples:</strong> The Tonight Show, The View, The Daily Show</li>
            </ul>
          </div>
          <div className="grid-card">
            <h4>Reality Lifestyle</h4>
            <p>Shows following the lives of real people, either celebrities or ordinary individuals.</p>
            <ul>
              <li><strong>Notable Examples:</strong> Keeping Up with the Kardashians, Queer Eye</li>
            </ul>
          </div>
        </div>
      </section>
      <hr />

      {/* Production Process Section */}
      <section id="production-process" className="section-content">
        
          <h2>Television Production Process</h2>
          <p>
            Creating a television show is a complex, collaborative process involving multiple stages and specialized teams. Understanding how TV is made provides insight into the artistry and effort behind your favorite series.
          </p>

          <div className="info-box">
              <h3>1. Development</h3>
              <ul>
                <li><strong>Concept Creation:</strong> Developing the initial idea for a series</li>
                <li><strong>Pitching:</strong> Presenting the concept to networks or streaming platforms</li>
                <li><strong>Pilot Order:</strong> Getting approval to produce a pilot episode</li>
                <li><strong>Pilot Production:</strong> Creating the first episode to demonstrate the show's potential</li>
              </ul>
          </div>

          <div className="info-box">
              <h3>2. Pre-Production</h3>
              <ul>
                <li><strong>Writers' Room:</strong> Team of writers developing scripts and story arcs</li>
                <li><strong>Casting:</strong> Finding actors for each role</li>
                <li><strong>Location Scouting:</strong> Finding places to film</li>
                <li><strong>Set Design:</strong> Creating the physical environments for the show</li>
              </ul>
          </div>

          <div className="info-box">
              <h3>3. Production</h3>
              <ul>
                <li><strong>Principal Photography:</strong> Filming the actual episodes</li>
                <li><strong>Direction:</strong> Guiding actors and crew to realize the script</li>
                <li><strong>Cinematography:</strong> Capturing the visual elements of the show</li>
                <li><strong>Sound Recording:</strong> Capturing dialogue and ambient sound</li>
              </ul>
          </div>

          <div className="info-box">
              <h3>4. Post-Production</h3>
              <ul>
                <li><strong>Editing:</strong> Assembling footage into coherent episodes</li>
                <li><strong>Visual Effects:</strong> Adding computer-generated elements</li>
                <li><strong>Sound Design:</strong> Creating and mixing audio elements</li>
                <li><strong>Music:</strong> Adding original score or licensed music</li>
              </ul>
          </div>

          <div className="info-box">
              <h3>5. Distribution</h3>
              <ul>
                <li><strong>Marketing:</strong> Promoting the show to potential viewers</li>
                <li><strong>Broadcasting/Streaming:</strong> Making the show available to audiences</li>
                <li><strong>International Sales:</strong> Licensing the show to foreign markets</li>
                <li><strong>Merchandising:</strong> Creating products based on the show</li>
              </ul>
          </div>

          <h4>Major Television Networks & Platforms</h4>
          <div className="info-card-grid">
            <div className="info-card">
              <h5>Traditional Networks</h5>
              <p>Broadcast television channels available over the air</p>
              <p><strong>Examples:</strong> ABC, NBC, CBS, FOX, BBC</p>
            </div>
            <div className="info-card">
              <h5>Cable Networks</h5>
              <p>Specialized channels available through cable or satellite subscriptions</p>
              <p><strong>Examples:</strong> HBO, AMC, FX, Showtime</p>
            </div>
            <div className="info-card">
              <h5>Streaming Platforms</h5>
              <p>Internet-based services offering on-demand content</p>
              <p><strong>Examples:</strong> Netflix, Hulu, Amazon Prime Video, Disney+</p>
            </div>
            <div className="info-card">
              <h5>Production Studios</h5>
              <p>Companies that create television content</p>
              <p><strong>Examples:</strong> Warner Bros. Television, Universal Television, BBC Studios</p>
            </div>
          </div>
      </section>
      <hr />

      {/* Cultural Impact Section */}
      <section id="cultural-impact" className="section-content">
      
          <h2>Cultural Impact of Television</h2>
          <p>
            Television has been one of the most influential cultural forces of the past century, shaping public opinion, reflecting and challenging social norms, and creating shared cultural experiences across diverse audiences.
          </p>

        
              <h3>Social Influence</h3>
              <p>
                Television has played a crucial role in shaping public discourse and social change. From coverage of the Civil Rights Movement to groundbreaking shows like "All in the Family" addressing racism and "Will & Grace" normalizing LGBTQ+ characters, TV has both reflected and influenced social attitudes.
              </p>
              <p>
                News programming has been particularly influential, with events like the Kennedy assassination, the Moon landing, 9/11, and countless political moments experienced collectively through television, creating shared national and global experiences.
              </p>
           
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
            

          
              <h3>Technological Evolution</h3>
              <p>
                Television has both driven and adapted to technological change:
              </p>
              <p>
                From the transition to color broadcasting to the shift from analog to digital signals, from VCRs allowing time-shifting to DVRs and streaming services enabling on-demand viewing, television has continuously evolved. Each technological shift has changed not just how we watch but what we watch and how stories are told.
              </p>
            
              <h3>Global Reach</h3>
              <p>
                Television has connected cultures across national boundaries:
              </p>
              <p>
                American shows have influenced global culture, while international programming like British dramas, Scandinavian noir, Korean dramas, and Japanese anime have found worldwide audiences. Streaming platforms have accelerated this cross-cultural exchange, making television increasingly global rather than national in scope.
              </p>
      </section>
      <hr />

      {/* TV Worlds & Universes Section */}
      <section id="tv-worlds" className="section-content">
        
          <h2>Television Worlds & Universes</h2>
          <p>
            Television's long-form storytelling allows for the creation of rich, detailed fictional worlds that can be explored over many episodes and seasons. These worlds become immersive environments that viewers can return to again and again.
          </p>

          
              <h3>Expansive Fictional Universes</h3>
              <p>Complex worlds with their own histories, geographies, and rules</p>
              
                  <h4>The Star Trek Universe</h4>
                  <p>A future where humanity has joined a galactic community, spanning multiple series across different time periods and locations</p>
               
                
                  <h4>The Arrowverse</h4>
                  <p>A shared universe of DC Comics-based shows including Arrow, The Flash, Supergirl, and Legends of Tomorrow</p>
               

            
              <h3>Richly Detailed Settings</h3>
              <p>Specific locations with distinctive characteristics and atmospheres</p>
              
                  <h4>Westeros (Game of Thrones)</h4>
                  <p>A medieval fantasy continent with complex political systems, diverse cultures, and supernatural elements</p>
               

                
                  <h4>Twin Peaks</h4>
                  <p>A small town with surreal elements and dark secrets lurking beneath its seemingly idyllic surface</p>


         
            <h3>Elements of Television World-Building</h3>
            <ul>
              <li><strong>Consistent Rules:</strong> Establishing how the world works and maintaining those rules</li>
              <li><strong>History & Lore:</strong> Creating backstories and events that happened before the show begins</li>
              <li><strong>Cultural Details:</strong> Developing customs, languages, and social structures</li>
              <li><strong>Physical Environments:</strong> Designing distinctive locations and settings</li>
              <li><strong>Recurring Elements:</strong> Using visual motifs, music, and other elements to create a cohesive world</li>
            </ul>
      </section>
      <hr />

      {/* Audience Categories Section */}
      <section id="audience-categories" className="section-content">

          <h2>Television for Different Audiences</h2>
          <p>
            Television offers content for viewers of all ages, interests, and preferences. Whether you're looking for family-friendly entertainment, sophisticated drama, or niche content, there's something for everyone.
          </p>

          
              <h3>For Beginners</h3>
              <p>These acclaimed series are excellent entry points to quality television:</p>
              <ul>
                <li>
                  <strong>Breaking Bad</strong> - Vince Gilligan's transformation story of a high school teacher turned drug kingpin
                </li>
                <li>
                  <strong>The Office</strong> - A mockumentary-style workplace comedy that balances cringe humor with heart
                </li>
                <li>
                  <strong>Stranger Things</strong> - A nostalgic 1980s-set supernatural mystery with interdimensional threats
                </li>
              </ul>
            

            
              <h3>Classic Series</h3>
              <p>These influential works have stood the test of time and helped shape television as we know it today:</p>
              <ul>
                <li>
                  <strong>The Wire</strong> - David Simon's intricate examination of Baltimore's institutions and the people within them
                </li>
                <li>
                  <strong>The Sopranos</strong> - David Chase's groundbreaking mob drama that revolutionized television storytelling
                </li>
                <li>
                  <strong>Twin Peaks</strong> - David Lynch's surreal mystery that pushed the boundaries of television
                </li>
              </ul>
      

          
              <h3>Recent Hits</h3>
              <p>These newer series represent the current generation of acclaimed television:</p>
              <ul>
                <li>
                  <strong>Succession</strong> - A darkly comic drama about a dysfunctional media dynasty family
                </li>
                <li>
                  <strong>Ted Lasso</strong> - A heartwarming comedy about an American football coach managing a British soccer team
                </li>
                <li>
                  <strong>The White Lotus</strong> - Mike White's satirical anthology series set at a luxury resort chain
                </li>
              </ul>
      </section>
      <hr />

      {/* Learning Resources Section - Simplified */}
      <section id="learning-resources" className="section-content">
      
          <h2>Learning Resources</h2>
          <p>
            Understanding television as a medium can enhance your appreciation of the art form.
          </p>

          
              <h3>Recommended Books</h3>
              <ul>
                <li>"Television: A Biography" by David Thomson - A comprehensive look at television's history and cultural impact</li>
                <li>"Difficult Men" by Brett Martin - Behind-the-scenes look at the creators of the TV drama revolution</li>
                <li>"The Revolution Was Televised" by Alan Sepinwall - How drama series transformed television</li>
              </ul>
      </section>
      <hr />
      </main>
    </div>
  );
};

export default TVPage;
