import { ArrowUpRight, Bot, Check } from "lucide-react";
import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";
import { useCaseGroups } from "./constants";

interface UseCasesProps {
  translations: Translations;
}

const RAIL_GRADIENT =
  "bg-[linear-gradient(to_bottom,var(--color-signal-cyan),var(--color-signal-violet))]";

const UseCases = ({ translations }: UseCasesProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  return (
    <section className={cn("bg-background pt-32 pb-8 lg:pt-40 lg:pb-12")}>
      <Container className="relative z-2">
        <div className={cn("mb-10 lg:mb-20")}>
          <h1
            className={cn(
              "w-fit text-4xl sm:text-5xl lg:text-(length:--font-size-h1) leading-tight mb-6",
              "bg-gradient-h1 bg-clip-text text-transparent",
            )}
          >
            {t("useCases.title")}
          </h1>
          <p
            className={cn(
              "text-(length:--font-size-body) text-neutral-20 max-w-3xl",
            )}
          >
            {t("useCases.description")}
          </p>

          <nav aria-label={t("useCases.jumpLabel")} className="mt-8 md:hidden">
            <ul className="flex flex-wrap gap-2">
              {useCaseGroups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#group-${group.id}`}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-sm border border-neutral-40 px-4",
                      "text-(length:--font-size-body-2) text-neutral-0 transition-colors hover:border-neutral-0",
                    )}
                  >
                    {t(`useCases.groups.${group.id}.title`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={cn("space-y-12 lg:space-y-16")}>
          {useCaseGroups.map((group, index) => {
            const last = index === useCaseGroups.length - 1;

            return (
              <section
                key={group.id}
                id={`group-${group.id}`}
                aria-labelledby={`group-${group.id}-title`}
                className={cn(
                  "grid scroll-mt-32 gap-8 border-t border-neutral-70 pt-8",
                  "md:grid-cols-[1.75rem_minmax(0,5fr)_minmax(0,7fr)] md:gap-x-10 lg:gap-x-14",
                )}
              >
                <div aria-hidden className="relative hidden md:block">
                  <span className="grid size-7 place-items-center rounded-[4px] border border-neutral-40 bg-background text-neutral-0">
                    <Check className="size-4" />
                  </span>
                  <span
                    className={cn(
                      "absolute left-[13px] top-7 w-0.5",
                      RAIL_GRADIENT,
                      last
                        ? "bottom-0 opacity-60"
                        : "-bottom-[5rem] lg:-bottom-[6rem]",
                    )}
                  />
                </div>

                <div className="md:sticky md:top-36 md:self-start">
                  <h2
                    id={`group-${group.id}-title`}
                    className={cn(
                      "text-(length:--font-size-h2) leading-10 text-neutral-0 mb-3",
                    )}
                  >
                    {t(`useCases.groups.${group.id}.title`)}
                  </h2>
                  <p
                    className={cn(
                      "max-w-sm text-(length:--font-size-body) text-neutral-20",
                    )}
                  >
                    {t(`useCases.groups.${group.id}.description`)}
                  </p>
                </div>

                <ul>
                  {group.items.map((item) => {
                    const title = t(`useCases.items.${item.id}.title`);

                    return (
                      <li
                        key={item.id}
                        className={cn(
                          "border-t border-neutral-70 py-6 first:border-t-0 first:pt-0",
                        )}
                      >
                        <h3
                          className={cn(
                            "text-(length:--font-size-subtitle) font-medium text-neutral-0 mb-3",
                          )}
                        >
                          {title}
                        </h3>
                        {item.agents ? (
                          <p className="mb-3 inline-flex items-center gap-1.5 rounded-[4px] border border-signal-cyan px-2 py-0.5 text-(length:--font-size-caption) text-neutral-0">
                            <Bot className="size-4" aria-hidden />
                            {t("useCases.agentTag")}
                          </p>
                        ) : null}
                        <p
                          className={cn(
                            "mb-3 max-w-[60ch] text-(length:--font-size-body) text-neutral-10",
                          )}
                        >
                          {t(`useCases.items.${item.id}.description`)}
                        </p>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex min-h-11 items-center gap-1 text-neutral-0",
                            "underline underline-offset-4 transition-colors hover:text-neutral-20",
                          )}
                        >
                          {t("useCases.linkLabel")}
                          <span className="sr-only">
                            {" "}
                            {title} ({t("accessibility.newTab")})
                          </span>
                          <ArrowUpRight className="size-4" aria-hidden />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default UseCases;
