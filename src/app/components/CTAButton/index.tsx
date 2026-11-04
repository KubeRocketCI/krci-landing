"use client";

import type { RefObject } from "react";
import { useDialogs } from "@/components/DialogHost";
import { cn } from "@/lib/utils";
import { ctaButtonClassName } from "./styles";

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
      className={cn(ctaButtonClassName, className)}
    >
      {label}
    </button>
  );
};

export default CTAButton;
