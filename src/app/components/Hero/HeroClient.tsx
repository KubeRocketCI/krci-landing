"use client";

import { useState } from "react";
import { ContactModal } from "@/components/ContactModal";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type {
  TranslationContactForm,
  TranslationDemoForm,
} from "@/types/translations";
import CTAButton from "../CTAButton";

interface HeroClientProps {
  contactButtonText: string;
  contactFormTranslations: TranslationContactForm;
  demoFormTranslations: TranslationDemoForm;
}

export function HeroClient({
  contactButtonText,
  contactFormTranslations,
  demoFormTranslations,
}: HeroClientProps) {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <>
      <div className={cn("flex items-center gap-4", "flex-col sm:flex-row")}>
        <button
          type="button"
          onClick={() => {
            trackEvent("contact_open", { location: "hero" });
            setContactModalOpen(true);
          }}
          className={cn(
            "button-shadow px-5 py-3 text-button",
            "bg-neutral-90 text-foreground leading-[1] cursor-pointer",
            "border border-foreground rounded-sm",
            "hover:[background-image:var(--gradient-button-hover)] transition-colors",
            "min-w-[160px]",
          )}
        >
          {contactButtonText}
        </button>

        <CTAButton
          demoFormTranslations={demoFormTranslations}
          location="hero"
        />
      </div>

      <ContactModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        translations={contactFormTranslations}
        location="hero"
      />
    </>
  );
}
