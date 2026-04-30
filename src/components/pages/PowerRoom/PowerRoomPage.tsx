import React, { useCallback, useMemo, useState } from "react";
import { TipTapProvider } from "../../../FaShared/hooks/TipTapContext";
import { usePageEditController } from "../../../FaShared/hooks/usePageEditController";
import { PageEditContext } from "../../../FaShared/types/pageEdit";
import { CharacterSearchResult, TipTapContent } from "../../../types";
import {
  AbilitiesTab,
  TimelineTab,
  WorldsTab,
  FeatsTab,
  PowerRoomComparisonGrid,
  PowerRoomStatusStack,
} from "./components";
import {
  usePowerRoomCharacters,
  usePowerRoomDrafts,
  usePowerRoomSwapGuard,
} from "./hooks";
import {
  EMPTY_CONTENT,
  PowerRoomTabId,
  TAB_CATEGORY_MAP,
} from "./powerRoomEditing";

const PowerRoomPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PowerRoomTabId>("abilities");
  const {
    leftCharacter,
    rightCharacter,
    setLeftCharacter,
    setRightCharacter,
    leftCharacterDetails,
    rightCharacterDetails,
    leftCharacterId,
    rightCharacterId,
    pageLoadError,
    refreshLeftCharacter,
    refreshRightCharacter,
  } = usePowerRoomCharacters();

  const {
    hasPendingChanges,
    isSaving,
    saveError,
    refreshNotice,
    clearStatusMessages,
    resolveDefaultTarget,
    saveCurrentDraft,
    discardCurrentDraft,
    updateDraft,
    getTargetId,
    getDraftContent,
    getDraftCountForCharacter,
    clearDraftsForCharacter,
  } = usePowerRoomDrafts({
    activeTab,
    leftCharacterId,
    rightCharacterId,
    refreshLeftCharacter,
    refreshRightCharacter,
  });

  const applyCharacterSelection = useCallback(
    (side: "left" | "right", character: CharacterSearchResult) => {
      if (side === "left") {
        setLeftCharacter(character);
      } else {
        setRightCharacter(character);
      }
    },
    [setLeftCharacter, setRightCharacter],
  );

  const {
    pendingSwap,
    requestCharacterSelection,
    confirmPendingSwap,
    cancelPendingSwap,
  } = usePowerRoomSwapGuard({
    leftCharacter,
    rightCharacter,
    applyCharacterSelection,
    getDraftCountForCharacter,
    clearDraftsForCharacter,
    onSelectionChange: clearStatusMessages,
  });

  const pageEditValue = usePageEditController({
    canEdit: Boolean(leftCharacterId || rightCharacterId),
    onSave: saveCurrentDraft,
    onDiscard: discardCurrentDraft,
    getDefaultTarget: resolveDefaultTarget,
  });

  const { activeTarget, isEditing, selectTarget } = pageEditValue;

  const handleEditSaveClick = useCallback(async () => {
    if (!pageEditValue.canEdit) {
      return;
    }

    if (pageEditValue.isEditing) {
      try {
        await pageEditValue.save();
      } catch {
        return;
      }
    }

    pageEditValue.toggleEditMode();
  }, [pageEditValue]);

  const isEditingTarget = useCallback(
    (characterId: string | undefined) =>
      Boolean(characterId) &&
      isEditing &&
      activeTarget?.kind === "section" &&
      activeTarget.sectionId === activeTab,
    [activeTab, activeTarget, isEditing],
  );

  // Handles tab switching
  const handleTabClick = useCallback(
    (tabId: PowerRoomTabId) => {
      setActiveTab(tabId);

      if (
        isEditing &&
        (leftCharacterId || rightCharacterId) &&
        (activeTarget?.kind !== "section" || activeTarget.sectionId !== tabId)
      ) {
        selectTarget({ kind: "section", sectionId: tabId });
      }
    },
    [activeTarget, isEditing, leftCharacterId, rightCharacterId, selectTarget],
  );

  const leftBaseContent =
    leftCharacterDetails?.[TAB_CATEGORY_MAP[activeTab]]?.content ??
    EMPTY_CONTENT;
  const rightBaseContent =
    rightCharacterDetails?.[TAB_CATEGORY_MAP[activeTab]]?.content ??
    EMPTY_CONTENT;

  const activeTabProps = useMemo(
    () => ({
      leftEditable: isEditingTarget(leftCharacterId ?? undefined),
      rightEditable: isEditingTarget(rightCharacterId ?? undefined),
      leftContent: getDraftContent(
        leftCharacterId ?? undefined,
        leftBaseContent,
      ),
      rightContent: getDraftContent(
        rightCharacterId ?? undefined,
        rightBaseContent,
      ),
      onLeftUpdate: (content: TipTapContent, html: string) => {
        const targetId = getTargetId(leftCharacterId ?? undefined);
        if (!targetId) {
          return;
        }

        updateDraft(targetId, content, html);
      },
      onRightUpdate: (content: TipTapContent, html: string) => {
        const targetId = getTargetId(rightCharacterId ?? undefined);
        if (!targetId) {
          return;
        }

        updateDraft(targetId, content, html);
      },
    }),
    [
      getDraftContent,
      getTargetId,
      isEditingTarget,
      leftBaseContent,
      leftCharacterId,
      rightBaseContent,
      rightCharacterId,
      updateDraft,
    ],
  );

  return (
    <PageEditContext.Provider value={pageEditValue}>
      <TipTapProvider>
        <div className="power-room-page">
          <header className="power-room-intro">
            <h1>The Power Room</h1>
            <p>
              Compare the powers and abilities of your favorite characters from
              across different universes. Select characters using the controls
              and see how they match up!
            </p>
          </header>

          <PowerRoomComparisonGrid
            leftCharacter={leftCharacter}
            rightCharacter={rightCharacter}
            onLeftCharacterSelect={(character) =>
              requestCharacterSelection("left", character)
            }
            onRightCharacterSelect={(character) =>
              requestCharacterSelection("right", character)
            }
          />

          <section className="comparison-content-section">
            <div className="wiki-controls-container">
              <button
                type="button"
                className="wiki-edit-button"
                onClick={handleEditSaveClick}
                disabled={!pageEditValue.canEdit || isSaving}
                aria-label={
                  isEditing
                    ? "Save Power Room changes"
                    : "Enter Power Room edit mode"
                }
              >
                {isSaving ? "Saving..." : isEditing ? "Save" : "Edit"}
              </button>
            </div>

            <PowerRoomStatusStack
              pendingSwap={pendingSwap}
              pageLoadError={pageLoadError}
              saveError={saveError}
              refreshNotice={refreshNotice}
              isSaving={isSaving}
              hasPendingChanges={hasPendingChanges}
              onConfirmPendingSwap={confirmPendingSwap}
              onCancelPendingSwap={cancelPendingSwap}
            />

            <div className="comparison-tabs">
              <button
                className={`tab-button${
                  activeTab === "abilities" ? " active" : ""
                }`}
                disabled={isSaving}
                onClick={() => handleTabClick("abilities")}
                data-tab="abilities"
              >
                Abilities & Powers
              </button>
              <button
                className={`tab-button${
                  activeTab === "timelines" ? " active" : ""
                }`}
                disabled={isSaving}
                onClick={() => handleTabClick("timelines")}
                data-tab="timelines"
              >
                Timelines
              </button>
              <button
                className={`tab-button${activeTab === "worlds" ? " active" : ""}`}
                disabled={isSaving}
                onClick={() => handleTabClick("worlds")}
                data-tab="worlds"
              >
                Worlds & Universes
              </button>
              <button
                className={`tab-button${activeTab === "feats" ? " active" : ""}`}
                disabled={isSaving}
                onClick={() => handleTabClick("feats")}
                data-tab="feats"
              >
                Notable Feats
              </button>
            </div>

            <div className="comparison-panels">
              {activeTab === "abilities" && (
                <AbilitiesTab
                  leftCharacter={leftCharacterDetails}
                  rightCharacter={rightCharacterDetails}
                  {...activeTabProps}
                />
              )}
              {activeTab === "timelines" && (
                <TimelineTab
                  leftCharacter={leftCharacterDetails}
                  rightCharacter={rightCharacterDetails}
                  {...activeTabProps}
                />
              )}
              {activeTab === "worlds" && (
                <WorldsTab
                  leftCharacter={leftCharacterDetails}
                  rightCharacter={rightCharacterDetails}
                  {...activeTabProps}
                />
              )}
              {activeTab === "feats" && (
                <FeatsTab
                  leftCharacter={leftCharacterDetails}
                  rightCharacter={rightCharacterDetails}
                  {...activeTabProps}
                />
              )}
            </div>
          </section>
        </div>
      </TipTapProvider>
    </PageEditContext.Provider>
  );
};

export default PowerRoomPage;
