import { z } from "zod";

/**
 * Contact form validation schema with enhanced email validation
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'\u00C0-\u017F-]+$/, "Name contains invalid characters"),

  email: z
    .string()
    .trim()
    .email({
      message: "Please enter a valid email address",
      // Use Unicode regex for international email support
      // This is more permissive than the default Gmail rules
      // and better for global audiences
      pattern: z.regexes.unicodeEmail,
    })
    .toLowerCase()
    // Additional length check as defense-in-depth
    .max(254, "Email address is too long"),

  question: z
    .string()
    .trim()
    .min(10, "Question must be at least 10 characters")
    .max(1000, "Question must be less than 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
