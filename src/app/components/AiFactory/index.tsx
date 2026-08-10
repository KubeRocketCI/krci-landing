import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  GitCommitHorizontal,
  RefreshCcw,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";

interface AiFactoryProps {
  translations: Translations;
}

const AiFactory = ({ translations }: AiFactoryProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  const marketStats = [
    {
      id: "commits",
      value: "275M",
      label: t("aiFactory.market.stats.commits"),
    },
    {
      id: "agent-prs",
      value: "17M",
      label: t("aiFactory.market.stats.agentPRs"),
    },
    {
      id: "ci-minutes",
      value: "2.1B",
      label: t("aiFactory.market.stats.ciMinutes"),
    },
    {
      id: "capacity",
      value: "30x",
      label: t("aiFactory.market.stats.capacity"),
    },
  ];

  const needsData = [
    { id: "harness", Icon: Workflow },
    { id: "qualityGates", Icon: BadgeCheck },
    { id: "guardrails", Icon: ShieldCheck },
    { id: "auditTrail", Icon: GitCommitHorizontal },
    { id: "ephemeral", Icon: RefreshCcw },
    { id: "observability", Icon: Activity },
  ].map(({ id, Icon }) => ({
    id,
    Icon,
    title: t(`aiFactory.needs.items.${id}.title`),
    description: t(`aiFactory.needs.items.${id}.description`),
  }));

  const deliveryData = [
    {
      id: "harness",
      link: "https://docs.kuberocketci.io/docs/use-cases/custom-pipelines-flow",
    },
    {
      id: "qualityGates",
      link: "https://docs.kuberocketci.io/docs/use-cases/autotest-as-quality-gate",
    },
    {
      id: "guardrails",
      link: "https://docs.kuberocketci.io/docs/about-platform",
    },
    {
      id: "auditTrail",
      link: "https://docs.kuberocketci.io/docs/about-platform",
    },
    {
      id: "ephemeral",
      link: "https://docs.kuberocketci.io/docs/use-cases/deploy-application-from-feature-branch",
    },
    {
      id: "observability",
      link: "https://docs.kuberocketci.io/docs/about-platform",
    },
  ].map(({ id, link }) => ({
    id,
    link,
    title: t(`aiFactory.delivery.items.${id}.title`),
    description: t(`aiFactory.delivery.items.${id}.description`),
  }));

  return (
    <>
      <section className={cn("bg-background pt-12 pb-10 lg:pt-24 lg:pb-12")}>
        <Container className="relative z-2">
          <div className={cn("mb-10")}>
            <h1
              className={cn(
                "text-(length:--font-size-h1) leading-tight mb-6",
                "bg-gradient-h1 bg-clip-text text-transparent",
              )}
            >
              {t("aiFactory.title")}
            </h1>
            <p
              className={cn(
                "text-(length:--font-size-body) text-neutral-20 max-w-3xl",
              )}
            >
              {t("aiFactory.description")}
            </p>
          </div>
        </Container>
      </section>

      <section className={cn("bg-background py-8 lg:py-12")}>
        <Container className="relative z-2">
          <div className={cn("mb-9")}>
            <h2
              className={cn(
                "text-(length:--font-size-h2) leading-10 text-neutral-0 mb-3",
              )}
            >
              {t("aiFactory.market.title")}
            </h2>
            <p className={cn("max-w-130 text-neutral-0")}>
              {t("aiFactory.market.description")}
            </p>
          </div>

          <div
            className={cn("grid grid-cols-2 md:flex md:flex-wrap gap-6 mb-3")}
          >
            {marketStats.map((statistic) => (
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
          <p className={cn("text-xs text-neutral-20")}>
            {t("aiFactory.market.statsSource")}
          </p>
        </Container>
      </section>

      <section className={cn("bg-background py-8 lg:py-12")}>
        <Container className="relative z-2">
          <h2
            className={cn(
              "text-(length:--font-size-h2) leading-10 text-neutral-0 mb-3",
            )}
          >
            {t("aiFactory.shift.title")}
          </h2>
          <div className={cn("max-w-3xl mb-9")}>
            <p className={cn("text-neutral-0 mb-4")}>
              {t("aiFactory.shift.paragraph1")}
            </p>
            <p className={cn("text-neutral-0")}>
              {t("aiFactory.shift.paragraph2")}
            </p>
          </div>

          <div
            className={cn(
              "rounded-lg p-[1px] box-shadow-card backdrop-blur-42px",
              "[background-image:var(--gradient-stroke)] bg-size-[150%]",
            )}
          >
            <div
              className={cn(
                "px-6 py-7 rounded-[calc(0.5rem-1px)] bg-gradient-dark-purple",
                "flex flex-col md:flex-row md:items-center gap-4 md:gap-8",
              )}
            >
              <div
                className={cn(
                  "text-(length:--font-size-h1) font-bold shrink-0",
                )}
              >
                <span
                  className={cn(
                    "bg-gradient-numbers bg-clip-text text-transparent",
                  )}
                >
                  {t("aiFactory.shift.warningValue")}
                </span>
              </div>
              <p className={cn("text-neutral-0")}>
                {t("aiFactory.shift.warning")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className={cn("bg-background py-8 lg:py-12")}>
        <Container className="relative z-2">
          <div className={cn("mb-9")}>
            <h2
              className={cn(
                "text-(length:--font-size-h2) leading-10 text-neutral-0 mb-3",
              )}
            >
              {t("aiFactory.needs.title")}
            </h2>
            <p className={cn("max-w-130 text-neutral-0")}>
              {t("aiFactory.needs.description")}
            </p>
          </div>

          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
            )}
          >
            {needsData.map((need) => (
              <div
                key={need.id}
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
                  <div className={cn("mb-6")}>
                    <need.Icon
                      className={cn("text-neutral-0")}
                      size={36}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </div>
                  <h3
                    className={cn(
                      "text-(length:--font-size-subtitle) font-medium text-neutral-0 mb-3",
                    )}
                  >
                    {need.title}
                  </h3>
                  <p
                    className={cn(
                      "text-(length:--font-size-body-2) text-neutral-0",
                    )}
                  >
                    {need.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className={cn("bg-background pt-8 pb-12 lg:pt-12 lg:pb-16")}>
        <Container className="relative z-2">
          <div className={cn("mb-9")}>
            <h2
              className={cn(
                "text-(length:--font-size-h2) leading-10 text-neutral-0 mb-3",
              )}
            >
              {t("aiFactory.delivery.title")}
            </h2>
            <p className={cn("max-w-130 text-neutral-0")}>
              {t("aiFactory.delivery.description")}
            </p>
          </div>

          <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4")}>
            {deliveryData.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "rounded-lg bg-gradient-dark-purple px-6 py-6",
                  "flex flex-col gap-3",
                )}
              >
                <h3
                  className={cn(
                    "text-(length:--font-size-subtitle) font-medium text-neutral-0",
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "text-(length:--font-size-body-2) text-neutral-0",
                  )}
                >
                  {item.description}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1 text-(length:--font-size-body-2)",
                    "text-neutral-20 hover:text-neutral-0 transition-colors mt-auto",
                  )}
                >
                  {t("aiFactory.delivery.linkLabel")}
                  <ArrowUpRight size={16} aria-hidden />
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default AiFactory;
