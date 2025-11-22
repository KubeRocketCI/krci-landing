"use client";

import { useEffect, useState } from "react";
import { useConsent } from "@/lib/consent-context";
import { cn } from "@/lib/utils";

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functionality: boolean;
}

interface CookieConsentTranslations {
  banner: {
    title: string;
    description: string;
    acceptAll: string;
    onlyNecessary: string;
    customize: string;
  };
  preferences: {
    title: string;
    savePreferences: string;
    acceptAll: string;
    onlyNecessary: string;
    privacyLink: string;
    privacyPolicy: string;
  };
  categories: {
    necessary: { title: string; description: string; required: string };
    analytics: { title: string; description: string };
    marketing: { title: string; description: string };
    functionality: { title: string; description: string };
  };
  settingsButton: string;
  closeLabel: string;
}

export function CookieConsent({
  translations,
}: {
  translations: CookieConsentTranslations;
}) {
  const {
    consent,
    isLoading,
    showBanner,
    acceptAll,
    acceptNecessary,
    updateConsent,
  } = useConsent();

  const [showPreferences, setShowPreferences] = useState(false);
  const [tempConsent, setTempConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
    functionality: false,
  });

  useEffect(() => {
    if (consent) {
      setTempConsent(consent);
    }
  }, [consent]);

  if (isLoading || !showBanner) return null;

  const handleSavePreferences = () => {
    updateConsent(tempConsent);
    setShowPreferences(false);
  };

  const categories = [
    {
      id: "necessary" as const,
      title: translations.categories.necessary.title,
      description: translations.categories.necessary.description,
      required: true,
    },
    {
      id: "analytics" as const,
      title: translations.categories.analytics.title,
      description: translations.categories.analytics.description,
      required: false,
    },
    {
      id: "marketing" as const,
      title: translations.categories.marketing.title,
      description: translations.categories.marketing.description,
      required: false,
    },
    {
      id: "functionality" as const,
      title: translations.categories.functionality.title,
      description: translations.categories.functionality.description,
      required: false,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="container mx-auto max-w-6xl">
        <div
          className={cn(
            "bg-gradient-to-br from-black/90 via-neutral-80/95 to-black/90",
            "backdrop-blur-lg border border-purple-500/30 shadow-2xl rounded-lg",
          )}
        >
          {!showPreferences ? (
            // Consent Banner
            <div className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-base font-semibold mb-2 text-neutral-0">
                    {translations.banner.title}
                  </h2>
                  <p className="text-sm text-neutral-20">
                    {translations.banner.description}
                  </p>
                </div>

                <div className="flex flex-row gap-2 sm:gap-3 flex-shrink-0">
                  <button
                    type="button"
                    onClick={acceptAll}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                      "bg-gradient-to-r from-purple-600 to-pink-600",
                      "hover:from-purple-500 hover:to-pink-500",
                      "text-white shadow-lg",
                    )}
                  >
                    {translations.banner.acceptAll}
                  </button>
                  <button
                    type="button"
                    onClick={acceptNecessary}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                      "border border-purple-500/50 text-neutral-0",
                      "hover:bg-purple-500/10 hover:border-purple-500",
                    )}
                  >
                    {translations.banner.onlyNecessary}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPreferences(true)}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                      "text-neutral-20 hover:text-neutral-0",
                      "hover:bg-neutral-70/50",
                    )}
                  >
                    {translations.banner.customize}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Preferences Modal
            <div className="p-3 space-y-3 lg:p-6 lg:space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-neutral-0 lg:text-lg">
                  {translations.preferences.title}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  className={cn(
                    "text-neutral-40 hover:text-neutral-0 transition-colors",
                  )}
                  aria-label={translations.closeLabel}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto pr-2 -mr-2">
                <div className="grid gap-2 lg:gap-4">
                  {categories.map((category) => {
                    const isEnabled = tempConsent[category.id];

                    return (
                      <div
                        key={category.id}
                        className={cn(
                          "flex items-start justify-between p-2 rounded-lg lg:p-4",
                          "bg-neutral-90/50 border border-neutral-70",
                        )}
                      >
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-neutral-0 lg:text-base">
                            {category.title}
                            {category.required && (
                              <span className="ml-2 text-xs text-green-400">
                                {translations.categories.necessary.required}
                              </span>
                            )}
                          </h3>
                          <p className="text-xs mt-1 text-neutral-40 lg:text-sm">
                            {category.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (!category.required) {
                              setTempConsent((prev) => ({
                                ...prev,
                                [category.id]: !isEnabled,
                              }));
                            }
                          }}
                          disabled={category.required}
                          className={cn(
                            "flex-shrink-0 w-12 h-6 rounded-full transition-all duration-200",
                            "focus:outline-none focus:ring-2 focus:ring-purple-500/50",
                            isEnabled
                              ? "bg-gradient-to-r from-purple-600 to-pink-600"
                              : "bg-neutral-60",
                            category.required &&
                              "cursor-not-allowed opacity-75",
                          )}
                        >
                          <div
                            className={cn(
                              "w-5 h-5 bg-white rounded-full transition-transform duration-200",
                              isEnabled ? "translate-x-6" : "translate-x-0.5",
                            )}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-neutral-70 pt-2 lg:pt-4" />

              <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
                <div className="flex flex-row gap-2 lg:gap-3 sm:flex-1">
                  <button
                    type="button"
                    onClick={handleSavePreferences}
                    className={cn(
                      "flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                      "bg-gradient-to-r from-purple-600 to-pink-600",
                      "hover:from-purple-500 hover:to-pink-500",
                      "text-white shadow-lg",
                    )}
                  >
                    {translations.preferences.savePreferences}
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className={cn(
                      "flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                      "border border-purple-500/50 text-neutral-0",
                      "hover:bg-purple-500/10 hover:border-purple-500",
                    )}
                  >
                    {translations.preferences.acceptAll}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={acceptNecessary}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all sm:flex-1",
                    "text-neutral-20 hover:text-neutral-0",
                    "hover:bg-neutral-70/50",
                  )}
                >
                  {translations.preferences.onlyNecessary}
                </button>
              </div>

              <div className="border-t border-neutral-70 pt-2 lg:pt-4" />

              <div className="text-xs text-neutral-40">
                <p>
                  {translations.preferences.privacyLink}{" "}
                  <a
                    href="/privacy"
                    className="text-purple-400 hover:text-purple-300 hover:underline"
                  >
                    {translations.preferences.privacyPolicy}
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Cookie Settings Button for Footer
export function CookieSettingsButton({
  translations,
  className = "",
}: {
  translations: string;
  className?: string;
}) {
  const { showPreferences } = useConsent();

  return (
    <button
      type="button"
      onClick={showPreferences}
      className={cn(
        "text-xs transition-colors",
        "text-neutral-40 hover:text-neutral-20",
        className,
      )}
    >
      {translations}
    </button>
  );
}
