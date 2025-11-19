import React, { useState, useEffect } from "react";
import "../Css/modals.css";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  postAuthor: string;
  onSubmit: (
    reason: string,
    description?: string
  ) => Promise<{
    success: boolean;
    isDuplicate: boolean;
    error?: string;
  }>;
}

const REPORT_REASONS = [
  { value: "spam", label: "Spam or unwanted content" },
  { value: "harassment", label: "Harassment or bullying" },
  { value: "hate-speech", label: "Hate speech or discrimination" },
  { value: "misinformation", label: "Misinformation" },
  { value: "violence", label: "Violence or dangerous behavior" },
  { value: "sexual-content", label: "Sexual content" },
  { value: "copyright", label: "Intellectual property violation" },
  { value: "other", label: "Other" },
];

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  postId,
  postAuthor,
  onSubmit,
}) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "duplicate" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedReason.trim()) {
      return;
    }

    setIsSubmitting(true);
    setFeedback({ type: null, message: "" });

    try {
      const result = await onSubmit(
        selectedReason,
        description.trim() || undefined
      );

      // Handle the three possible states
      if (result.success) {
        // SUCCESS: New report created
        setFeedback({
          type: "success",
          message:
            "Report submitted successfully. Thank you for helping keep our community safe!",
        });

        // Auto-close after success
        setTimeout(() => {
          setSelectedReason("");
          setDescription("");
          setFeedback({ type: null, message: "" });
          onClose();
        }, 2000);
      } else if (result.isDuplicate) {
        // DUPLICATE: Already reported
        setFeedback({
          type: "duplicate",
          message:
            "You have already reported this content. Thank you for your vigilance!",
        });
      } else {
        // ERROR: Something went wrong
        setFeedback({
          type: "error",
          message: result.error || "Failed to submit report. Please try again.",
        });
      }
    } catch (error) {
      console.error("Failed to submit report:", error);

      let errorMessage = "Failed to submit report. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("already reported")) {
          errorMessage = "You have already reported this content.";
        } else if (error.message.includes("Invalid report reason")) {
          errorMessage =
            "Invalid report reason. Please contact support if this persists.";
        }
      }

      setFeedback({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setSelectedReason("");
      setDescription("");
      setFeedback({ type: null, message: "" });
      onClose();
    }
  };

  return (
    <div className={`modal ${isOpen ? "active" : ""}`} onClick={handleClose}>
      <div
        className="modal-content report-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Report Post</h2>
          <button
            className="modal-close"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <p className="report-description">
            You're reporting a post by <strong>{postAuthor}</strong>. Please
            select a reason for your report:
          </p>
          {/* Debug info - can be removed later */}
          <small className="text-muted">Report ID: {postId}</small>

          {/* Feedback Message */}
          {feedback.type && (
            <div className={`feedback-message ${feedback.type}`}>
              {feedback.type === "success" && "✅ "}
              {feedback.type === "duplicate" && "⚠️ "}
              {feedback.type === "error" && "❌ "}
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="report-reason">Reason for report*</label>
              <select
                id="report-reason"
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                required
                disabled={isSubmitting}
                className="form-select"
              >
                <option value="">Select a reason...</option>
                {REPORT_REASONS.map((reason) => (
                  <option key={reason.value} value={reason.value}>
                    {reason.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="report-description">
                Additional description (optional)
              </label>
              <textarea
                id="report-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide more context about this report..."
                rows={3}
                disabled={isSubmitting}
                maxLength={500}
                className="form-textarea"
              />
              <small className="text-muted">
                {description.length}/500 characters
              </small>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  !selectedReason.trim() ||
                  isSubmitting ||
                  feedback.type === "success"
                }
                className="btn btn-danger"
              >
                {feedback.type === "success"
                  ? "Submitted!"
                  : isSubmitting
                  ? "Submitting..."
                  : "Submit Report"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
