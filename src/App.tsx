import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./auth/AuthProvider";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/layout/Header/Header";
import Navigation from "./components/layout/Navigation/Navigation";
import Footer from "./components/layout/Footer/Footer";
import BottomNavigation from "./components/layout/BottomNavigation/BottomNavigation";
import "./components/ui/global.css";
import "./App.css";
import "./Import.css";
import { EditModeProvider } from "./edit/EditModeContext";
import GlobalEditMode from "./edit/GlobalEditMode";

// Import page components
import HomePage from "./components/pages/Home/HomePage";
import AnimePage from "./components/pages/Anime/AnimePage";
import AnimeHistory from "./components/pages/Anime/AnimeHistory";
import AnimeDirectory from "./components/pages/Anime/AnimeDirectory";
import MangaPage from "./components/pages/Manga/MangaPage";
import MangaHistory from "./components/pages/Manga/MangaHistory";
import MangaDirectory from "./components/pages/Manga/MangaDirectory";
import ComicsPage from "./components/pages/Comics/ComicsPage";
import ComicsHistory from "./components/pages/Comics/ComicsHistory";
import ComicsDirectory from "./components/pages/Comics/ComicsDirectory";
import TVPage from "./components/pages/TV/TVPage";
import TVHistory from "./components/pages/TV/TVHistory";
import TVDirectory from "./components/pages/TV/TV-directory";
import VideoGamesPage from "./components/pages/VideoGames/VideoGamesPage";
import VideoGamesDirectory from "./components/pages/VideoGames/VideoGamesDirectory";
import VideoGamesHistory from "./components/pages/VideoGames/VideoGamesHistory";
import WorldsUniversesPage from "./components/pages/WorldsUniverses/WorldsUniversesPage";
import WorldsUniversesDirectory from "./components/pages/WorldsUniverses/WorldsUniversesDirectory";
import PowerRoomPage from "./components/pages/PowerRoom/PowerRoomPage";
import CommunityPage from "./components/pages/Community/CommunityPage";
import ProfilePage from "./components/pages/Profile/ProfilePage";
import CharacterPage from "./components/pages/Characters/CharacterPage";

// This component sets the data-page attribute on the body based on the current route

function PageDataAttributeSetter() {
  const location = useLocation();
  useEffect(() => {
    const match = location.pathname.match(/^\/?([^/]+)/);
    const page = match && match[1] ? match[1] : "home";
    document.body.setAttribute("data-page", page);
    return () => {
      document.body.removeAttribute("data-page");
    };
  }, [location]);
  return null;
}

  const noHeaderPages = ["/profile", "/power-room", "/community"];
  const showHeader = !(
    location.pathname === "/" ||
    noHeaderPages.some((page) => location.pathname.startsWith(page))
  );


function App() {;

  return (
    <ThemeProvider>
      <AuthProvider>
        <EditModeProvider>
          <GlobalEditMode />
          <PageDataAttributeSetter />
          <div className="content-wrapper">
            <BottomNavigation />
            <div>
              
            {/* Skip to content link for accessibility */}
              {showHeader && <Header />}
              <a href="#main-content" className="skip-link">
                Skip to content
              </a>

              <main id="main-content" className="main-content">
                <Routes>
                  {/* Define routes for all pages */}
                  <Route path="/" element={<HomePage />} />
                  {<Route path="/anime" element={<AnimePage />} />}
                  <Route path="/anime/history" element={<AnimeHistory />} />
                  <Route path="/anime/directory" element={<AnimeDirectory />} />
                  <Route path="/manga" element={<MangaPage />} />
                  <Route path="/manga/history" element={<MangaHistory />} />
                  <Route path="/manga/directory" element={<MangaDirectory />} />
                  <Route path="/comics" element={<ComicsPage />} />
                  <Route path="/comics/history" element={<ComicsHistory />} />
                  <Route path="/comics/directory" element={<ComicsDirectory />} />
                  <Route path="/tv" element={<TVPage />} />
                  <Route path="/tv/history" element={<TVHistory />} />
                  <Route path="/tv/directory" element={<TVDirectory />} />
                  <Route path="/video-games" element={<VideoGamesPage />} />
                  <Route
                    path="/video-games/directory"
                    element={<VideoGamesHistory />}
                  />
                  <Route
                    path="/video-games/directory"
                    element={<VideoGamesDirectory />}
                  />
                  <Route
                    path="/worlds-universes"
                    element={<WorldsUniversesPage />}
                  />
                  <Route
                    path="/worlds-universes/directory"
                    element={<WorldsUniversesDirectory />}
                  />
                  <Route path="/power-room" element={<PowerRoomPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/characters" element={<CharacterPage />} />
                  {/* Add more routes as we create the page components */}
                  {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Routes>
              </main>
              {location.pathname !== "/profile" && <Footer />}
            </div>
          </div>
          <Navigation />
        </EditModeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
