import { useEffect, useState, type ReactNode } from "react";
import { LanguageContext, type Language } from "./languageStore";
import i18n from "../i18n";
import {
  DEFAULT_LANGUAGE,
  DEFAULT_LOCALE,
  getLocaleCode,
} from "../locales/languages";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const setAppLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    void i18n.changeLanguage(getLocaleCode(nextLanguage));
  };

  useEffect(() => {
    void i18n.changeLanguage(DEFAULT_LOCALE);
  }, []);

  return <LanguageContext.Provider value={{ language, setLanguage: setAppLanguage }}>{children}</LanguageContext.Provider>;
}
