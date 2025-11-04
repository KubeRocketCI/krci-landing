import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";
import { useCasesData } from "./constants";
import { UseCaseTimeline } from "./UseCaseTimeline";

interface UseCasesProps {
  translations: Translations;
}

const UseCases = ({ translations }: UseCasesProps) => {
  const t = (key: string) => getTranslationKey(translations, key);
  return (
    <section className={cn("bg-background pt-12 pb-10 lg:pt-24 lg:pb-20")}>
      <Container className="relative z-2">
        <div className={cn("mb-10")}>
          <h1
            className={cn(
              "text-(length:--font-size-h1) leading-tight mb-6",
              "bg-gradient-h1 bg-clip-text text-transparent"
            )}
          >
            {t("useCases.title")}
          </h1>
          <p
            className={cn(
              "text-(length:--font-size-body) text-neutral-20 max-w-3xl"
            )}
          >
            {t("useCases.description")}
          </p>
        </div>

        <UseCaseTimeline
          data={useCasesData}
          readMoreLabel={t("useCases.readMore")}
        />
      </Container>
    </section>
  );
};

export default UseCases;
