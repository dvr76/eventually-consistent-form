export type SubmissionStatus =
  | "idle"
  | "pending"
  | "retrying"
  | "success"
  | "failed";

export interface Submission {
  id: string;
  email: string;
  amount: number;
  status: SubmissionStatus;
  attempt: number;
}
