import React, { useState, useCallback } from "react";
import DOMPurify from "dompurify";
import { EditModeContext } from "./editMode";

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggle = useCallback(() => setIsEditing((v) => !v), []);

  const saveAll = useCallback(async () => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".section-content")
    );
    const payload = els.map((el, idx) => ({
      key: el.dataset.contentKey ?? `${window.location.pathname}#${idx}`,
      html: DOMPurify.sanitize(el.innerHTML, { USE_PROFILES: { html: true } }),
    }));
    await fetch("/api/sections/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }, []);

  return (
    <EditModeContext.Provider value={{ isEditing, toggle, saveAll }}>
      {children}
    </EditModeContext.Provider>
  );
};
