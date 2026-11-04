import Image from "next/image";
import { Container } from "@/components/Container";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";
import { FOOTER_LINKS } from "./constants";

const Footer = ({ translations }: { translations: Translations }) => {
  const t = (key: string) => getTranslationKey(translations, key);

  return (
    <footer
      className={cn(
        "relative bg-background border-t border-action-purple/25 pt-22 pb-5",
      )}
    >
      <Container>
        <div className={cn("relative z-10 ")}>
          <div
            className={cn(
              "flex flex-wrap lg:flex-nowrap justify-between gap-8 mb-18",
            )}
          >
            <div className={cn("space-y-2 w-full lg:w-auto")}>
              <h3
                className={cn(
                  "text-button font-medium bg-gradient-numbers bg-clip-text text-transparent",
                )}
              >
                {t("footer.sections.readings.title")}
              </h3>
              <div className={cn("max-w-95")}>
                <a
                  href={FOOTER_LINKS.readings.whatIs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex min-h-8 items-center pointer-coarse:min-h-11 text-body text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.readings.links.whatIs")}
                </a>
                <a
                  href={FOOTER_LINKS.readings.blogs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex min-h-8 items-center pointer-coarse:min-h-11 text-body text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.readings.links.blogs")}
                </a>
                <a
                  href={FOOTER_LINKS.readings.userGuide}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex min-h-8 items-center pointer-coarse:min-h-11 text-body text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.readings.links.userGuide")}
                </a>
                <a
                  href={FOOTER_LINKS.readings.developerGuide}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex min-h-8 items-center pointer-coarse:min-h-11 text-body text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.readings.links.developerGuide")}
                </a>
                <a
                  href={FOOTER_LINKS.readings.apiReference}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex min-h-8 items-center pointer-coarse:min-h-11 text-body text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.readings.links.apiReference")}
                </a>
              </div>
            </div>

            <div className={cn("space-y-2 lg:max-w-77 w-full lg:w-auto")}>
              <h3
                className={cn(
                  "text-button font-medium bg-gradient-numbers bg-clip-text text-transparent",
                )}
              >
                {t("footer.sections.learnMore.title")}
              </h3>
              <div>
                <a
                  href={FOOTER_LINKS.learnMore.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex min-h-8 items-center pointer-coarse:min-h-11 text-[length:var(--font-size-body-2)] text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.learnMore.links.github")}
                </a>
                <a
                  href={FOOTER_LINKS.learnMore.artifactHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex min-h-8 items-center pointer-coarse:min-h-11 text-[length:var(--font-size-body-2)] text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.learnMore.links.artifactHub")}
                </a>
                <a
                  href={FOOTER_LINKS.learnMore.operatorHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex min-h-8 items-center pointer-coarse:min-h-11 text-[length:var(--font-size-body-2)] text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.learnMore.links.operatorHub")}
                </a>
                <a
                  href={FOOTER_LINKS.learnMore.dockerHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex min-h-8 items-center pointer-coarse:min-h-11 text-[length:var(--font-size-body-2)] text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.learnMore.links.dockerHub")}
                </a>
                <a
                  href={FOOTER_LINKS.learnMore.blogCategories}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex min-h-8 items-center pointer-coarse:min-h-11 text-[length:var(--font-size-body-2)] text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.learnMore.links.blogCategories")}
                </a>
                <a
                  href={FOOTER_LINKS.learnMore.rssFeed}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex min-h-8 items-center pointer-coarse:min-h-11 text-[length:var(--font-size-body-2)] text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.learnMore.links.rssFeed")}
                </a>
                <a
                  href={FOOTER_LINKS.learnMore.atomFeed}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex min-h-8 items-center pointer-coarse:min-h-11 text-[length:var(--font-size-body-2)] text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.learnMore.links.atomFeed")}
                </a>
              </div>
            </div>

            <div className={cn("lg:max-w-73 w-full lg:w-auto")}>
              <div className={cn("space-y-3")}>
                <h3
                  className={cn(
                    "text-button font-medium bg-gradient-numbers bg-clip-text text-transparent",
                  )}
                >
                  {t("footer.sections.community.title")}
                </h3>
                <div className={cn("-ml-2.5 flex gap-1")}>
                  <a
                    href={FOOTER_LINKS.community.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex size-11 items-center justify-center text-neutral-0 hover:text-neutral-20 transition-colors",
                    )}
                    aria-label="YouTube"
                  >
                    <Image
                      src="/socials/youtube.svg"
                      alt="YouTube"
                      width={24}
                      height={24}
                      className="w-6 h-6 hover:opacity-50"
                    />
                  </a>
                  <a
                    href={FOOTER_LINKS.community.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex size-11 items-center justify-center text-neutral-0 hover:text-neutral-20 transition-colors",
                    )}
                    aria-label="GitHub"
                  >
                    <Image
                      src="/socials/logo-github.svg"
                      alt="GitHub"
                      width={24}
                      height={24}
                      className="w-6 h-6 hover:opacity-50"
                    />
                  </a>
                  <a
                    href={FOOTER_LINKS.community.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex size-11 items-center justify-center text-neutral-0 hover:text-neutral-20 transition-colors",
                    )}
                    aria-label="Medium"
                  >
                    <Image
                      src="/socials/medium-square.svg"
                      alt="Medium"
                      width={24}
                      height={24}
                      className="w-6 h-6 hover:opacity-50"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={cn("space-y-2")}>
            <p className={cn("text-xs text-neutral-40")}>
              {t("footer.copyright").replace(
                "{year}",
                new Date().getFullYear().toString(),
              )}
            </p>
            <div className={cn("flex items-center flex-wrap gap-x-2 text-xs")}>
              <a
                href="/privacy"
                className={cn(
                  "inline-flex min-h-8 items-center pointer-coarse:min-h-11 text-neutral-40 hover:text-neutral-20 transition-colors",
                )}
              >
                {t("footer.legal.privacyPolicy")}
              </a>
              <span className={cn("text-neutral-60")}>•</span>
              <a
                href="/terms"
                className={cn(
                  "inline-flex min-h-8 items-center pointer-coarse:min-h-11 text-neutral-40 hover:text-neutral-20 transition-colors",
                )}
              >
                {t("footer.legal.terms")}
              </a>
              <span className={cn("text-neutral-60")}>•</span>
              <CookieSettingsButton
                translations={t("cookieConsent.settingsButton")}
              />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
