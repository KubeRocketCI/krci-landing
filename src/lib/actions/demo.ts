"use server";

import { formatInTimeZone } from "date-fns-tz";
import DemoNotificationEmail from "@/../emails/demo-notification";
import { enforceRateLimit, guardSubmission } from "@/lib/actions/guard";
import { GENERIC_ERROR, sendNotification } from "@/lib/actions/notify";
import {
  type FormState,
  readField,
  validationRejection,
} from "@/lib/form-errors";
import { BUSINESS_TIMEZONE, demoFormSchema } from "@/lib/validations/demo";

export async function sendDemoRequest(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const blocked = await guardSubmission(formData);
    if (blocked) return blocked;

    const validation = demoFormSchema.safeParse({
      email: readField(formData, "email"),
      datetime: readField(formData, "datetime"),
    });
    if (!validation.success) {
      return validationRejection(validation.error.issues);
    }
    const { email, datetime } = validation.data;
    const requestedDate = new Date(datetime);

    const limited = await enforceRateLimit();
    if (limited) return limited;

    return await sendNotification({
      to: process.env.DEMO_EMAIL || process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Demo Request from ${email}`,
      react: DemoNotificationEmail({
        email,
        datetime: formatInTimeZone(
          requestedDate,
          BUSINESS_TIMEZONE,
          "PPPP 'at' HH:mm (zzz)",
        ),
        datetimeISO: requestedDate.toISOString(),
      }),
    });
  } catch (error) {
    console.error("Demo form error:", error);
    return { error: GENERIC_ERROR };
  }
}
