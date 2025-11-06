import { useEffect, useImperativeHandle, forwardRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useEditMode } from "../../../edit/editMode";
import { useTipTapEditor } from "./TipTapContext";
import TipTapMobileControls from "./TipTapMobileControls";
import "./TipTapMobileControls.css";

interface WikiEditorProps {
  content?: string; // Initial HTML content from your existing sections
  onUpdate?: (content: any) => void; // Callback when content changes
  className?: string;
}

export interface WikiEditorRef {
  getJSON: () => any;
  getHTML: () => string;
  setContent: (content: string) => void;
}

const WikiEditor = forwardRef<WikiEditorRef, WikiEditorProps>(
  ({ content = "", onUpdate, className = "" }, ref) => {
    const { isEditing } = useEditMode();
    const { setEditor } = useTipTapEditor();

    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          // Keep it minimal - just the essentials
          heading: {
            levels: [1, 2, 3, 4], // h1-h4
          },
        }),
        Link.configure({
          openOnClick: !isEditing, // Only open links when not editing
          HTMLAttributes: {
            class: "wiki-link",
          },
        }),
        Image.configure({
          HTMLAttributes: {
            class: "wiki-image",
          },
        }),
      ],
      content: content, // Start with existing HTML content
      editable: isEditing,
      onUpdate: ({ editor }) => {
        if (onUpdate) {
          onUpdate(editor.getJSON());
        }
      },
      editorProps: {
        attributes: {
          class: `wiki-editor ${className} ${
            isEditing ? "editing" : "viewing"
          }`,
          spellcheck: "true",
        },
      },
    });

    // Update editability when edit mode changes
    useEffect(() => {
      if (editor) {
        editor.setEditable(isEditing);
      }
    }, [isEditing, editor]);

    // Register editor with TipTap context for external toolbar
    useEffect(() => {
      if (editor) {
        setEditor(editor);
      }
      return () => {
        setEditor(null);
      };
    }, [editor, setEditor]);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      getJSON: () => editor?.getJSON() || null,
      getHTML: () => editor?.getHTML() || "",
      setContent: (newContent: string) => {
        editor?.commands.setContent(newContent);
      },
    }));

    if (!editor) {
      return <div>Loading editor...</div>;
    }

    return (
      <div
        className={`wiki-editor-container ${
          isEditing ? "edit-mode" : "view-mode"
        }`}
      >
        <EditorContent editor={editor} />
        <TipTapMobileControls />
      </div>
    );
  }
);

WikiEditor.displayName = "WikiEditor";

export default WikiEditor;
