import { createContext } from "react";

export type Language = "English" | "French";

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
