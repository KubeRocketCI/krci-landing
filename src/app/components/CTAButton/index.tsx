import Link from "next/link";
import { cn } from "@/lib/utils";

export const ctaButton = {
  label: "Request Demo",
  href: "mailto:SupportEPMD-EDP@epam.com",
};

const CTAButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center px-5 py-3",
        "text-foreground leading-[1.25] cursor-pointer rounded-sm",
        "[background-image:var(--gradient-button)]",
        "hover:[background-image:var(--gradient-button-hover)] transition-colors",
        "shadow-button-hover",
      )}
      href={ctaButton.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {ctaButton.label}
    </Link>
  );
};

export default CTAButton;
