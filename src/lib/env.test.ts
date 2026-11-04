import { afterEach, describe, expect, it, vi } from "vitest";
import { isProduction } from "./env";

function atHost(hostname: string) {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubGlobal("window", { location: { hostname } });
  return isProduction();
}

describe("isProduction", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("accepts the site, its www alias and Vercel deployments", () => {
    expect(atHost("kuberocketci.io")).toBe(true);
    expect(atHost("www.kuberocketci.io")).toBe(true);
    expect(atHost("krci-landing.vercel.app")).toBe(true);
  });

  it("rejects hosts that merely contain the domain", () => {
    expect(atHost("kuberocketci.io.example.net")).toBe(false);
    expect(atHost("evil-kuberocketci.io")).toBe(false);
    expect(atHost("localhost")).toBe(false);
  });

  it("is false outside a production build", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubGlobal("window", { location: { hostname: "kuberocketci.io" } });
    expect(isProduction()).toBe(false);
  });
});
