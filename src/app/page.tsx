import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getTranslations } from "@/lib/i18n";
import About from "./components/About";
import Benefits from "./components/Benefits";
import CTA from "./components/CTA";
import Features from "./components/Features";
import Hero from "./components/Hero";
import KeyDifferentiation from "./components/KeyDifferentiation";

export default function HomePage() {
  const translations = getTranslations();

  return (
    <>
      <Header translations={translations} />
      <Hero translations={translations} />
      <About translations={translations} />
      <Benefits translations={translations} />
      <Features translations={translations} />
      <KeyDifferentiation translations={translations} />
      {/* <Testimonials translations={translations} /> */}
      <CTA translations={translations} />
      <Footer translations={translations} />
    </>
  );
}
