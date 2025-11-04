import Image from "next/image";
import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";

interface BenefitsProps {
  translations: Translations;
}

const Benefits = ({ translations }: BenefitsProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  const benefitsData = [
    {
      id: "quick-start",
      title: t("benefits.items.quickStart.title"),
      description: t("benefits.items.quickStart.description"),
      icon: "/benefits/quickstart.svg",
      width: 44,
      height: 40,
    },
    {
      id: "cloud-agnostic",
      title: t("benefits.items.cloudAgnostic.title"),
      description: t("benefits.items.cloudAgnostic.description"),
      icon: "/benefits/cloud_agnostic.svg",
      width: 56,
      height: 40,
    },
    {
      id: "easy-setup",
      title: t("benefits.items.easySetup.title"),
      description: t("benefits.items.easySetup.description"),
      icon: "/benefits/easy_setup.svg",
      width: 40,
      height: 40,
    },
    {
      id: "reduce-costs",
      title: t("benefits.items.reduceCosts.title"),
      description: t("benefits.items.reduceCosts.description"),
      icon: "/benefits/reduce.svg",
      width: 40,
      height: 40,
    },
    {
      id: "health-monitor",
      title: t("benefits.items.healthMonitor.title"),
      description: t("benefits.items.healthMonitor.description"),
      icon: "/benefits/delivery.svg",
      width: 40,
      height: 40,
    },
    {
      id: "ai-adoption",
      title: t("benefits.items.aiAdoption.title"),
      description: t("benefits.items.aiAdoption.description"),
      icon: "/benefits/ai.svg",
      width: 60,
      height: 40,
    },
  ];

  return (
    <section className={cn("bg-background py-12 lg:py-25")}>
      <Container className="relative z-2">
        <div className={cn("mb-9")}>
          <h2
            className={cn(
              "text-(length:--font-size-h2) leading-10 text-neutral-0 mb-3",
            )}
          >
            {t("benefits.title")}
          </h2>
          <p className={cn("max-w-96 text-neutral-0")}>
            {t("benefits.description")}
          </p>
        </div>

        <div
          className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4")}
        >
          {benefitsData.map((benefit) => (
            <div
              key={benefit.id}
              className={cn(
                "rounded-lg p-[1px] box-shadow-card backdrop-blur-42px",
                "[background-image:var(--gradient-stroke)] bg-size-[150%]",
              )}
            >
              <div
                className={cn(
                  "px-6 py-7 rounded-[calc(0.5rem-1px)] bg-gradient-dark-purple h-full",
                )}
              >
                <div className={cn("mb-9")}>
                  <Image
                    src={benefit.icon}
                    alt={benefit.title}
                    width={benefit.width}
                    height={benefit.height}
                    style={{
                      width: `${benefit.width}px`,
                      height: `${benefit.height}px`,
                    }}
                  />
                </div>

                <div className={cn("")}>
                  <h3
                    className={cn(
                      "text-(length:--font-size-subtitle) font-medium text-neutral-0 mb-3",
                    )}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className={cn(
                      "text-(length:--font-size-body-2) text-neutral-0 line-clamp-3",
                    )}
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Benefits;
