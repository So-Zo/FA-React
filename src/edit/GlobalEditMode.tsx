import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useEditMode } from "./editMode";

export default function GlobalEditMode() {
  const { isEditing } = useEditMode();
  const location = useLocation();

  useEffect(() => {
    const markEdited = (e: Event) => {
      const t = e.currentTarget as HTMLElement;
      t.dataset.edited = "true";
    };

    const apply = () => {
      document
        .querySelectorAll<HTMLElement>(".section-content")
        .forEach((el) => {
          if (isEditing) {
            el.setAttribute("contenteditable", "true");
            el.setAttribute("spellcheck", "true");
            el.addEventListener("input", markEdited);
            el.style.outline = "1px dashed #aaa";
          } else {
            el.removeAttribute("contenteditable");
            el.removeEventListener("input", markEdited);
            el.style.outline = "";
          }
        });
    };

    apply();

    // Watch for DOM changes (route swaps, lazy loads) and re-apply.
    const root = document.getElementById("root") ?? document.body;
    const mo = new MutationObserver(() => apply());
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      document
        .querySelectorAll<HTMLElement>(".section-content")
        .forEach((el) => {
          el.removeEventListener("input", markEdited);
        });
    };
  }, [isEditing, location.pathname]);

 

  return null;
}
