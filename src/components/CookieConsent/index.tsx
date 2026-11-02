"use client";

import { useEffect, useRef, useState } from "react";
import { useConsent } from "@/lib/consent-context";
import { cn } from "@/lib/utils";

const buttonBase =
  "min-h-11 rounded-sm px-4 py-2 text-sm font-medium transition-colors";
const buttonOutline = cn(
  buttonBase,
  "border border-neutral-0 bg-neutral-90 text-neutral-0",
  "hover:[background-image:var(--gradient-button-hover)]",
);

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
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

  const bannerRef = useRef<HTMLElement>(null);
  const [showPreferences, setShowPreferences] = useState(false);
  const [tempConsent, setTempConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
  });

  useEffect(() => {
    if (consent) {
      setTempConsent(consent);
    }
  }, [consent]);

  const visible = !isLoading && showBanner;

  useEffect(() => {
    const root = document.documentElement;
    const element = bannerRef.current;
    if (!visible || !element) return;

    const update = () =>
      root.style.setProperty(
        "--cookie-banner-height",
        `${element.offsetHeight}px`,
      );
    root.dataset.cookieBanner = showPreferences ? "preferences" : "banner";
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => {
      observer.disconnect();
      root.style.removeProperty("--cookie-banner-height");
      delete root.dataset.cookieBanner;
    };
  }, [visible, showPreferences]);

  if (!visible) return null;

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
  ];

  return (
    <section
      ref={bannerRef}
      aria-label={
        showPreferences
          ? translations.preferences.title
          : translations.banner.title
      }
      className="fixed bottom-0 left-0 right-0 z-50 pb-[max(1rem,env(safe-area-inset-bottom))] pr-[max(1rem,env(safe-area-inset-right))] pl-[max(1rem,env(safe-area-inset-left))]"
    >
      <div className="container mx-auto max-w-6xl">
        <div
          className={cn(
            "rounded-lg border border-neutral-70 bg-neutral-90 shadow-card",
          )}
        >
          {!showPreferences ? (
            // Consent Banner
            <div className="p-4 sm:px-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
                <p className="flex-1 text-sm text-neutral-20">
                  {translations.banner.description}{" "}
                  <button
                    type="button"
                    onClick={() => setShowPreferences(true)}
                    className="inline py-2 text-neutral-0 underline underline-offset-2 transition-colors hover:text-neutral-20"
                  >
                    {translations.banner.customize}
                  </button>
                </p>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3 lg:shrink-0">
                  <button
                    type="button"
                    onClick={acceptAll}
                    className={buttonOutline}
                  >
                    {translations.banner.acceptAll}
                  </button>
                  <button
                    type="button"
                    onClick={acceptNecessary}
                    className={buttonOutline}
                  >
                    {translations.banner.onlyNecessary}
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
                    "-mr-2 flex size-11 items-center justify-center",
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

              <div className="max-h-[60dvh] overflow-y-auto pr-2 -mr-2">
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
                              <span className="ml-2 text-xs text-neutral-20">
                                {translations.categories.necessary.required}
                              </span>
                            )}
                          </h3>
                          <p className="text-xs mt-1 text-neutral-20 lg:text-sm">
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
                          role="switch"
                          aria-checked={isEnabled}
                          aria-label={category.title}
                          className={cn(
                            "relative flex-shrink-0 w-12 h-6 rounded-full transition-all duration-200",
                            "before:absolute before:-inset-3 before:content-['']",
                            isEnabled
                              ? "[background-image:var(--gradient-button)]"
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
                      buttonBase,
                      "[background-image:var(--gradient-button)] text-white shadow-button",
                      "hover:[background-image:var(--gradient-button-hover)]",
                      "flex-1",
                    )}
                  >
                    {translations.preferences.savePreferences}
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className={cn(buttonOutline, "flex-1")}
                  >
                    {translations.preferences.acceptAll}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={acceptNecessary}
                  className={cn(buttonOutline, "sm:flex-1")}
                >
                  {translations.preferences.onlyNecessary}
                </button>
              </div>

              <div className="border-t border-neutral-70 pt-2 lg:pt-4" />

              <div className="text-xs text-neutral-20">
                <p>
                  {translations.preferences.privacyLink}{" "}
                  <a
                    href="/privacy"
                    className="text-neutral-0 underline underline-offset-2 hover:text-neutral-20"
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
    </section>
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
        "inline-flex min-h-8 items-center pointer-coarse:min-h-11 text-xs transition-colors",
        "text-neutral-40 hover:text-neutral-20",
        className,
      )}
    >
      {translations}
    </button>
  );
}
