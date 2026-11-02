import { ArrowUpRight, Github } from "lucide-react";
import { Container } from "@/components/Container";
import { FOOTER_LINKS } from "@/components/Footer/constants";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";

interface PlatformProps {
  translations: Translations;
}

const ITEM_KEYS = ["goldenPath", "gates", "openSource", "quickStart"] as const;

const Platform = ({ translations }: PlatformProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  return (
    <section className={cn("bg-background py-12 lg:py-25")}>
      <Container className="relative z-2">
        <div className={cn("mb-9")}>
          <h2
            className={cn(
              "text-(length:--font-size-h2) leading-10 text-neutral-0 mb-3",
            )}
          >
            {t("platform.title")}
          </h2>
          <p className={cn("max-w-130 text-neutral-0")}>
            {t("platform.description")}
          </p>
        </div>

        <ul className={cn("grid gap-x-16 gap-y-10 md:grid-cols-2")}>
          {ITEM_KEYS.map((key) => (
            <li key={key} className={cn("border-t border-neutral-70 pt-6")}>
              <h3
                className={cn(
                  "text-(length:--font-size-subtitle) font-medium text-neutral-0 mb-3",
                )}
              >
                {t(`platform.items.${key}.title`)}
              </h3>
              <p
                className={cn(
                  "max-w-[60ch] text-(length:--font-size-body) text-neutral-10",
                )}
              >
                {t(`platform.items.${key}.description`)}
              </p>
            </li>
          ))}
        </ul>

        <a
          href={FOOTER_LINKS.community.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-10 inline-flex min-h-11 items-center gap-2 text-neutral-0",
            "underline underline-offset-4 transition-colors hover:text-neutral-20",
          )}
        >
          <Github className="size-5" aria-hidden />
          {t("platform.githubLink")}
          <span className="sr-only"> ({t("accessibility.newTab")})</span>
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </Container>
    </section>
  );
};

export default Platform;
