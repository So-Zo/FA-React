import React, { useCallback } from "react";
import TableOfContents, {
  TocSectionProps,
} from "../../PageUIs/TableOfContents";
import WikiSearchBar from "../../../FaShared/Components/WikiSearchBar";
import WikiEditor from "../../../FaShared/Components/WikiEditor";
import { useWikiPage } from "../../../FaShared/hooks/useWikiPage";
import { WikiPageLoader } from "../../../services/WikiPageLoader";
import { useAuth } from "../../../FaShared/hooks/useAuth";

const WorldsUniversesPage: React.FC = () => {
  // Load dynamic content from database
  const {
    page: wikiPage,
    loading: pageLoading,
    error: pageError,
    refreshPage,
  } = useWikiPage("/worlds-universes");

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
        await refreshPage();
      } catch (error) {
        console.error("Failed to save wiki page:", error);
      }
    },
    [wikiPage?.id, user?.id, refreshPage]
  );

  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Overview", anchor: "#overview" },
        { label: "Categories", anchor: "#world-categories" },
        { label: "Creation", anchor: "#world-building" },
      ],
      deepLinks: [
        {
          label: "Directory",
          path: "/worldsuniverses/directory",
          exists: true,
        },
      ],
    },
    {
      title: "BY MEDIA TYPE",
      quickLinks: [
        { label: "Anime", anchor: "#anime-worlds" },
        { label: "Comics", anchor: "#comic-worlds" },
        { label: "Games", anchor: "#game-worlds" },
      ],
      deepLinks: [],
    },
  ];

  return (
    <div className="worldsuniverses-page">
      <header>
        <div className="image-header">
          <img
            src="/images/worlds-universes/WorldsUniversesHeader.jpg"
            alt="Worlds & Universes Overview"
          />
        </div>
        <WikiSearchBar
          placeholder="Search for Worlds, Universes, etc."
          className="worldsuniverses-search-bar"
        />
      </header>

      <main id="main-content">
        <hr />
        <TableOfContents
          sections={tocSections}
          title="Worlds & Universes Encyclopedia"
          description="Explore the vast multiverse of fictional worlds and universes."
        />

        {pageLoading ? (
          <div className="section-content loading">
            <h2>📚 Loading Worlds & Universes Content...</h2>
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
              Page ID: <code>{wikiPage?.id || "Not found"}</code>
            </p>
          </div>
        )}

        <hr />
      </main>
    </div>
  );
};

export default WorldsUniversesPage;
