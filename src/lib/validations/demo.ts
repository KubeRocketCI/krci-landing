import { toZonedTime } from "date-fns-tz";
import { z } from "zod";

const BUSINESS_TIMEZONE = "Europe/Kyiv"; // Eastern European Time (EET/EEST, UTC+2/+3)
const BUSINESS_HOURS = { start: 10, end: 18 };

/**
 * Demo request validation schema
 * Business hours: Mon-Fri, 10:00-18:00 EET/EEST
 */
export const demoFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .toLowerCase()
    .max(254, "Email address is too long"),

  datetime: z
    .string()
    .refine((val) => {
      try {
        const date = new Date(val);
        return !Number.isNaN(date.getTime());
      } catch {
        return false;
      }
    }, "Invalid date format")
    .refine((val) => {
      // Convert UTC to business timezone and check if it's a weekday
      const date = new Date(val);
      const businessDate = toZonedTime(date, BUSINESS_TIMEZONE);
      const dayOfWeek = businessDate.getDay();
      // 1 = Monday, 5 = Friday
      return dayOfWeek >= 1 && dayOfWeek <= 5;
    }, "Demos are only available Monday through Friday")
    .refine((val) => {
      // Convert UTC to business timezone and check business hours
      const date = new Date(val);
      const businessDate = toZonedTime(date, BUSINESS_TIMEZONE);
      const hour = businessDate.getHours();
      return hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end;
    }, "Demos are only available during business hours"),
});

export type DemoFormData = z.infer<typeof demoFormSchema>;
