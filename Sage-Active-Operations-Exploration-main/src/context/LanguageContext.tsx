import { useEffect, useState, type ReactNode } from "react";
import { LanguageContext, type Language } from "./languageStore";
import i18n from "../i18n";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("English");
  const setAppLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    void i18n.changeLanguage(nextLanguage === "French" ? "fr-FR" : "en-GB");
  };

  useEffect(() => {
    void i18n.changeLanguage("en-GB");
  }, []);

  return <LanguageContext.Provider value={{ language, setLanguage: setAppLanguage }}>{children}</LanguageContext.Provider>;
}
