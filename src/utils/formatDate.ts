import type { Language } from "../locales";
import { getLocaleCode, SUPPORTED_LANGUAGES } from "../locales";

const dateFormatters = Object.fromEntries(
  SUPPORTED_LANGUAGES.map(({ id }) => [
    id,
    new Intl.DateTimeFormat(getLocaleCode(id), {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }),
  ]),
) as Record<Language, Intl.DateTimeFormat>;

export function formatDate(date: string, language: Language): string {
  return dateFormatters[language].format(new Date(`${date}T00:00:00Z`));
}
