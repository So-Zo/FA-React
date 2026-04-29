import { useEffect, useImperativeHandle, forwardRef, useRef } from "react";
import {
  useEditor,
  EditorContent,
  type Editor as TipTapEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TipTapMobileControls from "./TipTapMobileControls";
import { TipTapContent } from "../../types";

interface WikiEditorProps {
  content?: TipTapContent;
  onUpdate?: (content: TipTapContent, html: string) => void;
  className?: string;
  editable?: boolean;
  onEditorChange?: (editor: TipTapEditor | null) => void;
}

export interface WikiEditorRef {
  getJSON: () => TipTapContent;
  getHTML: () => string;
  setContent: (content: TipTapContent) => void;
}

const WikiEditor = forwardRef<WikiEditorRef, WikiEditorProps>(
  (
    {
      content = "",
      onUpdate,
      className = "",
      editable = false,
      onEditorChange,
    },
    ref,
  ) => {
    const onUpdateRef = useRef(onUpdate);
    const onEditorChangeRef = useRef(onEditorChange);
    const resolvedEditable = editable;

    // Keep refs in sync
    useEffect(() => {
      onUpdateRef.current = onUpdate;
      onEditorChangeRef.current = onEditorChange;
    }, [onEditorChange, onUpdate]);

    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3, 4],
          },
        }),
        Link.configure({
          openOnClick: !resolvedEditable,
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
      content: content,
      editable: resolvedEditable,
      onUpdate: ({ editor }) => {
        const currentOnUpdate = onUpdateRef.current;

        if (currentOnUpdate) {
          currentOnUpdate(editor.getJSON(), editor.getHTML());
        }
      },
      editorProps: {
        attributes: {
          class: `wiki-editor ${className} ${
            resolvedEditable ? "editing" : "viewing"
          }`,
          spellcheck: "true",
        },
      },
    });

    // Update content when prop changes (e.g., loading from DB)
    useEffect(() => {
      if (editor && content !== undefined) {
        const currentContent = JSON.stringify(editor.getJSON());
        const newContent =
          typeof content === "string" ? content : JSON.stringify(content);

        if (currentContent !== newContent) {
          editor.commands.setContent(content);
        }
      }
    }, [editor, content]);

    // Update editability when edit mode changes
    useEffect(() => {
      if (editor) {
        console.log("🔧 WikiEditor: Setting editable", {
          isEditing: resolvedEditable,
          editorBefore: editor.isEditable,
        });
        editor.setEditable(resolvedEditable);
        console.log("🔧 WikiEditor: Editable set", {
          editorAfter: editor.isEditable,
        });
      }
    }, [resolvedEditable, editor]);

    // Let the page-level owner decide what to do with the editor instance.
    useEffect(() => {
      onEditorChangeRef.current?.(editor ?? null);

      return () => {
        onEditorChangeRef.current?.(null);
      };
    }, [editor]);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      getJSON: () => editor?.getJSON() || { type: "doc", content: [] },
      getHTML: () => editor?.getHTML() || "",
      setContent: (newContent: TipTapContent) => {
        editor?.commands.setContent(newContent);
      },
    }));

    if (!editor) {
      return <div>Loading editor...</div>;
    }

    return (
      <div
        className={`wiki-editor-container ${
          resolvedEditable ? "edit-mode" : "view-mode"
        }`}
      >
        <EditorContent editor={editor} />
        <TipTapMobileControls />
      </div>
    );
  },
);

WikiEditor.displayName = "WikiEditor";

export default WikiEditor;
