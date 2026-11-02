import { ArrowUpRight, Check } from "lucide-react";
import { HeroClient } from "@/app/components/Hero/HeroClient";
import { type Change, PathDiagram } from "@/app/components/Hero/PathDiagram";
import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { DOCS_ABOUT_URL, DOCS_BASE_URL, withUtm } from "@/lib/utm";
import type { Translations } from "@/types/translations";

const CHANGES: Change[] = [
  {
    source: "agent",
    service: "checkout-api",
    id: "3b8e",
    outcome: "ship",
    compact: true,
  },
  {
    source: "agent",
    service: "stock-sync",
    id: "d27f",
    outcome: "gates",
    compact: true,
  },
  {
    source: "developer",
    service: "billing-ui",
    id: "91ac",
    outcome: "ship",
    compact: true,
  },
  {
    source: "agent",
    service: "pricing-model",
    id: "6e05",
    outcome: "environment",
    compact: false,
  },
];

interface AiFactoryProps {
  translations: Translations;
}

const AiFactory = ({ translations }: AiFactoryProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  const { stats } = translations.aiFactory.market;
  const leadStat = stats.agentPRs;
  const marketStats = [
    { id: "commits", ...stats.commits },
    { id: "ci-minutes", ...stats.ciMinutes },
    { id: "capacity", ...stats.capacity },
  ];

  const capabilities = [
    { id: "harness", link: `${DOCS_BASE_URL}/use-cases/custom-pipelines-flow` },
    {
      id: "qualityGates",
      link: `${DOCS_BASE_URL}/use-cases/autotest-as-quality-gate`,
    },
    { id: "guardrails", link: DOCS_ABOUT_URL },
    { id: "auditTrail", link: DOCS_ABOUT_URL },
    {
      id: "ephemeral",
      link: `${DOCS_BASE_URL}/use-cases/deploy-application-from-feature-branch`,
    },
    { id: "observability", link: DOCS_ABOUT_URL },
  ].map(({ id, link }) => ({
    id,
    link: withUtm(link, "ai_factory"),
    title: t(`aiFactory.needs.items.${id}.title`),
    need: t(`aiFactory.needs.items.${id}.description`),
    delivery: t(`aiFactory.delivery.items.${id}.description`),
    linkLabel: t(`aiFactory.delivery.items.${id}.linkLabel`),
  }));

  return (
    <>
      <section className={cn("bg-background pt-28 sm:pt-32 lg:pt-40")}>
        <Container className="relative z-2">
          <div
            className={cn(
              "grid items-center gap-12",
              "lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-14",
            )}
          >
            <div>
              <h1
                className={cn(
                  "w-fit text-balance text-4xl sm:text-5xl lg:text-(length:--font-size-h1) leading-tight mb-6",
                  "bg-gradient-h1 bg-clip-text text-transparent",
                )}
              >
                {t("aiFactory.title")}
              </h1>
              <p
                className={cn(
                  "text-(length:--font-size-body) text-neutral-20 max-w-130 mb-8",
                )}
              >
                {t("aiFactory.descriptionLead")}
                <span className={cn("hidden sm:inline")}>
                  {" "}
                  {t("aiFactory.description")}
                </span>
              </p>
              <HeroClient
                contactButtonText={t("hero.contactButton")}
                demoButtonText={t("hero.demoButton")}
                docsLinkText={t("hero.docsLink")}
                docsLinkNewTabText={t("accessibility.newTab")}
                location="ai_factory_hero"
              />
            </div>

            <PathDiagram visual={translations.hero.visual} changes={CHANGES} />
          </div>
        </Container>
      </section>

      <section className={cn("bg-background py-12 lg:py-25")}>
        <Container className="relative z-2">
          <div
            className={cn(
              "grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16",
            )}
          >
            <div>
              <h2
                className={cn(
                  "text-(length:--font-size-h2) leading-10 text-neutral-0 mb-6 text-balance",
                )}
              >
                {t("aiFactory.shift.title")}
              </h2>
              <div className={cn("max-w-130 space-y-4 text-neutral-10")}>
                <p>{t("aiFactory.shift.paragraph1")}</p>
                <p>{t("aiFactory.shift.paragraph2")}</p>
              </div>
            </div>

            <div>
              <p
                className={cn(
                  "mb-6 max-w-130 text-(length:--font-size-body-2) text-neutral-20",
                )}
              >
                {t("aiFactory.market.description")}
              </p>
              <dl
                className={cn("flex flex-col border-b border-neutral-70 pb-6")}
              >
                <div className={cn("flex flex-col")}>
                  <dt
                    className={cn(
                      "order-2 max-w-130 text-(length:--font-size-body) text-neutral-0",
                    )}
                  >
                    {leadStat.label}
                  </dt>
                  <dd
                    className={cn(
                      "order-1 mb-2 text-6xl lg:text-8xl font-bold leading-none",
                    )}
                  >
                    <span
                      className={cn(
                        "bg-gradient-numbers bg-clip-text text-transparent",
                      )}
                    >
                      {leadStat.value}
                    </span>
                  </dd>
                </div>
              </dl>
              <dl className={cn("mt-6 grid gap-5 sm:grid-cols-3 sm:gap-6")}>
                {marketStats.map((statistic) => (
                  <div
                    key={statistic.id}
                    className={cn(
                      "flex items-baseline gap-4 sm:flex-col sm:items-start sm:gap-1",
                    )}
                  >
                    <dt
                      className={cn(
                        "order-2 text-(length:--font-size-body-2) text-neutral-10",
                      )}
                    >
                      {statistic.label}
                    </dt>
                    <dd
                      className={cn(
                        "order-1 w-20 shrink-0 text-3xl font-bold leading-none text-neutral-0 sm:w-auto",
                      )}
                    >
                      {statistic.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p
                className={cn(
                  "mt-6 text-(length:--font-size-caption) text-neutral-20",
                )}
              >
                {t("aiFactory.market.statsSource")}
              </p>

              <div
                className={cn(
                  "mt-10 rounded-lg p-[1px] box-shadow-card backdrop-blur-42px",
                  "[background-image:var(--gradient-stroke)] bg-size-[150%]",
                )}
              >
                <div
                  className={cn(
                    "px-6 py-7 rounded-[calc(0.5rem-1px)] bg-gradient-dark-purple",
                    "flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8",
                  )}
                >
                  <div
                    className={cn(
                      "text-5xl lg:text-(length:--font-size-h1) font-bold leading-none shrink-0",
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
              <p
                className={cn(
                  "mt-3 text-(length:--font-size-caption) text-neutral-20",
                )}
              >
                {t("aiFactory.shift.warningSource")}
              </p>
              <p className={cn("mt-8 max-w-130 text-neutral-0")}>
                {t("aiFactory.shift.survivors")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className={cn("bg-background py-12 lg:py-25")}>
        <Container className="relative z-2">
          <div className={cn("mb-9")}>
            <h2
              className={cn(
                "text-(length:--font-size-h2) leading-10 text-neutral-0 mb-3 text-balance",
              )}
            >
              {t("aiFactory.needs.title")}
            </h2>
            <p className={cn("max-w-130 text-neutral-10")}>
              {t("aiFactory.needs.description")}{" "}
              {t("aiFactory.delivery.description")}
            </p>
          </div>

          <div
            aria-hidden
            className={cn(
              "hidden lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)_minmax(0,5fr)] lg:gap-x-12",
              "pb-3 text-(length:--font-size-body-2) text-neutral-20",
            )}
          >
            <span />
            <span>{t("aiFactory.delivery.needLabel")}</span>
            <span>{t("aiFactory.delivery.deliveryLabel")}</span>
          </div>

          <ul>
            {capabilities.map((item, index) => (
              <li
                key={item.id}
                className={cn(
                  "grid gap-4 border-t border-neutral-70 py-6 lg:py-8",
                  "lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)_minmax(0,5fr)] lg:gap-x-12",
                )}
              >
                <h3
                  className={cn(
                    "text-(length:--font-size-subtitle) font-medium text-neutral-0",
                  )}
                >
                  {item.title}
                </h3>
                <dl className={cn("contents")}>
                  <div>
                    <dt
                      className={cn(
                        "mb-1 text-(length:--font-size-body-2) text-neutral-20 lg:sr-only",
                        index > 0 && "sr-only",
                      )}
                    >
                      {t("aiFactory.delivery.needLabel")}
                    </dt>
                    <dd className={cn("text-neutral-10")}>{item.need}</dd>
                  </div>
                  <div>
                    <dt
                      className={cn(
                        "mb-2 text-(length:--font-size-body-2) text-neutral-20 lg:sr-only",
                        index > 0 && "sr-only",
                      )}
                    >
                      {t("aiFactory.delivery.deliveryLabel")}
                    </dt>
                    <dd className={cn("text-neutral-0")}>
                      <span className={cn("flex gap-3")}>
                        <span
                          aria-hidden
                          className={cn(
                            "grid size-7 shrink-0 place-items-center rounded-sm border border-neutral-40 bg-background",
                          )}
                        >
                          <Check className="size-4" />
                        </span>
                        <span>{item.delivery}</span>
                      </span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "mt-2 ml-10 flex w-fit min-h-11 items-center gap-1",
                          "text-(length:--font-size-body-2) text-neutral-10 underline underline-offset-4",
                          "transition-colors hover:text-neutral-0",
                        )}
                      >
                        {item.linkLabel}
                        <span className="sr-only">
                          {" "}
                          ({t("accessibility.newTab")})
                        </span>
                        <ArrowUpRight className="size-4" aria-hidden />
                      </a>
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
};

export default AiFactory;
