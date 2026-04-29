import React from "react";
import WikiEditor from "../../../../FaShared/Components/Editor";
import { useTipTapEditor } from "../../../../FaShared/hooks/TipTapContext";
import { PowerRoomCharacter, TipTapContent } from "../../../../types";

interface EditableTabProps {
  leftEditable: boolean;
  rightEditable: boolean;
  leftContent: TipTapContent;
  rightContent: TipTapContent;
  onLeftUpdate: (content: TipTapContent, html: string) => void;
  onRightUpdate: (content: TipTapContent, html: string) => void;
}

const renderSectionHtml = (character: PowerRoomCharacter | null) => {
  if (!character) {
    return (
      <div className="no-character-selected">
        <p>Select a character to view world information</p>
      </div>
    );
  }

  if (!character.world_info.content_html) {
    return (
      <div className="empty-state">
        <p>No world content yet</p>
      </div>
    );
  }

  return (
    <div
      className="wiki-content character-section-content"
      dangerouslySetInnerHTML={{ __html: character.world_info.content_html }}
    />
  );
};

interface WorldsTabProps extends EditableTabProps {
  leftCharacter: PowerRoomCharacter | null;
  rightCharacter: PowerRoomCharacter | null;
}

export const WorldsTab: React.FC<WorldsTabProps> = ({
  leftCharacter,
  rightCharacter,
  leftEditable,
  rightEditable,
  leftContent,
  rightContent,
  onLeftUpdate,
  onRightUpdate,
}) => {
  const { setEditor } = useTipTapEditor();

  return (
    <div className="comparison-panel active" id="worlds-panel">
      <div className="comparison-panel-header">
        <h3>Worlds & Universes</h3>
      </div>
      <div
        className="comparison-panel-content editable-content"
        id="worlds-content"
      >
        <div className="comparison-split">
          <div className="left-content">
            <h4>World Information</h4>
            {leftEditable ? (
              <WikiEditor
                content={leftContent}
                onUpdate={onLeftUpdate}
                editable={true}
                onEditorChange={setEditor}
              />
            ) : (
              renderSectionHtml(leftCharacter)
            )}
          </div>

          <div className="right-content">
            <h4>World Information</h4>
            {rightEditable ? (
              <WikiEditor
                content={rightContent}
                onUpdate={onRightUpdate}
                editable={true}
                onEditorChange={setEditor}
              />
            ) : (
              renderSectionHtml(rightCharacter)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
