"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

function isFocusable(element: HTMLElement | null | undefined) {
  return Boolean(
    element?.isConnected &&
      element.getClientRects().length > 0 &&
      getComputedStyle(element).visibility !== "hidden" &&
      !element.closest("[inert]"),
  );
}

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  closeLabel: string;
  wide?: boolean;
  opener?: HTMLElement | null;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  closeLabel,
  wide,
  opener,
  returnFocusRef,
  children,
}: FormDialogProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);

  useLayoutEffect(() => {
    openRef.current = open;
  }, [open]);

  const focusFirstField = (event: Event) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const field = contentRef.current?.querySelector<HTMLElement>(
      "input:not([type=hidden]), textarea, select",
    );
    if (!field) return;
    event.preventDefault();
    field.focus();
  };

  // Returns focus to the opener, else returnFocusRef. Ignored while open.
  const restoreFocus = (event: Event) => {
    event.preventDefault();
    if (openRef.current) return;
    const target = isFocusable(opener) ? opener : returnFocusRef?.current;
    if (isFocusable(target)) target?.focus();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay fixed inset-0 z-60 bg-black/70" />
        <Dialog.Content
          ref={contentRef}
          onOpenAutoFocus={focusFirstField}
          onCloseAutoFocus={restoreFocus}
          onInteractOutside={(event) => event.preventDefault()}
          className={cn(
            "fixed left-1/2 top-1/2 z-60 -translate-x-1/2 -translate-y-1/2",
            "w-[calc(100%-1rem)] rounded-lg p-px",
            "[background-image:var(--gradient-stroke)] bg-size-[150%]",
            wide ? "max-w-2xl" : "max-w-md",
          )}
        >
          <div
            className={cn(
              "modal-panel flex max-h-[calc(100dvh-1rem)] flex-col",
              "rounded-[calc(0.5rem-1px)] bg-gradient-dark-purple text-neutral-0",
            )}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
              <Dialog.Title className="text-(length:--font-size-h2) leading-10">
                {title}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label={closeLabel}
                  className={cn(
                    "-mr-2 -mt-1 flex size-11 shrink-0 items-center justify-center rounded-sm",
                    "text-neutral-20 transition-colors hover:text-neutral-0",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-0",
                  )}
                >
                  <X className="size-5" aria-hidden />
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description className="shrink-0 px-4 pb-4 pt-2 text-(length:--font-size-body-2) text-neutral-10 sm:px-6">
              {description}
            </Dialog.Description>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function FormBody({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "min-h-0 flex-1 space-y-5 overflow-y-auto px-4 pb-5 sm:px-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function FormFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-neutral-70 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
      {children}
    </div>
  );
}

export const controlClass = cn(
  "w-full min-h-11 rounded-[3px] border border-neutral-20 bg-neutral-90 px-3 py-2",
  "text-(length:--font-size-body) text-neutral-0 placeholder:text-neutral-20",
  "transition-shadow hover:shadow-button-hover",
  "focus-visible:shadow-button-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-0",
  "disabled:cursor-not-allowed disabled:border-neutral-40 disabled:bg-neutral-70 disabled:text-neutral-40 disabled:shadow-none",
  "aria-[invalid=true]:border-error",
);

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
}

export function Field({ id, label, error, hint, children }: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-(length:--font-size-body-2) font-medium"
      >
        {label}
      </label>
      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
      })}
      {hint ? (
        <p
          id={hintId}
          className="mt-2 text-(length:--font-size-caption) text-neutral-20"
        >
          {hint}
        </p>
      ) : null}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      className="mt-2 flex items-start gap-2 text-(length:--font-size-body-2) text-error-text"
    >
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
      <span>{message}</span>
    </p>
  );
}

export function FormAlert({ message }: { message?: string }) {
  return (
    <div role="alert" aria-live="assertive">
      {message ? (
        <p className="flex items-start gap-2 rounded-sm border border-error px-3 py-3 text-(length:--font-size-body-2) text-error-text">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{message}</span>
        </p>
      ) : null}
    </div>
  );
}

const buttonBase = cn(
  "inline-flex min-h-11 items-center justify-center rounded-sm px-5 py-3",
  "text-(length:--font-size-button) font-medium leading-[1.25] text-neutral-0",
  "cursor-pointer transition-colors",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-0",
);

export function SecondaryButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className={cn(
        buttonBase,
        "border border-neutral-0 bg-neutral-90",
        "hover:[background-image:var(--gradient-button-hover)]",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function SubmitButton({
  label,
  pendingLabel,
  pending,
}: {
  label: string;
  pendingLabel: string;
  pending: boolean;
}) {
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className={cn(
        buttonBase,
        "[background-image:var(--gradient-button)] shadow-button-hover",
        "hover:[background-image:var(--gradient-button-hover)]",
        "aria-disabled:cursor-not-allowed aria-disabled:bg-none aria-disabled:bg-neutral-70 aria-disabled:text-neutral-40 aria-disabled:shadow-none",
      )}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

interface SuccessPanelProps {
  title: string;
  message: string;
  detailLabel?: string;
  detail?: string;
  docsHref: string;
  docsLabel: string;
  closeLabel: string;
  onClose: () => void;
}

export function SuccessPanel({
  title,
  message,
  detailLabel,
  detail,
  docsHref,
  docsLabel,
  closeLabel,
  onClose,
}: SuccessPanelProps) {
  return (
    <>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-5 sm:px-6">
        <output className="flex items-center gap-3">
          <CheckCircle2 className="size-6 shrink-0" aria-hidden />
          <span className="text-(length:--font-size-subtitle) font-medium">
            {title}
          </span>
        </output>
        {detail ? (
          <div>
            {detailLabel ? (
              <p className="text-(length:--font-size-caption) text-neutral-20">
                {detailLabel}
              </p>
            ) : null}
            <p className="text-(length:--font-size-body) font-medium">
              {detail}
            </p>
          </div>
        ) : null}
        <p className="text-(length:--font-size-body-2) text-neutral-10">
          {message}
        </p>
        <a
          href={docsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-(length:--font-size-body-2) underline underline-offset-4 hover:text-neutral-20"
        >
          {docsLabel}
        </a>
      </div>
      <FormFooter>
        <SecondaryButton onClick={onClose}>{closeLabel}</SecondaryButton>
      </FormFooter>
    </>
  );
}
