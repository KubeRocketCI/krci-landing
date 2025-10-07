import { cn } from "@/lib/utils";
import { getTranslationKey } from "@/lib/i18n";
import { Container } from "@/components/Container";
import Image from "next/image";

interface AboutProps {
  translations: any;
}

const About = ({ translations }: AboutProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  const statisticsData = [
    { value: "< 1", label: t("about.statistics.migrationTime") },
    { value: "2x", label: t("about.statistics.fasterDeploy") },
    { value: "70%", label: t("about.statistics.automatedTasks") },
    { value: "200+", label: t("about.statistics.hoursSaved") },
  ];

  return (
    <section className={cn("bg-background pt-10 pb-17 relative")}>
      <Container>
        <div className={cn("mb-6")}>
          <h2
            className={cn(
              "text-(length:--font-size-h2) leading-10 text-foreground mb-4"
            )}
          >
            {t("about.title")}
          </h2>
          <p className={cn("text-foreground max-w-lg")}>
            {t("about.description")}
          </p>
        </div>

        <div className={cn("flex flex-wrap gap-6")}>
          {statisticsData.map((statistic, index) => (
            <div key={index} className="flex-1">
              <div
                className={cn("text-(length:--font-size-h1)  font-bold mb-1")}
              >
                <span
                  className={cn(
                    "bg-gradient-numbers bg-clip-text text-transparent"
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
