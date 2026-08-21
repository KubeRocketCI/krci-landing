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
  color?: string;
  label?: {
    text: string;
    color: string;
  };
}
