import type { Language } from "../context/languageStore";
import { getLocaleCode, SUPPORTED_LANGUAGES } from "../locales";

function createEurFormatters(
  options: Intl.NumberFormatOptions,
): Record<Language, Intl.NumberFormat> {
  return Object.fromEntries(
    SUPPORTED_LANGUAGES.map(({ id }) => [
      id,
      new Intl.NumberFormat(getLocaleCode(id), options),
    ]),
  ) as Record<Language, Intl.NumberFormat>;
}

const eurFormatters = createEurFormatters({
  style: "currency",
  currency: "EUR",
});

const wholeEurFormatters = createEurFormatters({
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function formatEur(amount: number, language: Language): string {
  return eurFormatters[language].format(amount);
}

export function formatWholeEur(amount: number, language: Language): string {
  return wholeEurFormatters[language].format(amount);
}

export function getEurInputAffix(language: Language): {
  symbol: string;
  position: "before" | "after";
} {
  const parts = eurFormatters[language].formatToParts(0);
  const currencyIndex = parts.findIndex((part) => part.type === "currency");
  const integerIndex = parts.findIndex((part) => part.type === "integer");

  return {
    symbol: parts[currencyIndex]?.value ?? "EUR",
    position: currencyIndex < integerIndex ? "before" : "after",
  };
}
