/**
 * Environment Utilities
 *
 * Centralized environment detection utilities used across the application.
 */

/**
 * List of allowed production domains.
 * Used for client-side validation to prevent analytics and tracking
 * from running on unauthorized domains (e.g., localhost, forks, or malicious clones).
 */
const PRODUCTION_DOMAINS = [
  "kuberocketci.io",
  "www.kuberocketci.io",
  "vercel.app", // Vercel preview deployments
];

/**
 * Checks if the application is running in production environment.
 *
 * **Server-side**: Checks `process.env.NODE_ENV === "production"`
 *
 * **Client-side**: Validates both NODE_ENV and hostname against allowed domains.
 * This prevents analytics/tracking on unauthorized domains.
 *
 * @returns {boolean} true if running in production environment
 *
 * @example
 * ```ts
 * if (isProduction()) {
 *   // Initialize analytics
 *   initGA();
 * }
 * ```
 */
export const isProduction = (): boolean => {
  // Server-side check
  if (typeof window === "undefined") {
    return process.env.NODE_ENV === "production";
  }

  // Client-side check - validate both NODE_ENV and domain
  const isProductionEnv = process.env.NODE_ENV === "production";
  const isAllowedDomain = PRODUCTION_DOMAINS.some((domain) =>
    window.location.hostname.includes(domain),
  );

  return isProductionEnv && isAllowedDomain;
};
