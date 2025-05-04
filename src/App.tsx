import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import './components/ui/global.css';
import './App.css';

// Import page components
import HomePage from './components/pages/Home/HomePage';
import AnimePage from './components/pages/Anime/AnimePage';
import MangaPage from './components/pages/Manga/MangaPage';
import ComicsPage from './components/pages/Comics/ComicsPage';
import TVPage from './components/pages/TV/TVPage';
import VideoGamesPage from './components/pages/VideoGames/VideoGamesPage';
import WorldsUniversesPage from './components/pages/WorldsUniverses/WorldsUniversesPage';
import PowerRoomPage from './components/pages/PowerRoom/PowerRoomPage';
import CommunityPage from './components/pages/Community/CommunityPage';
import ProfilePage from './components/pages/Profile/ProfilePage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Define routes for all pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/anime" element={<AnimePage />} />
            <Route path="/manga" element={<MangaPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/tv" element={<TVPage />} />
            <Route path="/video-games" element={<VideoGamesPage />} />
            <Route path="/worlds-universes" element={<WorldsUniversesPage />} />
            <Route path="/power-room" element={<PowerRoomPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Add more routes as we create the page components */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
