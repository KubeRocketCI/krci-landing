import type { Metadata } from "next";
import { Container } from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getTranslationKey, getTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { getPricingList } from "../components/Pricing/data";
import { FeaturesTable } from "../components/Pricing/FeaturesTable";
import { Note } from "../components/Pricing/Note";
import { PricingCard } from "../components/Pricing/PricingCard";

export const metadata: Metadata = {
  title: "Professional Service Pricing - KubeRocketCI",
  description:
    "Experience the flexibility of deploying KubeRocketCI on your on-premises infrastructure or in the Cloud. Your valuable data stays securely within your perimeter.",
  openGraph: {
    title: "Professional Service Pricing - KubeRocketCI",
    description:
      "Experience the flexibility of deploying KubeRocketCI on your on-premises infrastructure or in the Cloud. Your valuable data stays securely within your perimeter.",
    type: "website",
  },
};

export default function PricingPage() {
  const translations = getTranslations();
  const t = (key: string) => getTranslationKey(translations, key);
  const pricingList = getPricingList(translations);

  return (
    <>
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
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10",
              )}
            >
              {pricingList.map((item) => (
                <div key={item.id} className="flex">
                  <PricingCard {...item} />
                </div>
              ))}
            </div>

            {/* Professional Service Hours Note */}
            <Note>{t("pricing.notes.professionalServiceHours")}</Note>

            {/* Minimum Commitment Note */}
            <Note asteriskAmount={2}>
              {t("pricing.notes.minimumCommitment")}
            </Note>

            {/* Features Table */}
            <FeaturesTable translations={translations} />

            {/* Disclaimer Note */}
            <Note>{t("pricing.notes.disclaimer")}</Note>
          </Container>
        </section>
      </main>
      <Footer translations={translations} />
    </>
  );
}
