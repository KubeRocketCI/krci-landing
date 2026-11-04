import { checkBotId } from "botid/server";
import { headers } from "next/headers";
import type { FormState } from "@/lib/form-errors";
import {
  HONEYPOT_FIELD,
  isFilledTooFast,
  isRateLimited,
  STARTED_AT_FIELD,
  SUBMITTED_AT_FIELD,
} from "@/lib/spam-guard";

export const SECURITY_ERROR = "Security check failed. Please try again.";
export const RATE_LIMIT_ERROR =
  "Too many requests from your network. Please try again later.";

type Rejection = Exclude<FormState, undefined>;

// Cheap checks first, then BotID. Resolves to null when the submission may proceed.
export async function guardSubmission(
  formData: FormData,
): Promise<Rejection | null> {
  if (formData.get(HONEYPOT_FIELD)) {
    console.log("Honeypot field filled");
    return { error: SECURITY_ERROR };
  }
  if (
    isFilledTooFast(
      formData.get(STARTED_AT_FIELD),
      formData.get(SUBMITTED_AT_FIELD),
    )
  ) {
    return { error: SECURITY_ERROR };
  }
  const check = await checkBotId();
  if (check.isBot) {
    console.log("Bot detected:", check);
    return { error: SECURITY_ERROR };
  }
  return null;
}

// Counts submissions that are about to send an email, per client address as Vercel reports it.
export async function enforceRateLimit(): Promise<Rejection | null> {
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-real-ip") ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (!ip) return null;
  return isRateLimited(ip) ? { error: RATE_LIMIT_ERROR } : null;
}
