import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics, GAScript } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/JsonLd";
import { ConsentProvider } from "@/lib/consent-context";
import { getTranslations } from "@/lib/i18n";

const font = Alexandria({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KubeRocketCI - The harness for your AI fabric",
  description:
    "One golden path for developers and AI agent fleets: opinionated pipelines, quality gates, and ephemeral environments to validate hypotheses at machine speed.",
  metadataBase: new URL("https://kuberocketci.io"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "KubeRocketCI",
    "CI/CD",
    "Kubernetes",
    "DevOps",
    "Platform Engineering",
    "Golden Path",
    "Self-Service",
    "Cloud Native",
    "AI Agents",
    "AI Fabric",
    "Agentic AI",
    "Agent Experience",
    "Quality Gates",
    "Ephemeral Environments",
    "AI Software Factory",
  ],
  authors: [{ name: "KubeRocketCI" }],
  creator: "KubeRocketCI",
  publisher: "KubeRocketCI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/logo.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kuberocketci.io",
    siteName: "KubeRocketCI",
    title: "KubeRocketCI - The harness for your AI fabric",
    description:
      "One golden path for developers and AI agent fleets: opinionated pipelines, quality gates, and ephemeral environments to validate hypotheses at machine speed.",
    images: [
      {
        url: "/kuberocketci-social-card.png",
        width: 1020,
        height: 615,
        alt: "KubeRocketCI - The harness for your AI fabric",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KubeRocketCI - The harness for your AI fabric",
    description:
      "One golden path for developers and AI agent fleets: opinionated pipelines, quality gates, and ephemeral environments to validate hypotheses at machine speed.",
    images: ["/kuberocketci-social-card.png"],
    creator: "@KubeRocketCI",
    site: "@KubeRocketCI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const translations = getTranslations();

  // Extract cookie consent translations for client component
  const cookieConsentTranslations = {
    banner: {
      title:
        translations.cookieConsent?.banner?.title ||
        "🍪 Cookie Consent Required",
      description:
        translations.cookieConsent?.banner?.description ||
        "We use cookies to enhance your experience.",
      acceptAll: translations.cookieConsent?.banner?.acceptAll || "Accept All",
      onlyNecessary:
        translations.cookieConsent?.banner?.onlyNecessary || "Only Necessary",
      customize: translations.cookieConsent?.banner?.customize || "Customize",
    },
    preferences: {
      title:
        translations.cookieConsent?.preferences?.title || "Cookie Preferences",
      savePreferences:
        translations.cookieConsent?.preferences?.savePreferences ||
        "Save Preferences",
      acceptAll:
        translations.cookieConsent?.preferences?.acceptAll || "Accept All",
      onlyNecessary:
        translations.cookieConsent?.preferences?.onlyNecessary ||
        "Only Necessary",
      privacyLink:
        translations.cookieConsent?.preferences?.privacyLink ||
        "We respect your privacy.",
      privacyPolicy:
        translations.cookieConsent?.preferences?.privacyPolicy ||
        "Privacy Policy",
    },
    categories: {
      necessary: {
        title:
          translations.cookieConsent?.categories?.necessary?.title ||
          "Strictly Necessary",
        description:
          translations.cookieConsent?.categories?.necessary?.description ||
          "Essential cookies",
        required:
          translations.cookieConsent?.categories?.necessary?.required ||
          "[Required]",
      },
      analytics: {
        title:
          translations.cookieConsent?.categories?.analytics?.title ||
          "Analytics",
        description:
          translations.cookieConsent?.categories?.analytics?.description ||
          "Analytics cookies",
      },
    },
    settingsButton:
      translations.cookieConsent?.settingsButton || "🍪 Cookie Settings",
    closeLabel:
      translations.cookieConsent?.closeLabel || "Close cookie preferences",
  };

  return (
    <html lang="en">
      <head>
        <GAScript />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className={font.className}>
        <ConsentProvider>
          <main className="overflow-hidden">{children}</main>
          <CookieConsent translations={cookieConsentTranslations} />
          <Analytics />
        </ConsentProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
