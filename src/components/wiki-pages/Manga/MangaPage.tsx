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
import { usePageAssets } from "../../../context/AssetContext";
import { TipTapContent } from "../../../types";

const MangaPage: React.FC = () => {
  // Load page metadata (for ID and basic info)
  const {
    page: wikiPage,
    loading: pageLoading,
    error: pageError,
  } = useWikiPage("/manga");

  // Get current user for saving
  const { user } = useAuth();

  // Define sections - order controlled here, not in database
  const sections = useMemo(
    () => [
      { id: "the-basics", title: "The Basics" },
      { id: "history-of-manga", title: "History of Manga" },
      { id: "terminology-guide", title: "Terminology Guide" },
      { id: "manga-genres", title: "Manga Genres" },
      { id: "manga-worlds", title: "Manga Worlds" },
      { id: "audience-categories", title: "Audience Categories" },
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

  // Get page assets (hero image)
  const { mangaHero } = usePageAssets();

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
    <PageEditContext.Provider value={pageEditValue}>
      <TipTapProvider>
        <div className="manga-page">
          <header>
            <div className="image-header">
              <img
                src={mangaHero?.public_url || "/images/manga/MangaHeader.jpg"}
                alt={mangaHero?.alt_text || "Manga Overview"}
                className="asset-hero"
              />
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

            {pageLoading || sectionsLoading ? (
              <WikiContentState
                variant="loading"
                title="📚 Loading Manga Content..."
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
                    The /manga page doesn't exist in the wiki_pages table yet.
                  </strong>
                </p>
              </WikiContentState>
            ) : (
              <>
                {Object.values(sectionMeta).some(
                  (meta) => meta?.status !== "ready",
                ) && <WikiRendererWarning />}

                {/* Render each section through reader/editor split */}
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
              pageId="/manga"
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

export default MangaPage;
