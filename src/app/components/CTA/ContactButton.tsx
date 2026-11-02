"use client";

import { useDialogs } from "@/components/DialogHost";
import { cn } from "@/lib/utils";

interface ContactButtonProps {
  label: string;
  location: string;
}

export function ContactButton({ label, location }: ContactButtonProps) {
  const { openContact, preloadContact } = useDialogs();

  return (
    <button
      type="button"
      onClick={(event) =>
        openContact(location, { opener: event.currentTarget })
      }
      onPointerEnter={preloadContact}
      onFocus={preloadContact}
      className={cn(
        "min-h-11 px-5 py-3 text-button leading-[1] sm:min-w-[160px]",
        "cursor-pointer rounded-sm border border-neutral-40 bg-transparent text-foreground",
        "transition-colors hover:border-foreground hover:bg-neutral-90",
      )}
    >
      {label}
    </button>
  );
}
