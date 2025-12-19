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
import "../../../FaShared/Css/WikiEditor.css";

const MangaPage: React.FC = () => {
  // Load dynamic content from database
  const {
    page: wikiPage,
    loading: pageLoading,
    error: pageError,
    refreshPage,
  } = useWikiPage("/manga");

  // Get page contributors
  const { contributors } = usePageContributors("manga-main-page");

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
        { label: "Basics", anchor: "#the-basics" },
        { label: "History", anchor: "#history-of-manga" },
        { label: "Terms", anchor: "#terminology-guide" },
      ],
      deepLinks: [
        { label: "Full History", path: "/manga/history", exists: true },
      ],
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Genres", anchor: "#manga-genres" },
        { label: "Worlds", anchor: "#manga-worlds" },
        { label: "Audience", anchor: "#audience-categories" },
      ],
      deepLinks: [
        { label: "Directory", path: "/manga/directory", exists: true },
      ],
    },
  ];

  return (
    <div className="manga-page">
      <header>
        <div className="image-header">
          <img src="/images/manga/MangaHeader.jpg" alt="Manga Overview" />
        </div>
        <WikiSearchBar
          placeholder="Search for Characters, Universes, etc."
          className="manga-search-bar"
        />
      </header>

      <main id="main-content">
        <hr />
        <TableOfContents
          sections={tocSections}
          title="Manga Encyclopedia"
          description="Use this table of contents to navigate through the manga guide."
        />

        {pageLoading ? (
          <div className="section-content loading">
            <h2>📚 Loading Manga Content...</h2>
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
        <PageContributor
          pageId="manga-main-page"
          contributors={contributors}
          className="page-footer"
          showHistoryLink={true}
        />
      </main>
    </div>
  );
};

export default MangaPage;
