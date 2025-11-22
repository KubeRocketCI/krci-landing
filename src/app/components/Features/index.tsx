import Image from "next/image";
import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";

interface FeaturesProps {
  translations: Translations;
}

const Features = ({ translations }: FeaturesProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  const featuresData = [
    {
      id: "app-templates",
      title: t("features.items.appTemplates.title"),
      description: t("features.items.appTemplates.description"),
      icon: "/feature-star.svg",
    },
    {
      id: "sso",
      title: t("features.items.sso.title"),
      description: t("features.items.sso.description"),
      icon: "/feature-star.svg",
    },
    {
      id: "open-source",
      title: t("features.items.openSource.title"),
      description: t("features.items.openSource.description"),
      icon: "/feature-star.svg",
    },
    {
      id: "kubernetes",
      title: t("features.items.kubernetes.title"),
      description: t("features.items.kubernetes.description"),
      icon: "/feature-star.svg",
    },
  ];

  return (
    <section className={cn("bg-background pt-13 lg:pt-26 relative")}>
      <Image
        src="/features-bg.png"
        alt="Features Background"
        width={1816}
        height={1588}
        className="hidden top-0 left-0 translate-y-0 -translate-x-[20%] 2xl:translate-0  lg:block absolute 2xl:top-[-30%] 2xl:left-[-17%] pointer-events-none w-full z-1"
        priority
        quality={95}
        sizes="100vw"
      />
      <div className={cn("relative z-1")}>
        <Container>
          <div className={cn("mb-9")}>
            <h2
              className={cn(
                "text-(length:--font-size-h2) leading-10 text-neutral-0 mb-3",
              )}
            >
              {t("features.title")}
            </h2>
            <p className={cn("max-w-115 text-neutral-0")}>
              {t("features.description")}
            </p>
          </div>
          <div className={cn("pt-8")}>
            <div
              className={cn(
                "pl-3 md:pl-8 pr-3 md:pr-6 pt-8 pb-3 lg:max-w-[50%] ml-auto",
              )}
            >
              <div className={cn("space-y-8")}>
                {featuresData.map((feature) => (
                  <div key={feature.id} className={cn("flex gap-3")}>
                    <div className={cn("flex-shrink-0")}>
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={48}
                        height={40}
                        className="w-12 h-10"
                      />
                    </div>

                    <div className={cn("flex-1 space-y-3")}>
                      <h3 className={cn("font-medium text-neutral-0 text-xl")}>
                        {feature.title}
                      </h3>
                      <p className={cn("text-sm text-neutral-0")}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Features;
