import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getTranslationKey, getTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy | KubeRocketCI",
  description:
    "Learn how KubeRocketCI collects, uses, and protects your personal information.",
  openGraph: {
    title: "Privacy Policy | KubeRocketCI",
    description:
      "Learn how KubeRocketCI collects, uses, and protects your personal information.",
    type: "website",
  },
};

export default function PrivacyPage() {
  const translations = getTranslations();
  const t = (key: string) => getTranslationKey(translations, key);

  return (
    <div className="min-h-screen bg-background">
      <Header translations={translations} />

      <div className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
        {/* Breadcrumb Navigation */}
        <Link
          href="/"
          className={cn(
            "inline-flex items-center mb-8 text-sm text-neutral-40 hover:text-neutral-20 transition-colors",
          )}
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("privacy.backToHome")}
        </Link>

        <h1
          className={cn(
            "text-4xl md:text-5xl font-bold mb-8 text-center",
            "bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent",
          )}
        >
          {t("privacy.title")}
        </h1>

        <div className="space-y-6 text-neutral-20 leading-relaxed">
          <div className="text-center mb-8 text-sm">
            <p>
              <strong>{t("privacy.effectiveDate")}</strong> {t("privacy.date")}
            </p>
            <p>
              <strong>{t("privacy.lastUpdated")}</strong> {t("privacy.date")}
            </p>
          </div>

          <div className="bg-neutral-90/50 border border-neutral-70 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-3 text-neutral-0">
              Project Notice
            </h3>
            <p className="text-sm">
              KubeRocketCI is an open-source platform developed by the community
              for the community. We collect only essential data and prioritize
              privacy as fellow developers who understand data protection
              concerns.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              1. Introduction
            </h2>
            <p>
              This Privacy Policy describes our policies and procedures on the
              collection, use and disclosure of your information when you use
              our open-source platform and tells you about your privacy rights
              and how the law protects you.
            </p>
            <p className="mt-3">
              We use your personal data to provide and improve our open-source
              initiative. By using the Service, you agree to the collection and
              use of information in accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              2. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              2.1 Personal Data
            </h3>
            <p className="mb-3">
              When using our Service, we may ask you to provide certain
              personally identifiable information for specific purposes:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Email address (for newsletter, community participation)</li>
              <li>Name (for community participation)</li>
              <li>Company/organization (optional, for context)</li>
              <li>GitHub username (for community participation)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              2.2 Usage Data
            </h3>
            <p className="mb-3">
              Usage Data is collected automatically when using the Service:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Your Device's Internet Protocol address (IP address)</li>
              <li>Browser type and version</li>
              <li>Pages of our Service that you visit</li>
              <li>Time and date of your visit</li>
              <li>Time spent on those pages</li>
              <li>Unique device identifiers and other diagnostic data</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              2.3 Cookies and Tracking
            </h3>
            <p className="mb-3">
              We use Cookies and similar tracking technologies:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <strong>Necessary Cookies:</strong> Essential for website
                functionality
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Website analytics tracking
              </li>
              <li>
                <strong>Functionality Cookies:</strong> Remember your
                preferences
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              3. How We Use Your Personal Data
            </h2>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              3.1 Website Improvement
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Provide and maintain our Service</li>
              <li>Monitor usage to improve user experience</li>
              <li>Analyze which content is most helpful</li>
              <li>Fix bugs and optimize performance</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              3.2 Community Building
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Send updates about the project (with consent)</li>
              <li>Respond to your questions and feedback</li>
              <li>Facilitate community discussions</li>
            </ul>

            <div className="bg-neutral-90/50 border border-neutral-70 rounded-lg p-6 my-6">
              <h4 className="font-semibold mb-2 text-neutral-0">
                We do NOT use your data for:
              </h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Commercial advertising or marketing</li>
                <li>Selling, renting, or trading to third parties</li>
                <li>Building user profiles for commercial purposes</li>
                <li>Any tracking beyond basic website analytics</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              4. Information Sharing
            </h2>

            <div className="bg-neutral-90/50 border border-neutral-70 rounded-lg p-6 mb-4">
              <p className="font-medium">
                We do not sell your personal information.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              4.1 Service Providers
            </h3>
            <p className="mb-3">
              We share information with trusted service providers who help us
              operate:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Analytics providers: Website analytics</li>
              <li>Hosting providers: Website hosting and performance</li>
              <li>GitHub: Code repository and community features</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              4.2 Legal Requirements
            </h3>
            <p className="mb-4">
              We may disclose information if required by law or to protect
              rights and safety.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              5. Data Security & Retention
            </h2>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              5.1 Security Measures
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>HTTPS encryption for all data transmission</li>
              <li>Secure hosting with industry-standard protections</li>
              <li>Access controls and authentication for admin systems</li>
              <li>Regular security updates and monitoring</li>
              <li>Data minimization - we only collect what we need</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              5.2 Data Retention
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Usage Data: As required by analytics provider</li>
              <li>
                Email Addresses: Until you unsubscribe or request deletion
              </li>
              <li>
                Community Contributions: As long as relevant to the project
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              6. Your Rights & Choices
            </h2>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              6.1 Your Control Over Data
            </h3>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>
                <strong>Cookie Settings:</strong> Control analytics tracking
                through your browser settings
              </li>
              <li>
                <strong>Email Communications:</strong> Unsubscribe from any
                emails using the link provided
              </li>
              <li>
                <strong>Third-Party Platforms:</strong> For GitHub or other
                platforms, contact them directly
              </li>
              <li>
                <strong>Questions:</strong> Contact us through GitHub issues for
                privacy-related questions
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              7. Contact Us
            </h2>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              7.1 Privacy Requests
            </h3>
            <p className="mb-3">
              For questions about this policy or to exercise your privacy
              rights, contact us:
            </p>
            <div className="bg-neutral-90/50 border border-neutral-70 rounded-lg p-6 mb-4">
              <p>
                <strong>GitHub:</strong> Open an issue in our repository
                <br />
                <strong>Website:</strong>{" "}
                <a
                  href="https://docs.kuberocketci.io"
                  className="text-purple-400 hover:text-purple-300"
                >
                  docs.kuberocketci.io
                </a>
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              7.2 Policy Updates
            </h3>
            <p className="mb-3">
              We may update this privacy policy from time to time. When we do:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>We'll post the updated policy on this page</li>
              <li>We'll update the "Last Updated" date at the top</li>
              <li>
                For significant changes, we'll notify through community channels
              </li>
              <li>
                Your continued use constitutes acceptance of the updated policy
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              7.3 Open Source Commitment
            </h3>
            <p>
              As an open-source project, we believe in transparency and global
              developer collaboration. Our privacy practices align with our
              commitment to open development, minimal data collection, and
              respect for developers' privacy worldwide.
            </p>
          </section>

          <div className="border-t border-neutral-70 pt-6 mt-8 text-center">
            <p className="text-sm text-neutral-40">
              This privacy policy was last updated on January 1, 2025.
            </p>
            <p className="text-sm text-neutral-40 mt-2">
              Open-source project supporting global CI/CD collaboration
            </p>
          </div>
        </div>
      </div>

      <Footer translations={translations} />
    </div>
  );
}
