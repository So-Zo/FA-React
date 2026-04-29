import React from "react";

interface ContentSectionProps {
  id?: string;
  className?: string;
  actionButtons?: React.ReactNode;
  children: React.ReactNode;
  pageEditable?: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  id,
  className = "",
  actionButtons,
  children,
  pageEditable = false,
}) => {
  const sectionClassName = ["section-content", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      className={sectionClassName}
      data-page-editable={pageEditable ? "true" : undefined}
    >
      {actionButtons}
      <div className="section-body">{children}</div>
    </section>
  );
};

export default ContentSection;
