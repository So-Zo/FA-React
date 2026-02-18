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

const ComicsDirectory: React.FC = () => {
  // Load dynamic content from database
  const {
    page: wikiPage,
    loading: pageLoading,
    error: pageError,
    refreshPage,
  } = useWikiPage("/comics/directory");

  // Get page contributors
  const { contributors } = usePageContributors("/comics/directory");

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

  // Define TOC sections for comics directory
  const tocSections: TocSectionProps[] = [
    {
      title: "BROWSE COMICS",
      quickLinks: [
        { label: "Popular Series", anchor: "#popular-series" },
        { label: "By Genre", anchor: "#browse-by-genre" },
        { label: "By Publisher", anchor: "#browse-by-publisher" },
      ],
      deepLinks: [
        { label: "Comics Encyclopedia", path: "/comics", exists: true },
        { label: "Comics History", path: "/comics/history", exists: true },
      ],
    },
    {
      title: "CATEGORIES",
      quickLinks: [
        { label: "Superhero", anchor: "#superhero" },
        { label: "Independent", anchor: "#independent" },
        { label: "Graphic Novels", anchor: "#graphic-novels" },
      ],
      deepLinks: [],
    },
  ];

  return (
    <div className="comics-page">
      <header>
        <div className="image-header">
          <img src="/images/comics/ComicsHeader.jpg" alt="Comics Directory" />
        </div>

        <WikiSearchBar
          placeholder="Search for Comics, Characters, Publishers, etc."
          className="comics-search-bar"
        />
      </header>

      <main id="main-content">
        <hr />

        <TableOfContents
          sections={tocSections}
          title="Comics Directory"
          description="Browse and explore comics by publisher, genre, and series."
        />

        {/* Dynamic Wiki Content - Loads from Database */}
        {pageLoading ? (
          <div className="section-content loading">
            <h2>📚 Loading Comics Directory...</h2>
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
              1. Run the SQL migration for comics directory
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

export default ComicsDirectory;
