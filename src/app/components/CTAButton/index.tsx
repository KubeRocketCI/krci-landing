"use client";

import { useState } from "react";
import { RequestDemoModal } from "@/components/RequestDemoModal";
import { cn } from "@/lib/utils";
import type { TranslationDemoForm } from "@/types/translations";

export const ctaButton = {
  label: "Request Demo",
};

interface CTAButtonProps {
  onClick?: () => void;
  demoFormTranslations: TranslationDemoForm;
}

const CTAButton = ({ onClick, demoFormTranslations }: CTAButtonProps) => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const handleClick = () => {
    setDemoModalOpen(true);
    onClick?.();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center px-5 py-3",
          "text-foreground leading-[1.25] cursor-pointer rounded-sm",
          "[background-image:var(--gradient-button)]",
          "hover:[background-image:var(--gradient-button-hover)] transition-colors",
          "shadow-button-hover",
        )}
      >
        {ctaButton.label}
      </button>

      <RequestDemoModal
        open={demoModalOpen}
        onOpenChange={setDemoModalOpen}
        translations={demoFormTranslations}
      />
    </>
  );
};

export default CTAButton;
