import en from "./en-GB.json";
import fr from "./fr-FR.json";
import type { Language } from "../context/languageStore";

const catalogs = { English: en, French: fr } as const;

export function getLocale(language: Language) {
  return catalogs[language];
}

export function getTranslation(language: Language, path: string): string {
  const value = path.split(".").reduce<unknown>((current, key) => {
    if (typeof current !== "object" || current === null) return undefined;
    return (current as Record<string, unknown>)[key];
  }, getLocale(language));
  return typeof value === "string" ? value : path;
}
