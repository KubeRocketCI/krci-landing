"use server";

import { checkBotId } from "botid/server";
import { Resend } from "resend";
import ContactNotificationEmail from "@/../emails/contact-notification";
import { contactFormSchema } from "@/lib/validations/contact";

const resend =
  process.env.RESEND_API_KEY && new Resend(process.env.RESEND_API_KEY);

type State = { error: string } | { data: string } | undefined;

export async function sendContactEmail(
  _prevState: State,
  formData: FormData
): Promise<State> {
  try {
    // 1. Validate environment variables
    if (!process.env.CONTACT_EMAIL) {
      console.error("CONTACT_EMAIL environment variable is not set");
      return {
        error: "Email service is not configured. Please contact support.",
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
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      question: formData.get("question") as string,
    };

    console.log("Form data received:", rawData);

    // 4. Validate with Zod
    const validation = contactFormSchema.safeParse(rawData);
    if (!validation.success) {
      console.error("Validation errors:", validation.error.issues);
      const firstError = validation.error.issues[0];
      return {
        error: firstError
          ? firstError.message
          : "Please check your form fields and try again.",
      };
    }

    const { name, email, question } = validation.data;

    if (!resend) {
      console.error("Resend is not configured");
      return {
        error: "Email service is not configured. Please contact support.",
      };
    }

    // 5. Send email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "onboarding@resend.dev",
      to: [process.env.CONTACT_EMAIL],
      replyTo: email,
      subject: `Contact Form: ${name}`,
      react: ContactNotificationEmail({ name, email, question }),
    });

    if (error) {
      console.error("Resend error:", error);
      return { error: "Failed to send message. Please try again." };
    }

    console.log("Email sent successfully:", data);
    return { data: "Thank you! We'll get back to you soon." };
  } catch (error) {
    console.error("Contact form error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
