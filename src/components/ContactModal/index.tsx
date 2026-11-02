"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
  controlClass,
  Field,
  FormAlert,
  FormBody,
  FormDialog,
  FormFooter,
  SecondaryButton,
  SubmitButton,
  SuccessPanel,
} from "@/components/FormDialog";
import { PrivacyConsent } from "@/components/PrivacyConsent";
import { sendContactEmail } from "@/lib/actions/contact";
import { trackEvent } from "@/lib/analytics";
import { toFieldErrors } from "@/lib/form-errors";
import { useFormAction } from "@/lib/use-form-action";
import { cn } from "@/lib/utils";
import { DOCS_ABOUT_URL, withUtm } from "@/lib/utm";
import { contactFormSchema } from "@/lib/validations/contact";
import type { TranslationContactForm } from "@/types/translations";

const DOCS_URL = withUtm(DOCS_ABOUT_URL, "contact_form");
const FIELDS = {
  name: "#contact-name",
  email: "#contact-email",
  question: "#contact-question",
};

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  translations: TranslationContactForm;
  location: string;
  plan?: string;
  opener?: HTMLElement | null;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

export function ContactModal({
  open,
  onOpenChange,
  translations,
  location,
  plan,
  opener,
  returnFocusRef,
}: ContactModalProps) {
  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={translations.title}
      description={translations.description}
      closeLabel={translations.buttons.close}
      opener={opener}
      returnFocusRef={returnFocusRef}
    >
      <ContactForm
        translations={translations}
        location={location}
        plan={plan}
        onClose={() => onOpenChange(false)}
      />
    </FormDialog>
  );
}

interface ContactFormProps {
  translations: TranslationContactForm;
  location: string;
  plan?: string;
  onClose: () => void;
}

function ContactForm({
  translations,
  location,
  plan,
  onClose,
}: ContactFormProps) {
  const {
    formRef,
    succeeded,
    pending,
    fieldErrors,
    formError,
    clearError,
    submit,
  } = useFormAction({
    action: sendContactEmail,
    messages: translations.messages,
    fields: FIELDS,
    onSuccess: () =>
      trackEvent("generate_lead", {
        form: "contact",
        location,
        ...(plan ? { plan } : {}),
      }),
  });

  if (succeeded) {
    return (
      <SuccessPanel
        title={translations.success.title}
        message={translations.messages.success}
        docsHref={DOCS_URL}
        docsLabel={translations.success.docsLabel}
        closeLabel={translations.buttons.close}
        onClose={onClose}
      />
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    submit(event, (formData) => {
      const result = contactFormSchema.safeParse(
        Object.fromEntries(formData) as Record<string, string>,
      );
      return result.success ? {} : toFieldErrors(result.error.issues);
    });

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="flex min-h-0 flex-1 flex-col"
    >
      <FormBody>
        <FormAlert message={formError} />

        <Field
          id="contact-name"
          label={translations.fields.name.label}
          error={fieldErrors.name}
        >
          {(aria) => (
            <input
              {...aria}
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder={translations.fields.name.placeholder}
              className={controlClass}
              onChange={() => clearError("name")}
            />
          )}
        </Field>

        <Field
          id="contact-email"
          label={translations.fields.email.label}
          error={fieldErrors.email}
        >
          {(aria) => (
            <input
              {...aria}
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={translations.fields.email.placeholder}
              className={controlClass}
              onChange={() => clearError("email")}
            />
          )}
        </Field>

        <Field
          id="contact-question"
          label={translations.fields.question.label}
          error={fieldErrors.question}
        >
          {(aria) => (
            <textarea
              {...aria}
              name="question"
              required
              rows={4}
              placeholder={translations.fields.question.placeholder}
              className={cn(controlClass, "resize-none")}
              onChange={() => clearError("question")}
            />
          )}
        </Field>

        <PrivacyConsent translations={translations.privacyConsent} />
      </FormBody>

      <FormFooter>
        <Dialog.Close asChild>
          <SecondaryButton>{translations.buttons.cancel}</SecondaryButton>
        </Dialog.Close>
        <SubmitButton
          label={translations.buttons.submit}
          pendingLabel={translations.buttons.submitting}
          pending={pending}
        />
      </FormFooter>
    </form>
  );
}
