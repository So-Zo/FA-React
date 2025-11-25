import React from "react";
import { PowerRoomCharacter } from "../../../../types";

interface TimelineTabProps {
  leftCharacter: PowerRoomCharacter | null;
  rightCharacter: PowerRoomCharacter | null;
}

export const TimelineTab: React.FC<TimelineTabProps> = ({
  leftCharacter,
  rightCharacter,
}) => {
  // Debug: Check individual timeline events
  if (leftCharacter?.timeline && leftCharacter.timeline.length > 0) {
    console.log(
      "🕒 TimelineTab - First left event:",
      leftCharacter.timeline[0]
    );
  }
  if (rightCharacter?.timeline && rightCharacter.timeline.length > 0) {
    console.log(
      "🕒 TimelineTab - First right event:",
      rightCharacter.timeline[0]
    );
  }

  return (
    <div className="comparison-panel active" id="timeline-panel">
      <div className="comparison-panel-header">
        <h3>
          Timeline & Events{" "}
          <a
            href="#edit-timeline"
            className="section-edit-control"
            data-section="timeline"
          >
            Edit
          </a>
        </h3>
      </div>
      <div
        className="comparison-panel-content editable-content"
        id="timeline-content"
      >
        <div className="comparison-split">
          <div className="left-content">
            <h4>Major Events</h4>
            {leftCharacter ? (
              <div className="character-timeline">
                {leftCharacter.timeline && leftCharacter.timeline.length > 0 ? (
                  <div className="timeline-events">
                    {leftCharacter.timeline
                      .sort((a: any, b: any) => a.order_index - b.order_index)
                      .map((event: any) => (
                        <div key={event.id} className="timeline-event">
                          <div className="event-header">
                            <h5 className="event-title">{event.title}</h5>
                            {event.category && (
                              <span className="event-category">
                                ({event.category})
                              </span>
                            )}
                          </div>
                          <p className="event-description">
                            DEBUG: {event.description}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No major events recorded</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-character-selected">
                <p>Select a character to view timeline</p>
              </div>
            )}
          </div>

          <div className="right-content">
            <h4>Major Events</h4>
            {rightCharacter ? (
              <div className="character-timeline">
                {rightCharacter.timeline &&
                rightCharacter.timeline.length > 0 ? (
                  <div className="timeline-events">
                    {rightCharacter.timeline
                      .sort((a, b) => a.order_index - b.order_index)
                      .map((event: any) => (
                        <div key={event.id} className="timeline-event">
                          <div className="event-header">
                            <h5 className="event-title">{event.title}</h5>
                            {event.category && (
                              <span className="event-category">
                                ({event.category})
                              </span>
                            )}
                          </div>
                          <p className="event-description">
                            DEBUG: {event.description}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No major events recorded</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-character-selected">
                <p>Select a character to view timeline</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
