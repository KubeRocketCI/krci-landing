import { z } from "zod";
import { emailSchema } from "./email";

// Letters, digits and the punctuation people type in a name; no line breaks.
const NAME_PATTERN = /^[\p{L}\p{M}\p{N} '\u2019.,()&/-]+$/u;
// Lower-case identifiers set by the page that opened the form, such as a pricing tier.
const IDENTIFIER_PATTERN = /^[a-z0-9_-]*$/;

const identifier = z
  .string()
  .trim()
  .max(40)
  .regex(IDENTIFIER_PATTERN)
  .optional();

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .transform((value) => value.replace(/\s+/g, " "))
    .pipe(
      z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters")
        .regex(NAME_PATTERN, "Name contains invalid characters"),
    ),

  email: emailSchema,

  question: z
    .string()
    .trim()
    .min(10, "Question must be at least 10 characters")
    .max(1000, "Question must be less than 1000 characters"),

  plan: identifier,
  location: identifier,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
