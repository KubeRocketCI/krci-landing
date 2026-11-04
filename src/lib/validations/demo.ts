import { toZonedTime } from "date-fns-tz";
import { z } from "zod";
import { emailSchema } from "./email";

export const BUSINESS_TIMEZONE = "Europe/Kyiv"; // EET/EEST, UTC+2/+3
export const BUSINESS_HOURS = { start: 10, end: 18 };

// What Date.prototype.toISOString() produces; nothing else reaches the email.
const ISO_UTC_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;

export function isBusinessDay(date: Date) {
  const day = toZonedTime(date, BUSINESS_TIMEZONE).getDay();
  return day >= 1 && day <= 5;
}

export function isBusinessHour(date: Date) {
  const hour = toZonedTime(date, BUSINESS_TIMEZONE).getHours();
  return hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end;
}

export function isBusinessTime(date: Date) {
  return isBusinessDay(date) && isBusinessHour(date);
}

/**
 * Demo request validation schema
 * Business hours: Mon-Fri, 10:00-18:00 EET/EEST
 */
export const demoFormSchema = z.object({
  email: emailSchema,

  datetime: z
    .string()
    .regex(ISO_UTC_PATTERN, "Invalid date format")
    .refine(
      (val) => !Number.isNaN(new Date(val).getTime()),
      "Invalid date format",
    )
    .refine(
      (val) => new Date(val).getTime() > Date.now(),
      "Please choose a time in the future",
    )
    .refine(
      (val) => isBusinessDay(new Date(val)),
      "Demos are only available Monday through Friday",
    )
    .refine(
      (val) => isBusinessHour(new Date(val)),
      "Demos are only available during business hours",
    ),
});

export type DemoFormData = z.infer<typeof demoFormSchema>;
