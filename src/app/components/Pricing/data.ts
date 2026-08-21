import { withUtm } from "@/lib/utm";
import type { Translations } from "@/types/translations";
import type { PricingItem } from "./types";

export function getPricingList(translations: Translations): PricingItem[] {
  return [
    {
      id: "open-source",
      title: translations.pricing.tiers.openSource.title,
      tagline: translations.pricing.tiers.openSource.tagline,
      isFree: true,
      description: translations.pricing.tiers.openSource.description,
      features: translations.pricing.tiers.openSource.features,
      link: {
        href: withUtm(
          "https://docs.kuberocketci.io/docs/quick-start/quick-start-overview",
          "pricing-open-source",
        ),
        label: translations.pricing.tiers.openSource.link.label,
        action: "external",
      },
      color: "#efefff",
    },
    {
      id: "team",
      title: translations.pricing.tiers.team.title,
      tagline: translations.pricing.tiers.team.tagline,
      description: translations.pricing.tiers.team.description,
      features: translations.pricing.tiers.team.features,
      link: {
        href: "#",
        label: translations.pricing.tiers.team.link.label,
        action: "contact",
      },
      color: "#0094ff",
      label: {
        text: translations.pricing.tiers.team.label || "",
        color: "#2196f3",
      },
    },
    {
      id: "scale",
      title: translations.pricing.tiers.scale.title,
      tagline: translations.pricing.tiers.scale.tagline,
      description: translations.pricing.tiers.scale.description,
      features: translations.pricing.tiers.scale.features,
      link: {
        href: "#",
        label: translations.pricing.tiers.scale.link.label,
        action: "contact",
      },
      color: "#18be94",
    },
    {
      id: "enterprise",
      title: translations.pricing.tiers.enterprise.title,
      tagline: translations.pricing.tiers.enterprise.tagline,
      description: translations.pricing.tiers.enterprise.description,
      features: translations.pricing.tiers.enterprise.features,
      link: {
        href: "#",
        label: translations.pricing.tiers.enterprise.link.label,
        action: "contact",
      },
      color: "#9955ef",
    },
  ];
}
