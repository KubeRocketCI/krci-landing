import { withUtm } from "@/lib/utm";

export interface NavItem {
  label: string;
  href: string;
  target?: "_blank" | "_self";
}

export const navigationItems: NavItem[] = [
  {
    label: "AI Factory",
    href: "/ai-factory",
  },
  {
    label: "Use cases",
    href: "/use-cases",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Documentation",
    href: withUtm("https://docs.kuberocketci.io/docs/about-platform", "header"),
    target: "_blank",
  },
];
