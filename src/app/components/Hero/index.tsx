import Image from "next/image";
import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";
import { HeroClient } from "./HeroClient";

interface HeroProps {
  translations: Translations;
}

const Hero = ({ translations }: HeroProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  return (
    <section
      className={cn(
        "h-screen max-h-[1200px] relative overflow-hidden bg-background",
      )}
    >
      <div className="absolute inset-0">
        <Image
          src="/hero-stars.png"
          alt="Stars background"
          fill
          className="object-cover object-center pointer-events-none"
          priority
          quality={95}
          sizes="100vw"
        />
        <div className="absolute inset-0 opacity-20 lg:opacity-100 lg:inset-auto lg:left-[28%] lg:top-[13%] lg:w-[78%] lg:h-[85%]">
          <Image
            src="/hero-rocket.png"
            alt="Rocket"
            fill
            className="object-cover object-center pointer-events-none"
            priority
            quality={95}
            sizes="78vw"
          />
        </div>
      </div>

      <div className={cn("relative z-10 min-h-screen flex items-center")}>
        <Container>
          <div className={cn("container lg:max-w-2xl mt-14")}>
            <h1
              className={cn(
                "[background-image:var(--gradient-h1)] bg-clip-text text-transparent",
                "text-5xl md:text-6xl lg:text-(length:--font-size-h1) font-bold leading-[1] mb-4",
              )}
            >
              {t("hero.title")}
            </h1>

            <p
              className={cn(
                "text-foreground text-base lg:text-xl max-w-[95%] mb-4",
              )}
            >
              {t("hero.description")}
            </p>

            <HeroClient
              contactButtonText={t("hero.contactButton")}
              contactFormTranslations={translations.contactForm}
              demoFormTranslations={translations.demoForm}
            />
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
