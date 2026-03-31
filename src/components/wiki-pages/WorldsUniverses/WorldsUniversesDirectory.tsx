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

const WorldsUniversesDirectory: React.FC = () => {
  // Load dynamic content from database
  const {
    page: wikiPage,
    loading: pageLoading,
    error: pageError,
    refreshPage,
  } = useWikiPage("/worlds-universes/directory");

  // Get page contributors
  const { contributors } = usePageContributors("/worlds-universes/directory");

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
    [wikiPage, user, refreshPage],
  );

  // Define TOC sections for worlds & universes directory
  const tocSections: TocSectionProps[] = [
    {
      title: "BROWSE WORLDS",
      quickLinks: [
        { label: "Popular Universes", anchor: "#popular-universes" },
        { label: "By Media Type", anchor: "#browse-by-media" },
        { label: "By Scale", anchor: "#browse-by-scale" },
      ],
      deepLinks: [
        {
          label: "Worlds & Universes Encyclopedia",
          path: "/worlds-universes",
          exists: true,
        },
      ],
    },
  ];

  return (
    <div className="worlds-universes-page">
      <header>
        <div className="image-header">
          <img
            src="/images/worlds-universes/WorldsUniversesHeader.jpg"
            alt="Worlds & Universes Directory"
          />
        </div>

        <WikiSearchBar
          placeholder="Search for Worlds, Universes, Dimensions, etc."
          className="worlds-universes-search-bar"
        />
      </header>

      <main id="main-content">
        <hr />

        <TableOfContents
          sections={tocSections}
          title="Worlds & Universes Directory"
          description="Browse and explore fictional worlds and universes across all media."
        />

        {/* Dynamic Wiki Content */}
        {pageLoading ? (
          <div className="section-content loading">
            <h2>📚 Loading Worlds & Universes Directory...</h2>
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

        {/* Page Contributors */}
        <PageContributor
          pageId="/worlds-universes/directory"
          contributors={contributors}
          className="page-footer"
          showHistoryLink={true}
        />
      </main>
    </div>
  );
};

export default WorldsUniversesDirectory;
