import React from "react";

interface ErrorMessageProps {
  failureDetails: Error | null;
  retryAction?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  failureDetails,
  retryAction,
}) => {
  if (!failureDetails) return null;

  return (
    <div className="error-message">
      <p className="error-text">{failureDetails.message}</p>
      {retryAction && (
        <button onClick={retryAction} className="btn btn-retry">
          Try Again
        </button>
      )}
    </div>
  );
};
