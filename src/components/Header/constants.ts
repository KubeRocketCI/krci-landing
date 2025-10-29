export interface NavItem {
  label: string;
  href: string;
  target?: "_blank" | "_self";
}

export const navigationItems: NavItem[] = [
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
    href: "https://docs.kuberocketci.io/docs/about-platform",
    target: "_blank",
  },
];
