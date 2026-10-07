import type { Language } from "../../context/useLanguage";
import { getTranslation } from "../../locales";

export function getNavigationLabel(
  language: Language,
  translationKey: string | undefined,
  fallback: string,
): string {
  if (!translationKey) return fallback;
  const translation = getTranslation(language, translationKey);
  return translation === translationKey ? fallback : translation;
}
