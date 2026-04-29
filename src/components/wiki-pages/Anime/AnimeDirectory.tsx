import React, { useCallback } from "react";
import TableOfContents, {
  TocSectionProps,
} from "../../PageUIs/TableOfContents";
import WikiSearchBar from "../../../FaShared/Components/WikiSearchBar";
import WikiEditor from "../../../FaShared/Components/Editor";
import { useWikiPage } from "../../../FaShared/hooks/useWikiPage";
import { WikiPageService } from "../../../services/WikiPageService";
import { useAuth } from "../../../FaShared/hooks/useAuth";

const AnimeDirectory: React.FC = () => {
  // Load dynamic content from database
  const {
    page: wikiPage,
    loading: pageLoading,
    error: pageError,
    refreshPage,
  } = useWikiPage("/anime/directory");

  // Get current user for saving
  const { user } = useAuth();

  // Handle content updates from WikiEditor
  const handleContentUpdate = useCallback(
    async (newContent: any) => {
      if (!wikiPage?.id) {
        console.warn("Cannot save: no page ID available");
        return;
      }

      try {
        await WikiPageService.saveWikiPage(wikiPage.id, newContent, user?.id);
        // Refresh the page data to show updated content
        await refreshPage();
      } catch (error) {
        console.error("Failed to save wiki page:", error);
        // You might want to show a toast notification here
      }
    },
    [wikiPage, user, refreshPage],
  );

  // Define TOC sections for anime directory
  const tocSections: TocSectionProps[] = [
    {
      title: "BROWSE ANIME",
      quickLinks: [
        { label: "Popular Series", anchor: "#popular-series" },
        { label: "By Genre", anchor: "#browse-by-genre" },
        { label: "By Studio", anchor: "#browse-by-studio" },
      ],
      deepLinks: [
        { label: "Anime Encyclopedia", path: "/anime", exists: true },
        { label: "Anime History", path: "/anime/history", exists: true },
      ],
    },
  ];

  return (
    <div className="anime-page">
      <header>
        <div className="image-header">
          <img src="/images/anime/AnimeHeader.jpg" alt="Anime Directory" />
        </div>

        <WikiSearchBar
          placeholder="Search for Anime, Characters, Studios, etc."
          className="anime-search-bar"
        />
      </header>

      <main id="main-content">
        <hr />

        <TableOfContents
          sections={tocSections}
          title="Anime Directory"
          description="Browse and explore anime by genre, studio, and category."
        />

        {/* Dynamic Wiki Content */}
        {pageLoading ? (
          <div className="section-content loading">
            <h2>📚 Loading Anime Directory...</h2>
            <p>Fetching the latest content from the database...</p>
          </div>
        ) : pageError ? (
          <div className="section-content error">
            <h2>⚠️ Error Loading Content</h2>
            <p>Failed to load page content: {pageError}</p>
            <button onClick={refreshPage} className="retry-button">
              Try Again
            </button>
          </div>
        ) : wikiPage?.content ? (
          <WikiEditor
            className="section-content"
            content={wikiPage.content}
            onUpdate={handleContentUpdate}
          />
        ) : (
          <div className="section-content placeholder">
            <h2>📄 No Database Content Yet</h2>
            <p>Content will be loaded from the database once it's added.</p>
          </div>
        )}

        <hr />
      </main>
    </div>
  );
};

export default AnimeDirectory;
