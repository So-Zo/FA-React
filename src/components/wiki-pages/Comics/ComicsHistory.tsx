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

const ComicsHistory: React.FC = () => {
  // Load dynamic content from database
  const {
    page: wikiPage,
    loading: pageLoading,
    error: pageError,
    refreshPage,
  } = useWikiPage("/comics/history");

  // Get page contributors
  const { contributors } = usePageContributors("/comics/history");

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

  // Define TOC sections for comics history
  const tocSections: TocSectionProps[] = [
    {
      title: "COMIC ERAS",
      quickLinks: [
        { label: "Golden Age", anchor: "#golden-age" },
        { label: "Silver Age", anchor: "#silver-age" },
        { label: "Modern Age", anchor: "#modern-age" },
      ],
      deepLinks: [
        { label: "Comics Encyclopedia", path: "/comics", exists: true },
        { label: "Comics Directory", path: "/comics/directory", exists: true },
      ],
    },
  ];

  return (
    <div className="comics-page">
      <header>
        <div className="image-header">
          <img src="/images/comics/ComicsHeader.jpg" alt="Comics History" />
        </div>

        <WikiSearchBar
          placeholder="Search Comics History, Characters, etc."
          className="comics-search-bar"
        />
      </header>

      <main id="main-content">
        <hr />

        <TableOfContents
          sections={tocSections}
          title="Comics History"
          description="The complete timeline and evolution of comics."
        />

        {/* Dynamic Wiki Content */}
        {pageLoading ? (
          <div className="section-content loading">
            <h2>📚 Loading Comics History...</h2>
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

export default ComicsHistory;
