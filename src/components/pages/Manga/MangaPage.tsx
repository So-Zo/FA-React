import React from 'react';
import { Link } from 'react-router-dom';
import TableOfContents, { TocSectionProps } from '../../../components/ui/TableOfContents';

const MangaPage: React.FC = () => {
  // Define TOC sections
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Basics", anchor: "#the-basics" },
        { label: "History", anchor: "#history-of-manga" },
        { label: "Terms", anchor: "#terminology-guide" }
      ],
      deepLinks: [
        { label: "Full History", path: "/manga/history", exists: true }
      ]
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Genres", anchor: "#manga-genres" },
        { label: "Worlds", anchor: "#manga-worlds" },
        { label: "Audience", anchor: "#audience-categories" }
      ],
      deepLinks: [
        { label: "Directory", path: "/manga/directory", exists: true }
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
    <div className="manga-page">
        <header>
        <div className="image-header">
          <img src="/images/Manga/MangaHeader.jpg" alt="Manga Overview" />
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
          title="Manga Encyclopedia"
          description="Use this table of contents to navigate through the manga guide."
        />

      <hr />

      {/* The Basics Section */}
      <section id="the-basics" className="section-content">
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
        <h4>Key Characteristics of Manga</h4>
        <ul>
          <li><strong>Reading Direction:</strong> Traditional manga is read right-to-left, opposite to Western comics</li>
          <li><strong>Visual Style:</strong> Distinctive art style with expressive eyes, simplified facial features, and dynamic action lines</li>
          <li><strong>Storytelling:</strong> Often features long-form narratives that can span dozens or even hundreds of volumes</li>
          <li><strong>Publication Format:</strong> Typically serialized in magazines before being collected into tankōbon (collected volumes)</li>
          <li><strong>Diverse Genres:</strong> Covers an extremely wide range of genres and topics for all ages and interests</li>
        </ul>
      </section>
      <hr />

      {/* History of Manga Section */}
      <section id="history-of-manga" className="section-content">
        
          <h2>History of Manga</h2>
          <p>
            The evolution of manga spans centuries, developing from traditional Japanese art to the global cultural phenomenon it is today. Understanding this history helps appreciate the art form's significance and influence.
          </p>


                <h4>Early Beginnings (12th Century)</h4>
                <p>The earliest precursors to manga can be traced back to the 12th century with the Chōjū-giga (Animal Scrolls), which depicted animals behaving as humans in a satirical manner.</p>
             


                <h4>Ukiyo-e & Kibyōshi (17th-19th Century)</h4>
                <p>Ukiyo-e woodblock prints and kibyōshi (yellow-cover books) featured illustrations with text, establishing narrative art traditions that would influence modern manga.</p>


                <h4>Western Influence (20th Century)</h4>
                <p>Japanese artists began incorporating elements from Western comics and cartoons, creating early comic strips for newspapers and magazines.</p>

                <h4>The Tezuka Revolution (1940s-50s)</h4>
                <p>Osamu Tezuka, often called the "God of Manga," revolutionized the medium with works like "Astro Boy" and "Princess Knight," establishing many of the visual styles and storytelling approaches that would define manga.</p>
             


                <h4>Diversification (1970s-80s)</h4>
                <p>This period saw the rise of diverse genres and demographics, including shōjo manga (girls' comics) by artists like Moto Hagio and Keiko Takemiya, and seinen manga (men's comics) exploring more mature themes.</p>
              


                <h4>Global Expansion & Digital Era (1990s-Present)</h4>
                <p>Manga gained significant international popularity with series like "Dragon Ball," "Sailor Moon," and "Naruto." The transition to digital creation techniques and online distribution has further expanded manga's global reach and accessibility.</p>
         

          <h3>Key Figures in Manga History</h3>
          <div className="profile-card-grid">
            <div className="profile-card">
              <div className="profile-card-content">
                <h4 className="profile-card-title">Osamu Tezuka (1928-1989)</h4>
                <p className="profile-card-text">Known as the "God of Manga," Tezuka created over 700 manga series including "Astro Boy," "Black Jack," and "Buddha." His cinematic storytelling techniques and innovative visual style revolutionized the medium.</p>
              </div>
            </div>
            <div className="profile-card">
              <div className="profile-card-content">
                <h4 className="profile-card-title">Rumiko Takahashi (1957-)</h4>
                <p className="profile-card-text">One of the most successful manga artists in history, Takahashi created popular series like "Inuyasha," "Ranma ½," and "Urusei Yatsura," known for their blend of comedy, action, and romance.</p>
              </div>
            </div>
            <div className="profile-card">
              <div className="profile-card-content">
                <h4 className="profile-card-title">Naoki Urasawa (1960-)</h4>
                <p className="profile-card-text">Creator of critically acclaimed series like "Monster," "20th Century Boys," and "Pluto," known for complex psychological narratives and realistic art style.</p>
              </div>
            </div>
          </div>
      </section>
      <hr />

      {/* Terminology Guide Section */}
      <section id="terminology-guide" className="section-content">
        
          <h2>Manga Terminology Guide</h2>
          <p>
            The world of manga has developed its own unique vocabulary. Understanding these terms will enhance your appreciation and help you navigate discussions about manga.
          </p>

         
              <h3>Format & Publication Terms</h3>
          <div className='three-column-grid'>
            <div className='grid-block'>
              <dl>
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
          

            <div className='grid-block'>
              <h3>Visual & Storytelling Terms</h3>
              <dl>
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

            <div className='grid-block'>
              <h3>Demographic Categories</h3>
              <dl>
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
      </section>
      <hr />

      {/* Manga Genres Guide Section */}
      <section id="manga-genres" className="section-content">
        
          <h2>Manga Genres Guide</h2>
          <p>
            Manga encompasses a diverse range of genres and storytelling styles, each with unique characteristics and appeal.
            This guide will help you understand the different types of manga and find series that match your interests.
          </p>



            <h3>Popular Manga Genres</h3>
            <p>Discover manga series based on your preferred storytelling styles and themes:</p>

            <div className='three-column-grid'>
              <div className='grid-card'>
                <h4>Shōnen Battle</h4>
                <p>Action-focused manga featuring protagonists who grow stronger through training and combat.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Dragon Ball, One Piece, Naruto, My Hero Academia</li>
                </ul>
              </div>
          

              <div className='grid-card'>
                <h4>Slice of Life</h4>
                <p>Focuses on the everyday experiences of characters, often with a warm or comedic tone.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Yotsuba&!, Barakamon, Silver Spoon</li>
                </ul>
              </div>
            

              <div className='grid-card'>
                <h4>Horror</h4>
                <p>Designed to evoke fear through disturbing imagery and unsettling narratives.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Junji Ito's works (Uzumaki, Tomie), Parasyte</li>
                </ul>
              </div>
              

              
              <div className='grid-card'>
                <h4>Romance</h4>
                <p>Focuses on romantic relationships between characters and emotional connections.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Kimi ni Todoke, Horimiya, Kaguya-sama</li>
                </ul>
              </div>
          

              <div className='grid-card'>
                <h4>Fantasy</h4>
                <p>Set in fantastical worlds with elements like magic and supernatural powers.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Berserk, Made in Abyss, The Ancient Magus' Bride</li>
                </ul>
              </div>

              <div className='grid-card'>
                <h4>Sports</h4>
                <p>Centers around competitive sports and athletes, focusing on teamwork and growth.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Haikyuu!!, Slam Dunk, Blue Lock</li>
                </ul>
             </div>
            </div>

          
            <h3>Demographic Categories</h3>
            <p>Manga is often categorized by its target audience in Japan, though fans of all types enjoy them worldwide:</p>

            <div className='three-column-grid'>
              <div className='grid-card'>
                <h4>Shōnen (Young Men)</h4>
                <p>Aimed at boys and young men ages 12-18, featuring action, adventure, and coming-of-age themes.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> One Piece, Naruto, My Hero Academia</li>
                </ul>
              </div>

              <div className='grid-card'>
                <h4>Shōjo (Young Women)</h4>
                <p>Aimed at girls and young women ages 12-18, often focusing on romance and emotional growth.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Fruits Basket, Ouran High School Host Club, Nana</li>
                </ul>
              </div>

              <div className='grid-card'>
                <h4>Seinen (Adult Men)</h4>
                <p>Targeted at adult men (18+), with more complex themes and mature content.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Berserk, Vagabond, Vinland Saga</li>
                </ul>
              </div>

              <div className='grid-card'>
                <h4>Josei (Adult Women)</h4>
                <p>Targeted at adult women (18+), featuring realistic relationships and mature themes.</p>
                <ul>
                  <li><strong>Notable Examples:</strong> Chihayafuru, Honey and Clover, Wotakoi</li>
                </ul>
              </div>
            </div>
      </section>
      <hr />

      {/* Production Process Section */}
      <section id="production-process" className="section-content">
      
          <h2>Manga Production Process</h2>
          <p>
            Creating manga is a labor-intensive process that combines artistic skill with storytelling ability. Understanding how manga is made provides insight into the craft and effort behind your favorite series.
          </p>

          
              <h3>1. Planning & Story Development</h3>
              <ul>
                <li><strong>Concept Creation:</strong> Developing the initial idea, characters, and world</li>
                <li><strong>Plotting:</strong> Outlining the story arc and individual chapters</li>
                <li><strong>Character Design:</strong> Creating the visual appearance and personalities of characters</li>
                <li><strong>Editor Consultation:</strong> Working with editors to refine the concept and approach</li>
              </ul>
            

        
              <h3>2. Drawing Process</h3>
              <ul>
                <li><strong>Thumbnailing:</strong> Creating rough sketches of page layouts</li>
                <li><strong>Penciling:</strong> Drawing detailed pencil versions of each page</li>
                <li><strong>Inking:</strong> Tracing over pencil lines with ink for final line art</li>
                <li><strong>Screentoning:</strong> Adding patterns and shading for depth and texture</li>
                <li><strong>Lettering:</strong> Adding dialogue, sound effects, and other text</li>
              </ul>
        

          
              <h3>3. Publication</h3>
              <ul>
                <li><strong>Serialization:</strong> Publishing chapters in weekly or monthly magazines</li>
                <li><strong>Tankōbon Collection:</strong> Compiling chapters into collected volumes</li>
                <li><strong>Digital Distribution:</strong> Releasing manga through online platforms</li>
                <li><strong>Translation:</strong> Adapting manga for international audiences</li>
              </ul>
           

          <h4>Major Manga Publishers</h4>
          <div className="info-card-grid">
            <div className="info-card">
              <h5>Shueisha</h5>
              <p>Publisher of Weekly Shōnen Jump, the most popular manga magazine</p>
              <p><strong>Notable Series:</strong> One Piece, Naruto, Demon Slayer</p>
            </div>
            <div className="info-card">
              <h5>Kodansha</h5>
              <p>One of Japan's largest publishing companies</p>
              <p><strong>Notable Series:</strong> Attack on Titan, Fairy Tail, The Seven Deadly Sins</p>
            </div>
            <div className="info-card">
              <h5>Shogakukan</h5>
              <p>Major publisher with diverse manga offerings</p>
              <p><strong>Notable Series:</strong> Detective Conan, Inuyasha, Doraemon</p>
            </div>
            <div className="info-card">
              <h5>Hakusensha</h5>
              <p>Known for shōjo and josei manga</p>
              <p><strong>Notable Series:</strong> Berserk, Ouran High School Host Club, Fruits Basket</p>
            </div>
          </div>
      </section>
      <hr />

      {/* Cultural Impact Section */}
      <section id="cultural-impact" className="section-content">
        
          <h2>Cultural Impact of Manga</h2>
          <p>
            Manga has grown from a Japanese medium to a global cultural phenomenon, influencing art, entertainment, fashion, and technology worldwide.
          </p>

              <h3>Global Influence</h3>
              <p>
                Manga has transcended cultural boundaries to become a worldwide phenomenon. Its unique storytelling approaches and visual styles have influenced comics, animation, and art globally. The international manga market continues to grow rapidly, with translations available in dozens of languages.
              </p>
              <p>
                Major publishers and digital platforms have made manga more accessible than ever to international audiences. This has led to unprecedented growth in manga fandom outside Japan.
              </p>
           
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
        

              <h3>Cultural Exchange</h3>
              <p>
                Manga has served as a cultural ambassador for Japan, introducing international audiences to Japanese language, customs, food, history, and values. Many fans have been inspired to learn Japanese or visit Japan after developing an interest in manga.
              </p>
              <p>
                Conversely, manga has also been influenced by global cultures, incorporating elements from Western storytelling, mythology, and aesthetics to create unique cross-cultural narratives.
              </p>
           
              <h3>Artistic Influence</h3>
              <p>
                Manga's distinctive visual style has influenced artists worldwide, creating hybrid forms like OEL (Original English Language) manga and the global rise of webtoons. The visual language of manga—including speed lines, expressive eyes, and symbolic emotional cues—has been adopted by artists across different media.
              </p>
              <p>
                The rise of digital creation tools and distribution platforms has further expanded manga's influence, allowing creators from around the world to adopt and adapt manga techniques.
              </p>
      </section>
      <hr />

      {/* Manga Worlds & Universes Section */}
      <section id="manga-worlds" className="section-content">
      
          <h2>Manga Worlds & Universes</h2>
          <p>
            One of manga's greatest strengths is its ability to create immersive, richly detailed fictional worlds. From post-apocalyptic landscapes to magical realms, these universes captivate readers with their depth and creativity.
          </p>

         
              <h3>Fantasy Realms</h3>
              <p>Magical worlds with their own rules, creatures, and power systems</p>
            
                  <h4>The World of One Piece</h4>
                  <p>A vast ocean world divided by the Grand Line, filled with islands, pirates, and mysterious Devil Fruits</p>
            

                  <h4>Berserk's Dark Fantasy World</h4>
                  <p>A medieval European-inspired dark fantasy realm where humans struggle against demonic forces</p>
            

            
              <h3>Futuristic Settings</h3>
              <p>Advanced technological societies, dystopian futures, and space frontiers</p>
             
                  <h4>Akira's Neo-Tokyo</h4>
                  <p>A cyberpunk metropolis rebuilt after a catastrophic explosion, filled with biker gangs, government experiments, and psychic powers</p>
               

               
                  <h4>Attack on Titan's Walled Society</h4>
                  <p>A society enclosed by massive walls to protect humanity from giant humanoid creatures</p>
               

       
            <h3>Elements of Manga World-Building</h3>
            <ul>
              <li><strong>Power Systems:</strong> Unique rules governing special abilities (chakra, nen, quirks, etc.)</li>
              <li><strong>Social Structures:</strong> Hierarchies, organizations, and political systems</li>
              <li><strong>Geography:</strong> Distinctive locations, landscapes, and environments</li>
              <li><strong>History & Lore:</strong> Backstories, legends, and historical events that shape the world</li>
              <li><strong>Visual Aesthetics:</strong> Distinctive architectural styles, fashion, and design elements</li>
            </ul>
      </section>
      <hr />

      {/* Audience Categories Section */}
      <section id="audience-categories" className="section-content">
      
          <h2>Manga for Different Audiences</h2>
          <p>
            One of manga's strengths is its diversity, offering content for readers of all ages, interests, and experience levels. Whether you're new to manga or a seasoned fan, there's something for everyone.
          </p>

          
              <h3>For Beginners</h3>
              <p>These accessible series serve as excellent entry points to manga, featuring compelling stories and universal themes:</p>
              <ul>
                <li>
                  <strong>Death Note</strong> - A psychological thriller about a student who discovers a notebook that kills anyone whose name is written in it
                </li>
                <li>
                  <strong>Fullmetal Alchemist</strong> - A perfect blend of action, drama, and fantasy with a complete, satisfying story
                </li>
                <li>
                  <strong>Yotsuba&!</strong> - A heartwarming slice-of-life series about an energetic young girl discovering the world
                </li>
              </ul>
            

          
              <h3>Classic Series</h3>
              <p>These influential works have stood the test of time and helped shape manga as we know it today:</p>
              <ul>
                <li>
                  <strong>Astro Boy</strong> - Osamu Tezuka's groundbreaking series about a robot boy with human emotions
                </li>
                <li>
                  <strong>Dragon Ball</strong> - Akira Toriyama's martial arts adventure that popularized manga worldwide
                </li>
                <li>
                  <strong>Akira</strong> - Katsuhiro Otomo's cyberpunk masterpiece that revolutionized manga storytelling
                </li>
              </ul>
            

          
              <h3>Recent Hits</h3>
              <p>These newer series represent the current generation of popular manga:</p>
              <ul>
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
      </section>
      <hr />

      {/* Learning Resources Section - Simplified */}
      <section id="learning-resources" className="section-content">
        
          <h2>Learning Resources</h2>
          <p>
            Understanding manga as a medium can enhance your appreciation of the art form.
          </p>
               
              <h3>Recommended Books</h3>
              <ul>
                <li>"Manga: A Brief History" by Paul Gravett - Accessible overview of manga's development</li>
                <li>"Dreamland Japan: Writings on Modern Manga" by Frederik L. Schodt - Exploration of manga's evolution</li>
                <li>"The Osamu Tezuka Story" by Toshio Ban - Biography of manga's most influential creator</li>
              </ul>
      </section>
      <hr />
      </main>
    </div>
  );
};

export default MangaPage;
