export interface PricingItem {
  id: string;
  title: string;
  tagline: string;
  isFree?: boolean;
  description: string;
  features: string[];
  link: {
    href: string;
    label: string;
    action?: "contact" | "external";
  };
  label?: {
    text: string;
  };
}
