import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { breadcrumbSchema, JsonLd } from "@/components/JsonLd";
import { getTranslations } from "@/lib/i18n";
import UseCases from "../components/UseCases";

export const metadata: Metadata = {
  title: "CI/CD Use Cases and Scenarios | KubeRocketCI",
  description:
    "Practical KubeRocketCI scenarios: scaffold applications, enforce quality gates, manage secrets, build custom Tekton pipelines, and deploy from feature branches.",
  keywords: [
    "KubeRocketCI use cases",
    "CI/CD scenarios",
    "FastAPI deployment",
    "Tekton pipelines",
    "Kubernetes deployment",
    "quality gates",
    "secrets management",
    "feature branch deployment",
    "autotest integration",
  ],
  openGraph: {
    title: "CI/CD Use Cases and Scenarios | KubeRocketCI",
    description:
      "Practical KubeRocketCI scenarios: scaffold applications, enforce quality gates, manage secrets, build custom Tekton pipelines, and deploy from feature branches.",
    type: "website",
    url: "https://kuberocketci.io/use-cases",
    siteName: "KubeRocketCI",
    images: [
      {
        url: "https://kuberocketci.io/kuberocketci-social-card.png",
        width: 1020,
        height: 615,
        alt: "KubeRocketCI Use Cases",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CI/CD Use Cases and Scenarios | KubeRocketCI",
    description:
      "Practical KubeRocketCI scenarios: scaffold applications, enforce quality gates, manage secrets, build custom Tekton pipelines, and deploy from feature branches.",
    images: ["https://kuberocketci.io/kuberocketci-social-card.png"],
  },
  alternates: {
    canonical: "https://kuberocketci.io/use-cases",
  },
};

export default function UseCasesPage() {
  const translations = getTranslations();

  return (
    <>
      <JsonLd data={breadcrumbSchema("Use Cases", "/use-cases")} />
      <Header translations={translations} />
      <main className="bg-background min-h-screen">
        <UseCases translations={translations} />
      </main>
      <Footer translations={translations} />
    </>
  );
}
