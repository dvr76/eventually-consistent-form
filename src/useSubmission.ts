import { useState, useRef, useCallback } from "react";
import { mockApi } from "./mockApi";
import type { Submission, SubmissionStatus } from "./types";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

export function useSubmission() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const inflightEmails = useRef(new Set<string>());

  const updateStatus = (
    id: string,
    status: SubmissionStatus,
    attempt?: number,
  ) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status, attempt: attempt ?? s.attempt } : s,
      ),
    );
  };

  const submit = useCallback(async (email: string, amount: number) => {
    // duplicate check
    if (inflightEmails.current.has(email)) return;
    inflightEmails.current.add(email);

    const id = crypto.randomUUID();

    // optimistic  pending
    setSubmissions((prev) => [
      { id, email, amount, status: "pending", attempt: 1 },
      ...prev,
    ]);

    // retry loop
    let attempt = 1;
    while (attempt <= MAX_RETRIES) {
      try {
        await mockApi(email, amount);
        updateStatus(id, "success", attempt);
        inflightEmails.current.delete(email);
        return; // done
      } catch {
        if (attempt < MAX_RETRIES) {
          updateStatus(id, "retrying", attempt + 1);
          await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
        }
        attempt++;
      }
    }

    // failed after retries
    updateStatus(id, "failed", MAX_RETRIES);
    inflightEmails.current.delete(email);
  }, []);

  return { submissions, submit };
}
