import Image from "next/image";
import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";
import { HeroClient } from "./HeroClient";
import { PathDiagram } from "./PathDiagram";

interface HeroProps {
  translations: Translations;
}

const Hero = ({ translations }: HeroProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  return (
    <section className={cn("relative min-h-svh overflow-hidden bg-background")}>
      <div className="absolute inset-0">
        <Image
          src="/hero-stars.png"
          alt=""
          fill
          className="object-cover object-center pointer-events-none"
          priority
          quality={95}
          sizes="100vw"
        />
      </div>

      <div
        className={cn("relative z-10 flex min-h-svh items-center pt-28 pb-12")}
      >
        <Container className="w-full">
          <div
            className={cn(
              "grid items-center gap-12",
              "lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] xl:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:gap-14",
            )}
          >
            <div>
              <h1
                className={cn(
                  "[background-image:var(--gradient-h1)] bg-clip-text text-transparent",
                  "text-5xl md:text-6xl lg:text-(length:--font-size-h1) font-bold leading-[1] mb-4",
                )}
              >
                {t("hero.title")}
              </h1>

              <p className={cn("text-foreground text-base lg:text-xl mb-4")}>
                {t("hero.description")}
              </p>

              <HeroClient
                contactButtonText={t("hero.contactButton")}
                demoButtonText={t("hero.demoButton")}
                docsLinkText={t("hero.docsLink")}
                docsLinkNewTabText={t("accessibility.newTab")}
              />
            </div>

            <PathDiagram visual={translations.hero.visual} />
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
