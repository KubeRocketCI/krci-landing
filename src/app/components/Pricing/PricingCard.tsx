import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PricingItem } from "./types";

interface PricingCardProps extends PricingItem {
  onContactClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onContactIntent?: () => void;
}

export const PricingCard = ({
  title,
  tagline,
  isFree,
  description,
  features,
  label,
  link,
  onContactClick,
  onContactIntent,
}: PricingCardProps) => {
  const isContactAction = link.action === "contact";
  return (
    <div className="h-full rounded-lg p-px [background-image:var(--gradient-stroke)] bg-size-[150%]">
      <div className="flex h-full flex-col rounded-[calc(0.5rem-1px)] bg-gradient-dark-purple">
        <div className="flex-1 flex flex-col gap-4 p-6">
          <div className="flex items-center gap-2">
            <h2 className="text-(length:--font-size-subtitle) font-medium text-neutral-0">
              {title}
            </h2>
            {label && (
              <span className="rounded-[4px] border border-signal-cyan px-2 py-0.5 text-(length:--font-size-caption) text-neutral-0">
                {label.text}
              </span>
            )}
          </div>

          <div>
            <p className="text-(length:--font-size-subtitle) font-medium text-neutral-0">
              {tagline}
            </p>
            {isFree && (
              <span className="inline-block text-(length:--font-size-caption) text-neutral-20">
                Free forever
              </span>
            )}
          </div>

          <p className="min-h-[60px] text-(length:--font-size-body-2) text-neutral-20">
            {description}
          </p>

          <ul className="space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check
                  className="mt-0.5 size-5 flex-shrink-0 text-neutral-0"
                  aria-hidden
                />
                <span className="text-(length:--font-size-body-2) text-neutral-0">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 pt-0">
          {isContactAction ? (
            <button
              type="button"
              onClick={onContactClick}
              onPointerEnter={onContactIntent}
              onFocus={onContactIntent}
              className={cn(
                "block min-h-11 w-full rounded-sm px-6 py-3 text-center",
                "text-(length:--font-size-button) font-medium text-white",
                "[background-image:var(--gradient-button)]",
                "hover:[background-image:var(--gradient-button-hover)]",
                "transition-colors duration-200",
                "shadow-button hover:shadow-button-hover",
                "cursor-pointer",
              )}
            >
              {link.label}
            </button>
          ) : (
            <Link
              href={link.href}
              className={cn(
                "block min-h-11 w-full rounded-sm px-6 py-3 text-center",
                "text-(length:--font-size-button) font-medium text-white",
                "[background-image:var(--gradient-button)]",
                "hover:[background-image:var(--gradient-button-hover)]",
                "transition-colors duration-200",
                "shadow-button hover:shadow-button-hover",
              )}
            >
              {link.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
