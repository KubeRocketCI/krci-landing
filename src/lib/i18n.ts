import fs from "node:fs";
import path from "node:path";
import type { Translations } from "@/types/translations";

export type Locale = "en" | "es";

export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "es"];

export function getTranslations(locale: Locale = defaultLocale): Translations {
  const translationPath = path.join(
    process.cwd(),
    "public",
    "locales",
    locale,
    "common.json",
  );

  try {
    const fileContents = fs.readFileSync(translationPath, "utf8");
    return JSON.parse(fileContents) as Translations;
  } catch (error) {
    console.error(`Error loading translations for locale ${locale}:`, error);
    // Fallback to English if the requested locale fails
    if (locale !== defaultLocale) {
      return getTranslations(defaultLocale);
    }
    return {} as Translations;
  }
}

export function getTranslationKey(
  translations: Translations,
  key: string,
): string {
  const keys = key.split(".");
  let value: unknown = translations;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      console.warn(`Translation key "${key}" not found`);
      return key; // Return the key itself as fallback
    }
  }

  return typeof value === "string" ? value : key;
}
