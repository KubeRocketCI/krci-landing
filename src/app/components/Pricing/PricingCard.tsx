import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { PricingItem } from "./types";

export const PricingCard = ({
  title,
  price,
  description,
  features,
  moreFeatures,
  color,
  label,
  link,
}: PricingItem) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full rounded-lg overflow-hidden",
        "bg-gradient-dark-purple",
        "shadow-card",
      )}
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="flex-1 flex flex-col gap-4 p-6">
        {/* Title and Label */}
        <div className="flex items-center gap-2">
          <h3 className="text-(length:--font-size-subtitle) font-medium text-neutral-0">
            {title}
          </h3>
          {label && (
            <span
              className="px-2 py-0.5 rounded-full text-[13px] text-white"
              style={{ backgroundColor: label.color }}
            >
              {label.text}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-start gap-1 text-neutral-0">
          {price ? (
            <>
              <span className="text-base mt-1">$</span>
              <span className="text-[40px] font-semibold leading-none">
                {price}
              </span>
              <span className="text-base mt-1">/month</span>
            </>
          ) : (
            <span className="text-[40px] font-semibold leading-none">Free</span>
          )}
        </div>

        {/* Description */}
        <p className="text-(length:--font-size-caption) text-neutral-20 line-clamp-3 min-h-[54px]">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-[#0094ff] flex-shrink-0 mt-0.5" />
              <span className="text-(length:--font-size-caption) text-neutral-0">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* More Features */}
        {moreFeatures && (
          <>
            <div className="flex items-center gap-2 text-neutral-40 text-[10px]">
              <div className="flex-1 border-b border-dotted border-neutral-60" />
              <span>more</span>
              <div className="flex-1 border-b border-dotted border-neutral-60" />
            </div>

            <ul className="space-y-2">
              {moreFeatures.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-[#0094ff] flex-shrink-0 mt-0.5" />
                  <span className="text-(length:--font-size-caption) text-neutral-0">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Footer Button */}
      <div className="p-6 pt-0">
        <Link
          href={link.href}
          className={cn(
            "block w-full py-3 px-6 text-center rounded-lg",
            "text-(length:--font-size-button) font-medium uppercase",
            "bg-gradient-button text-white",
            "hover:bg-gradient-button-hover",
            "transition-all duration-200",
            "shadow-button hover:shadow-button-hover",
          )}
        >
          {link.label}
        </Link>
      </div>
    </div>
  );
};
