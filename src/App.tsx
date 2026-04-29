import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { AuthProvider } from "./FaShared/hooks/AuthProvider";
import { ThemeProvider } from "./FaShared/hooks/ThemeContext";
import { AssetProvider } from "./context/AssetContext";
import Footer from "./FaShared/Components/Footer";
import BottomNavigation from "./FaShared/Components/BottomNavigation";
import "./Import.css";
import { EditModeProvider } from "./FaShared/hooks/EditModeContext";
import { TipTapProvider } from "./FaShared/hooks/TipTapContext";
import { ProfileProvider } from "./components/pages/Profile/ProfileContext";

// 🚀 LAZY LOADED PAGE COMPONENTS - No more loading everything at once!
const HomePage = lazy(() => import("./components/pages/Home/HomePage"));

// NEW DYNAMIC WIKI PAGES
const AnimePage = lazy(() => import("./components/wiki-pages/Anime/AnimePage"));
const MangaPage = lazy(() => import("./components/wiki-pages/Manga/MangaPage"));
const ComicsPage = lazy(
  () => import("./components/wiki-pages/Comics/ComicsPage"),
);
const TVPage = lazy(() => import("./components/wiki-pages/TV/TVPage"));
const VideoGamesPage = lazy(
  () => import("./components/wiki-pages/VideoGames/VideoGamesPage"),
);
const WorldsUniversesPage = lazy(
  () => import("./components/wiki-pages/WorldsUniverses/WorldsUniversesPage"),
);

// NEW DYNAMIC HISTORY AND DIRECTORY PAGES
const AnimeHistory = lazy(
  () => import("./components/wiki-pages/Anime/AnimeHistory"),
);
const AnimeDirectory = lazy(
  () => import("./components/wiki-pages/Anime/AnimeDirectory"),
);
const MangaHistory = lazy(
  () => import("./components/wiki-pages/Manga/MangaHistory"),
);
const MangaDirectory = lazy(
  () => import("./components/wiki-pages/Manga/MangaDirectory"),
);
const ComicsHistory = lazy(
  () => import("./components/wiki-pages/Comics/ComicsHistory"),
);
const ComicsDirectory = lazy(
  () => import("./components/wiki-pages/Comics/ComicsDirectory"),
);
const TVHistory = lazy(() => import("./components/wiki-pages/TV/TVHistory"));
const TVDirectory = lazy(
  () => import("./components/wiki-pages/TV/TVDirectory"),
);
const VideoGamesDirectory = lazy(
  () => import("./components/wiki-pages/VideoGames/VideoGamesDirectory"),
);
const VideoGamesHistory = lazy(
  () => import("./components/wiki-pages/VideoGames/VideoGamesHistory"),
);
const WorldsUniversesDirectory = lazy(
  () =>
    import("./components/wiki-pages/WorldsUniverses/WorldsUniversesDirectory"),
);
const PowerRoomPage = lazy(
  () => import("./components/pages/PowerRoom/PowerRoomPage"),
);
const CommunityPage = lazy(
  () => import("./components/pages/Community/CommunityPage"),
);
const ProfilePage = lazy(
  () => import("./components/pages/Profile/ProfilePage"),
);
const UserProfilePage = lazy(
  () => import("./components/pages/Profile/UserProfilePage"),
);
const CharacterPage = lazy(
  () => import("./components/pages/Characters/CharacterPage"),
);
const LoginPage = lazy(() => import("./components/pages/Auth/LoginPage"));
const PostDetailPage = lazy(
  () => import("./FaShared/Components/PostDetailPage"),
);
const AboutPage = lazy(() => import("./components/pages/About/AboutPage"));
const ContributePage = lazy(
  () => import("./components/pages/Contribute/ContributePage"),
);
const PageHistory = lazy(
  () => import("./components/pages/PageHistory/PageHistory"),
);

const AdminAssetsPage = lazy(
  () => import("./components/pages/Admin/AdminAssetsPage"),
);

const NotFoundPage = lazy(
  () => import("./components/pages/NotFound/NotFoundPage"),
);

const PageDataAttributeSetter = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[1] || "home";
    document.body.setAttribute("data-page", path);
  }, [location]);

  return null;
};

const AppContent = () => {
  const location = useLocation();

  return (
    <TipTapProvider>
      <div className="content-wrapper">
        <BottomNavigation />
        <div>
          {/* Skip to content link for accessibility */}
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>

          <main id="main-content" className="main-content">
            <Suspense
              fallback={
                <div className="page-loading">
                  <h2>⚡ Loading page...</h2>
                  <p>Loading the requested page component...</p>
                </div>
              }
            >
              <Routes>
                {/* Define routes for all pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/anime" element={<AnimePage />} />
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
                  path="/video-games/history"
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
                <Route path="/post/:id" element={<PostDetailPage />} />
                <Route
                  path="/profile"
                  element={
                    <ProfileProvider>
                      <ProfilePage />
                    </ProfileProvider>
                  }
                />
                <Route path="/user/:userId" element={<UserProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/characters" element={<CharacterPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contribute" element={<ContributePage />} />
                <Route path="/page-history/:pageId" element={<PageHistory />} />
                <Route path="/admin" element={<AdminAssetsPage />} />
                {/* Catch all other routes with 404 page */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          {location.pathname !== "/profile" &&
            !location.pathname.startsWith("/user/") && <Footer />}
        </div>
      </div>
    </TipTapProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AssetProvider>
          <EditModeProvider>
            <PageDataAttributeSetter />
            <AppContent />
          </EditModeProvider>
        </AssetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
