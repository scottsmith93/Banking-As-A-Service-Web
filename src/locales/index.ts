import de from "./de-DE.json";
import en from "./en-GB.json";
import es from "./es-ES.json";
import fr from "./fr-FR.json";
import pt from "./pt-PT.json";
import type { Language } from "./languages";

const catalogs = {
  English: en,
  Spanish: es,
  French: fr,
  German: de,
  Portuguese: pt,
} as const;

export {
  DEFAULT_LANGUAGE,
  DEFAULT_LOCALE,
  getLocaleCode,
  SUPPORTED_LANGUAGES,
} from "./languages";
export type { Language, LocaleCode } from "./languages";

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
