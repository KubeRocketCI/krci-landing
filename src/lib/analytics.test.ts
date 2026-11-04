import { afterEach, describe, expect, it, vi } from "vitest";

interface Script {
  src?: string;
  textContent?: string;
  async?: boolean;
  onload?: () => void;
}

// Production detection and the gtag bootstrap need a window and a document; stub both.
async function loadAnalytics() {
  const gtag = vi.fn();
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST");
  vi.stubGlobal("window", {
    gtag,
    location: {
      hostname: "kuberocketci.io",
      origin: "https://kuberocketci.io",
    },
  });
  vi.stubGlobal("document", {
    title: "Home",
    createElement: (): Script => ({}),
    head: { appendChild: (script: Script) => script.onload?.() },
  });
  vi.resetModules();
  const analytics = await import("./analytics");
  return { analytics, gtag };
}

describe("analytics", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("sends a page_view event for every tracked page", async () => {
    const { analytics, gtag } = await loadAnalytics();
    analytics.initGA();
    analytics.trackPageView("/pricing", "Pricing");
    expect(gtag).toHaveBeenCalledWith("event", "page_view", {
      page_location: "https://kuberocketci.io/pricing",
      page_title: "Pricing",
    });
  });

  it("grants analytics storage again after a revoke", async () => {
    const { analytics, gtag } = await loadAnalytics();
    analytics.initGA();
    analytics.updateGtagConsent({ analytics: false });
    expect(gtag).toHaveBeenLastCalledWith("consent", "update", {
      analytics_storage: "denied",
    });
    analytics.initGA();
    expect(gtag).toHaveBeenLastCalledWith("consent", "update", {
      analytics_storage: "granted",
    });
  });

  it("stays silent before consent", async () => {
    const { analytics, gtag } = await loadAnalytics();
    analytics.trackPageView("/");
    expect(gtag).not.toHaveBeenCalled();
  });
});
