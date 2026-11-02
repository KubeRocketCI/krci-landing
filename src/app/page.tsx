import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { JsonLd, softwareApplicationSchema } from "@/components/JsonLd";
import { getTranslations } from "@/lib/i18n";
import AiFabric from "./components/AiFabric";
import CTA from "./components/CTA";
import Hero from "./components/Hero";
import Platform from "./components/Platform";

export default function HomePage() {
  const translations = getTranslations();

  return (
    <>
      <JsonLd data={softwareApplicationSchema} />
      <Header newTabLabel={translations.accessibility.newTab} />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero translations={translations} />
        <AiFabric translations={translations} />
        <Platform translations={translations} />
        <CTA translations={translations} />
      </main>
      <Footer translations={translations} />
    </>
  );
}
