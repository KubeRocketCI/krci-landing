import { Container } from "@/components/Container";
import { getTranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Translations } from "@/types/translations";
import Carousel from "./components/Carousel";

interface TestimonialsProps {
  translations: Translations;
}

const Testimonials = ({ translations }: TestimonialsProps) => {
  const t = (key: string) => getTranslationKey(translations, key);

  const testimonialsData = [
    {
      name: "Brian Clark",
      role: "CTO at TechCorp",
      content:
        "KubeRocketCI has revolutionized our development workflow. The deployment speed increased by 3x and our team productivity soared.",
      avatar: "/testimonials/avatar1.jpg",
    },
    {
      name: "Sarah Johnson",
      role: "DevOps Lead at InnovateLab",
      content:
        "The golden path approach and automated pipelines saved us countless hours. Test test test test test test test test test test test test. Our developers can now focus on building features instead of managing infrastructure.",
      avatar: "/testimonials/avatar2.jpg",
    },
    {
      name: "Michael Chen",
      role: "Engineering Director at CloudScale",
      content:
        "KubeRocketCI's cloud-agnostic approach allowed us to migrate seamlessly between providers. The flexibility and security features are outstanding.",
      avatar: "/testimonials/avatar3.jpg",
    },
    {
      name: "Emily Rodriguez",
      role: "Platform Engineer at DataFlow",
      content:
        "The AI-powered features and health monitoring capabilities have significantly improved our code quality and reduced production incidents.",
      avatar: "/testimonials/avatar4.jpg",
    },
    {
      name: "David Kim",
      role: "Senior Developer at NextGen",
      content:
        "Setting up CI/CD pipelines used to take days. With KubeRocketCI, we're up and running in minutes. The developer experience is exceptional.",
      avatar: "/testimonials/avatar5.jpg",
    },
  ];

  return (
    <section className={cn("bg-background pt-44 pb-15")}>
      <Container>
        <div className={cn("relative")}>
          <h2
            className={cn(
              "text-(length:--font-size-h2) leading-10 text-neutral-0 mb-3",
            )}
          >
            {t("testimonials.title")}
          </h2>
          <p className={cn("max-w-120 text-neutral-0")}>
            {t("testimonials.description")}
          </p>
        </div>

        <Carousel testimonials={testimonialsData} />
      </Container>
    </section>
  );
};

export default Testimonials;
