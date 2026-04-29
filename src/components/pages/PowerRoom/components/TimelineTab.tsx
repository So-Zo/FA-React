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
        <p>Select a character to view timeline</p>
      </div>
    );
  }

  if (!character.timeline.content_html) {
    return (
      <div className="empty-state">
        <p>No timeline content yet</p>
      </div>
    );
  }

  return (
    <div
      className="wiki-content character-section-content"
      dangerouslySetInnerHTML={{ __html: character.timeline.content_html }}
    />
  );
};

interface TimelineTabProps extends EditableTabProps {
  leftCharacter: PowerRoomCharacter | null;
  rightCharacter: PowerRoomCharacter | null;
}

export const TimelineTab: React.FC<TimelineTabProps> = ({
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
    <div className="comparison-panel active" id="timeline-panel">
      <div className="comparison-panel-header">
        <h3>Timeline & Events</h3>
      </div>
      <div
        className="comparison-panel-content editable-content"
        id="timeline-content"
      >
        <div className="comparison-split">
          <div className="left-content">
            <h4>Major Events</h4>
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
            <h4>Major Events</h4>
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
