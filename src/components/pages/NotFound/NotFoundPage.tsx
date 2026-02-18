import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">🔍</div>
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-description">
          Oops! The page you're looking for doesn't exist. It might have been
          moved, deleted, or you entered the wrong URL.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
          <Link to="/community" className="btn btn-secondary">
            Browse Community
          </Link>
        </div>
        <div className="not-found-suggestions">
          <h3>Try exploring:</h3>
          <ul>
            <li>
              <Link to="/anime">Anime</Link>
            </li>
            <li>
              <Link to="/manga">Manga</Link>
            </li>
            <li>
              <Link to="/comics">Comics</Link>
            </li>
            <li>
              <Link to="/tv">TV Shows</Link>
            </li>
            <li>
              <Link to="/video-games">Video Games</Link>
            </li>
            <li>
              <Link to="/power-room">Power Room</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
