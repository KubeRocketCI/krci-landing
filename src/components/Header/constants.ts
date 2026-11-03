import { DOCS_ABOUT_URL, withUtm } from "@/lib/utm";

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
    label: "AI SDLC",
    href: "/ai-sdlc",
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
    href: withUtm(DOCS_ABOUT_URL, "header"),
    target: "_blank",
  },
];
