import React from "react";

interface WikiContentStateProps {
  variant: "loading" | "error" | "placeholder";
  title: string;
  children: React.ReactNode;
}

const WikiContentState: React.FC<WikiContentStateProps> = ({
  variant,
  title,
  children,
}) => {
  return (
    <div className={`section-content ${variant}`}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default WikiContentState;

// this doesn't feel like this deserves to be alone either, if so, explain why?