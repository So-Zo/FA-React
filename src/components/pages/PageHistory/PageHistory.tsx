import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WikiContributor } from "../../../types";
import { dataService } from "../../../services/dataService";
import "../../PageUIs/LoadingAndError.css";
import "./PageHistory.css";

const PageHistory: React.FC = () => {
  const { fullPath } = useParams<{ fullPath: string }>();
  const [contributors, setContributors] = useState<WikiContributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState<string>("");

  // Decode the full path from URL params
  const decodedPath = fullPath ? decodeURIComponent(fullPath) : "";

  useEffect(() => {
    const fetchPageHistory = async () => {
      if (!decodedPath) {
        setError("No page specified");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Get page info and contributors in one optimized call
        const result = await dataService.getPageWithContributors(decodedPath);

        setContributors(result.contributors || []);

        // Use the actual page title from the database, or fallback to path-based title
        const pathSegments = decodedPath.split("/").filter(Boolean);
        const title =
          result.page?.page_title ||
          (pathSegments.length > 0
            ? pathSegments.join(" > ").replace(/-/g, " ")
            : "Home");
        setPageTitle(title);
      } catch (err) {
        console.error("Failed to fetch page history:", err);
        setError("Failed to load page history");
      } finally {
        setLoading(false);
      }
    };

    fetchPageHistory();
  }, [decodedPath]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading page history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="page-history-container">
      <header className="page-history-header">
        <h1>Edit History</h1>
        <h2>{pageTitle}</h2>
        <p className="page-path">{decodedPath}</p>
      </header>

      <main className="page-history-content">
        {contributors.length === 0 ? (
          <div className="no-contributors">
            <p>No edit history found for this page.</p>
          </div>
        ) : (
          <div className="contributors-list">
            <h3>Contributors ({contributors.length})</h3>
            <div className="contributors-grid">
              {contributors.map((contributor) => (
                <div key={contributor.id} className="contributor-card">
                  <div className="contributor-avatar">
                    <img
                      src={
                        contributor.user_profiles?.avatar_url ||
                        "/placeholder-avatar.jpg"
                      }
                      alt={`${
                        contributor.user_profiles?.display_name ||
                        contributor.user_profiles?.username ||
                        "Unknown User"
                      }'s avatar`}
                    />
                  </div>
                  <div className="contributor-details">
                    <h4>
                      <a
                        href={`/profile/${contributor.user_profile_id}`}
                        className="contributor-name-link"
                      >
                        {contributor.user_profiles?.display_name ||
                          contributor.user_profiles?.username ||
                          "Unknown User"}
                      </a>
                    </h4>
                    <div className="contribution-stats">
                      <p className="contribution-count">
                        {contributor.contribution_count}{" "}
                        {contributor.contribution_count === 1
                          ? "edit"
                          : "edits"}
                      </p>
                      <p className="first-contributed">
                        First edit:{" "}
                        {formatDate(contributor.first_contributed_at)}
                      </p>
                      <p className="last-contributed">
                        Latest edit:{" "}
                        {formatDate(contributor.last_contributed_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="page-history-footer">
        <button onClick={() => window.history.back()} className="back-button">
          ← Back to Page
        </button>
      </footer>
    </div>
  );
};

export default PageHistory;
