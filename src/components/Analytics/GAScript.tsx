/**
 * GAScript Component - Basic Consent Mode Implementation
 *
 * This component intentionally returns null because we use Basic Consent Mode:
 * - NO scripts are loaded until user explicitly grants consent
 * - Zero requests to Google before consent
 * - Script is dynamically injected via loadGtagScript() in analytics.ts
 *
 * This ensures full GDPR compliance where "decline = zero tracking"
 */
export function GAScript() {
  // Basic Consent Mode: Don't load any GA scripts until consent is granted
  // The script will be dynamically loaded by loadGtagScript() when user accepts
  return null;
}
