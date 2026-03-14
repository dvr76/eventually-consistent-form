import type { SubmissionStatus } from "./types";

const config: Record<SubmissionStatus, { label: string; classes: string }> = {
  idle: { label: "", classes: "" },
  pending: { label: "Pending…", classes: "text-yellow-800" },
  retrying: { label: "Retrying…", classes: "text-orange-800" },
  success: { label: "Success", classes: "text-green-800" },
  failed: { label: "Failed", classes: "text-red-800" },
};

export function StatusBadge({
  status,
  attempt,
}: {
  status: SubmissionStatus;
  attempt: number;
}) {
  const { label, classes } = config[status];
  return (
    <span className={`inline-block text-xs font-medium ${classes}`}>
      {label} {status === "retrying" && `(attempt ${attempt}/3)`}
    </span>
  );
}
