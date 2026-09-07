import Box from "carbon-react/lib/components/box";
import {
  HeroIndicatorCard,
  PercentageIndicatorCard,
  QuickLinksCard,
  SectionHeading,
  SimpleStatCard,
} from "./DashboardWidgets";
import {
  additionalFinancialIndicators,
  dashboardQuickLinks,
  formatDashboardEuro,
  performanceIndicators,
  profitLossIndicators,
} from "../../data/dashboard";
import { useLanguage } from "../../context/useLanguage";

export default function DashboardKpiCards() {
  const { language } = useLanguage();
  const isFrench = language === "French";
  const profitTitles: Record<string, string> = {
    "gross-profit": "Bénéfice brut",
    "result-before-tax": "Résultat avant impôts sur les bénéfices",
  };
  const performanceTitles: Record<string, string> = {
    "return-on-sales": "Rentabilité des ventes",
    "return-on-assets": "Rentabilité des actifs",
    "return-on-equity": "Rentabilité des capitaux propres",
  };
  const additionalTitles: Record<string, string> = {
    "available-funds": "Fonds disponibles",
    "working-capital": "Fonds de roulement",
    "staff-costs": "Coûts de personnel",
  };
  const additionalDescriptions: Record<string, string> = {
    "available-funds": "Tient compte de la trésorerie et des fonds bancaires disponibles",
    "working-capital": "Actifs courants moins passifs à court terme",
    "staff-costs": "Affiche les coûts de personnel de l’exercice en cours",
  };
  const breakdownLabels: Record<string, string> = {
    Sales: "Ventes",
    Purchases: "Achats",
    "Operating result": "Résultat d’exploitation",
    "Financial result": "Résultat financier",
    "Exceptional result": "Résultat exceptionnel",
    "Net result": "Résultat net",
    Assets: "Actifs",
    Equity: "Capitaux propres",
  };

  return (
    <Box className="dashboardSections" display="flex" flexDirection="column">
      <Box className="dashboardSection">
        <SectionHeading>{isFrench ? "Indicateurs de résultat" : "Profit and loss indicators"}</SectionHeading>
        <Box className="dashboardSection__grid dashboardSection__grid--2">
          {profitLossIndicators.map((card) => (
            <HeroIndicatorCard
              key={card.id}
              iconType={card.iconType}
              title={isFrench ? profitTitles[card.id] : card.title}
              description={isFrench ? ({
                "gross-profit": "Valeur totale des ventes moins les achats depuis le début de l’année.",
                "result-before-tax": "Résultat d’exploitation, financier et exceptionnel avant impôts depuis le début de l’année.",
              }[card.id] ?? card.description) : card.description}
              value={formatDashboardEuro(card.total)}
              breakdown={card.breakdown.map((line) => ({
                label: isFrench ? breakdownLabels[line.label] ?? line.label : line.label,
                value: formatDashboardEuro(line.value),
              }))}
            />
          ))}
        </Box>
      </Box>

      <Box className="dashboardSection">
        <SectionHeading>{isFrench ? "Indicateurs de performance" : "Performance indicators"}</SectionHeading>
        <Box className="dashboardSection__grid dashboardSection__grid--3">
          {performanceIndicators.map((card) => (
            <PercentageIndicatorCard
              key={card.id}
              title={isFrench ? performanceTitles[card.id] : card.title}
              subtitle={isFrench ? ({
                "return-on-sales": "(Calculé à partir du résultat d’exploitation et des ventes)",
                "return-on-assets": "(Calculé à partir du résultat d’exploitation et des actifs)",
                "return-on-equity": "(Calculé à partir du résultat net et des capitaux propres)",
              }[card.id] ?? card.subtitle) : card.subtitle}
              percentage={card.percentage}
              breakdown={card.breakdown.map((line) => ({
                label: isFrench ? breakdownLabels[line.label] ?? line.label : line.label,
                value: formatDashboardEuro(line.value),
              }))}
            />
          ))}
        </Box>
      </Box>

      <Box className="dashboardSection">
        <Box className="dashboardIndicatorsRow" display="flex">
          <Box className="dashboardIndicatorsRow__main" display="flex" flexDirection="column">
            <SectionHeading>{isFrench ? "Indicateurs financiers complémentaires" : "Additional financial indicators"}</SectionHeading>
            <Box className="dashboardSection__grid dashboardSection__grid--3">
              {additionalFinancialIndicators.map((card) => (
                <SimpleStatCard
                  key={card.id}
                  title={isFrench ? additionalTitles[card.id] : card.title}
                  value={formatDashboardEuro(card.value)}
                  description={isFrench ? additionalDescriptions[card.id] : card.description}
                />
              ))}
            </Box>
          </Box>

          <Box className="dashboardIndicatorsRow__quickLinks" display="flex" flexDirection="column">
            <SectionHeading>{isFrench ? "Liens rapides" : "Quick links"}</SectionHeading>
            <QuickLinksCard links={isFrench ? dashboardQuickLinks.map((link, index) => ({
              ...link,
              label: ["Créer une écriture comptable", "Accéder au rapprochement des comptes", "Voir le rapport du grand livre"][index],
            })) : dashboardQuickLinks} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
