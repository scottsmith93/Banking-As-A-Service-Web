export const SUPPORTED_LANGUAGES = [
  { id: "English", locale: "en-GB" },
  { id: "Spanish", locale: "es-ES" },
  { id: "French", locale: "fr-FR" },
  { id: "German", locale: "de-DE" },
  { id: "Portuguese", locale: "pt-PT" },
] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number]["id"];
export type LocaleCode = (typeof SUPPORTED_LANGUAGES)[number]["locale"];

export const DEFAULT_LANGUAGE: Language = "English";
export const DEFAULT_LOCALE: LocaleCode = "en-GB";

const localeByLanguage = Object.fromEntries(
  SUPPORTED_LANGUAGES.map(({ id, locale }) => [id, locale]),
) as Record<Language, LocaleCode>;

export function getLocaleCode(language: Language): LocaleCode {
  return localeByLanguage[language];
}
