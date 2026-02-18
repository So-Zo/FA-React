/*
 * ⚠️  DEPRECATED: TipTapToolbar Component ⚠️
 *
 * This sidebar toolbar is being replaced with floating mobile controls (TipTapMobileControls)
 * for all screen sizes to provide a consistent, unified experience.
 *
 * STATUS: This component is no longer used in the layout (hidden via CSS)
 * TODO: Eventually remove this component entirely once floating controls are stable
 *
 * The floating controls provide:
 * - Consistent UX across all devices
 * - Better accessibility with draggable positioning
 * - Modal interface that doesn't compete for layout space
 * - Simpler grid layout without complex edit-mode transitions
 */

import React, { useEffect, useState } from "react";
import { FaBold, FaItalic, FaList, FaLink, FaImage } from "react-icons/fa";
import { useEditMode } from "../types/editMode";
import { useTipTapEditor } from "../hooks/TipTapContext";
import { useHasEditableContent } from "../hooks/useHasEditableContent";

const TipTapToolbar: React.FC = () => {
  const { isEditing } = useEditMode();
  const { editor } = useTipTapEditor();
  const [, setIsUpdated] = useState(0);
  const hasEditableContent = useHasEditableContent();

  // Always render the container, but only show content when appropriate
  const shouldShowToolbar = isEditing && editor && hasEditableContent;

  // Force re-render when editor state changes
  useEffect(() => {
    if (!editor) return;

    const updateHandler = () => {
      // Force component re-render
      setIsUpdated(Date.now());
    };

    // Listen for selection and transaction updates
    editor.on("selectionUpdate", updateHandler);
    editor.on("transaction", updateHandler);

    return () => {
      editor.off("selectionUpdate", updateHandler);
      editor.off("transaction", updateHandler);
    };
  }, [editor]);

  // If we shouldn't show the toolbar, render an empty div to maintain grid layout
  if (!shouldShowToolbar) {
    return (
      <div
        className="tiptap-toolbar-placeholder"
        style={{ width: "0", overflow: "hidden" }}
      />
    );
  }

  const handleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const handleH2 = () => {
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  };

  const handleH3 = () => {
    editor.chain().focus().toggleHeading({ level: 3 }).run();
  };

  const handleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const handleLink = () => {
    const url = prompt("Enter link URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleImage = () => {
    const url = prompt("Enter image URL (or upload to wiki-media bucket):");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="tiptap-toolbar-sidebar">
      <div className="tiptap-toolbar-header">
        <h3>Format</h3>
      </div>

      <div className="tiptap-toolbar-content">
        {/* Text Formatting */}
        <div className="tiptap-control-group">
          <h4>Text</h4>
          <div className="tiptap-control-buttons">
            <button
              className={`tiptap-control-btn ${
                editor.isActive("bold") ? "is-active" : ""
              }`}
              onClick={handleBold}
              title="Bold"
              type="button"
              data-active={editor.isActive("bold")}
            >
              <FaBold />
            </button>
            <button
              className={`tiptap-control-btn ${
                editor.isActive("italic") ? "is-active" : ""
              }`}
              onClick={handleItalic}
              title="Italic"
              type="button"
              data-active={editor.isActive("italic")}
            >
              <FaItalic />
            </button>
          </div>
        </div>

        {/* Headings */}
        <div className="tiptap-control-group">
          <h4>Head</h4>
          <div className="tiptap-control-buttons">
            <button
              className={`tiptap-control-btn ${
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }`}
              onClick={handleH2}
              title="Heading 2"
              type="button"
              data-active={editor.isActive("heading", { level: 2 })}
            >
              H2
            </button>
            <button
              className={`tiptap-control-btn ${
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }`}
              onClick={handleH3}
              title="Heading 3"
              type="button"
              data-active={editor.isActive("heading", { level: 3 })}
            >
              H3
            </button>
          </div>
        </div>

        {/* Lists */}
        <div className="tiptap-control-group">
          <h4>List</h4>
          <div className="tiptap-control-buttons">
            <button
              className={`tiptap-control-btn ${
                editor.isActive("bulletList") ? "is-active" : ""
              }`}
              onClick={handleBulletList}
              title="Bullet List"
              type="button"
              data-active={editor.isActive("bulletList")}
            >
              <FaList />
            </button>
          </div>
        </div>

        {/* Insert */}
        <div className="tiptap-control-group">
          <h4>Add</h4>
          <div className="tiptap-control-buttons">
            <button
              className={`tiptap-control-btn ${
                editor.isActive("link") ? "is-active" : ""
              }`}
              onClick={handleLink}
              title="Link"
              type="button"
            >
              <FaLink />
            </button>
            <button
              className="tiptap-control-btn"
              onClick={handleImage}
              title="Image"
              type="button"
            >
              <FaImage />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipTapToolbar;
