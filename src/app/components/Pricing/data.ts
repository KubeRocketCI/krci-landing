import type { Translations } from "@/types/translations";
import type { PricingItem } from "./types";

export function getPricingList(translations: Translations): PricingItem[] {
  return [
    {
      id: "open-source",
      title: translations.pricing.tiers.openSource.title,
      description: translations.pricing.tiers.openSource.description,
      price: 0,
      features: translations.pricing.tiers.openSource.features,
      link: {
        href: "https://docs.kuberocketci.io/docs/quick-start/quick-start-overview",
        label: translations.pricing.tiers.openSource.link.label,
      },
      color: "#efefff",
    },
    {
      id: "team",
      title: translations.pricing.tiers.team.title,
      description: translations.pricing.tiers.team.description,
      price: 3000,
      features: translations.pricing.tiers.team.features,
      moreFeatures: {
        features: translations.pricing.tiers.team.moreFeatures || [],
      },
      link: {
        href: "mailto:SupportEPMD-EDP@epam.com",
        label: translations.pricing.tiers.team.link.label,
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
      description: translations.pricing.tiers.scale.description,
      price: 6000,
      features: translations.pricing.tiers.scale.features,
      moreFeatures: {
        features: translations.pricing.tiers.scale.moreFeatures || [],
      },
      link: {
        href: "mailto:SupportEPMD-EDP@epam.com",
        label: translations.pricing.tiers.scale.link.label,
      },
      color: "#18be94",
    },
    {
      id: "enterprise",
      title: translations.pricing.tiers.enterprise.title,
      description: translations.pricing.tiers.enterprise.description,
      price: 13000,
      features: translations.pricing.tiers.enterprise.features,
      moreFeatures: {
        features: translations.pricing.tiers.enterprise.moreFeatures || [],
      },
      link: {
        href: "mailto:SupportEPMD-EDP@epam.com",
        label: translations.pricing.tiers.enterprise.link.label,
      },
      color: "#9955ef",
    },
  ];
}
