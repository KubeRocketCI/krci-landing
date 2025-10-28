/**
 * Global Type Declarations
 *
 * This file contains global type augmentations for the application.
 * @see https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-d-ts.html
 */

/**
 * Google Analytics global types
 * Extends the Window interface with Google Analytics gtag and dataLayer
 */
declare global {
  interface Window {
    /**
     * Google Analytics Data Layer
     * Used to queue analytics events before gtag is loaded
     */
    dataLayer: unknown[];

    /**
     * Google Analytics gtag function
     * Main function for sending analytics events to Google Analytics
     *
     * @example
     * window.gtag('event', 'page_view', { page_path: '/about' });
     */
    gtag: (...args: unknown[]) => void;
  }
}

// This export is required to make this file a module
// Without it, TypeScript treats it as a script and global declarations won't work properly
export {};
