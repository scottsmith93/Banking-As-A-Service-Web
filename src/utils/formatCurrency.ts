import type { Language } from "../context/languageStore";

const localeByLanguage: Record<Language, "en-GB" | "fr-FR"> = {
  English: "en-GB",
  French: "fr-FR",
};

const eurFormatters: Record<Language, Intl.NumberFormat> = {
  English: new Intl.NumberFormat(localeByLanguage.English, {
    style: "currency",
    currency: "EUR",
  }),
  French: new Intl.NumberFormat(localeByLanguage.French, {
    style: "currency",
    currency: "EUR",
  }),
};

const wholeEurFormatters: Record<Language, Intl.NumberFormat> = {
  English: new Intl.NumberFormat(localeByLanguage.English, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }),
  French: new Intl.NumberFormat(localeByLanguage.French, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }),
};

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
