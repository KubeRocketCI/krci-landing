import Image from "next/image";
import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";
import { FOOTER_LINKS } from "./constants";

const Footer = ({ translations }: { translations: Translations }) => {
  const t = (key: string) => getTranslationKey(translations, key);

  return (
    <footer
      className={cn("relative bg-background border-t pt-22 pb-5")}
      style={{ borderTopColor: "rgba(198, 19, 247, 0.25)" }}
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
              <div className={cn("space-y-3 max-w-95")}>
                <a
                  href={FOOTER_LINKS.readings.whatIs}
                  className={cn(
                    "block text-body text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.readings.links.whatIs")}
                </a>
                <a
                  href={FOOTER_LINKS.readings.blogs}
                  className={cn(
                    "block text-body text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.readings.links.blogs")}
                </a>
                <a
                  href={FOOTER_LINKS.readings.userGuide}
                  className={cn(
                    "block text-body text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.readings.links.userGuide")}
                </a>
                <a
                  href={FOOTER_LINKS.readings.developerGuide}
                  className={cn(
                    "block text-body text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.readings.links.developerGuide")}
                </a>
                <a
                  href={FOOTER_LINKS.readings.apiReference}
                  className={cn(
                    "block text-body text-neutral-0 hover:text-neutral-20 transition-colors",
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
              <div className={cn("space-y-2.5")}>
                <a
                  href={FOOTER_LINKS.learnMore.github}
                  className={cn(
                    "block text-[length:var(--font-size-body-2)] text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.learnMore.links.github")}
                </a>
                <a
                  href={FOOTER_LINKS.learnMore.artifactHub}
                  className={cn(
                    "block text-[length:var(--font-size-body-2)] text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.learnMore.links.artifactHub")}
                </a>
                <a
                  href={FOOTER_LINKS.learnMore.operatorHub}
                  className={cn(
                    "block text-[length:var(--font-size-body-2)] text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.learnMore.links.operatorHub")}
                </a>
                <a
                  href={FOOTER_LINKS.learnMore.dockerHub}
                  className={cn(
                    "block text-[length:var(--font-size-body-2)] text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.learnMore.links.dockerHub")}
                </a>
                <a
                  href={FOOTER_LINKS.learnMore.blogCategories}
                  className={cn(
                    "block text-[length:var(--font-size-body-2)] text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.learnMore.links.blogCategories")}
                </a>
                <a
                  href={FOOTER_LINKS.learnMore.rssFeed}
                  className={cn(
                    "block text-[length:var(--font-size-body-2)] text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.learnMore.links.rssFeed")}
                </a>
                <a
                  href={FOOTER_LINKS.learnMore.atomFeed}
                  className={cn(
                    "block text-[length:var(--font-size-body-2)] text-neutral-0 hover:text-neutral-20 transition-colors",
                  )}
                >
                  {t("footer.sections.learnMore.links.atomFeed")}
                </a>
              </div>
            </div>

            <div className={cn("lg:max-w-73 space-y-12 w-full lg:w-auto")}>
              <div className={cn("space-y-3")}>
                <h3
                  className={cn(
                    "text-button font-medium bg-gradient-numbers bg-clip-text text-transparent",
                  )}
                >
                  {t("footer.sections.community.title")}
                </h3>
                <div className={cn("flex gap-4")}>
                  <a
                    href={FOOTER_LINKS.community.youtube}
                    className={cn(
                      "w-6 h-6 text-neutral-0 hover:text-neutral-20 transition-colors",
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
                    className={cn(
                      "w-6 h-6 text-neutral-0 hover:text-neutral-20 transition-colors",
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
                    className={cn(
                      "w-6 h-6 text-neutral-0 hover:text-neutral-20 transition-colors",
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

              {/* <div className={cn("space-y-2")}>
                <h3
                  className={cn(
                    "text-button font-medium bg-gradient-numbers bg-clip-text text-transparent"
                  )}
                >
                  Subscribe
                </h3>
                <label
                  className={cn(
                    "block text-[length:var(--font-size-body-2)] text-neutral-0"
                  )}
                >
                  Join our newsletter
                </label>
                <div className={cn("flex")}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={cn(
                      "flex-1 w-full px-3 py-2 bg-neutral-90 border border-neutral-20 rounded-l text-body-2 text-neutral-0 placeholder-neutral-20 focus:outline-none focus:border-neutral-10"
                    )}
                  />
                  <button
                    className={cn(
                      "px-2 py-2 bg-neutral-40 border border-neutral-40 rounded-r text-body text-neutral-0 hover:bg-neutral-30 transition-colors"
                    )}
                  >
                    Subscribe
                  </button>
                </div>
              </div> */}
            </div>
          </div>
          <p className={cn("text-xs text-neutral-40")}>
            {t("footer.copyright").replace(
              "{year}",
              new Date().getFullYear().toString(),
            )}
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
