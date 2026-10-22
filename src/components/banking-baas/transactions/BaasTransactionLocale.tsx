import type { ReactNode } from "react";
import I18nProvider from "carbon-react/lib/components/i18n-provider";
import enGB from "carbon-react/lib/locales/en-gb";
import esES from "carbon-react/lib/locales/es-es";
import frFR from "carbon-react/lib/locales/fr-fr";
import deDE from "carbon-react/lib/locales/de-de";
import ptPT from "carbon-react/lib/locales/pt-pt";
import { useLanguage } from "../../../context/useLanguage";

const carbonLocales = { English: enGB, Spanish: esES, French: frFR, German: deDE, Portuguese: ptPT };

export default function BaasTransactionLocale({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  return <I18nProvider locale={carbonLocales[language]}>{children}</I18nProvider>;
}
