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
import { useWikiPage } from "../../../FaShared/hooks/useWikiPage";
import { useWikiPageSections } from "../../../FaShared/hooks/useWikiPageSections";
import { useAuth } from "../../../FaShared/hooks/useAuth";
import { usePageEditController } from "../../../FaShared/hooks/usePageEditController";
import { TipTapProvider } from "../../../FaShared/hooks/TipTapContext";
import { PageEditContext } from "../../../FaShared/types/pageEdit";
import { TipTapContent } from "../../../types";

const WorldsUniversesPage: React.FC = () => {
  // Load page metadata (for ID and basic info)
  const {
    page: wikiPage,
    loading: pageLoading,
    error: pageError,
  } = useWikiPage("/worlds-universes");

  // Get current user for saving
  const { user } = useAuth();

  // Define sections - order controlled here, not in database
  const sections = useMemo(
    () => [
      { id: "overview", title: "Overview" },
      { id: "world-categories", title: "World Categories" },
      { id: "world-building", title: "World Building" },
      { id: "anime-worlds", title: "Anime Worlds" },
      { id: "comic-worlds", title: "Comic Worlds" },
      { id: "game-worlds", title: "Game Worlds" },
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
    <PageEditContext.Provider value={pageEditValue}>
      <TipTapProvider>
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

            {pageLoading || sectionsLoading ? (
              <WikiContentState
                variant="loading"
                title="📚 Loading Worlds & Universes Content..."
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
                    The /worlds-universes page doesn't exist in the wiki_pages
                    table yet.
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
          </main>
        </div>
      </TipTapProvider>
    </PageEditContext.Provider>
  );
};

export default WorldsUniversesPage;
