export interface NavItem {
  label: string;
  href: string;
  target?: "_blank" | "_self";
}

export const navigationItems: NavItem[] = [
  {
    label: "Use cases",
    href: "https://docs.kuberocketci.io/docs/use-cases",
    target: "_blank",
  },
  {
    label: "Pricing",
    href: "https://docs.kuberocketci.io/pricing",
    target: "_blank",
  },
  {
    label: "Documentation",
    href: "https://docs.kuberocketci.io/docs/about-platform",
    target: "_blank",
  },
];
