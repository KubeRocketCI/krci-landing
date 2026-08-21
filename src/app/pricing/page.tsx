import type { Metadata } from "next";
import { Container } from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { breadcrumbSchema, JsonLd } from "@/components/JsonLd";
import { getTranslationKey, getTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { getPricingList } from "../components/Pricing/data";
import { ExpertiseTable } from "../components/Pricing/ExpertiseTable";
import { Note } from "../components/Pricing/Note";
import { PricingClient } from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing - KubeRocketCI",
  description:
    "KubeRocketCI is the harness for your AI fabric — free and open source to start, with expert-guided tiers to get to production, govern many teams, and scale into an AI factory.",
  openGraph: {
    title: "Pricing - KubeRocketCI",
    description:
      "KubeRocketCI is the harness for your AI fabric — free and open source to start, with expert-guided tiers to get to production, govern many teams, and scale into an AI factory.",
    type: "website",
    url: "https://kuberocketci.io/pricing",
    siteName: "KubeRocketCI",
    images: [
      {
        url: "https://kuberocketci.io/kuberocketci-social-card.png",
        width: 1020,
        height: 615,
        alt: "KubeRocketCI Pricing",
      },
    ],
  },
  alternates: {
    canonical: "https://kuberocketci.io/pricing",
  },
};

export default function PricingPage() {
  const translations = getTranslations();
  const t = (key: string) => getTranslationKey(translations, key);
  const pricingList = getPricingList(translations);

  return (
    <>
      <JsonLd data={breadcrumbSchema("Pricing", "/pricing")} />
      <Header translations={translations} />
      <main className="bg-background min-h-screen">
        <section className={cn("pt-24 pb-20")}>
          <Container>
            {/* Page Header */}
            <div className="mb-10">
              <h1
                className={cn(
                  "text-(length:--font-size-h1) leading-tight mb-6",
                  "bg-gradient-h1 bg-clip-text text-transparent",
                )}
              >
                {t("pricing.title")}
              </h1>
              <p className="text-(length:--font-size-body) text-neutral-20 max-w-3xl">
                {t("pricing.description")}
              </p>
            </div>

            {/* Pricing Cards Grid */}
            <PricingClient
              pricingList={pricingList}
              contactFormTranslations={translations.contactForm}
            />

            {/* Expertise Table */}
            <ExpertiseTable translations={translations} />

            {/* Disclaimer Note */}
            <Note>{t("pricing.notes.disclaimer")}</Note>
          </Container>
        </section>
      </main>
      <Footer translations={translations} />
    </>
  );
}
