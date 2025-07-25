import React from 'react';
import { Link } from 'react-router-dom';
import TableOfContents, { TocSectionProps } from '../../ui/TableOfContents';


const TelevisionDirectory: React.FC = () => {
 const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Popular Series", anchor: "#popular-series" },
        { label: "Genres", anchor: "#genres" },
        { label: "Eras", anchor: "#eras" }
      ],
      deepLinks: [
        { label: "TV Encyclopedia", path: "/tv", exists: true },
        { label: "TV History", path: "/tv/history", exists: true }
      ]
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Studios", anchor: "#studios" },
        { label: "Alphabetical", anchor: "#alphabetical" }
      ],
      deepLinks: []
    }
  ];

  
  
  return (
    <div className="tv-page tv-directory-page">
      <header role="banner">
        <div className="header-image">
          <img src="/images/tv/TVHeader.jpg" alt="Television Directory" />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search TV Shows"
          placeholder="Search for shows, characters, etc."
          data-search-type="tv"
        />
      </header>

      <div className="accessibility-container">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <button className="keyboard-shortcuts-link" onClick={() => console.log('Show keyboard shortcuts')}>
          <span>⌨️</span> Keyboard shortcuts
        </button>
      </div>

      {/* Table of Contents */}
      <TableOfContents
        sections={tocSections}
        title="TV Directory"
        description="Use this table of contents to navigate to different sections of the Anime Directory."
      />


      
<main id="main-content" role="main">
        {/* Directory Intro Section */}

{/* Popular Series Section */}
<section id="popular-series" className="section-content">
  <h2>Popular TV Series</h2>
  <p>These widely acclaimed series are excellent starting points for exploring television.</p>

  <div className="profile-card-grid">
    <div className="profile-card">
      <div className="profile-card-image">
        <img src="/images/tv/shows/breaking-bad.jpg" alt="Breaking Bad" />
      </div>
      <div className="profile-card-content">
        <h3>Breaking Bad</h3>
        <p className="card-subtext">Drama, Crime, Thriller</p>
        <p>Follow Walter White, a chemistry teacher turned methamphetamine manufacturer, as he transforms from a mild-mannered family man into a ruthless player in the drug trade.</p>
        <div className="show-links">
          <a href="#" className="non-existent-link" data-page-type="show" data-page-title="Breaking Bad" data-related-to="TV">Official Page</a>
          <Link to="/community#breaking-bad" className="default-links">Community Content</Link>
          <a href="#" className="non-existent-link" data-page-type="character" data-page-title="Walter White" data-related-to="Breaking Bad">Character: Walter White</a>
        </div>
      </div>
    </div>

    <div className="profile-card">
      <div className="profile-card-image">
        <img src="/images/tv/shows/game-of-thrones.jpg" alt="Game of Thrones" />
      </div>
      <div className="profile-card-content">
        <h3>Game of Thrones</h3>
        <p className="card-subtext">Fantasy, Drama, Adventure</p>
        <p>In the mythical continent of Westeros, several powerful families fight for control of the Seven Kingdoms and the Iron Throne, while ancient threats emerge from beyond the Wall.</p>
        <div className="show-links">
          <a href="#" className="non-existent-link" data-page-type="show" data-page-title="Game of Thrones" data-related-to="TV">Official Page</a>
          <Link to="/community#game-of-thrones" className="default-links">Community Content</Link>
          <a href="#" className="non-existent-link" data-page-type="character" data-page-title="Jon Snow" data-related-to="Game of Thrones">Character: Jon Snow</a>
        </div>
      </div>
    </div>

    <div className="profile-card">
      <div className="profile-card-image">
        <img src="/images/tv/shows/stranger-things.jpg" alt="Stranger Things" />
      </div>
      <div className="profile-card-content">
        <h3>Stranger Things</h3>
        <p className="card-subtext">Science Fiction, Horror, Mystery</p>
        <p>When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.</p>
        <div className="show-links">
          <a href="#" className="non-existent-link" data-page-type="show" data-page-title="Stranger Things" data-related-to="TV">Official Page</a>
          <Link to="/community#stranger-things" className="default-links">Community Content</Link>
          <a href="#" className="non-existent-link" data-page-type="character" data-page-title="Eleven" data-related-to="Stranger Things">Character: Eleven</a>
        </div>
      </div>
    </div>

    <div className="profile-card">
      <div className="profile-card-image">
        <img src="/images/tv/shows/the-office.jpg" alt="The Office" />
      </div>
      <div className="profile-card-content">
        <h3>The Office</h3>
        <p className="card-subtext">Comedy, Mockumentary, Sitcom</p>
        <p>A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.</p>
        <div className="show-links">
          <a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Office" data-related-to="TV">Official Page</a>
          <Link to="/community#the-office" className="default-links">Community Content</Link>
          <a href="#" className="non-existent-link" data-page-type="character" data-page-title="Michael Scott" data-related-to="The Office">Character: Michael Scott</a>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Genres Section */}
<section id="genres" className="section-content">
  <h2>Browse by Genre</h2>
  <p>Find TV series based on your preferred storytelling styles and themes.</p>

  {/* Genre categories flattened, no extra wrappers */}
  <h3>Drama & Thriller</h3>
  <ul className="show-list">
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Breaking Bad" data-related-to="TV">Breaking Bad</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Sopranos" data-related-to="TV">The Sopranos</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Wire" data-related-to="TV">The Wire</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Better Call Saul" data-related-to="TV">Better Call Saul</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Succession" data-related-to="TV">Succession</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Drama TV" data-related-to="TV">View All Drama TV</a></li>
  </ul>

  <h3>Sci-Fi & Fantasy</h3>
  <ul className="show-list">
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Game of Thrones" data-related-to="TV">Game of Thrones</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Stranger Things" data-related-to="TV">Stranger Things</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Mandalorian" data-related-to="TV">The Mandalorian</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Westworld" data-related-to="TV">Westworld</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Sci-Fi TV" data-related-to="TV">View All Sci-Fi TV</a></li>
  </ul>

  <h3>Comedy & Sitcom</h3>
  <ul className="show-list">
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Office" data-related-to="TV">The Office</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Friends" data-related-to="TV">Friends</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Brooklyn Nine-Nine" data-related-to="TV">Brooklyn Nine-Nine</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Parks and Recreation" data-related-to="TV">Parks and Recreation</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Comedy TV" data-related-to="TV">View All Comedy TV</a></li>
  </ul>

  <h3>Mystery & Crime</h3>
  <ul className="show-list">
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="True Detective" data-related-to="TV">True Detective</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Sherlock" data-related-to="TV">Sherlock</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Mindhunter" data-related-to="TV">Mindhunter</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Fargo" data-related-to="TV">Fargo</a></li>
    <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Crime TV" data-related-to="TV">View All Crime TV</a></li>
  </ul>
</section>

{/* Eras Section */}
<section id="eras" className="section-content">
  <h2>Browse by Era</h2>
  <p>Explore TV from different time periods, from classics to the latest releases. For a comprehensive overview of how television has evolved over time, check out our <Link to="/tv/history" className="default-links">History of Television</Link> page.</p>

  <div className="era-directory">
    <div className="era-category">
      <h3>Classic (Pre-2000)</h3>
      <ul className="show-list">
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Friends" data-related-to="TV">Friends (1994)</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The X-Files" data-related-to="TV">The X-Files (1993)</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Twin Peaks" data-related-to="TV">Twin Peaks (1990)</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Classic TV" data-related-to="TV">View All Classic TV</a></li>
      </ul>
    </div>

    <div className="era-category">
      <h3>2000s</h3>
      <ul className="show-list">
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Wire" data-related-to="TV">The Wire (2002)</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Lost" data-related-to="TV">Lost (2004)</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Office" data-related-to="TV">The Office (2005)</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="2000s TV" data-related-to="TV">View All 2000s TV</a></li>
      </ul>
    </div>

    <div className="era-category">
      <h3>2010s</h3>
      <ul className="show-list">
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Game of Thrones" data-related-to="TV">Game of Thrones (2011)</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Breaking Bad" data-related-to="TV">Breaking Bad (2008-2013)</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Stranger Things" data-related-to="TV">Stranger Things (2016)</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="2010s TV" data-related-to="TV">View All 2010s TV</a></li>
      </ul>
    </div>

    <div className="era-category">
      <h3>Current (2020s)</h3>
      <ul className="show-list">
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Succession" data-related-to="TV">Succession (2018-2023)</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Last of Us" data-related-to="TV">The Last of Us (2023)</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Wednesday" data-related-to="TV">Wednesday (2022)</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Current TV" data-related-to="TV">View All Current TV</a></li>
      </ul>
    </div>
  </div>
</section>

{/* Studios Section */}
<section id="studios" className="section-content">
  <h2>Browse by Network</h2>
  <p>Discover TV shows produced by renowned networks known for their distinctive styles and quality.</p>

  <div className="studio-directory">
    <div className="studio-category">
      <h3>HBO</h3>
      <ul className="show-list">
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Game of Thrones" data-related-to="HBO">Game of Thrones</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Sopranos" data-related-to="HBO">The Sopranos</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Succession" data-related-to="HBO">Succession</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="HBO Works" data-related-to="TV">View All HBO Works</a></li>
      </ul>
    </div>

    <div className="studio-category">
      <h3>Netflix</h3>
      <ul className="show-list">
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Stranger Things" data-related-to="Netflix">Stranger Things</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Crown" data-related-to="Netflix">The Crown</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Mindhunter" data-related-to="Netflix">Mindhunter</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="Netflix Works" data-related-to="TV">View All Netflix Works</a></li>
      </ul>
    </div>

    <div className="studio-category">
      <h3>AMC</h3>
      <ul className="show-list">
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Breaking Bad" data-related-to="AMC">Breaking Bad</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Better Call Saul" data-related-to="AMC">Better Call Saul</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="The Walking Dead" data-related-to="AMC">The Walking Dead</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="AMC Works" data-related-to="TV">View All AMC Works</a></li>
      </ul>
    </div>

    <div className="studio-category">
      <h3>BBC</h3>
      <ul className="show-list">
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Sherlock" data-related-to="BBC">Sherlock</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Doctor Who" data-related-to="BBC">Doctor Who</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Peaky Blinders" data-related-to="BBC">Peaky Blinders</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="directory" data-page-title="BBC Works" data-related-to="TV">View All BBC Works</a></li>
      </ul>
    </div>
  </div>
</section>

{/* Alphabetical Section */}
<section id="alphabetical" className="section-content">
  <h2>Alphabetical List</h2>
  <p>Browse all TV series in our database alphabetically.</p>

  <div className="alphabet-navigation">
    <a href="#a" className="non-existent-link" data-page-type="anchor" data-page-title="A" data-related-to="TV">A</a>
    <a href="#b" className="non-existent-link" data-page-type="anchor" data-page-title="B" data-related-to="TV">B</a>
    <a href="#c" className="non-existent-link" data-page-type="anchor" data-page-title="C" data-related-to="TV">C</a>
    <a href="#d" className="non-existent-link" data-page-type="anchor" data-page-title="D" data-related-to="TV">D</a>
    {/* Continue with all letters */}
    <a href="#z" className="non-existent-link" data-page-type="anchor" data-page-title="Z" data-related-to="TV">Z</a>
  </div>

  <div className="alphabetical-listing">
    <div id="a" className="letter-section">
      <h3>A</h3>
      <ul className="show-list-alpha">
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Atlanta" data-related-to="TV">Atlanta</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Arrested Development" data-related-to="TV">Arrested Development</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="American Horror Story" data-related-to="TV">American Horror Story</a></li>
        {/* More shows starting with A */}
      </ul>
    </div>

    <div id="b" className="letter-section">
      <h3>B</h3>
      <ul className="show-list-alpha">
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Breaking Bad" data-related-to="TV">Breaking Bad</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Better Call Saul" data-related-to="TV">Better Call Saul</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Brooklyn Nine-Nine" data-related-to="TV">Brooklyn Nine-Nine</a></li>
        {/* More shows starting with B */}
      </ul>
    </div>

    {/* Continue with all letters */}
  </div>
</section>

{/* Help Section */}
<section className="section-content">
  <h2>Can't Find What You're Looking For?</h2>
  <div className="help-options">
    <div className="help-option">
      <h3>Use Search</h3>
      <p>Try searching for specific shows or characters using the search bar at the top of the page.</p>
    </div>

    <div className="help-option">
      <h3>Request a Show</h3>
      <p>Don't see a show that should be included? Let us know and we'll add it to our database.</p>
      <a href="#" className="non-existent-link" data-page-type="action" data-page-title="Request Show Addition" data-related-to="TV">Request Show Addition</a>
    </div>

    <div className="help-option">
      <h3>Create a Show Page</h3>
      <p>Contribute to FanArcs by creating a page for your favorite TV series.</p>
      <a href="#" className="non-existent-link" data-page-type="action" data-page-title="Learn How to Contribute" data-related-to="TV">Learn How to Contribute</a>
      <p>Try creating one of these popular shows:</p>
      <ul className="show-list">
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Ozark" data-related-to="TV">Ozark</a></li>
        <li><a href="#" className="non-existent-link" data-page-type="show" data-page-title="Ted Lasso" data-related-to="TV">Ted Lasso</a></li>
      </ul>
    </div>
  </div>
</section>
```

  </main>
  </div>
  );
}

        

export default TelevisionDirectory;