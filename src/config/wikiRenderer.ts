export const WIKI_RENDERER_VERSION = "v1";

// Bump when TipTap extension list or render options change in a way that can alter HTML output.
export const WIKI_RENDERER_SIG = "tiptap-v3-starterkit-link-image-v1";

export const hashTipTapContent = (content: unknown): string => {
  const input = JSON.stringify(content ?? {});
  let hash = 2166136261;

  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash +=
      (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }

  return (hash >>> 0).toString(16).padStart(8, "0");
};
