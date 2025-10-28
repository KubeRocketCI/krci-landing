import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";
import { Analytics, GAScript } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { ConsentProvider } from "@/lib/consent-context";
import { getTranslations } from "@/lib/i18n";

const font = Alexandria({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KubeRocketCI - Build your delivery rocket",
  description:
    "Boost your delivery with the development culture based on the modern CI/CD stack, golden path and self-service capabilities of the KubeRocketCI.",
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
      marketing: {
        title:
          translations.cookieConsent?.categories?.marketing?.title ||
          "Marketing",
        description:
          translations.cookieConsent?.categories?.marketing?.description ||
          "Marketing cookies",
      },
      functionality: {
        title:
          translations.cookieConsent?.categories?.functionality?.title ||
          "Functionality",
        description:
          translations.cookieConsent?.categories?.functionality?.description ||
          "Functionality cookies",
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
      </head>
      <body className={font.className}>
        <ConsentProvider>
          <main className="overflow-hidden">{children}</main>
          <CookieConsent translations={cookieConsentTranslations} />
          <Analytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
