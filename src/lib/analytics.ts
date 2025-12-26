import { isProduction } from "./env";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    if (!isProduction()) {
      console.log(
        "GA_MEASUREMENT_ID not defined - this is expected in development",
      );
    } else {
      console.warn(
        "GA_MEASUREMENT_ID is not defined in production. Check NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel environment variables.",
      );
    }
    return;
  }

  const isProd = isProduction();
  const testMode = !isProd;

  if (testMode) {
    console.log(
      "Google Analytics initialized in test mode (no data sent to GA)",
    );
    return; // Don't initialize in non-production environments
  }

  // GA is already initialized by the GAScript component in layout
  console.log("Google Analytics tracking enabled");
};

export const trackPageView = (path: string, title?: string) => {
  if (!isProduction()) {
    console.log("PageView (test mode):", path);
    return; // Don't track in non-production
  }

  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    try {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: path,
        page_title: title || document.title,
      });
    } catch (error) {
      console.error("Failed to track page view:", error);
    }
  }
};

export const initGtagConsent = () => {
  if (!isProduction()) {
    console.log("Consent initialization (test mode) - no tracking enabled");
    return;
  }

  if (typeof window !== "undefined") {
    try {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      };

      // Google Consent Mode v2 - Set ALL defaults to denied
      // This is a fallback in case GAScript hasn't run yet
      // ad_* parameters are permanently denied (we don't use advertising)
      window.gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
        wait_for_update: 500,
      });
    } catch (error) {
      console.error("Failed to initialize consent:", error);
    }
  }
};

export const updateGtagConsent = (consentSettings: { analytics: boolean }) => {
  if (!isProduction()) {
    console.log("Consent update (test mode):", consentSettings);
    return;
  }

  if (typeof window !== "undefined" && window.gtag) {
    try {
      // Only update analytics_storage based on user consent
      // ad_storage, ad_user_data, ad_personalization remain permanently denied
      // since we don't use advertising features
      window.gtag("consent", "update", {
        analytics_storage: consentSettings.analytics ? "granted" : "denied",
      });
    } catch (error) {
      console.error("Failed to update consent:", error);
    }
  }
};
