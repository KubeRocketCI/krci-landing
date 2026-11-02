"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useOffscreenAttribute } from "@/lib/use-offscreen-attribute";
import { cn } from "@/lib/utils";
import { DOCS_ABOUT_URL, withUtm } from "@/lib/utm";
import { ContactButton } from "../CTA/ContactButton";
import CTAButton from "../CTAButton";

const HEADER_ROOT_MARGIN = "-96px 0px 0px 0px";

interface HeroClientProps {
  contactButtonText: string;
  demoButtonText: string;
  docsLinkText: string;
  docsLinkNewTabText: string;
  location?: string;
}

export function HeroClient({
  contactButtonText,
  demoButtonText,
  docsLinkText,
  docsLinkNewTabText,
  location = "hero",
}: HeroClientProps) {
  const ctaRef = useRef<HTMLDivElement>(null);

  // Drives .header-cta visibility in globals.css.
  useOffscreenAttribute(ctaRef, HEADER_ROOT_MARGIN);

  return (
    <>
      <div
        ref={ctaRef}
        data-hero-cta
        className={cn(
          "flex gap-4",
          "flex-col items-stretch sm:flex-row sm:items-center",
        )}
      >
        <CTAButton label={demoButtonText} location={location} />

        <ContactButton label={contactButtonText} location={location} />
      </div>

      <a
        href={withUtm(DOCS_ABOUT_URL, location)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "mt-5 inline-flex min-h-11 items-center gap-1 text-foreground",
          "underline underline-offset-4 hover:text-neutral-20 transition-colors",
        )}
      >
        {docsLinkText}
        <span className="sr-only"> ({docsLinkNewTabText})</span>
        <ArrowUpRight className="size-4" aria-hidden />
      </a>
    </>
  );
}
