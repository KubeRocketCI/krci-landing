export const HONEYPOT_FIELD = "extra_info";
export const STARTED_AT_FIELD = "startedAt";
export const SUBMITTED_AT_FIELD = "submittedAt";
export const MIN_FILL_MS = 3000;
export const RATE_WINDOW_MS = 10 * 60 * 1000;
export const RATE_LIMIT = 5;

const MAX_TRACKED_KEYS = 1000;

// Submission timestamps per client key. Lives as long as the function instance, so it is a soft limit.
const submissions = new Map<string, number[]>();
let lastSweep = 0;

function toTime(value: FormDataEntryValue | null): number {
  return typeof value === "string" && value !== "" ? Number(value) : Number.NaN;
}

// Both stamps come from the visitor's clock, so clock skew against the server does not matter.
export function isFilledTooFast(
  startedAt: FormDataEntryValue | null,
  submittedAt: FormDataEntryValue | null,
): boolean {
  const elapsed = toTime(submittedAt) - toTime(startedAt);
  return !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS;
}

export function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (submissions.get(key) ?? []).filter(
    (at) => now - at < RATE_WINDOW_MS,
  );
  const limited = recent.length >= RATE_LIMIT;
  if (!limited) recent.push(now);
  submissions.set(key, recent);

  if (
    submissions.size > MAX_TRACKED_KEYS &&
    now - lastSweep >= RATE_WINDOW_MS
  ) {
    lastSweep = now;
    for (const [tracked, times] of submissions) {
      if (!times.some((at) => now - at < RATE_WINDOW_MS)) {
        submissions.delete(tracked);
      }
    }
  }
  return limited;
}
