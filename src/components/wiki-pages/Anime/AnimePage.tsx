import React, { useCallback, useMemo } from "react";
import TableOfContents, {
  TocSectionProps,
} from "../../PageUIs/TableOfContents";
import WikiSearchBar from "../../../FaShared/Components/WikiSearchBar";
import WikiEditor from "../../../FaShared/Components/WikiEditor";
import { usePageContributors } from "../../../FaShared/hooks/usePageContributors";
import { PageContributor } from "../../../FaShared/Components/PageContributor";
import { useWikiPage } from "../../../FaShared/hooks/useWikiPage";
import { useWikiPageSections } from "../../../FaShared/hooks/useWikiPageSections";
import { useAuth } from "../../../FaShared/hooks/useAuth";
import { TipTapContent } from "../../../types";

const AnimePage: React.FC = () => {
  // Load page metadata (for ID and basic info)
  const {
    page: wikiPage,
    loading: pageLoading,
    error: pageError,
  } = useWikiPage("/anime");

  // Get current user for saving
  const { user } = useAuth();

  // Define sections - order controlled here, not in database
  // Memoized to prevent infinite render loops
  const sections = useMemo(
    () => [
      { id: "the-basics", title: "The Basics" },
      { id: "history-of-anime", title: "History of Anime" },
      { id: "terminology-guide", title: "Terminology Guide" },
      { id: "anime-genres", title: "Anime Genres" },
      { id: "anime-worlds", title: "Anime Worlds" },
      { id: "audience-categories", title: "Audience Categories" },
      { id: "production-process", title: "Production Process" },
      { id: "cultural-impact", title: "Cultural Impact" },
      { id: "learning-resources", title: "Learning Resources" },
    ],
    []
  );

  // Load individual sections
  const {
    sectionContent,
    loading: sectionsLoading,
    error: sectionsError,
    saveSectionContent,
  } = useWikiPageSections(wikiPage?.id || null, sections, user?.id);

  // Get page contributors
  const { contributors } = usePageContributors("/anime");

  // Handle content updates for individual sections
  const handleSectionUpdate = useCallback(
    (sectionId: string) => async (newContent: TipTapContent) => {
      try {
        await saveSectionContent(sectionId, newContent);
      } catch (error) {
        console.error(`Failed to save section ${sectionId}:`, error);
        // You might want to show a toast notification here
      }
    },
    [saveSectionContent],
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

        {/* Dynamic Wiki Content - Section-Based Architecture */}
        {pageLoading || sectionsLoading ? (
          <div className="section-content loading">
            <h2>📚 Loading Anime Content...</h2>
            <p>Fetching the latest content from the database...</p>
          </div>
        ) : pageError || sectionsError ? (
          <div className="section-content error">
            <h2>⚠️ Error Loading Content</h2>
            <p>Failed to load page content: {pageError || sectionsError}</p>
          </div>
        ) : !wikiPage?.id ? (
          <div className="section-content placeholder">
            <h2>📄 No Database Page Found</h2>
            <p>
              <strong>
                This page needs to be created in the database first.
              </strong>
            </p>
            <p>
              To add this page:
              <br />
              1. Run the SQL migration to create the wiki_pages entry
              <br />
              2. Enable edit mode to start adding section content
              <br />
              3. Each section is saved independently
            </p>
          </div>
        ) : (
          <>
            {/* Render each section with full HTML control */}
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="section-content"
              >
                <WikiEditor
                  content={sectionContent[section.id] || ""}
                  onUpdate={handleSectionUpdate(section.id)}
                />
              </section>
            ))}
          </>
        )}

        <hr />

        {/* Page Contributors */}
        <PageContributor
          pageId="/anime"
          contributors={contributors}
          className="page-footer"
          showHistoryLink={true}
        />
      </main>
    </div>
  );
};

export default AnimePage;
