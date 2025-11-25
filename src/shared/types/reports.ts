// Report-related types for content moderation
export interface Report {
  id: string;
  created_at: string;
  resolved_at?: string;

  // Reporter information
  reporter_id: string;
  reported_user_id: string;

  // Content being reported (either post_id OR comment_id, not both)
  post_id?: string;
  comment_id?: string;

  // Report details
  reason: string;
  description?: string;

  // Moderation status
  status: "pending" | "reviewed" | "resolved" | "dismissed";
  moderator_id?: string;
  moderator_notes?: string;
}

export interface CreateReportRequest {
  reported_user_id: string;
  post_id?: string;
  comment_id?: string;
  reason: string;
  description?: string;
}

export interface UpdateReportRequest {
  status: Report["status"];
  moderator_notes?: string;
}

// For the report modal component
export interface ReportSubmission {
  reason: string;
  description?: string;
}
