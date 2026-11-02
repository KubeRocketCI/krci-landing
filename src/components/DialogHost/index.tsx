"use client";

import { Loader2 } from "lucide-react";
import {
  createContext,
  type RefObject,
  use,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { ContactModal as ContactModalComponent } from "@/components/ContactModal";
import type { RequestDemoModal as RequestDemoModalComponent } from "@/components/RequestDemoModal";
import { trackEvent } from "@/lib/analytics";
import type {
  TranslationContactForm,
  TranslationDemoForm,
} from "@/types/translations";
// Eager: Turbopack does not retry a failed lazy CSS chunk.
import "react-day-picker/dist/style.css";

// Caches the resolved module; a rejected load is dropped so the next call retries.
function createLoader<T>(load: () => Promise<T>) {
  let value: T | undefined;
  let pending: Promise<T> | undefined;
  return {
    get current() {
      return value;
    },
    load() {
      if (value) return Promise.resolve(value);
      pending ??= load().then(
        (loaded) => {
          value = loaded;
          return loaded;
        },
        (error: unknown) => {
          pending = undefined;
          throw error;
        },
      );
      return pending;
    },
  };
}

const demoLoader = createLoader(() =>
  import("@/components/RequestDemoModal").then(
    (module) => module.RequestDemoModal,
  ),
);
const contactLoader = createLoader(() =>
  import("@/components/ContactModal").then((module) => module.ContactModal),
);

export interface OpenOptions {
  opener: HTMLElement | null;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

interface DialogRequest extends OpenOptions {
  open: boolean;
  location: string;
  plan?: string;
}

interface DialogsContextValue {
  openDemo: (location: string, options: OpenOptions) => void;
  openContact: (
    location: string,
    options: OpenOptions & { plan?: string },
  ) => void;
  preloadDemo: () => void;
  preloadContact: () => void;
}

const DialogsContext = createContext<DialogsContextValue | null>(null);

export function useDialogs() {
  const value = use(DialogsContext);
  if (!value) throw new Error("useDialogs must be used inside DialogHost");
  return value;
}

interface DialogHostProps {
  demoTranslations: TranslationDemoForm;
  contactTranslations: TranslationContactForm;
  children: React.ReactNode;
}

// Single mount point for the demo and contact dialogs. Code loads on intent or first open.
export function DialogHost({
  demoTranslations,
  contactTranslations,
  children,
}: DialogHostProps) {
  const [demoRequest, setDemoRequest] = useState<DialogRequest>();
  const [contactRequest, setContactRequest] = useState<DialogRequest>();
  const [DemoModal, setDemoModal] = useState<
    typeof RequestDemoModalComponent | undefined
  >(() => demoLoader.current);
  const [ContactModal, setContactModal] = useState<
    typeof ContactModalComponent | undefined
  >(() => contactLoader.current);

  const value = useMemo<DialogsContextValue>(() => {
    const loadDemo = () =>
      demoLoader.load().then((component) => {
        setDemoModal(() => component);
      });
    const loadContact = () =>
      contactLoader.load().then((component) => {
        setContactModal(() => component);
      });
    const failed = (
      setRequest: typeof setDemoRequest,
      opener: HTMLElement | null,
    ) => {
      return (error: unknown) => {
        console.error("Dialog failed to load:", error);
        setRequest((current) => current && { ...current, open: false });
        opener?.focus();
      };
    };

    return {
      openDemo: (location, options) => {
        trackEvent("demo_request_open", { location });
        setDemoRequest({ ...options, open: true, location });
        loadDemo().catch(failed(setDemoRequest, options.opener));
      },
      openContact: (location, { plan, ...options }) => {
        trackEvent("contact_open", { location, ...(plan ? { plan } : {}) });
        setContactRequest({ ...options, open: true, location, plan });
        loadContact().catch(failed(setContactRequest, options.opener));
      },
      preloadDemo: () => {
        loadDemo().catch(() => undefined);
      },
      preloadContact: () => {
        loadContact().catch(() => undefined);
      },
    };
  }, []);

  const close = (setRequest: typeof setDemoRequest) => (open: boolean) =>
    setRequest((current) => current && { ...current, open });

  const loading =
    (demoRequest?.open && !DemoModal) ||
    (contactRequest?.open && !ContactModal);

  return (
    <DialogsContext value={value}>
      {children}
      {demoRequest && DemoModal ? (
        <DemoModal
          open={demoRequest.open}
          onOpenChange={close(setDemoRequest)}
          translations={demoTranslations}
          location={demoRequest.location}
          opener={demoRequest.opener}
          returnFocusRef={demoRequest.returnFocusRef}
        />
      ) : null}
      {contactRequest && ContactModal ? (
        <ContactModal
          open={contactRequest.open}
          onOpenChange={close(setContactRequest)}
          translations={contactTranslations}
          location={contactRequest.location}
          plan={contactRequest.plan}
          opener={contactRequest.opener}
          returnFocusRef={contactRequest.returnFocusRef}
        />
      ) : null}
      {loading ? (
        <LoadingOverlay
          onCancel={() => {
            close(setDemoRequest)(false);
            close(setContactRequest)(false);
          }}
        />
      ) : null}
    </DialogsContext>
  );
}

function LoadingOverlay({ onCancel }: { onCancel: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  return createPortal(
    <div
      aria-hidden
      className="modal-overlay fixed inset-0 z-60 grid place-items-center bg-black/70"
    >
      <Loader2 className="size-6 animate-spin text-neutral-0 motion-reduce:animate-none" />
    </div>,
    document.body,
  );
}
