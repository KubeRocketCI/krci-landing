"use server";

import ContactNotificationEmail from "@/../emails/contact-notification";
import { enforceRateLimit, guardSubmission } from "@/lib/actions/guard";
import { GENERIC_ERROR, sendNotification } from "@/lib/actions/notify";
import {
  type FormState,
  readField,
  validationRejection,
} from "@/lib/form-errors";
import { contactFormSchema } from "@/lib/validations/contact";

export async function sendContactEmail(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const blocked = await guardSubmission(formData);
    if (blocked) return blocked;

    const validation = contactFormSchema.safeParse({
      name: readField(formData, "name"),
      email: readField(formData, "email"),
      question: readField(formData, "question"),
      plan: readField(formData, "plan"),
      location: readField(formData, "location"),
    });
    if (!validation.success) {
      return validationRejection(validation.error.issues);
    }
    const { name, email, question, plan, location } = validation.data;

    const limited = await enforceRateLimit();
    if (limited) return limited;

    return await sendNotification({
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: plan
        ? `Contact Form: ${name} (${plan} plan)`
        : `Contact Form: ${name}`,
      react: ContactNotificationEmail({
        name,
        email,
        question,
        plan,
        location,
      }),
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return { error: GENERIC_ERROR };
  }
}
