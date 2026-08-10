import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { breadcrumbSchema, JsonLd } from "@/components/JsonLd";
import { getTranslations } from "@/lib/i18n";
import AiFactory from "../components/AiFactory";
import CTA from "../components/CTA";

export const metadata: Metadata = {
  title: "AI Factory for Software Delivery | KubeRocketCI",
  description:
    "AI agent fleets multiply demand on delivery infrastructure. Learn why quality gates became the AI factory's control point and how KubeRocketCI delivers them.",
  keywords: [
    "AI factory",
    "AI fabric",
    "AI agents",
    "agentic AI",
    "agent harness",
    "quality gates",
    "guardrails",
    "ephemeral environments",
    "platform engineering",
    "CI/CD for AI agents",
    "KubeRocketCI",
  ],
  openGraph: {
    title: "AI Factory for Software Delivery | KubeRocketCI",
    description:
      "AI agent fleets multiply demand on delivery infrastructure. Learn why quality gates became the AI factory's control point and how KubeRocketCI delivers them.",
    type: "website",
    url: "https://kuberocketci.io/ai-factory",
    siteName: "KubeRocketCI",
    images: [
      {
        url: "https://kuberocketci.io/kuberocketci-social-card.png",
        width: 1020,
        height: 615,
        alt: "KubeRocketCI AI Factory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Factory for Software Delivery | KubeRocketCI",
    description:
      "AI agent fleets multiply demand on delivery infrastructure. Learn why quality gates became the AI factory's control point and how KubeRocketCI delivers them.",
    images: ["https://kuberocketci.io/kuberocketci-social-card.png"],
  },
  alternates: {
    canonical: "https://kuberocketci.io/ai-factory",
  },
};

export default function AiFactoryPage() {
  const translations = getTranslations();

  return (
    <>
      <JsonLd data={breadcrumbSchema("AI Factory", "/ai-factory")} />
      <Header translations={translations} />
      <main className="bg-background min-h-screen">
        <AiFactory translations={translations} />
        <CTA translations={translations} />
      </main>
      <Footer translations={translations} />
    </>
  );
}
