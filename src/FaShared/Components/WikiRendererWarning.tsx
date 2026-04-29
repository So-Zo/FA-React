import React from "react";

const WikiRendererWarning: React.FC = () => {
  return (
    <div className="section-content warning">
      <h2>Renderer Sync Needed</h2>
      <p>
        Section formatting is out of sync with the current renderer. Save in
        edit mode and refresh to apply the latest output.
      </p>
    </div>
  );
};

export default WikiRendererWarning;
