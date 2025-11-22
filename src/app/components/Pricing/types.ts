export interface PricingItem {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  link: {
    href: string;
    label: string;
    action?: "contact" | "external";
  };
  moreFeatures?: {
    features: string[];
  };
  color?: string;
  label?: {
    text: string;
    color: string;
  };
}
