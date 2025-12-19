import React from "react";
import { WikiContributor } from "../../types";
import "../Css/PageContributor.css";

interface PageContributorProps {
  pageId: string;
  contributors?: WikiContributor[];
  className?: string;
  showHistoryLink?: boolean;
  historyPath?: string;
}

export const PageContributor: React.FC<PageContributorProps> = ({
  pageId,
  contributors = [],
  className = "",
  showHistoryLink = true,
}) => {
  // Get the most recent contributor (last editor)
  const lastEditor =
    contributors.length > 0
      ? contributors.reduce((latest, contributor) => {
          const contributorDate = new Date(contributor.last_contributed_at);
          const latestDate = new Date(latest.last_contributed_at);
          return contributorDate > latestDate ? contributor : latest;
        })
      : null;

  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Don't render if no contributors
  if (!lastEditor) {
    return null;
  }

  return (
    <footer className={`contributor-footer ${className}`}>
      <div className="contributor-info">
        <img
          src={
            lastEditor.user_profiles?.avatar_url || "/placeholder-avatar.jpg"
          }
          alt={`${
            lastEditor.user_profiles?.display_name ||
            lastEditor.user_profiles?.username ||
            "Unknown User"
          }'s avatar`}
          className="contributor-avatar"
        />
        <span>
          Last edited by{" "}
          <a
            href={`/profile/${lastEditor.user_profile_id}`}
            className="contributor-link"
          >
            {lastEditor.user_profiles?.display_name ||
              lastEditor.user_profiles?.username ||
              "Unknown User"}
          </a>{" "}
          on {formatDate(lastEditor.last_contributed_at)}
        </span>
      </div>

      {showHistoryLink && (
        <a
          href={`/page-history/${encodeURIComponent(pageId)}`}
          className="page-history-link"
        >
          View Edit History
        </a>
      )}
    </footer>
  );
};

export default PageContributor;
