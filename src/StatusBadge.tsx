import type { SubmissionStatus } from "./types";

const config: Record<SubmissionStatus, { label: string; classes: string }> = {
  idle: { label: "", classes: "" },
  pending: { label: "Pending…", classes: "bg-yellow-100 text-yellow-800" },
  retrying: { label: "Retrying…", classes: "bg-orange-100 text-orange-800" },
  success: { label: "Success", classes: "bg-green-100 text-green-800" },
  failed: { label: "Failed", classes: "bg-red-100 text-red-800" },
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
    <span
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${classes}`}
    >
      {label} {status === "retrying" && `(attempt ${attempt}/3)`}
    </span>
  );
}
