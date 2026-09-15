import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import deDE from "./locales/de-DE.json";
import enGB from "./locales/en-GB.json";
import esES from "./locales/es-ES.json";
import frFR from "./locales/fr-FR.json";
import ptPT from "./locales/pt-PT.json";
import { DEFAULT_LOCALE } from "./locales/languages";

void i18n.use(initReactI18next).init({
  resources: {
    "de-DE": { translation: deDE },
    "en-GB": { translation: enGB },
    "es-ES": { translation: esES },
    "fr-FR": { translation: frFR },
    "pt-PT": { translation: ptPT },
  },
  lng: DEFAULT_LOCALE,
  // Missing translated copy must remain visible as a validation problem rather
  // than silently showing English in another language.
  fallbackLng: false,
  interpolation: { escapeValue: false },
});

export default i18n;
