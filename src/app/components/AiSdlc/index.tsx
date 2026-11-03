import { HeroClient } from "@/app/components/Hero/HeroClient";
import { Container } from "@/components/Container";
import type { Translations } from "@/types/translations";
import { Story } from "./Story";

const AiSdlc = ({ translations }: { translations: Translations }) => {
  const copy = translations.aiSdlc;

  return (
    <div className="sdlc-story bg-background pb-12 lg:pb-25">
      <Container className="relative z-2 pt-28 sm:pt-32 lg:pt-(--story-top)">
        <Story
          copy={copy}
          hero={
            <>
              <h1 className="sdlc-hero-title mb-6 max-w-[16ch] text-balance bg-gradient-h1 bg-clip-text text-4xl leading-tight text-transparent sm:text-5xl xl:text-(length:--font-size-h1)">
                {copy.title}
              </h1>
              <p className="sdlc-hero-lede mb-8 max-w-160 text-pretty text-(length:--font-size-body) text-neutral-10 lg:text-(length:--font-size-subtitle) lg:leading-relaxed">
                {copy.description}
              </p>
              <p className="-mt-3 mb-6 max-w-160 text-pretty text-(length:--font-size-body-2) text-neutral-20">
                {copy.layersSummary}
              </p>
              <HeroClient
                contactButtonText={translations.hero.contactButton}
                demoButtonText={translations.hero.demoButton}
                docsLinkText={translations.hero.docsLink}
                docsLinkNewTabText={translations.accessibility.newTab}
                location="ai_sdlc_hero"
              />
            </>
          }
        />
      </Container>
    </div>
  );
};

export default AiSdlc;
