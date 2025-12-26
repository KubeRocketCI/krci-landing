import { isProduction } from "./env";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track if GA script has been loaded to prevent duplicate loading
let gaScriptLoaded = false;

/**
 * Dynamically loads the Google Analytics script - Basic Consent Mode
 *
 * This function is called ONLY when user explicitly grants analytics consent.
 * No GA scripts are loaded until this function is called, ensuring zero
 * requests to Google before consent (full GDPR compliance).
 */
export const loadGtagScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
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
      resolve();
      return;
    }

    if (!isProduction()) {
      console.log("Google Analytics script loading skipped (development mode)");
      resolve();
      return;
    }

    if (typeof window === "undefined") {
      resolve();
      return;
    }

    // Prevent duplicate script loading
    if (gaScriptLoaded) {
      console.log("Google Analytics script already loaded");
      resolve();
      return;
    }

    try {
      // Initialize dataLayer and gtag function
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push(args);
      };

      // Set consent - analytics granted (user consented), ads denied (we don't use)
      window.gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "granted",
      });

      // Initialize gtag
      window.gtag("js", new Date());
      window.gtag("config", GA_MEASUREMENT_ID, {
        send_page_view: true,
      });

      // Dynamically inject the gtag.js script
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;

      script.onload = () => {
        gaScriptLoaded = true;
        console.log("Google Analytics script loaded successfully");
        resolve();
      };

      script.onerror = () => {
        console.error("Failed to load Google Analytics script");
        reject(new Error("Failed to load Google Analytics script"));
      };

      document.head.appendChild(script);
    } catch (error) {
      console.error("Failed to initialize Google Analytics:", error);
      reject(error);
    }
  });
};

/**
 * Initialize Google Analytics - called when user grants consent
 */
export const initGA = () => {
  if (!isProduction()) {
    console.log(
      "Google Analytics initialized in test mode (no data sent to GA)",
    );
    return;
  }

  // In Basic Mode, initGA triggers the dynamic script loading
  loadGtagScript().catch((error) => {
    console.error("Failed to load GA script:", error);
  });
};

/**
 * Track a page view - only works after consent is granted and script is loaded
 */
export const trackPageView = (path: string, title?: string) => {
  if (!isProduction()) {
    console.log("PageView (test mode):", path);
    return;
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

/**
 * Update consent state - used when user revokes consent
 * Note: In Basic Mode, if user revokes consent, we update the state
 * but the script remains loaded (page refresh will reset)
 */
export const updateGtagConsent = (consentSettings: { analytics: boolean }) => {
  if (!isProduction()) {
    console.log("Consent update (test mode):", consentSettings);
    return;
  }

  if (typeof window !== "undefined" && window.gtag) {
    try {
      window.gtag("consent", "update", {
        analytics_storage: consentSettings.analytics ? "granted" : "denied",
      });
    } catch (error) {
      console.error("Failed to update consent:", error);
    }
  }
};
