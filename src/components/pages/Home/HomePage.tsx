import React from "react";
import { Link } from "react-router-dom";

// This is the main homepage component that corresponds to the original index.html
const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <header className="page-header" role="banner">
        <div className="header-image">
          <img src="/images/home/HomeHeader.jpg" alt="FanArcs Home" />
        </div>

        <input
          type="search"
          id="site-search-bar"
          aria-label="Search FanArcs"
          placeholder="Search for media, characters, universes, etc."
        />
      </header>
      <hr />
      <main id="main-content" role="main">
        {/* Main Body sections */}
        <section className="home-section">
          <h1>Welcome to FanArcs</h1>
          <p>
            FanArcs is your hub for exploring and contributing to fan
            communities across multiple media types. Here's how to get started:
          </p>
          <div className="welcome-guide">
            <div className="guide-section">
              <h3>Explore Content</h3>
              <p>
                Browse our media sections below to discover official information
                and fan-created content for your favorite series.
              </p>
            </div>
            <div className="guide-section">
              <h3>Join the Community</h3>
              <p>
                Visit the{" "}
                <Link to="/community" className="default-links">
                  Community Page
                </Link>{" "}
                to see what other fans are creating and sharing.
              </p>
            </div>
            <div className="guide-section">
              <h3>Create & Contribute</h3>
              <p>
                Ready to add your knowledge? Check out our{" "}
                <Link to="/contribute" className="default-links">
                  Contribution Guide
                </Link>{" "}
                to learn how you can help build FanArcs.
              </p>
            </div>
            <div className="guide-section">
              <h3>Compare Characters</h3>
              <p>
                Head to the{" "}
                <Link to="/power-room" className="default-links">
                  Power Room
                </Link>{" "}
                to compare abilities of characters from different universes.
              </p>
            </div>
          </div>
        </section>
        <hr />

        <section
          className="section-anime"
          role="region"
          aria-labelledby="anime-section-title"
        >
          <Link
            className="index-page-link"
            to="/anime"
            id="anime-section-title"
          >
            Anime
          </Link>
          <p>
            Explore the origins and fan lore behind your favorite anime series!
            Dive into character analyses, story arcs, and cultural influences
            that shaped these beloved animations.
          </p>
          <p>
            From classic shonen adventures to modern isekai tales, discover the
            rich world of Japanese animation.
          </p>
        </section>
        <hr />

        <section
          className="section-comics"
          role="region"
          aria-labelledby="comics-section-title"
        >
          <Link
            className="index-page-link"
            to="/comics"
            id="comics-section-title"
          >
            Comics
          </Link>
          <p>
            Superheroes, villains, and everything in between! Explore iconic
            comic book universes, character evolutions, and the creative minds
            behind them.
          </p>
          <p>
            Whether you're a Marvel enthusiast, DC devotee, or indie comics fan,
            there's something here for everyone.
          </p>
        </section>
        <hr />

        <section
          className="section-manga"
          role="region"
          aria-labelledby="manga-section-title"
        >
          <Link
            className="index-page-link"
            to="/manga"
            id="manga-section-title"
          >
            Manga
          </Link>
          <p>
            Discover the artistry and storytelling of Japanese comics! From
            action-packed shonen to heartfelt slice-of-life stories, explore the
            diverse world of manga.
          </p>
          <p>
            Learn about influential mangaka, art styles, and the cultural impact
            of these illustrated narratives.
          </p>
        </section>
        <hr />

        <section
          className="section-tv"
          role="region"
          aria-labelledby="tv-section-title"
        >
          <Link className="index-page-link" to="/tv" id="tv-section-title">
            Television
          </Link>
          <p>
            Binge-worthy series, cult classics, and groundbreaking shows!
            Explore character development, plot analysis, and behind-the-scenes
            insights from your favorite TV productions.
          </p>
          <p>
            From sci-fi epics to gripping dramas, discover what makes these
            stories resonate with audiences worldwide.
          </p>
        </section>
        <hr />

        <section
          className="section-video-games"
          role="region"
          aria-labelledby="video-games-section-title"
        >
          <Link
            className="index-page-link"
            to="/video-games"
            id="video-games-section-title"
          >
            Video Games
          </Link>
          <p>
            Level up your knowledge about gaming universes! Explore the origins,
            inspirations, and development processes behind your favorite games
            and gaming technology.
          </p>
          <p>
            From retro classics to cutting-edge releases, discover the artistry
            and innovation that drives the gaming industry.
          </p>
        </section>
        <hr />

        <section
          className="section-worlds-universes"
          role="region"
          aria-labelledby="worlds-section-title"
        >
          <Link
            className="index-page-link"
            to="/worlds-universes"
            id="worlds-section-title"
          >
            Worlds & Universes
          </Link>
          <p>
            Journey through fictional realms and expansive universes! Explore
            interconnected worlds, crossover potential, and the most popular
            characters across different media franchises.
          </p>
          <p>
            Discover how creators build consistent worlds and how these
            universes evolve across different storytelling mediums.
          </p>
        </section>
        <hr />

        <section
          className="section-power-room"
          role="region"
          aria-labelledby="power-room-section-title"
        >
          <Link
            className="index-page-link"
            to="/power-room"
            id="power-room-section-title"
          >
            Power Room
          </Link>
          <p>
            The ultimate battleground for character comparisons! Analyze and
            debate the powers, abilities, and strengths of characters from
            completely different universes.
          </p>
          <p>
            Who would win in a fight? What makes certain abilities more
            effective than others? Join the discussion in our Power Room!
          </p>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
