"use client";

import type { RefObject } from "react";
import { useDialogs } from "@/components/DialogHost";
import { cn } from "@/lib/utils";

export const ctaButton = {
  label: "Request Demo",
};

interface CTAButtonProps {
  label?: string;
  className?: string;
  onClick?: () => void;
  location: string;
  returnFocusRef?: RefObject<HTMLElement | null>;
}

const CTAButton = ({
  label = ctaButton.label,
  className,
  onClick,
  location,
  returnFocusRef,
}: CTAButtonProps) => {
  const { openDemo, preloadDemo } = useDialogs();

  return (
    <button
      type="button"
      onClick={(event) => {
        openDemo(location, { opener: event.currentTarget, returnFocusRef });
        onClick?.();
      }}
      onPointerEnter={preloadDemo}
      onFocus={preloadDemo}
      className={cn(
        "inline-flex min-h-11 items-center justify-center px-5 py-3",
        "text-foreground leading-[1.25] cursor-pointer rounded-sm",
        "[background-image:var(--gradient-button)]",
        "hover:[background-image:var(--gradient-button-hover)] transition-colors",
        "shadow-button-hover",
        className,
      )}
    >
      {label}
    </button>
  );
};

export default CTAButton;
