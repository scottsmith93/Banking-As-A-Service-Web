import type { Language } from "../../context/useLanguage";
import { getLocale } from "../../locales";

export function translateNavLabel(label: string, language: Language): string {
  const navigation = getLocale(language).navigation as Record<string, string>;
  return navigation[label] ?? label;
}
