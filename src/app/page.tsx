import { getTranslations } from "@/lib/i18n";
import Hero from "./components/Hero";
import About from "./components/About";
import Benefits from "./components/Benefits";
import Features from "./components/Features";
import KeyDifferentiation from "./components/KeyDifferentiation";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
