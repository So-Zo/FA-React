import React from "react";
import { PowerRoomCharacter } from "../../../../types";

interface WorldsTabProps {
  leftCharacter: PowerRoomCharacter | null;
  rightCharacter: PowerRoomCharacter | null;
}

export const WorldsTab: React.FC<WorldsTabProps> = ({
  leftCharacter,
  rightCharacter,
}) => {
  return (
    <div className="comparison-panel active" id="worlds-panel">
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
                {leftCharacter.world_info ? (
                  <div className="world-entries">
                    <div className="world-entry">
                      <h5 className="world-type">
                        {leftCharacter.world_info.universe_name}
                      </h5>
                      <div className="world-details">
                        <p className="world-description">
                          {leftCharacter.world_info.universe_description}
                        </p>
                        {leftCharacter.world_info.notable_locations &&
                          leftCharacter.world_info.notable_locations.length >
                            0 && (
                            <div className="world-rules">
                              <strong>Notable Locations:</strong>
                              <ul>
                                {leftCharacter.world_info.notable_locations.map(
                                  (location, locationIndex) => (
                                    <li key={locationIndex}>{location}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                      </div>
                    </div>
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
                {rightCharacter.world_info ? (
                  <div className="world-entries">
                    <div className="world-entry">
                      <h5 className="world-type">
                        {rightCharacter.world_info.universe_name}
                      </h5>
                      <div className="world-details">
                        <p className="world-description">
                          {rightCharacter.world_info.universe_description}
                        </p>
                        {rightCharacter.world_info.notable_locations &&
                          rightCharacter.world_info.notable_locations.length >
                            0 && (
                            <div className="world-rules">
                              <strong>Notable Locations:</strong>
                              <ul>
                                {rightCharacter.world_info.notable_locations.map(
                                  (location, locationIndex) => (
                                    <li key={locationIndex}>{location}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                      </div>
                    </div>
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
