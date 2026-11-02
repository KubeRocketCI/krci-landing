import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";
import CTAButton from "../CTAButton";
import { ContactButton } from "./ContactButton";

interface CTAProps {
  translations: Translations;
  title?: string;
  subtitle?: string;
  contactLocation?: string;
  links?: CTALink[];
}

export interface CTALink {
  href: string;
  label: string;
  // Set for external links; opens in a new tab and is announced to screen readers.
  newTabText?: string;
  github?: boolean;
}

const linkClassName = cn(
  "inline-flex min-h-11 items-center gap-2 text-neutral-0",
  "underline underline-offset-4 transition-colors hover:text-neutral-20",
);

const CTA = ({
  translations,
  title,
  subtitle,
  contactLocation,
  links,
}: CTAProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  return (
    <section
      className={cn("bg-background pt-11 pb-12 lg:pt-23 lg:pb-25 relative")}
    >
      <Container>
        <Image
          src="/cta-bg.png"
          alt=""
          width={1512}
          height={1501}
          className="pointer-events-none w-full h-auto absolute inset-0 -translate-y-1/2 object-cover z-1"
          sizes="100vw"
        />
        <div className={cn("flex flex-col items-center gap-8 relative z-1")}>
          <div className={cn("flex flex-col items-center gap-3 text-center")}>
            <h2
              className={cn(
                "text-(length:--font-size-h2) font-normal text-neutral-0 leading-tight",
                "max-w-[880px]",
              )}
            >
              {title ?? t("cta.title")}
            </h2>
            <p className={cn("max-w-[640px] text-neutral-10")}>
              {subtitle ?? t("cta.subtitle")}
            </p>
          </div>

          <div
            className={cn(
              "flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center",
            )}
          >
            <CTAButton label={t("cta.button")} location="cta_section" />
            {contactLocation ? (
              <ContactButton
                label={t("hero.contactButton")}
                location={contactLocation}
              />
            ) : null}
          </div>

          {links?.length ? (
            <ul
              className={cn(
                "-mt-2 flex flex-wrap items-center justify-center gap-x-8",
              )}
            >
              {links.map((link) => (
                <li key={link.href}>
                  {link.newTabText ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClassName}
                    >
                      {link.github ? (
                        <Github className="size-5" aria-hidden />
                      ) : null}
                      {link.label}
                      <span className="sr-only"> ({link.newTabText})</span>
                      <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  ) : (
                    <Link href={link.href} className={linkClassName}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </section>
  );
};

export default CTA;
