import React, { useCallback } from "react";
import TableOfContents, {
  TocSectionProps,
} from "../../PageUIs/TableOfContents";
import WikiSearchBar from "../../../FaShared/Components/WikiSearchBar";
import WikiEditor from "../../../FaShared/Components/WikiEditor";
import { useWikiPage } from "../../../FaShared/hooks/useWikiPage";
import { WikiPageLoader } from "../../../services/WikiPageLoader";
import { useAuth } from "../../../FaShared/hooks/useAuth";

const AnimePage: React.FC = () => {
  // Load dynamic content from database
  const {
    page: wikiPage,
    loading: pageLoading,
    error: pageError,
    refreshPage,
  } = useWikiPage("/anime");

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

  // Define TOC sections for anime content
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Basics", anchor: "#the-basics" },
        { label: "History", anchor: "#history-of-anime" },
        { label: "Terms", anchor: "#terminology-guide" },
      ],
      deepLinks: [
        { label: "Full History", path: "/anime/history", exists: true },
      ],
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Genres", anchor: "#anime-genres" },
        { label: "Worlds", anchor: "#anime-worlds" },
        { label: "Audience", anchor: "#audience-categories" },
      ],
      deepLinks: [
        { label: "Directory", path: "/anime/directory", exists: true },
      ],
    },
    {
      title: "BEHIND THE SCENES",
      quickLinks: [
        { label: "Process", anchor: "#production-process" },
        { label: "Impact", anchor: "#cultural-impact" },
        { label: "Resources", anchor: "#learning-resources" },
      ],
      deepLinks: [],
    },
  ];

  return (
    <div className="anime-page">
      <header>
        <div className="image-header">
          <img src="/images/anime/AnimeHeader.jpg" alt="Anime Overview" />
        </div>

        <WikiSearchBar
          placeholder="Search for Characters, Universes, etc."
          className="anime-search-bar"
        />
      </header>

      <main id="main-content">
        <hr />

        <TableOfContents
          sections={tocSections}
          title="Anime Encyclopedia"
          description="Use this table of contents to navigate through the anime guide."
        />

        {/* Dynamic Wiki Content - Loads from Database */}
        {pageLoading ? (
          <div className="section-content loading">
            <h2>📚 Loading Anime Content...</h2>
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
            <p>
              <strong>This page is fully dynamic!</strong> Content will be
              loaded from the database once it's added.
            </p>
            <p>
              To add content:
              <br />
              1. Run the SQL migration: <code>insert_anime_page.sql</code>
              <br />
              2. Enable edit mode to start adding content
              <br />
              3. Use the WikiEditor to create and edit content
            </p>
            <p>
              Page ID: <code>{wikiPage?.id || "Not found"}</code>
            </p>
          </div>
        )}

        <hr />
      </main>
    </div>
  );
};

export default AnimePage;
