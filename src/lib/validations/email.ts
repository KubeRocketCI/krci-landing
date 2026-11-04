import { z } from "zod";

// Strict by design: ASCII local part and a dotted domain, the form Resend accepts as reply-to.
export const emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address")
  .toLowerCase()
  .max(254, "Email address is too long");
