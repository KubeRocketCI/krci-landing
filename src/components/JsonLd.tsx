interface JsonLdProps {
  data: Record<string, unknown>;
}

export const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires inline script
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const SITE_URL = "https://kuberocketci.io";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KubeRocketCI",
  url: SITE_URL,
  logo: `${SITE_URL}/android-chrome-512x512.png`,
  sameAs: [
    "https://github.com/kuberocketci",
    "https://www.youtube.com/@theplatformteam",
    "https://medium.com/kuberocketci",
    "https://hub.docker.com/u/epamedp",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KubeRocketCI",
  url: SITE_URL,
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "KubeRocketCI",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Kubernetes",
  url: SITE_URL,
  description:
    "Open-source Kubernetes-native delivery platform: one golden path for developers and AI agent fleets with opinionated pipelines, quality gates, and ephemeral environments.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  softwareHelp: "https://docs.kuberocketci.io/docs/about-platform",
};

export const breadcrumbSchema = (pageName: string, pagePath: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: pageName,
      item: `${SITE_URL}${pagePath}`,
    },
  ],
});
