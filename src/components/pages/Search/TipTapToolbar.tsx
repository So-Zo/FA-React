import React from "react";
import { FaBold, FaItalic, FaList, FaLink, FaImage } from "react-icons/fa";
import { useEditMode } from "../../../edit/editMode";
import { useTipTapEditor } from "./TipTapContext";

const TipTapToolbar: React.FC = () => {
  const { isEditing } = useEditMode();
  const { editor } = useTipTapEditor();

  if (!isEditing || !editor) {
    return null; // Don't render when not in edit mode or no editor
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
