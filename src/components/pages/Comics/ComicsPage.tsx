import React from 'react';
import { Link } from 'react-router-dom';
import '../../../components/ui/ComicsPage.css';
import '../../../components/ui/global.css';
import '../../../components/ui/links.css';
import '../../../components/ui/cards.css';
import '../../../components/ui/sections.css';
import TableOfContents, { TocSectionProps } from '../../../components/ui/TableOfContents';

const ComicsPage: React.FC = () => {
  // Define TOC sections
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Basics", anchor: "#the-basics" },
        { label: "History", anchor: "#history-of-comics" },
        { label: "Terms", anchor: "#terminology-guide" }
      ],
      deepLinks: [
        { label: "Full History", path: "/comics/history", exists: true }
      ]
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Genres", anchor: "#comics-genres" },
        { label: "Worlds", anchor: "#comics-worlds" },
        { label: "Audience", anchor: "#audience-categories" }
      ],
      deepLinks: [
        { label: "Directory", path: "/comics/directory", exists: true }
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
    <div className="comics-page">
      <header>
        <div className="image-header">
          <img src="/images/comics/ComicsHeader.jpg" alt="Comics Overview" />
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
          title="Comics Encyclopedia"
          description="Use this table of contents to navigate through the comics guide."
        />

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

        </div>
      </section>
      <hr />

      {/* History of Comics Section */}
      <section id="history-of-comics" className="section-content">

          <h2>History of Comics</h2>
          <p>
            The evolution of comics spans centuries, developing from early sequential art to the diverse global medium it is today. Understanding this history helps appreciate the art form's significance and influence.
          </p>

         
                <h4>Sequential Art Beginnings</h4>
                <p>Sequential art has ancient roots, from Egyptian hieroglyphics to medieval tapestries like the Bayeux Tapestry, which told stories through sequences of images.</p>
             

           
                <h4>Early Political Cartoons & Illustrated Stories 17th-18th century</h4>
                <p>Artists like William Hogarth created sequential narrative art, while Rodolphe Töpffer is often credited with creating the first modern comic strips in the 1830s with his "picture stories."</p>
              


                <h4>Newspaper Comics Era Late 19th-Early 20th Century</h4>
                <p>The Yellow Kid (1895) is often cited as the first recurring comic character in American newspapers. This period saw the rise of newspaper comic strips like "Little Nemo in Slumberland" and "Krazy Kat."</p>
             


                <h4>The Golden Age of Comics 1930s-1950s</h4>
                <p>The debut of Superman in Action Comics #1 (1938) launched the superhero genre and the comic book industry. This era saw the creation of iconic characters like Batman, Wonder Woman, and Captain America.</p>


                <h4>Comics Code Era & Underground Comix 1950s-1970s</h4>
                <p>Following concerns about comic content, the Comics Code Authority was established in 1954, restricting content. In response, underground comix emerged in the 1960s, exploring adult themes and countercultural ideas.</p>
             


                <h4>Graphic Novel Revolution 1980s-1990s</h4>
                <p>Works like "Watchmen," "The Dark Knight Returns," and "Maus" elevated comics to literary status. This period saw more mature, complex storytelling and the rise of independent publishers.</p>
             


                <h4>Digital Age & Mainstream Recognition 2000s-Present</h4>
                <p>Webcomics, digital distribution, and the massive success of comic book adaptations in film and television have brought comics to wider audiences. Graphic novels are now recognized as legitimate literature and taught in schools and universities.</p>

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
      </section>
      <hr />

      {/* Terminology Guide Section */}
      <section id="terminology-guide" className="section-content">
        
          <h2>Comics Terminology Guide</h2>
          <p>
            The world of comics has developed its own unique vocabulary. Understanding these terms will enhance your appreciation and help you navigate discussions about comics.
          </p>

          <h3>Format & Publication Terms</h3>
          <dl>
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
            

          
              <h3>Visual & Storytelling Terms</h3>
              <dl>
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
      

            
              <h3>Industry & Collection Terms</h3>
              <dl>
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
      </section>
      <hr />

      {/* Comics Genres Guide Section */}
      <section id="comics-genres" className="section-content">

          <h2>Comics Genres Guide</h2>
          <p>
            Comics encompass a diverse range of genres and storytelling styles, each with unique characteristics and appeal.
            This guide will help you understand the different types of comics and find series that match your interests.
          </p>


          
            <h3>Popular Comics Genres</h3>
            <p>Discover comics series based on your preferred storytelling styles and themes:</p>

            
                <h4>Superhero</h4>
                <p>Stories featuring characters with extraordinary abilities who typically fight crime and protect the innocent.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Batman, Spider-Man, X-Men, Wonder Woman</li>
                </ul>
            

              
                <h4>Science Fiction</h4>
                <p>Comics that explore futuristic concepts, technology, space travel, and speculative ideas.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Saga, Transmetropolitan, Y: The Last Man</li>
                </ul>
              

              
                <h4>Horror</h4>
                <p>Comics designed to evoke fear, dread, or psychological disturbance through disturbing imagery.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> The Walking Dead, Hellblazer, Locke & Key</li>
                </ul>
              

              
                <h4>Crime/Noir</h4>
                <p>Dark, gritty stories focusing on criminal activity, detectives, and moral ambiguity.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Criminal, Sin City, Gotham Central</li>
                </ul>
              

              
                <h4>Fantasy</h4>
                <p>Set in magical worlds with elements like magic, mythical creatures, and supernatural powers.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Fables, Sandman, Monstress</li>
                </ul>
            

            
                <h4>Slice of Life/Memoir</h4>
                <p>Stories about everyday experiences or autobiographical accounts of the creator's life.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Blankets, Fun Home, Persepolis</li>
                </ul>
            
          
            <h3>Publishing Formats</h3>
            <p>Comics are published in various formats, each with their own storytelling approaches and audience:</p>

            
                <h4>Monthly Comic Books</h4>
                <p>Serialized stories published in individual issues, typically 20-32 pages.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Most superhero titles from Marvel and DC</li>
                </ul>
              

              
                <h4>Graphic Novels</h4>
                <p>Longer-form comics published as complete works in a single volume.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Maus, Persepolis, Blankets</li>
                </ul>
              

              
                <h4>Webcomics</h4>
                <p>Comics published primarily online, often with unique digital formats.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> XKCD, Homestuck, The Oatmeal</li>
                </ul>
            

              
                <h4>Newspaper Strips</h4>
                <p>Short-form comics published in newspapers, typically in a few panels.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Calvin and Hobbes, Peanuts, Dilbert</li>
                </ul>
      </section>
      <hr />

      {/* Production Process Section */}
      <section id="production-process" className="section-content">
      
          <h2>Comics Production Process</h2>
          <p>
            Creating comics is a collaborative process that combines artistic skill with storytelling ability. Understanding how comics are made provides insight into the craft and effort behind your favorite series.
          </p>

         
              <h3>1. Writing & Planning</h3>
              <ul>
                <li><strong>Script:</strong> The writer creates a script detailing the story, dialogue, and panel descriptions</li>
                <li><strong>Plot:</strong> In some workflows, especially the "Marvel Method," the writer provides a plot outline rather than a full script</li>
                <li><strong>Editorial Direction:</strong> Editors work with writers to develop stories that fit within larger publishing plans</li>
              </ul>
          

           
              <h3>2. Artwork Creation</h3>
              <ul>
                <li><strong>Penciling:</strong> The penciler draws the initial artwork based on the script or plot</li>
                <li><strong>Inking:</strong> The inker adds definition, depth, and contrast to the penciled artwork</li>
                <li><strong>Coloring:</strong> The colorist adds colors to the inked artwork, establishing mood and atmosphere</li>
                <li><strong>Lettering:</strong> The letterer adds dialogue, captions, sound effects, and other text elements</li>
              </ul>
           

            
              <h3>3. Publication & Distribution</h3>
              <ul>
                <li><strong>Editing:</strong> Final review and adjustments before publication</li>
                <li><strong>Printing:</strong> Physical production of comic books or graphic novels</li>
                <li><strong>Digital Formatting:</strong> Preparation for digital distribution platforms</li>
                <li><strong>Distribution:</strong> Delivery to comic shops, bookstores, and digital platforms</li>
              </ul>
          

          <div className="info-box">
            <h4>Major Comics Publishers</h4>
                <h5>Marvel Comics</h5>
                <p>Known for superhero universes and characters like Spider-Man, X-Men, and Avengers</p>
                <p><strong>Founded:</strong> 1939 (as Timely Comics)</p>
            

              
                <h5>DC Comics</h5>
                <p>Home to iconic characters like Superman, Batman, and Wonder Woman</p>
                <p><strong>Founded:</strong> 1934 (as National Allied Publications)</p>
              

                <h5>Image Comics</h5>
                <p>Creator-owned publisher known for innovative series and creator rights</p>
                <p><strong>Founded:</strong> 1992</p>
              

              
                <h5>Dark Horse Comics</h5>
                <p>Known for creator-owned titles, licensed properties, and diverse genres</p>
                <p><strong>Founded:</strong> 1986</p>
        </div>
      </section>
      <hr />

      {/* Cultural Impact Section */}
      <section id="cultural-impact" className="section-content">
      
          <h2>Cultural Impact of Comics</h2>
          <p>
            Comics have evolved from simple entertainment to a significant cultural force, influencing art, literature, film, television, and popular culture worldwide.
          </p>

              <h3>Media Influence</h3>
              <p>
                Comics have become a primary source material for film and television adaptations, with superhero movies dominating global box office receipts and comic-based TV shows proliferating across streaming platforms. The visual storytelling techniques pioneered in comics have influenced filmmaking, animation, and digital media.
              </p>
              <p>
                The Marvel Cinematic Universe, based on Marvel Comics characters, has become the highest-grossing film franchise in history, demonstrating the mainstream appeal of comic book narratives and characters.
              </p>
          

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

              <h3>Social Commentary</h3>
              <p>
                Throughout their history, comics have addressed social issues and political concerns, sometimes overtly and sometimes through allegory:
              </p>
              <p>
                From early Superman stories tackling corrupt politicians to X-Men exploring prejudice and civil rights, comics have provided a platform for examining complex social issues. Underground comix of the 1960s and 70s directly challenged social norms, while contemporary graphic novels often address topics like identity, trauma, and social justice.
              </p>

              <h3>Fan Culture</h3>
              <p>
                Comics have fostered vibrant fan communities and conventions:
              </p>
              <p>
                Comic-Con International in San Diego began as a small gathering of comics fans and has grown into one of the world's largest pop culture events. Comics fandom has pioneered practices now common across media fandoms, including collecting, cosplay, fan fiction, and detailed analysis of fictional universes.
              </p>
      </section>
      <hr />

      {/* Comics Worlds & Universes Section */}
      <section id="comics-worlds" className="section-content">
        
          <h2>Comics Worlds & Universes</h2>
          <p>
            One of the most distinctive aspects of comics is the creation of vast, interconnected fictional universes where multiple characters and stories coexist and interact. These shared universes have become complex narrative ecosystems with their own histories, geographies, and rules.
          </p>

          
              <h3>Superhero Universes</h3>
              <p>Expansive shared worlds where multiple superhero characters and teams coexist</p>
              
                  <h4>Marvel Universe</h4>
                  <p>Home to the Avengers, X-Men, Spider-Man, and thousands of other characters, with a history spanning from ancient times to the far future</p>
                

                
                  <h4>DC Universe</h4>
                  <p>Setting for Superman, Batman, Wonder Woman, and the Justice League, featuring a multiverse of parallel realities</p>
                

           
              <h3>Independent Comics Worlds</h3>
              <p>Unique fictional settings created outside the major superhero publishers</p>
              
                  <h4>Hellboy Universe</h4>
                  <p>Mike Mignola's dark fantasy world blending folklore, Lovecraftian horror, and pulp adventure</p>
                

            
                  <h4>The World of Saga</h4>
                  <p>Brian K. Vaughan and Fiona Staples' space fantasy featuring an interstellar war between magic and technology</p>
               

          
            <h3>Elements of Comics World-Building</h3>
            <ul>
              <li><strong>Continuity:</strong> The internal consistency and chronology of events within a fictional universe</li>
              <li><strong>Crossovers:</strong> Stories where characters from different series meet and interact</li>
              <li><strong>Retcons:</strong> Retroactive continuity changes that alter previously established facts</li>
              <li><strong>Multiverses:</strong> Systems of parallel universes allowing for alternate versions of characters and worlds</li>
              <li><strong>Fictional Geography:</strong> Invented locations like Gotham City, Metropolis, or Wakanda</li>
            </ul>
      </section>
      <hr />

      {/* Audience Categories Section */}
      <section id="audience-categories" className="section-content">
        
          <h2>Comics for Different Audiences</h2>
          <p>
            Comics offer content for readers of all ages, interests, and experience levels. Whether you're new to comics or a seasoned fan, there's something for everyone.
          </p>

          
              <h3>For Beginners</h3>
              <p>These accessible series serve as excellent entry points to comics, featuring compelling stories and universal themes:</p>
              <ul>
                <li>
                  <strong>Watchmen</strong> - Alan Moore and Dave Gibbons' groundbreaking deconstruction of the superhero genre
                </li>
                <li>
                  <strong>Saga</strong> - Brian K. Vaughan and Fiona Staples' epic space fantasy about a family caught between warring factions
                </li>
                <li>
                  <strong>Maus</strong> - Art Spiegelman's Pulitzer Prize-winning memoir about his father's experiences during the Holocaust
                </li>
              </ul>
            

            
              <h3>Classic Series</h3>
              <p>These influential works have stood the test of time and helped shape comics as we know it today:</p>
              <ul>
                <li>
                  <strong>Batman: Year One</strong> - Frank Miller and David Mazzucchelli's definitive Batman origin story
                </li>
                <li>
                  <strong>The Dark Phoenix Saga</strong> - Chris Claremont and John Byrne's classic X-Men storyline                </li>
                <li>
                  <strong>Sandman</strong> - Neil Gaiman's epic fantasy series that redefined the possibilities of the comics medium
                </li>
              </ul>
            

              <h3>Recent Hits</h3>
              <p>These newer series represent the current generation of popular comics:</p>
              <ul>
                <li>
                  <strong>Monstress</strong> - Marjorie Liu and Sana Takeda's dark fantasy epic with stunning artwork
                </li>
                <li>
                  <strong>Something is Killing the Children</strong> - James Tynion IV's horror series about monsters only children can see
                </li>
                <li>
                  <strong>Die</strong> - Kieron Gillen and Stephanie Hans' dark take on fantasy role-playing games
                </li>
              </ul>
      </section>
      <hr />

      {/* Learning Resources Section - Simplified */}
      <section id="learning-resources" className="section-content">
        
          <h2>Learning Resources</h2>
          <p>
            Understanding comics as a medium can enhance your appreciation of the art form.
          </p>

          
              <h3>Recommended Books</h3>
              <ul>
                <li>"Understanding Comics" by Scott McCloud - A groundbreaking analysis of comics as a medium</li>
                <li>"Comics and Sequential Art" by Will Eisner - Foundational work on comics theory</li>
                <li>"The Ten-Cent Plague" by David Hajdu - History of the comics industry and censorship</li>
              </ul>
      </section>
      <hr />
      </main>
    </div>
  );
};

export default ComicsPage;
