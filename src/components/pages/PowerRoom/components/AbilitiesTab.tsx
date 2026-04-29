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
        <p>Select a character to view abilities</p>
      </div>
    );
  }

  if (!character.abilities.content_html) {
    return (
      <div className="empty-state">
        <p>No abilities content yet</p>
      </div>
    );
  }

  return (
    <div
      className="wiki-content character-section-content"
      dangerouslySetInnerHTML={{ __html: character.abilities.content_html }}
    />
  );
};

interface AbilitiesTabProps extends EditableTabProps {
  leftCharacter: PowerRoomCharacter | null;
  rightCharacter: PowerRoomCharacter | null;
}

export const AbilitiesTab: React.FC<AbilitiesTabProps> = ({
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
    <div className="comparison-panel active" id="abilities-panel">
      <div className="comparison-panel-header">
        <h3>Abilities & Powers</h3>
      </div>
      <div
        className="comparison-panel-content editable-content"
        id="abilities-content"
      >
        <div className="comparison-split">
          <div className="left-content">
            <h4>Powers & Abilities</h4>
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
            <h4>Powers & Abilities</h4>
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
