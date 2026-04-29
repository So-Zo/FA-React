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
        <p>Select a character to view feats</p>
      </div>
    );
  }

  if (!character.notable_feats.content_html) {
    return (
      <div className="empty-state">
        <p>No feats content yet</p>
      </div>
    );
  }

  return (
    <div
      className="wiki-content character-section-content"
      dangerouslySetInnerHTML={{ __html: character.notable_feats.content_html }}
    />
  );
};

interface FeatsTabProps extends EditableTabProps {
  leftCharacter: PowerRoomCharacter | null;
  rightCharacter: PowerRoomCharacter | null;
}

export const FeatsTab: React.FC<FeatsTabProps> = ({
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
    <div className="comparison-panel active" id="feats-panel">
      <div className="comparison-panel-header">
        <h3>Notable Feats</h3>
      </div>
      <div
        className="comparison-panel-content editable-content"
        id="feats-content"
      >
        <div className="comparison-split">
          <div className="left-content">
            <h4>Achievement Highlights</h4>
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
            <h4>Achievement Highlights</h4>
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
