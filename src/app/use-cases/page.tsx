import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getTranslations } from "@/lib/i18n";
import UseCases from "../components/UseCases";

export const metadata: Metadata = {
  title: "Use Cases | KubeRocketCI",
  description:
    "Explore practical scenarios and solutions with KubeRocketCI. Learn how to scaffold applications, implement quality gates, manage secrets, create custom pipelines, and deploy from feature branches.",
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
    title: "Use Cases | KubeRocketCI",
    description:
      "Explore practical scenarios and solutions with KubeRocketCI. Learn how to scaffold applications, implement quality gates, manage secrets, and more.",
    type: "website",
    url: "https://kuberocketci.io/use-cases",
    siteName: "KubeRocketCI",
    images: [
      {
        url: "https://kuberocketci.io/kuberocketci-social-card.png",
        width: 1200,
        height: 630,
        alt: "KubeRocketCI Use Cases",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Cases | KubeRocketCI",
    description:
      "Explore practical scenarios and solutions with KubeRocketCI. Learn how to scaffold applications, implement quality gates, manage secrets, and more.",
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
      <Header translations={translations} />
      <main className="bg-background min-h-screen">
        <UseCases translations={translations} />
      </main>
      <Footer translations={translations} />
    </>
  );
}
