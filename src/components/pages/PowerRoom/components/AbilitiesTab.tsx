import React from "react";
import { Character } from "../../../../types";

interface AbilitiesTabProps {
  leftCharacter: Character | null;
  rightCharacter: Character | null;
}

export const AbilitiesTab: React.FC<AbilitiesTabProps> = ({
  leftCharacter,
  rightCharacter,
}) => {
  return (
    <div className="comparison-panel active" id="abilities-panel">
      <div className="comparison-panel-header">
        <h3>
          Abilities & Powers{" "}
          <a
            href="#edit-abilities"
            className="section-edit-control"
            data-section="abilities"
          >
            Edit
          </a>
        </h3>
      </div>
      <div
        className="comparison-panel-content editable-content"
        id="abilities-content"
      >
        <div className="comparison-split">
          <div className="left-content">
            <h4>Powers & Abilities</h4>
            {leftCharacter ? (
              <div className="character-abilities">
                <h5>Primary Powers</h5>
                <ul className="abilities-list">
                  {leftCharacter.abilities.primary_powers.map(
                    (power, index) => (
                      <li key={index}>{power}</li>
                    )
                  )}
                  {leftCharacter.abilities.primary_powers.length === 0 && (
                    <li className="empty-state">No primary powers listed</li>
                  )}
                </ul>

                <h5>Special Techniques</h5>
                <ul className="abilities-list">
                  {leftCharacter.abilities.special_techniques.map(
                    (technique, index) => (
                      <li key={index}>{technique}</li>
                    )
                  )}
                  {leftCharacter.abilities.special_techniques.length === 0 && (
                    <li className="empty-state">
                      No special techniques listed
                    </li>
                  )}
                </ul>

                <h5>Weaknesses</h5>
                <ul className="abilities-list">
                  {leftCharacter.abilities.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness}</li>
                  ))}
                  {leftCharacter.abilities.weaknesses.length === 0 && (
                    <li className="empty-state">No known weaknesses</li>
                  )}
                </ul>

                {leftCharacter.abilities.power_description && (
                  <>
                    <h5>Power Description</h5>
                    <p className="power-description">
                      {leftCharacter.abilities.power_description}
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="no-character-selected">
                <p>Select a character to view abilities</p>
              </div>
            )}
          </div>

          <div className="right-content">
            <h4>Powers & Abilities</h4>
            {rightCharacter ? (
              <div className="character-abilities">
                <h5>Primary Powers</h5>
                <ul className="abilities-list">
                  {rightCharacter.abilities.primary_powers.map(
                    (power, index) => (
                      <li key={index}>{power}</li>
                    )
                  )}
                  {rightCharacter.abilities.primary_powers.length === 0 && (
                    <li className="empty-state">No primary powers listed</li>
                  )}
                </ul>

                <h5>Special Techniques</h5>
                <ul className="abilities-list">
                  {rightCharacter.abilities.special_techniques.map(
                    (technique, index) => (
                      <li key={index}>{technique}</li>
                    )
                  )}
                  {rightCharacter.abilities.special_techniques.length === 0 && (
                    <li className="empty-state">
                      No special techniques listed
                    </li>
                  )}
                </ul>

                <h5>Weaknesses</h5>
                <ul className="abilities-list">
                  {rightCharacter.abilities.weaknesses.map(
                    (weakness, index) => (
                      <li key={index}>{weakness}</li>
                    )
                  )}
                  {rightCharacter.abilities.weaknesses.length === 0 && (
                    <li className="empty-state">No known weaknesses</li>
                  )}
                </ul>

                {rightCharacter.abilities.power_description && (
                  <>
                    <h5>Power Description</h5>
                    <p className="power-description">
                      {rightCharacter.abilities.power_description}
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="no-character-selected">
                <p>Select a character to view abilities</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
