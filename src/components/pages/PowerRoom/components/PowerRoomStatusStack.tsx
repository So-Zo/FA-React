import React from "react";
import { PendingCharacterSwap } from "../powerRoomEditing";

interface PowerRoomStatusStackProps {
  pendingSwap: PendingCharacterSwap | null;
  pageLoadError: string | null;
  saveError: string | null;
  refreshNotice: string | null;
  isSaving: boolean;
  hasPendingChanges: boolean;
  onConfirmPendingSwap: () => void;
  onCancelPendingSwap: () => void;
}

export const PowerRoomStatusStack: React.FC<PowerRoomStatusStackProps> = ({
  pendingSwap,
  pageLoadError,
  saveError,
  refreshNotice,
  isSaving,
  hasPendingChanges,
  onConfirmPendingSwap,
  onCancelPendingSwap,
}) => {
  return (
    <>
      {pendingSwap && (
        <div className="power-room-status-banner warning" role="alert">
          <p>
            Switching the {pendingSwap.side} side from{" "}
            {pendingSwap.currentCharacterName} will discard{" "}
            {pendingSwap.draftCount} unsaved{" "}
            {pendingSwap.draftCount === 1 ? "draft" : "drafts"}.
          </p>
          <div className="power-room-status-actions">
            <button type="button" onClick={onConfirmPendingSwap}>
              Discard and Switch
            </button>
            <button type="button" onClick={onCancelPendingSwap}>
              Keep Editing
            </button>
          </div>
        </div>
      )}

      {pageLoadError && (
        <div className="power-room-status-banner error" role="alert">
          {pageLoadError}
        </div>
      )}

      {saveError && (
        <div className="power-room-status-banner error" role="alert">
          {saveError}
        </div>
      )}

      {refreshNotice && (
        <div className="power-room-status-banner warning" role="status">
          {refreshNotice}
        </div>
      )}

      <div className="power-room-edit-source" aria-live="polite">
        <p>
          Any loaded side in the active tab can be edited. We recommend focusing
          on one character at a time to avoid accidental changes.
        </p>
        {isSaving && <p>Saving changes for the active tab...</p>}
        {hasPendingChanges && !isSaving && !saveError && (
          <p>You have unsaved changes in the current comparison set.</p>
        )}
      </div>
    </>
  );
};
