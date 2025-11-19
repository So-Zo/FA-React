import React from "react";
import { Character } from "../../../../types";

interface WorldsTabProps {
  leftCharacter: Character | null;
  rightCharacter: Character | null;
}

export const WorldsTab: React.FC<WorldsTabProps> = ({
  leftCharacter,
  rightCharacter,
}) => {
  return (
    <div className="comparison-panel" id="worlds-panel">
      <div className="comparison-panel-header">
        <h3>
          Worlds & Universes{" "}
          <a
            href="#edit-worlds"
            className="section-edit-control"
            data-section="worlds"
          >
            Edit
          </a>
        </h3>
      </div>
      <div
        className="comparison-panel-content editable-content"
        id="worlds-content"
      >
        <div className="comparison-split">
          <div className="left-content">
            <h4>World Information</h4>
            {leftCharacter ? (
              <div className="character-worlds">
                {leftCharacter.world_info.length > 0 ? (
                  <div className="world-entries">
                    {leftCharacter.world_info.map((world, index) => (
                      <div key={index} className="world-entry">
                        <h5 className="world-type">{world.world_type}</h5>
                        <div className="world-details">
                          <p className="world-description">
                            {world.description}
                          </p>
                          {world.rules && world.rules.length > 0 && (
                            <div className="world-rules">
                              <strong>Universal Rules:</strong>
                              <ul>
                                {world.rules.map((rule, ruleIndex) => (
                                  <li key={ruleIndex}>{rule}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {world.physics && world.physics.length > 0 && (
                            <div className="world-physics">
                              <strong>Physics & Laws:</strong>
                              <ul>
                                {world.physics.map((law, lawIndex) => (
                                  <li key={lawIndex}>{law}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {world.technology_level && (
                            <div className="world-tech">
                              <strong>Technology Level:</strong>{" "}
                              {world.technology_level}
                            </div>
                          )}
                          {world.power_scaling && (
                            <div className="world-scaling">
                              <strong>Power Scaling:</strong>{" "}
                              {world.power_scaling}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No world information available</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-character-selected">
                <p>Select a character to view world information</p>
              </div>
            )}
          </div>

          <div className="right-content">
            <h4>World Information</h4>
            {rightCharacter ? (
              <div className="character-worlds">
                {rightCharacter.world_info.length > 0 ? (
                  <div className="world-entries">
                    {rightCharacter.world_info.map((world, index) => (
                      <div key={index} className="world-entry">
                        <h5 className="world-type">{world.world_type}</h5>
                        <div className="world-details">
                          <p className="world-description">
                            {world.description}
                          </p>
                          {world.rules && world.rules.length > 0 && (
                            <div className="world-rules">
                              <strong>Universal Rules:</strong>
                              <ul>
                                {world.rules.map((rule, ruleIndex) => (
                                  <li key={ruleIndex}>{rule}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {world.physics && world.physics.length > 0 && (
                            <div className="world-physics">
                              <strong>Physics & Laws:</strong>
                              <ul>
                                {world.physics.map((law, lawIndex) => (
                                  <li key={lawIndex}>{law}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {world.technology_level && (
                            <div className="world-tech">
                              <strong>Technology Level:</strong>{" "}
                              {world.technology_level}
                            </div>
                          )}
                          {world.power_scaling && (
                            <div className="world-scaling">
                              <strong>Power Scaling:</strong>{" "}
                              {world.power_scaling}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No world information available</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-character-selected">
                <p>Select a character to view world information</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
