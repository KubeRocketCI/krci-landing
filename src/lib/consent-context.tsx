"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { initGA, updateGtagConsent } from "./analytics";

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
}

interface ConsentContextType {
  consent: ConsentState | null;
  isLoading: boolean;
  showBanner: boolean;
  acceptAll: () => void;
  acceptNecessary: () => void;
  updateConsent: (newConsent: Partial<ConsentState>) => void;
  showPreferences: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const CONSENT_STORAGE_KEY = "krci-cookie-consent";

const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
};

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    console.log("[GA Debug] ConsentProvider mounted, stored consent:", stored);

    if (stored) {
      try {
        const parsedConsent = JSON.parse(stored);
        setConsent(parsedConsent);
        setShowBanner(false);

        // Basic Consent Mode: Only load GA script if user previously consented
        // No script is loaded if analytics consent was not granted
        if (parsedConsent.analytics) {
          console.log(
            "[GA Debug] Found stored analytics consent, calling initGA",
          );
          initGA();
        }
      } catch (error) {
        console.error("Error parsing stored consent:", error);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }

    setIsLoading(false);
  }, []);

  const saveConsent = (newConsent: ConsentState) => {
    console.log("[GA Debug] saveConsent called", {
      newConsent,
      previousConsent: consent,
      willCallInitGA: newConsent.analytics && !consent?.analytics,
    });

    setConsent(newConsent);
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
    setShowBanner(false);

    // Basic Consent Mode: Load GA script only when user grants analytics consent
    // Don't call updateGtagConsent here - the script handles consent on load
    if (newConsent.analytics && !consent?.analytics) {
      console.log("[GA Debug] User granted analytics consent, calling initGA");
      initGA();
    } else if (!newConsent.analytics && consent?.analytics) {
      // User revoked consent - update the consent state
      updateGtagConsent({
        analytics: false,
      });
    }
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
    });
  };

  const acceptNecessary = () => {
    saveConsent(defaultConsent);
  };

  const updateConsent = (newConsent: Partial<ConsentState>) => {
    const updatedConsent = { ...consent, ...newConsent } as ConsentState;
    saveConsent(updatedConsent);
  };

  const showPreferences = () => {
    setShowBanner(true);
  };

  return (
    <ConsentContext.Provider
      value={{
        consent,
        isLoading,
        showBanner,
        acceptAll,
        acceptNecessary,
        updateConsent,
        showPreferences,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
};
