import React, { useCallback } from "react";
import TableOfContents, {
  TocSectionProps,
} from "../../PageUIs/TableOfContents";
import WikiSearchBar from "../../../FaShared/Components/WikiSearchBar";
import WikiEditor from "../../../FaShared/Components/WikiEditor";
import { usePageContributors } from "../../../FaShared/hooks/usePageContributors";
import { PageContributor } from "../../../FaShared/Components/PageContributor";
import { useWikiPage } from "../../../FaShared/hooks/useWikiPage";
import { WikiPageLoader } from "../../../services/WikiPageLoader";
import { useAuth } from "../../../FaShared/hooks/useAuth";

const VideoGamesDirectory: React.FC = () => {
  // Load dynamic content from database
  const {
    page: wikiPage,
    loading: pageLoading,
    error: pageError,
    refreshPage,
  } = useWikiPage("/video-games/directory");

  // Get page contributors
  const { contributors } = usePageContributors("/video-games/directory");

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
        await WikiPageLoader.saveWikiPage(wikiPage.id, newContent, user?.id);
        // Refresh the page data to show updated content
        await refreshPage();
      } catch (error) {
        console.error("Failed to save wiki page:", error);
        // You might want to show a toast notification here
      }
    },
    [wikiPage?.id, user?.id, refreshPage]
  );

  // Define TOC sections for video games directory
  const tocSections: TocSectionProps[] = [
    {
      title: "BROWSE GAMES",
      quickLinks: [
        { label: "Popular Games", anchor: "#popular-games" },
        { label: "By Genre", anchor: "#browse-by-genre" },
        { label: "By Platform", anchor: "#browse-by-platform" },
      ],
      deepLinks: [
        {
          label: "Video Games Encyclopedia",
          path: "/video-games",
          exists: true,
        },
        {
          label: "Video Games History",
          path: "/video-games/history",
          exists: true,
        },
      ],
    },
  ];

  return (
    <div className="video-games-page">
      <header>
        <div className="image-header">
          <img
            src="/images/video-games/VideoGamesHeader.jpg"
            alt="Video Games Directory"
          />
        </div>

        <WikiSearchBar
          placeholder="Search for Video Games, Characters, Developers, etc."
          className="video-games-search-bar"
        />
      </header>

      <main id="main-content">
        <hr />

        <TableOfContents
          sections={tocSections}
          title="Video Games Directory"
          description="Browse and explore video games by genre, platform, and developer."
        />

        {/* Dynamic Wiki Content */}
        {pageLoading ? (
          <div className="section-content loading">
            <h2>📚 Loading Video Games Directory...</h2>
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

export default VideoGamesDirectory;
