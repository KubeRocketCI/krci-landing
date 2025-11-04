import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PrivacyConsentTranslation } from "@/types/translations";

interface PrivacyConsentProps {
  translations: PrivacyConsentTranslation;
  className?: string;
}

export function PrivacyConsent({
  translations,
  className,
}: PrivacyConsentProps) {
  return (
    <p className={cn("text-xs text-gray-500", className)}>
      {translations.prefix}
      <Link
        href="/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 underline"
      >
        {translations.privacyLink}
      </Link>
      {translations.middle}
      <Link
        href="/terms"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 underline"
      >
        {translations.termsLink}
      </Link>
      {translations.suffix}
    </p>
  );
}
