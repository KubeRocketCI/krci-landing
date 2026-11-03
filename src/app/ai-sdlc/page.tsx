import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { FOOTER_LINKS } from "@/components/Footer/constants";
import Header from "@/components/Header";
import { breadcrumbSchema, JsonLd } from "@/components/JsonLd";
import { getTranslations } from "@/lib/i18n";
import { DOCS_ABOUT_URL, withUtm } from "@/lib/utm";
import AiSdlc from "../components/AiSdlc";
import CTA from "../components/CTA";

const TITLE = "The Baseline Your AI SDLC Runs On | KubeRocketCI";
const DESCRIPTION =
  "Loops, quality gates, and ephemeral environments for every change, from agents and engineers alike, with any tool in any SDLC phase.";
const PAGE_URL = "https://kuberocketci.io/ai-sdlc";
const IMAGE = "https://kuberocketci.io/kuberocketci-social-card.jpg";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "AI SDLC",
    "agentic SDLC",
    "AI agents",
    "sub-agents",
    "quality gates",
    "ephemeral environments",
    "golden path",
    "platform engineering",
    "KubeRocketCI",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PAGE_URL,
    siteName: "KubeRocketCI",
    images: [
      { url: IMAGE, width: 1020, height: 615, alt: "KubeRocketCI AI SDLC" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
  alternates: { canonical: PAGE_URL },
};

export default function AiSdlcPage() {
  const translations = getTranslations();
  const { cta } = translations.aiSdlc;

  return (
    <>
      <JsonLd data={breadcrumbSchema("AI SDLC", "/ai-sdlc")} />
      <Header newTabLabel={translations.accessibility.newTab} />
      <main
        id="main-content"
        tabIndex={-1}
        className="bg-background min-h-screen outline-none"
      >
        <AiSdlc translations={translations} />
        <CTA
          translations={translations}
          title={cta.title}
          subtitle={cta.subtitle}
          contactLocation="ai_sdlc_cta"
          links={[
            { href: "/ai-factory", label: cta.aiFactoryLink },
            {
              href: withUtm(DOCS_ABOUT_URL, "ai_sdlc"),
              label: cta.docsLink,
              newTabText: translations.accessibility.newTab,
            },
            {
              href: FOOTER_LINKS.community.github,
              label: translations.platform.githubLink,
              newTabText: translations.accessibility.newTab,
              github: true,
            },
            { href: "/pricing", label: cta.pricingLink },
          ]}
        />
      </main>
      <Footer translations={translations} />
    </>
  );
}
