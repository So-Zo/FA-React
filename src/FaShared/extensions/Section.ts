import { Node } from "@tiptap/core";

/**
 * Section Extension for TipTap/Prosemirror
 *
 * Renders as semantic <section> HTML with an optional id attribute.
 * Used to group related content (heading + paragraphs) with a stable anchor for quicklinks.
 *
 * Structure:
 * {
 *   "type": "section",
 *   "attrs": { "id": "the-basics" },
 *   "content": [ heading, paragraphs, etc. ]
 * }
 *
 * Renders as:
 * <section id="the-basics">
 *   <h2>The Basics</h2>
 *   <p>Content...</p>
 * </section>
 */

const Section = Node.create({
  name: "section",

  group: "block",

  // Sections can contain one or more blocks (headings, paragraphs, lists, etc.)
  content: "block+",

  // Sections are rendered as standalone blocks, not inline
  // They can appear at the top level of the document or nested
  allowGapCursor: false,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("id"),
        renderHTML: (attributes) => {
          // Only render the id attribute if it exists
          if (!attributes.id) return {};
          return { id: attributes.id };
        },
      },
      // Optional: add class attribute for styling flexibility
      class: {
        default: null,
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          if (!attributes.class) return {};
          return { class: attributes.class };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "section",
        preserveWhitespace: "full", // Preserve formatting inside sections
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["section", HTMLAttributes, 0]; // 0 = render content here
  },
});

export default Section;
