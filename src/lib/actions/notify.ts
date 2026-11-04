import type { ReactNode } from "react";
import { Resend } from "resend";
import type { FormState } from "@/lib/form-errors";

export const GENERIC_ERROR =
  "Something went wrong on our side. Please try again.";

const resend =
  process.env.RESEND_API_KEY && new Resend(process.env.RESEND_API_KEY);

interface Notification {
  to: string | undefined;
  replyTo: string;
  subject: string;
  react: ReactNode;
}

// Sends one notification to the team and answers the form; configuration gaps stay in the log.
export async function sendNotification({
  to,
  replyTo,
  subject,
  react,
}: Notification): Promise<FormState> {
  if (!resend || !to) {
    console.error(
      "Notification not configured: RESEND_API_KEY or the recipient is missing",
    );
    return { error: GENERIC_ERROR };
  }

  const { data, error } = await resend.emails.send({
    from: process.env.FROM_EMAIL || "onboarding@resend.dev",
    to: [to],
    replyTo,
    subject,
    react,
  });

  if (error) {
    console.error("Resend error:", error);
    return { error: GENERIC_ERROR };
  }

  console.log("Email sent successfully:", data);
  return { success: true };
}
