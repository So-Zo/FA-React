import React from "react";
import { Character } from "../../../../types";

interface FeatsTabProps {
  leftCharacter: Character | null;
  rightCharacter: Character | null;
}

export const FeatsTab: React.FC<FeatsTabProps> = ({
  leftCharacter,
  rightCharacter,
}) => {
  return (
    <div className="comparison-panel" id="feats-panel">
      <div className="comparison-panel-header">
        <h3>
          Notable Feats{" "}
          <a
            href="#edit-feats"
            className="section-edit-control"
            data-section="feats"
          >
            Edit
          </a>
        </h3>
      </div>
      <div
        className="comparison-panel-content editable-content"
        id="feats-content"
      >
        <div className="comparison-split">
          <div className="left-content">
            <h4>Achievement Highlights</h4>
            {leftCharacter ? (
              <div className="character-feats">
                {leftCharacter.notable_feats &&
                leftCharacter.notable_feats.length > 0 ? (
                  <div className="feats-list">
                    {leftCharacter.notable_feats.map((feat, index) => (
                      <div key={feat.id} className="feat-entry">
                        <div className="feat-header">
                          <h5 className="feat-title">{feat.title}</h5>
                          <span className="feat-category">
                            {feat.power_level}
                          </span>
                        </div>
                        <p className="feat-description">{feat.description}</p>
                        {feat.power_level && (
                          <div className="feat-power">
                            <strong>Power Level:</strong> {feat.power_level}
                          </div>
                        )}
                        {feat.context && (
                          <div className="feat-context">
                            <em>Context:</em> {feat.context}
                          </div>
                        )}
                        <div className="feat-difficulty">
                          <strong>Difficulty:</strong> {feat.difficulty}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No notable feats recorded</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-character-selected">
                <p>Select a character to view feats</p>
              </div>
            )}
          </div>

          <div className="right-content">
            <h4>Achievement Highlights</h4>
            {rightCharacter ? (
              <div className="character-feats">
                {rightCharacter.feats.length > 0 ? (
                  <div className="feats-list">
                    {rightCharacter.feats.map((feat, index) => (
                      <div key={index} className="feat-entry">
                        <div className="feat-header">
                          <h5 className="feat-title">{feat.feat_name}</h5>
                          <span className="feat-category">{feat.category}</span>
                        </div>
                        <p className="feat-description">{feat.description}</p>
                        {feat.power_level && (
                          <div className="feat-power">
                            <strong>Power Level:</strong> {feat.power_level}
                          </div>
                        )}
                        {feat.context && (
                          <div className="feat-context">
                            <em>Context:</em> {feat.context}
                          </div>
                        )}
                        {feat.scaling_notes && (
                          <div className="feat-scaling">
                            <strong>Scaling Notes:</strong> {feat.scaling_notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No notable feats recorded</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-character-selected">
                <p>Select a character to view feats</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
