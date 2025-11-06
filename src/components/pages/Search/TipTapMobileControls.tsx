import React, { useState, useRef, useEffect } from "react";
import {
  FaBold,
  FaItalic,
  FaList,
  FaLink,
  FaImage,
  FaEdit,
  FaTimes,
} from "react-icons/fa";
import { useEditMode } from "../../../edit/editMode";
import { useTipTapEditor } from "./TipTapContext";

const TipTapMobileControls: React.FC = () => {
  const { isEditing } = useEditMode();
  const { editor } = useTipTapEditor();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Drag functionality state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initialize position on mount - ALWAYS call this hook
  useEffect(() => {
    const updatePosition = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      setPosition({
        x: viewportWidth - 80, // 2rem + button width margin
        y: viewportHeight - 120, // Account for bottom navigation
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    // Keep button within viewport bounds
    const maxX = window.innerWidth - 56; // Button width
    const maxY = window.innerHeight - 56; // Button height

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.x;
    const newY = touch.clientY - dragStart.y;

    const maxX = window.innerWidth - 56;
    const maxY = window.innerHeight - 56;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  // Add/remove global mouse and touch listeners for dragging - ALWAYS call this hook
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  // Lock body scroll when modal is open - ALWAYS call this hook
  useEffect(() => {
    if (isModalOpen) {
      // Store original overflow to restore later
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        // Restore original overflow when modal closes
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isModalOpen]);

  // Early return AFTER all hooks have been called
  if (!isEditing || !editor) {
    return null; // Don't render when not in edit mode or no editor
  }

  const handleBold = () => {
    editor.chain().focus().toggleBold().run();
    setIsModalOpen(false); // Close modal after action
  };

  const handleItalic = () => {
    editor.chain().focus().toggleItalic().run();
    setIsModalOpen(false); // Close modal after action
  };

  const handleH2 = () => {
    editor.chain().focus().toggleHeading({ level: 2 }).run();
    setIsModalOpen(false); // Close modal after action
  };

  const handleH3 = () => {
    editor.chain().focus().toggleHeading({ level: 3 }).run();
    setIsModalOpen(false); // Close modal after action
  };

  const handleBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
    setIsModalOpen(false); // Close modal after action
  };

  const handleLink = () => {
    const url = prompt("Enter link URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
    setIsModalOpen(false); // Close modal after action (whether link added or cancelled)
  };

  const handleImage = () => {
    const url = prompt("Enter image URL (or upload to wiki-media bucket):");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
    setIsModalOpen(false); // Close modal after action (whether image added or cancelled)
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        ref={buttonRef}
        className={`tiptap-mobile-fab ${isDragging ? "dragging" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          right: "auto",
          bottom: "auto",
        }}
        onClick={toggleModal}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        aria-label="Show formatting options"
      >
        <FaEdit />
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <>
          <div className="tiptap-mobile-overlay" onClick={toggleModal} />
          <div className="tiptap-mobile-modal">
            {/* Header */}
            <div className="tiptap-mobile-header">
              <h3>Formatting</h3>
              <button
                className="tiptap-mobile-close"
                onClick={toggleModal}
                aria-label="Close formatting options"
              >
                <FaTimes />
              </button>
            </div>

            {/* Controls Grid */}
            <div className="tiptap-mobile-controls">
              {/* Text Formatting */}
              <div className="tiptap-mobile-section">
                <h4>Text</h4>
                <div className="tiptap-mobile-buttons">
                  <button
                    className={`tiptap-mobile-btn ${
                      editor.isActive("bold") ? "is-active" : ""
                    }`}
                    onClick={handleBold}
                    type="button"
                  >
                    <FaBold />
                    <span>Bold</span>
                  </button>
                  <button
                    className={`tiptap-mobile-btn ${
                      editor.isActive("italic") ? "is-active" : ""
                    }`}
                    onClick={handleItalic}
                    type="button"
                  >
                    <FaItalic />
                    <span>Italic</span>
                  </button>
                </div>
              </div>

              {/* Headings */}
              <div className="tiptap-mobile-section">
                <h4>Headings</h4>
                <div className="tiptap-mobile-buttons">
                  <button
                    className={`tiptap-mobile-btn ${
                      editor.isActive("heading", { level: 2 })
                        ? "is-active"
                        : ""
                    }`}
                    onClick={handleH2}
                    type="button"
                  >
                    <span className="heading-text">H2</span>
                    <span>Heading 2</span>
                  </button>
                  <button
                    className={`tiptap-mobile-btn ${
                      editor.isActive("heading", { level: 3 })
                        ? "is-active"
                        : ""
                    }`}
                    onClick={handleH3}
                    type="button"
                  >
                    <span className="heading-text">H3</span>
                    <span>Heading 3</span>
                  </button>
                </div>
              </div>

              {/* Lists */}
              <div className="tiptap-mobile-section">
                <h4>Lists</h4>
                <div className="tiptap-mobile-buttons">
                  <button
                    className={`tiptap-mobile-btn ${
                      editor.isActive("bulletList") ? "is-active" : ""
                    }`}
                    onClick={handleBulletList}
                    type="button"
                  >
                    <FaList />
                    <span>Bullet List</span>
                  </button>
                </div>
              </div>

              {/* Insert */}
              <div className="tiptap-mobile-section">
                <h4>Insert</h4>
                <div className="tiptap-mobile-buttons">
                  <button
                    className={`tiptap-mobile-btn ${
                      editor.isActive("link") ? "is-active" : ""
                    }`}
                    onClick={handleLink}
                    type="button"
                  >
                    <FaLink />
                    <span>Link</span>
                  </button>
                  <button
                    className="tiptap-mobile-btn"
                    onClick={handleImage}
                    type="button"
                  >
                    <FaImage />
                    <span>Image</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TipTapMobileControls;
