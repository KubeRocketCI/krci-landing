import { ArrowRight, RefreshCcw, ShieldCheck, Workflow } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";

interface AiFabricProps {
  translations: Translations;
}

const AiFabric = ({ translations }: AiFabricProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  const statsData = [
    {
      id: "ci-minutes",
      value: "2.1B",
      label: t("aiFabric.stats.ciMinutes"),
    },
    {
      id: "agent-prs",
      value: "17M",
      label: t("aiFabric.stats.agentPRs"),
    },
    {
      id: "capacity",
      value: "30x",
      label: t("aiFabric.stats.capacity"),
    },
    {
      id: "governance",
      value: "40%",
      label: t("aiFabric.stats.governance"),
    },
  ];

  const pillarsData = [
    {
      id: "harness",
      title: t("aiFabric.pillars.harness.title"),
      description: t("aiFabric.pillars.harness.description"),
      Icon: Workflow,
    },
    {
      id: "guardrails",
      title: t("aiFabric.pillars.guardrails.title"),
      description: t("aiFabric.pillars.guardrails.description"),
      Icon: ShieldCheck,
    },
    {
      id: "ephemeral",
      title: t("aiFabric.pillars.ephemeral.title"),
      description: t("aiFabric.pillars.ephemeral.description"),
      Icon: RefreshCcw,
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
            {t("aiFabric.title")}
          </h2>
          <p className={cn("max-w-130 text-neutral-0")}>
            {t("aiFabric.description")}
          </p>
        </div>

        <div className={cn("grid grid-cols-2 md:flex md:flex-wrap gap-6 mb-3")}>
          {statsData.map((statistic) => (
            <div key={statistic.id} className="md:flex-1">
              <div
                className={cn("text-(length:--font-size-h1) font-bold mb-1")}
              >
                <span
                  className={cn(
                    "bg-gradient-numbers bg-clip-text text-transparent",
                  )}
                >
                  {statistic.value}
                </span>
              </div>
              <p
                className={cn(
                  "text-(length:--font-size-body-2) text-neutral-0",
                )}
              >
                {statistic.label}
              </p>
            </div>
          ))}
        </div>
        <p className={cn("text-xs text-neutral-20 mb-9")}>
          {t("aiFabric.statsSource")}
        </p>

        <div
          className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4")}
        >
          {pillarsData.map((pillar) => (
            <div
              key={pillar.id}
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
                  <pillar.Icon
                    className={cn("text-neutral-0")}
                    size={40}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>

                <h3
                  className={cn(
                    "text-(length:--font-size-subtitle) font-medium text-neutral-0 mb-3",
                  )}
                >
                  {pillar.title}
                </h3>
                <p
                  className={cn(
                    "text-(length:--font-size-body-2) text-neutral-0",
                  )}
                >
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={cn("mt-9")}>
          <Link
            href="/ai-factory"
            className={cn(
              "inline-flex items-center gap-2 text-neutral-0 hover:text-neutral-20 transition-colors",
            )}
          >
            {t("aiFabric.learnMore")}
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default AiFabric;
