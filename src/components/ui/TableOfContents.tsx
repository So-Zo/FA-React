import React from 'react';
import { Link } from 'react-router-dom';
import './TableOfContents.css';

// Define types for TOC links
interface TocQuickLink {
  label: string;
  anchor: string;
}

interface TocDeepLink {
  label: string;
  path: string;
  exists?: boolean; // Optional flag to indicate if the page exists
}

interface TocSectionProps {
  title: string;
  quickLinks: TocQuickLink[];
  deepLinks: TocDeepLink[];
}

// TOC Section component
const TocSection: React.FC<TocSectionProps> = ({ title, quickLinks, deepLinks }) => {
  return (
    <div className="toc-section">
      <div className="toc-header">
        {title}
      </div>
      <div className="toc-content">
        <ul className="toc-list">
          {/* Quick links (same page) */}
          {quickLinks.map((link, index) => (
            <li key={`quick-${index}`}>
              <a href={link.anchor} className="toc-quick-link">{link.label}</a>
            </li>
          ))}

          {/* Add divider if both types of links exist */}
          {quickLinks.length > 0 && deepLinks.length > 0 && (
            <li className="toc-divider"></li>
          )}

          {/* Deep links (different pages) */}
          {deepLinks.map((link, index) => (
            <li key={`deep-${index}`}>
              {link.exists === false ? (
                <a href="#" className="non-existent-link" data-page-path={link.path}>{link.label}</a>
              ) : (
                <Link to={link.path} className="default-links">{link.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Main TableOfContents component
interface TableOfContentsProps {
  sections: TocSectionProps[];
  title?: string; // Optional title prop with default value
  description?: string; // Optional description prop with default value
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  title = "Encyclopedia",
  description = "Use this table of contents to navigate to different sections."
}) => {
  return (
    <section id="table-of-contents" className="section-content">
      <div className="container">
        <h2>{title}</h2>
        <p>{description}</p>
        <p><small>✓ = Same page links | → = Page links | + = Pages to create</small></p>

        <div className="toc-container">
          {sections.map((section, index) => (
            <TocSection
              key={index}
              title={section.title}
              quickLinks={section.quickLinks}
              deepLinks={section.deepLinks}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TableOfContents;
export type { TocQuickLink, TocDeepLink, TocSectionProps };
