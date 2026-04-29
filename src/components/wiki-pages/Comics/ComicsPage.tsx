import React, { useCallback, useEffect, useMemo } from "react";
import TableOfContents, {
  TocSectionProps,
} from "../../PageUIs/TableOfContents";
import {
  WikiContentState,
  WikiRendererWarning,
  WikiSection,
} from "../../../FaShared/Components";
import WikiSearchBar from "../../../FaShared/Components/WikiSearchBar";
import { usePageContributors } from "../../../FaShared/hooks/usePageContributors";
import { PageContributor } from "../../../FaShared/Components/PageContributor";
import { useWikiPage } from "../../../FaShared/hooks/useWikiPage";
import { useWikiPageSections } from "../../../FaShared/hooks/useWikiPageSections";
import { useAuth } from "../../../FaShared/hooks/useAuth";
import { usePageEditController } from "../../../FaShared/hooks/usePageEditController";
import { TipTapProvider } from "../../../FaShared/hooks/TipTapContext";
import { PageEditContext } from "../../../FaShared/types/pageEdit";
import { TipTapContent } from "../../../types";

const ComicsPage: React.FC = () => {
  // Load page metadata (for ID and basic info)
  const {
    page: wikiPage,
    loading: pageLoading,
    error: pageError,
  } = useWikiPage("/comics");

  // Get current user for saving
  const { user } = useAuth();

  // Define sections - order controlled here, not in database
  const sections = useMemo(
    () => [
      { id: "the-basics", title: "The Basics" },
      { id: "history-of-comics", title: "History of Comics" },
      { id: "terminology-guide", title: "Terminology Guide" },
      { id: "comics-genres", title: "Comics Genres" },
      { id: "comics-worlds", title: "Comics Worlds" },
      { id: "audience-categories", title: "Audience Categories" },
      { id: "creation-process", title: "Creation Process" },
      { id: "cultural-impact", title: "Cultural Impact" },
      { id: "learning-resources", title: "Learning Resources" },
    ],
    [],
  );

  // Load individual sections
  const {
    sectionContent,
    sectionHtml,
    sectionMeta,
    loading: sectionsLoading,
    error: sectionsError,
    updateSectionContent,
    saveAllSections,
    discardChanges,
    hasPendingChanges,
  } = useWikiPageSections(wikiPage?.id || null, sections, user?.id);

  // Get page contributors
  const { contributors } = usePageContributors(wikiPage?.id || null);

  // Discard pending changes on unmount if user navigates away
  useEffect(() => {
    return () => {
      if (hasPendingChanges) {
        discardChanges();
      }
    };
  }, [hasPendingChanges, discardChanges]);

  // Handle content updates - LOCAL ONLY (no DB save until Save button)
  const handleSectionUpdate = useCallback(
    (sectionId: string) => (newContent: TipTapContent, html: string) => {
      updateSectionContent(sectionId, newContent, html);
    },
    [updateSectionContent],
  );

  const pageEditValue = usePageEditController({
    canEdit: Boolean(wikiPage?.id),
    onSave: saveAllSections,
    onDiscard: discardChanges,
  });

  // Define TOC sections for comics content
  const tocSections: TocSectionProps[] = [
    {
      title: "FUNDAMENTALS",
      quickLinks: [
        { label: "Basics", anchor: "#the-basics" },
        { label: "History", anchor: "#history-of-comics" },
        { label: "Terms", anchor: "#terminology-guide" },
      ],
      deepLinks: [
        { label: "Full History", path: "/comics/history", exists: true },
      ],
    },
    {
      title: "CATEGORIES & STYLES",
      quickLinks: [
        { label: "Genres", anchor: "#comics-genres" },
        { label: "Worlds", anchor: "#comics-worlds" },
        { label: "Audience", anchor: "#audience-categories" },
      ],
      deepLinks: [
        { label: "Directory", path: "/comics/directory", exists: true },
      ],
    },
    {
      title: "BEHIND THE SCENES",
      quickLinks: [
        { label: "Process", anchor: "#creation-process" },
        { label: "Impact", anchor: "#cultural-impact" },
        { label: "Resources", anchor: "#learning-resources" },
      ],
      deepLinks: [],
    },
  ];

  return (
    <PageEditContext.Provider value={pageEditValue}>
      <TipTapProvider>
        <div className="comics-page">
          <header>
            <div className="image-header">
              <img
                src="/images/comics/ComicsHeader.jpg"
                alt="Comics Overview"
              />
            </div>

            <WikiSearchBar
              placeholder="Search for Characters, Universes, etc."
              className="comics-search-bar"
            />
          </header>

          <main id="main-content">
            <hr />

            <TableOfContents
              sections={tocSections}
              title="Comics Encyclopedia"
              description="Use this table of contents to navigate through the comics guide."
            />

            {/* Dynamic Wiki Content - Section-Based Architecture */}
            {pageLoading || sectionsLoading ? (
              <WikiContentState
                variant="loading"
                title="📚 Loading Comics Content..."
              >
                <p>Fetching the latest content from the database...</p>
              </WikiContentState>
            ) : pageError || sectionsError ? (
              <WikiContentState
                variant="error"
                title="⚠️ Error Loading Content"
              >
                <p>Failed to load page content: {pageError || sectionsError}</p>
              </WikiContentState>
            ) : !wikiPage?.id ? (
              <WikiContentState
                variant="placeholder"
                title="📄 Page Not Found in Database"
              >
                <p>
                  <strong>
                    The /comics page doesn't exist in the wiki_pages table yet.
                  </strong>
                </p>
              </WikiContentState>
            ) : (
              <>
                {Object.values(sectionMeta).some(
                  (meta) => meta?.status !== "ready",
                ) && <WikiRendererWarning />}

                {sections.map((section) => {
                  const content = sectionContent[section.id] || "";
                  const html = sectionHtml[section.id] || "";
                  return (
                    <WikiSection
                      key={section.id}
                      sectionId={section.id}
                      content={content}
                      html={html}
                      onUpdate={handleSectionUpdate(section.id)}
                    />
                  );
                })}
              </>
            )}

            <hr />

            {/* Page Contributors */}
            <PageContributor
              pageId="/comics"
              contributors={contributors}
              className="page-footer"
              showHistoryLink={true}
            />
          </main>
        </div>
      </TipTapProvider>
    </PageEditContext.Provider>
  );
};

export default ComicsPage;
