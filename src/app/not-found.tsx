import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ctaButtonClassName } from "@/app/components/CTAButton/styles";
import { Container } from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { DOCS_ABOUT_URL, withUtm } from "@/lib/utm";

export default function NotFound() {
  const translations = getTranslations();
  const { notFound, accessibility } = translations;

  return (
    <>
      <Header newTabLabel={accessibility.newTab} />
      <main
        id="main-content"
        tabIndex={-1}
        className="bg-background min-h-screen outline-none"
      >
        <section className="pt-32 pb-20 sm:pt-40">
          <Container>
            <p className="text-(length:--font-size-caption) uppercase tracking-wider text-neutral-20">
              404
            </p>
            <h1
              className={cn(
                "mt-3 text-4xl sm:text-5xl lg:text-(length:--font-size-h1) leading-tight",
                "bg-gradient-h1 bg-clip-text text-transparent",
              )}
            >
              {notFound.title}
            </h1>
            <p className="mt-6 max-w-2xl text-(length:--font-size-body) text-neutral-20">
              {notFound.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/" className={ctaButtonClassName}>
                {notFound.backToHome}
              </Link>
              <a
                href={withUtm(DOCS_ABOUT_URL, "not_found")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-neutral-0 underline underline-offset-4 transition-colors hover:text-neutral-20"
              >
                {notFound.docsLink}
                <span className="sr-only"> ({accessibility.newTab})</span>
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer translations={translations} />
    </>
  );
}
