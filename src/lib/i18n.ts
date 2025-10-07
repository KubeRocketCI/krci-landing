import fs from "fs";
import path from "path";

export type Locale = "en" | "es";

export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "es"];

export function getTranslations(locale: Locale = defaultLocale) {
  const translationPath = path.join(
    process.cwd(),
    "public",
    "locales",
    locale,
    "common.json"
  );

  try {
    const fileContents = fs.readFileSync(translationPath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading translations for locale ${locale}:`, error);
    // Fallback to English if the requested locale fails
    if (locale !== defaultLocale) {
      return getTranslations(defaultLocale);
    }
    return {};
  }
}

export function getTranslationKey(translations: any, key: string): string {
  const keys = key.split(".");
  let value = translations;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key "${key}" not found`);
      return key; // Return the key itself as fallback
    }
  }

  return typeof value === "string" ? value : key;
}
