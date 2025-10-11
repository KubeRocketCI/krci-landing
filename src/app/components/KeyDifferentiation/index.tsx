import Image from "next/image";
import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";

interface KeyDifferentiationProps {
  translations: Translations;
}

const KeyDifferentiation = ({ translations }: KeyDifferentiationProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  const differentiationData = [
    {
      id: "golden-path",
      number: "01",
      title: t("keyDifferentiation.items.goldenPath.title"),
      description: t("keyDifferentiation.items.goldenPath.description"),
      icon: "/keydiff/golden_path.png",
      iconHover: "/keydiff/golden_path_hover.png",
    },
    {
      id: "security",
      number: "02",
      title: t("keyDifferentiation.items.security.title"),
      description: t("keyDifferentiation.items.security.description"),
      icon: "/keydiff/security.png",
      iconHover: "/keydiff/security_hover.png",
    },
    {
      id: "flexibility",
      number: "03",
      title: t("keyDifferentiation.items.flexibility.title"),
      description: t("keyDifferentiation.items.flexibility.description"),
      icon: "/keydiff/flexibility.png",
      iconHover: "/keydiff/flexibility_hover.png",
    },
  ];

  return (
    <section className={cn("bg-background pt-25 pb-17 relative")}>
      <Container className="relative z-2">
        <Image
          src="/radial-bg.png"
          alt="Radial Background"
          width={1326}
          height={1093}
          className="pointer-events-none w-auto h-auto absolute top-0 right-0 object-cover z-1"
          style={{ transform: "translate(50%, -37%)" }}
          priority
          quality={95}
          sizes="100vw"
        />
        <div className={cn("mb-9")}>
          <h2
            className={cn(
              "text-(length:--font-size-h2) leading-10 text-neutral-0 mb-3",
            )}
          >
            {t("keyDifferentiation.title")}
          </h2>
          <p className={cn("max-w-105 text-neutral-0")}>
            {t("keyDifferentiation.description")}
          </p>
        </div>
        <div
          className={cn(
            "flex flex-wrap lg:flex-nowrap gap-4 [&:has(:hover)]:gap-2 relative z-2",
          )}
        >
          {differentiationData.map((diff) => (
            <div
              key={diff.id}
              className={cn(
                "group relative overflow-hidden rounded-lg bg-gradient-dark-purple",
                "px-6 py-8 min-h-[365px] transition-all duration-300 ease-in-out",
                "hover:[background-image:var(--gradient-bright-purple)]",
                "flex-grow flex-shrink-0 basis-full lg:flex-1 lg:hover:flex-[2]",
                "cursor-pointer",
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 w-full h-full opacity-0 lg:opacity-100 lg:group-hover:opacity-0 transition-opacity duration-300",
                )}
              >
                <Image
                  src={diff.icon}
                  alt={diff.title}
                  fill
                  className="object-contain object-bottom-right pointer-events-none"
                />
              </div>

              <div
                className={cn(
                  "absolute inset-0 w-full h-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300",
                )}
              >
                <Image
                  src={diff.iconHover}
                  alt={`${diff.title} hover`}
                  fill
                  className="object-contain object-bottom-right pointer-events-none"
                />
              </div>

              <div className={cn("relative z-10 max-w-75")}>
                <div className={cn("text-xs mb-4 text-neutral-0")}>
                  {diff.number}
                </div>

                <h3 className={cn("text-xl mb-2 text-neutral-0 font-medium")}>
                  {diff.title}
                </h3>

                <p
                  className={cn(
                    "text-(length:--font-size-body-2) text-neutral-0",
                    "opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300",
                    "lg:group-hover:max-h-96 overflow-hidden",
                  )}
                >
                  {diff.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default KeyDifferentiation;
