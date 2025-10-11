import Image from "next/image";
import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";
import CTAButton from "../CTAButton";

interface CTAProps {
  translations: Translations;
}

const CTA = ({ translations }: CTAProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  return (
    <section className={cn("bg-background pt-23 pb-25 relative")}>
      <Container>
        <Image
          src="/cta-bg.png"
          alt="Call To Action Background"
          width={1512}
          height={1501}
          className="pointer-events-none w-full h-auto absolute inset-0 -translate-y-1/2 object-cover z-1"
          priority
          quality={95}
          sizes="100vw"
        />
        <div className={cn("flex flex-col items-center gap-8")}>
          <h2
            className={cn(
              "text-lg lg:text-(length:--font-size-h2) font-normal text-neutral-0 text-center leading-tight",
              "max-w-[880px]",
            )}
          >
            {t("cta.title")} <br /> {t("cta.subtitle")}
          </h2>

          <CTAButton />
        </div>
      </Container>
    </section>
  );
};

export default CTA;
