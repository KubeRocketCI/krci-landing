"use server";

import { checkBotId } from "botid/server";
import { formatInTimeZone } from "date-fns-tz";
import { Resend } from "resend";
import DemoNotificationEmail from "@/../emails/demo-notification";
import { demoFormSchema } from "@/lib/validations/demo";

const resend = new Resend(process.env.RESEND_API_KEY);
const BUSINESS_TIMEZONE = "Europe/Kyiv"; // Eastern European Time (EET/EEST, UTC+2/+3)

type State = { error: string } | { data: string } | undefined;

export async function sendDemoRequest(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  try {
    // 1. Validate environment variables
    const demoEmail = process.env.DEMO_EMAIL || process.env.CONTACT_EMAIL;
    if (!demoEmail) {
      console.error("DEMO_EMAIL environment variable not set");
      return {
        error: "Demo service is not configured. Please contact support.",
      };
    }

    // 2. Bot protection with BotID
    const checkResult = await checkBotId();
    if (checkResult.isBot) {
      console.log("Bot detected:", checkResult);
      return { error: "Security check failed. Please try again." };
    }

    // 3. Extract form data
    const rawData = {
      email: formData.get("email") as string,
      datetime: formData.get("datetime") as string,
    };

    console.log("Demo form data received:", rawData);

    // 4. Validate with Zod
    const validation = demoFormSchema.safeParse(rawData);
    if (!validation.success) {
      console.error("Validation errors:", validation.error.issues);
      const firstError = validation.error.issues[0];
      return {
        error: firstError?.message || "Please check your form fields.",
      };
    }

    const { email, datetime } = validation.data;
    const requestedDate = new Date(datetime);

    // 5. Format date for email in business timezone
    const businessTime = formatInTimeZone(
      requestedDate,
      BUSINESS_TIMEZONE,
      "PPPP 'at' HH:mm (zzz)",
    );

    // 6. Send email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to: [demoEmail],
      replyTo: email,
      subject: `Demo Request from ${email}`,
      react: DemoNotificationEmail({
        email,
        datetime: businessTime,
        datetimeISO: datetime,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return { error: "Failed to schedule demo. Please try again." };
    }

    console.log("Demo request email sent successfully:", data);
    return {
      data: "Demo scheduled! We'll send you a confirmation email shortly.",
    };
  } catch (error) {
    console.error("Demo form error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
