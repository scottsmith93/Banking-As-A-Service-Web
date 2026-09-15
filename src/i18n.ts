import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enGB from "./locales/en-GB.json";
import frFR from "./locales/fr-FR.json";

void i18n.use(initReactI18next).init({
  resources: {
    "en-GB": { translation: enGB },
    "fr-FR": { translation: frFR },
  },
  lng: "en-GB",
  fallbackLng: "en-GB",
  interpolation: { escapeValue: false },
});

export default i18n;
