import React, { Suspense, lazy } from "react";
import { TipTapContent } from "../../types";
import ContentSection from "./ContentSection";
import { useTipTapEditor } from "../hooks/TipTapContext";
import { usePageEdit } from "../types/pageEdit";

const WikiEditor = lazy(() => import("./Editor"));

interface WikiSectionProps {
  sectionId: string;
  content: TipTapContent;
  html: string;
  onUpdate: (newContent: TipTapContent, html: string) => void;
  showActionButtons?: boolean;
}

const WikiSection: React.FC<WikiSectionProps> = ({
  sectionId,
  content,
  html,
  onUpdate,
  showActionButtons = true,
}) => {
  const pageEdit = usePageEdit();
  const { setEditor } = useTipTapEditor();

  const isSectionEditing =
    pageEdit.isEditing &&
    (pageEdit.activeTarget?.kind !== "section" ||
      pageEdit.activeTarget.sectionId === sectionId);

  const actionButtons = showActionButtons ? (
    <div className="section-tab-buttons">
      <button
        className="section-button"
        type="button"
        onClick={() => pageEdit.selectTarget({ kind: "section", sectionId })}
      >
        Edit
      </button>
      <button
        className="section-button"
        type="button"
        onClick={() => {
          void pageEdit.save();
        }}
        disabled={!pageEdit.isEditing}
      >
        Save
      </button>
    </div>
  ) : undefined;

  return (
    <ContentSection
      id={sectionId}
      actionButtons={actionButtons}
      pageEditable={true}
    >
      {isSectionEditing ? (
        <Suspense fallback={<div>Loading editor...</div>}>
          <WikiEditor
            content={content}
            onUpdate={onUpdate}
            editable={isSectionEditing}
            onEditorChange={setEditor}
          />
        </Suspense>
      ) : html ? (
        <div
          className="wiki-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <div className="wiki-content">
          <p>
            This section is syncing to the latest renderer output. Check back
            shortly.
          </p>
        </div>
      )}
    </ContentSection>
  );
};

export default WikiSection;
