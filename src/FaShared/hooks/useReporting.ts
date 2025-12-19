import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { CreateReportRequest, Report } from "../../types";

type ReportResult = {
  success: boolean;
  isDuplicate: boolean;
  data?: Report;
  error?: string;
};

export const useReporting = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReport = async (
    reportData: CreateReportRequest
  ): Promise<ReportResult> => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Get current user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("You must be logged in to submit a report");
      }

      // Check if user has already reported this content
      let query = supabase
        .from("reports")
        .select("id")
        .eq("reporter_id", user.id)
        .eq("status", "pending");

      // Add content-specific filter
      if (reportData.post_id) {
        query = query.eq("post_id", reportData.post_id);
      } else if (reportData.comment_id) {
        query = query.eq("comment_id", reportData.comment_id);
      }

      const { data: existingReport, error: checkError } =
        await query.maybeSingle();

      if (checkError) {
        throw checkError;
      }
      if (existingReport) {
        throw new Error("You have already reported this content");
      }

      // Submit the report
      const reportInsert: any = {
        reporter_id: user.id,
        reported_user_id: reportData.reported_user_id,
        reason: reportData.reason,
        description: reportData.description,
        status: "pending",
      };

      // Add content ID (either post or comment)
      if (reportData.post_id) {
        reportInsert.post_id = reportData.post_id;
      } else if (reportData.comment_id) {
        reportInsert.comment_id = reportData.comment_id;
      }

      const { data: newReport, error: insertError } = await supabase
        .from("reports")
        .insert(reportInsert)
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      return {
        success: true,
        isDuplicate: false,
        data: newReport as Report,
      };
    } catch (err) {
      let errorMessage = "Failed to submit report";

      if (err instanceof Error) {
        // Handle specific error types
        if (
          err.message.includes("duplicate key") ||
          err.message.includes("already exists")
        ) {
          errorMessage = "You have already reported this content";
        } else if (
          err.message.includes("check constraint") &&
          err.message.includes("reason")
        ) {
          errorMessage =
            "Invalid report reason selected. Please try a different reason.";
        } else {
          errorMessage = err.message;
        }
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    submitReport,
    isSubmitting,
    error,
    clearError,
  };
};
