import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getTranslationKey, getTranslations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Terms & Conditions | KubeRocketCI",
  description:
    "Terms and conditions for using KubeRocketCI platform and website.",
  openGraph: {
    title: "Terms & Conditions | KubeRocketCI",
    description:
      "Terms and conditions for using KubeRocketCI platform and website.",
    type: "website",
  },
};

export default function TermsPage() {
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
          {t("terms.backToHome")}
        </Link>

        <h1
          className={cn(
            "text-4xl md:text-5xl font-bold mb-8 text-center",
            "bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent",
          )}
        >
          {t("terms.title")}
        </h1>

        <div className="space-y-6 text-neutral-20 leading-relaxed">
          <div className="text-center mb-8 text-sm">
            <p>
              <strong>{t("terms.effectiveDate")}</strong> {t("terms.date")}
            </p>
            <p>
              <strong>{t("terms.lastUpdated")}</strong> {t("terms.date")}
            </p>
          </div>

          <div className="bg-neutral-90/50 border border-neutral-70 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-3 text-neutral-0">
              🚀 Project Notice
            </h3>
            <p className="text-sm">
              KubeRocketCI is an open-source CI/CD platform. This is open-source
              software provided "AS IS" with NO commercial backing, warranties,
              or formal support. We're sharing our CI/CD tools with the
              developer community as an open-source contribution!
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              1. Agreement to Terms
            </h2>
            <p className="mb-4">
              Please read these terms and conditions carefully before using our
              open-source project.
            </p>
            <p className="mb-4">
              By accessing our website, downloading KubeRocketCI platform, or
              using our services, you agree to be bound by these Terms &
              Conditions. If you disagree with any part of these terms, you may
              not use our services.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              1.1 Scope of Terms
            </h3>
            <p className="mb-3">These terms apply to:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>
                <strong>Website Usage:</strong> kuberocketci.io and all
                subdomains
              </li>
              <li>
                <strong>Online Services:</strong> Community features,
                newsletters
              </li>
              <li>
                <strong>Content:</strong> Documentation, tutorials, marketing
                materials
              </li>
              <li>
                <strong>Community Participation:</strong> GitHub discussions,
                feedback
              </li>
            </ul>
            <p className="text-sm mb-4">
              <strong>Note:</strong> KubeRocketCI platform software is governed
              by its Apache 2.0 license.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              1.2 Updates to Terms
            </h3>
            <p>
              We may revise these terms from time to time. The most current
              version will always be posted on this page. For significant
              changes, we'll notify users via email or website banner. Continued
              use after changes constitutes acceptance of new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              2. KubeRocketCI Platform Usage
            </h2>

            <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-6 mb-4">
              <h4 className="font-semibold mb-3 text-neutral-0 text-lg">
                CRITICAL: OPEN SOURCE PROJECT DISCLAIMERS
              </h4>
              <div className="text-sm space-y-2">
                <p>
                  <strong>No Commercial Support:</strong> This is an open-source
                  project maintained by the community on a volunteer basis. We
                  provide NO warranties, guarantees, commercial support, or
                  Service Level Agreements (SLAs) of any kind. Use entirely at
                  your own risk.
                </p>
                <p>
                  <strong>Volunteer Basis & No Obligations:</strong> ALL work on
                  this project is done voluntarily. There are ZERO obligations
                  for continued development, bug fixes, user support, backward
                  compatibility, or response to issues.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              2.1 Apache 2.0 License Rights
            </h3>
            <p className="mb-3">
              The KubeRocketCI platform is released under Apache 2.0 License.
              Under the Apache 2.0 License, you may:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>
                Use the software for any purpose, including commercial use
              </li>
              <li>Modify, distribute, and sublicense the software</li>
              <li>Include the software in proprietary products</li>
              <li>Sell products that include the software</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              2.2 Platform Disclaimers
            </h3>
            <p className="mb-3 uppercase font-semibold">
              THE PLATFORM SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
              KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
              AND NON-INFRINGEMENT.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              2.3 User Responsibilities
            </h3>
            <p className="mb-3">
              When using the KubeRocketCI platform, you are responsible for:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Testing thoroughly before any production deployment</li>
              <li>Implementing appropriate security measures</li>
              <li>Backing up your data and configurations</li>
              <li>Compliance with applicable laws and regulations</li>
              <li>Monitoring for security vulnerabilities</li>
              <li>
                Properly attributing the software per Apache 2.0 license
                requirements
              </li>
            </ul>

            <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-6 mb-4">
              <h4 className="font-semibold mb-2 text-neutral-0">
                PRODUCTION USE WARNING
              </h4>
              <p className="text-sm mt-2">
                CRITICAL: If you deploy KubeRocketCI in production environments,
                you do so ENTIRELY at your own risk with ZERO support from
                maintainers. Before ANY production use, you MUST conduct
                thorough testing, perform security audits, implement backup
                procedures, have internal expertise, and accept full
                responsibility for failures.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              3. Website Usage Guidelines
            </h2>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              3.1 Acceptable Use
            </h3>
            <p className="mb-3">
              You may use our website and services for legitimate purposes. You
              agree to:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Provide accurate information in forms and applications</li>
              <li>Respect other users and community members</li>
              <li>
                Follow GitHub community guidelines when participating in
                discussions
              </li>
              <li>
                Use our resources for learning and legitimate business purposes
              </li>
              <li>Comply with applicable laws and regulations</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              3.2 Prohibited Activities
            </h3>
            <p className="mb-3">You may NOT:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Transmit malicious code, viruses, or harmful software</li>
              <li>Harass, abuse, or threaten other users</li>
              <li>Spam our contact forms or community channels</li>
              <li>Scrape our website content for unauthorized purposes</li>
              <li>Violate intellectual property rights</li>
              <li>Impersonate KubeRocketCI team members or affiliates</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              3.3 Content Guidelines
            </h3>
            <p>
              When submitting content (feedback, discussions, bug reports), you
              grant us a non-exclusive license to use, modify, and display that
              content for improving our services. We reserve the right to remove
              content that violates these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              4. Disclaimers & Limitation of Liability
            </h2>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              4.1 Service Disclaimers
            </h3>
            <p className="mb-3 uppercase font-semibold">
              IMPORTANT: READ CAREFULLY
            </p>
            <p className="mb-3">
              Our website and services are provided "AS IS" and "AS AVAILABLE"
              without warranties of any kind, either express or implied,
              including:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>
                Merchantability, fitness for particular purpose, or
                non-infringement
              </li>
              <li>Accuracy, completeness, or usefulness of information</li>
              <li>Uninterrupted, timely, secure, or error-free service</li>
              <li>Results from use of our services or software</li>
              <li>Correction of defects or errors</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              4.2 Limitation of Liability
            </h3>
            <p className="mb-3 uppercase font-semibold">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mb-4">
              <li>
                We shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages
              </li>
              <li>
                This includes damages for loss of profits, data, use, goodwill,
                or other intangible losses
              </li>
              <li>
                These limitations apply whether based on warranty, contract,
                tort, or any other legal theory
              </li>
              <li>
                These limitations apply even if we've been advised of the
                possibility of such damages
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              5. Additional Legal Provisions
            </h2>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              5.1 Age Restrictions
            </h3>
            <p className="mb-4">
              You must be at least 13 years old to use this Service. If you are
              under 18, you represent that you have your parent's or guardian's
              permission to use the Service.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              5.2 Indemnification
            </h3>
            <p className="mb-4">
              You agree to indemnify and hold harmless the KubeRocketCI team,
              contributors, and maintainers from and against any claims,
              damages, obligations, losses, liabilities, costs, or debt arising
              from: (i) your use of the Service; (ii) your violation of these
              Terms; (iii) your violation of any third party right; or (iv) any
              claim that your use caused damage to a third party.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              5.3 Data Backup and Loss
            </h3>
            <p className="mb-4">
              You are solely responsible for backing up any data,
              configurations, or content you create using our platform. We are
              not responsible for any data loss, corruption, or deletion that
              may occur through your use of the Service or platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              6. Governing Law
            </h2>

            <p className="mb-4">
              These Terms and Your use of the Service shall be governed by
              applicable laws. Your use of the Service may also be subject to
              other local, state, national, or international laws.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              6.1 Disputes Resolution
            </h3>
            <p>
              If You have any concern or dispute about the Service, You agree to
              first try to resolve the dispute informally by contacting us
              through our community channels (GitHub issues). Given the
              open-source nature of this project, we'll make reasonable efforts
              to address concerns through community channels, but formal dispute
              resolution processes may be limited. We prioritize community-based
              resolution of issues.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              7. Contact & Questions
            </h2>

            <h3 className="text-xl font-semibold mb-3 text-neutral-0">
              7.1 Questions About This Project?
            </h3>
            <p className="mb-3">
              For questions about these terms or our project:
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
              7.2 Technical Support
            </h3>
            <p>
              For technical questions about the platform, please use our GitHub
              Issues or community channels.{" "}
              <strong>
                Remember: This is an open-source project with no formal support
                obligations!
              </strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-neutral-0">
              8. Risk Assessment for Users
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-950/30 border border-green-800/50 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-neutral-0">LOW RISK:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Learning and development</li>
                  <li>• Testing environments</li>
                  <li>• Community participation</li>
                  <li>• Following open source practices</li>
                </ul>
              </div>

              <div className="bg-yellow-950/30 border border-yellow-800/50 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-neutral-0">
                  MEDIUM RISK:
                </h4>
                <ul className="text-sm space-y-1">
                  <li>• Internal/staging environments</li>
                  <li>• Commercial development (with testing)</li>
                  <li>• Small-scale deployments</li>
                </ul>
              </div>

              <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-neutral-0">HIGH RISK:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Production without enterprise support</li>
                  <li>• Mission-critical systems</li>
                  <li>• Expecting commercial-level support</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="border-t border-neutral-70 pt-6 mt-8 text-center">
            <p className="text-sm text-neutral-40">
              These terms were last updated on January 1, 2025.
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
