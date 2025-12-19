import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { AuthProvider } from "./FaShared/hooks/AuthProvider";
import { ThemeProvider } from "./FaShared/hooks/ThemeContext";
import Footer from "./FaShared/Components/Footer";
import BottomNavigation from "./FaShared/Components/BottomNavigation";
import TipTapToolbar from "./FaShared/Components/TipTapToolbar";
import { PageContributor } from "./FaShared/Components/PageContributor";
import { usePageContributors } from "./FaShared/hooks/usePageContributors";
import "./Import.css";
import { EditModeProvider } from "./FaShared/hooks/EditModeContext";
import { useEditMode } from "./FaShared/types/editMode";
import { TipTapProvider } from "./FaShared/hooks/TipTapContext";
import { ProfileProvider } from "./components/pages/Profile/ProfileContext";
import { useHasEditableContent } from "./FaShared/hooks/useHasEditableContent";

// 🚀 LAZY LOADED PAGE COMPONENTS - No more loading everything at once!
const HomePage = lazy(() => import("./components/pages/Home/HomePage"));

// COMMENTED OUT - Using new dynamic wiki-pages versions instead
// const AnimePage = lazy(() => import("./components/pages/Anime/AnimePage"));
// const MangaPage = lazy(() => import("./components/pages/Manga/MangaPage"));
// const ComicsPage = lazy(() => import("./components/pages/Comics/ComicsPage"));
// const TVPage = lazy(() => import("./components/pages/TV/TVPage"));
// const VideoGamesPage = lazy(() => import("./components/pages/VideoGames/VideoGamesPage"));
// const WorldsUniversesPage = lazy(() => import("./components/pages/WorldsUniverses/WorldsUniversesPage"));

// NEW DYNAMIC WIKI PAGES
const AnimePage = lazy(() => import("./components/wiki-pages/Anime/AnimePage"));
const MangaPage = lazy(() => import("./components/wiki-pages/Manga/MangaPage"));
const ComicsPage = lazy(
  () => import("./components/wiki-pages/Comics/ComicsPage")
);
const TVPage = lazy(() => import("./components/wiki-pages/TV/TVPage"));
const VideoGamesPage = lazy(
  () => import("./components/wiki-pages/VideoGames/VideoGamesPage")
);
const WorldsUniversesPage = lazy(
  () => import("./components/wiki-pages/WorldsUniverses/WorldsUniversesPage")
);

// NEW DYNAMIC HISTORY AND DIRECTORY PAGES
const AnimeHistory = lazy(
  () => import("./components/wiki-pages/Anime/AnimeHistory")
);
const AnimeDirectory = lazy(
  () => import("./components/wiki-pages/Anime/AnimeDirectory")
);
const MangaHistory = lazy(
  () => import("./components/wiki-pages/Manga/MangaHistory")
);
const MangaDirectory = lazy(
  () => import("./components/wiki-pages/Manga/MangaDirectory")
);
const ComicsHistory = lazy(
  () => import("./components/wiki-pages/Comics/ComicsHistory")
);
const ComicsDirectory = lazy(
  () => import("./components/wiki-pages/Comics/ComicsDirectory")
);
const TVHistory = lazy(() => import("./components/wiki-pages/TV/TVHistory"));
const TVDirectory = lazy(
  () => import("./components/wiki-pages/TV/TVDirectory")
);
const VideoGamesDirectory = lazy(
  () => import("./components/wiki-pages/VideoGames/VideoGamesDirectory")
);
const VideoGamesHistory = lazy(
  () => import("./components/wiki-pages/VideoGames/VideoGamesHistory")
);
const WorldsUniversesDirectory = lazy(
  () =>
    import("./components/wiki-pages/WorldsUniverses/WorldsUniversesDirectory")
);

// COMMENTED OUT - Moving to dynamic wiki-pages versions
// KEEP OLD SUB-PAGES FOR NOW (History, Directory, etc.)
// const AnimeHistory = lazy(
//   () => import("./components/pages/Anime/AnimeHistory")
// );
// const AnimeDirectory = lazy(
//   () => import("./components/pages/Anime/AnimeDirectory")
// );
// const MangaHistory = lazy(
//   () => import("./components/pages/Manga/MangaHistory")
// );
// const MangaDirectory = lazy(
//   () => import("./components/pages/Manga/MangaDirectory")
// );
// const ComicsHistory = lazy(
//   () => import("./components/pages/Comics/ComicsHistory")
// );
// const ComicsDirectory = lazy(
//   () => import("./components/pages/Comics/ComicsDirectory")
// );
// const TVHistory = lazy(() => import("./components/pages/TV/TVHistory"));
// const TVDirectory = lazy(() => import("./components/pages/TV/TV-directory"));
// const VideoGamesDirectory = lazy(
//   () => import("./components/pages/VideoGames/VideoGamesDirectory")
// );
// const VideoGamesHistory = lazy(
//   () => import("./components/pages/VideoGames/VideoGamesHistory")
// );
// const WorldsUniversesDirectory = lazy(
//   () => import("./components/pages/WorldsUniverses/WorldsUniversesDirectory")
// );
const PowerRoomPage = lazy(
  () => import("./components/pages/PowerRoom/PowerRoomPage")
);
const CommunityPage = lazy(
  () => import("./components/pages/Community/CommunityPage")
);
const ProfilePage = lazy(
  () => import("./components/pages/Profile/ProfilePage")
);
const UserProfilePage = lazy(
  () => import("./components/pages/Profile/UserProfilePage")
);
const CharacterPage = lazy(
  () => import("./components/pages/Characters/CharacterPage")
);
const LoginPage = lazy(() => import("./components/pages/Auth/LoginPage"));
const PostDetailPage = lazy(
  () => import("./FaShared/Components/PostDetailPage")
);
const AboutPage = lazy(() => import("./components/pages/About/AboutPage"));
const ContributePage = lazy(
  () => import("./components/pages/Contribute/ContributePage")
);
const PageHistory = lazy(
  () => import("./components/pages/PageHistory/PageHistory")
);

const PageDataAttributeSetter = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[1] || "home";
    document.body.setAttribute("data-page", path);
  }, [location]);

  return null;
};

// Component to handle page contributors at app level
const AppPageContributor = () => {
  const location = useLocation();

  // Pages that should NOT have contributors
  const excludedPaths = ["/profile", "/user", "/community", "/login", "/post"];

  // Check if current path should be excluded
  const shouldExclude = excludedPaths.some(
    (excludedPath) =>
      location.pathname === excludedPath ||
      location.pathname.startsWith(excludedPath + "/")
  );

  if (shouldExclude) {
    return null;
  }

  // Determine page ID from route
  const getPageId = () => {
    const pathname = location.pathname;

    // Use the full_path directly as it matches the wiki_pages table
    // This should match the full_path column in wiki_pages table
    return pathname === "/" ? "/" : pathname;
  };

  const pageId = getPageId();
  const { contributors } = usePageContributors(pageId);

  if (!pageId) {
    return null;
  }

  // Determine history path for "View Page History" link
  const getHistoryPath = () => {
    const pathname = location.pathname;

    if (pathname === "/anime") return "/anime/history";
    if (pathname === "/manga") return "/manga/history";
    if (pathname === "/comics") return "/comics/history";
    if (pathname === "/tv") return "/tv/history";
    if (pathname === "/video-games") return "/video-games/history";

    return undefined; // No history link for other pages
  };

  return (
    <PageContributor
      pageId={pageId}
      contributors={contributors}
      historyPath={getHistoryPath()}
    />
  );
};

const AppContent = () => {
  const location = useLocation();
  const { isEditing } = useEditMode();
  const hasEditableContent = useHasEditableContent();

  // Only apply edit-mode class if we're editing AND on an editable page
  const shouldShowEditMode = isEditing && hasEditableContent;

  return (
    <TipTapProvider>
      <div
        className={`content-wrapper ${shouldShowEditMode ? "edit-mode" : ""}`}
      >
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
                <Route path="/page-history/*" element={<PageHistory />} />
                {/* Add more routes as we create the page components */}
                {/* <Route path="*" element={<NotFoundPage />} /> */}
              </Routes>
            </Suspense>
          </main>
          <AppPageContributor />
          {location.pathname !== "/profile" &&
            !location.pathname.startsWith("/user/") && <Footer />}
        </div>
        <TipTapToolbar />
      </div>
    </TipTapProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <EditModeProvider>
          <PageDataAttributeSetter />
          <AppContent />
        </EditModeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
