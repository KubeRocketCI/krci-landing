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
  console.log("[GA Debug] loadGtagScript called");

  return new Promise((resolve, reject) => {
    if (!GA_MEASUREMENT_ID) {
      console.log("[GA Debug] No GA_MEASUREMENT_ID found");
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
      console.log("[GA Debug] Not production, skipping script load");
      console.log("Google Analytics script loading skipped (development mode)");
      resolve();
      return;
    }

    if (typeof window === "undefined") {
      console.log("[GA Debug] Window undefined (SSR), skipping");
      resolve();
      return;
    }

    // Prevent duplicate script loading
    if (gaScriptLoaded) {
      console.log("Google Analytics script already loaded");
      resolve();
      return;
    }

    console.log("[GA Debug] Loading GA script for ID:", GA_MEASUREMENT_ID);

    try {
      // Step 1: Inject inline script to set up dataLayer and gtag
      // Using textContent creates a proper script execution context (same as dangerouslySetInnerHTML)
      const inlineScript = document.createElement("script");
      inlineScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });
        console.log('[GA Debug] Inline gtag script executed');
      `;
      document.head.appendChild(inlineScript);

      console.log("[GA Debug] Inline script injected, loading gtag.js...");

      // Step 2: Load the gtag.js library (processes the queued commands)
      const gtagScript = document.createElement("script");
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      gtagScript.async = true;

      gtagScript.onload = () => {
        gaScriptLoaded = true;
        console.log("[GA Debug] gtag.js loaded, tracking should be active");
        resolve();
      };

      gtagScript.onerror = () => {
        console.error("Failed to load Google Analytics script");
        reject(new Error("Failed to load Google Analytics script"));
      };

      document.head.appendChild(gtagScript);
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
  // Debug: Log initialization attempt
  console.log("[GA Debug] initGA called", {
    isProduction: isProduction(),
    hasMeasurementId: !!GA_MEASUREMENT_ID,
    hostname: typeof window !== "undefined" ? window.location.hostname : "SSR",
    nodeEnv: process.env.NODE_ENV,
  });

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
