import Image from "next/image";
import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";

interface AboutProps {
  translations: Translations;
}

const About = ({ translations }: AboutProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  const statisticsData = [
    {
      id: "migration-time",
      value: "< 1",
      label: t("about.statistics.migrationTime"),
    },
    {
      id: "faster-deploy",
      value: "2x",
      label: t("about.statistics.fasterDeploy"),
    },
    {
      id: "automated-tasks",
      value: "70%",
      label: t("about.statistics.automatedTasks"),
    },
    {
      id: "hours-saved",
      value: "200+",
      label: t("about.statistics.hoursSaved"),
    },
  ];

  return (
    <section
      className={cn("bg-background pt-5 pb-8 lg:pt-10 lg:pb-17 relative")}
    >
      <Container>
        <div className={cn("mb-6")}>
          <h2
            className={cn(
              "text-(length:--font-size-h2) leading-10 text-foreground mb-4",
            )}
          >
            {t("about.title")}
          </h2>
          <p className={cn("text-foreground max-w-lg")}>
            {t("about.description")}
          </p>
        </div>

        <div className={cn("grid grid-cols-2 md:flex md:flex-wrap gap-6")}>
          {statisticsData.map((statistic) => (
            <div key={statistic.id} className="md:flex-1">
              <div
                className={cn("text-(length:--font-size-h1)  font-bold mb-1")}
              >
                <span
                  className={cn(
                    "bg-gradient-numbers bg-clip-text text-transparent",
                  )}
                >
                  {statistic.value}
                </span>
              </div>
              <p className={cn("text-neutral-0")}>{statistic.label}</p>
            </div>
          ))}
        </div>
      </Container>
      <Image
        src="/about-gradient.png"
        alt="Gradient Background"
        fill
        className="object-contain h-[170%]! left-[-5%]! top-[30%]! pointer-events-none"
        priority
        quality={95}
      />
    </section>
  );
};

export default About;
