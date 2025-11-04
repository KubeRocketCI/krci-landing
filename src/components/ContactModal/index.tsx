"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { sendContactEmail } from "@/lib/actions/contact";
import { cn } from "@/lib/utils";
import type { TranslationContactForm } from "@/types/translations";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  translations: TranslationContactForm;
}

export function ContactModal({
  open,
  onOpenChange,
  translations,
}: ContactModalProps) {
  const [state, dispatch] = useActionState(sendContactEmail, undefined);

  useEffect(() => {
    if (!state) return;

    if ("data" in state) {
      toast.success(state.data);
      onOpenChange(false);
    } else if ("error" in state) {
      toast.error(state.error);
    }
  }, [state, onOpenChange]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-50 animate-in fade-in zoom-in">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              {translations.title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description className="text-gray-600 mb-6">
            {translations.description}
          </Dialog.Description>

          <form action={dispatch} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {translations.fields.name.label}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder={translations.fields.name.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {translations.fields.email.label}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={translations.fields.email.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="question"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {translations.fields.question.label}{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="question"
                name="question"
                required
                rows={4}
                placeholder={translations.fields.question.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <p className="text-xs text-gray-500 mt-4">
              {translations.privacyConsent.prefix}
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                {translations.privacyConsent.privacyLink}
              </Link>
              {translations.privacyConsent.middle}
              <Link
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                {translations.privacyConsent.termsLink}
              </Link>
              {translations.privacyConsent.suffix}
            </p>

            <div className="flex gap-3 justify-end pt-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {translations.buttons.cancel}
                </button>
              </Dialog.Close>
              <SubmitButton translations={translations} />
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SubmitButton({
  translations,
}: {
  translations: TranslationContactForm;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors",
        pending && "opacity-50 cursor-not-allowed",
      )}
    >
      {pending ? translations.buttons.submitting : translations.buttons.submit}
    </button>
  );
}
