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

export default function DashboardKpiCards() {
  return (
    <Box className="dashboardSections" display="flex" flexDirection="column">
      <Box className="dashboardSection">
        <SectionHeading>Profit and loss indicators</SectionHeading>
        <Box className="dashboardSection__grid dashboardSection__grid--2">
          {profitLossIndicators.map((card) => (
            <HeroIndicatorCard
              key={card.id}
              iconType={card.iconType}
              title={card.title}
              description={card.description}
              value={formatDashboardEuro(card.total)}
              breakdown={card.breakdown.map((line) => ({
                label: line.label,
                value: formatDashboardEuro(line.value),
              }))}
            />
          ))}
        </Box>
      </Box>

      <Box className="dashboardSection">
        <SectionHeading>Performance indicators</SectionHeading>
        <Box className="dashboardSection__grid dashboardSection__grid--3">
          {performanceIndicators.map((card) => (
            <PercentageIndicatorCard
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              percentage={card.percentage}
              breakdown={card.breakdown.map((line) => ({
                label: line.label,
                value: formatDashboardEuro(line.value),
              }))}
            />
          ))}
        </Box>
      </Box>

      <Box className="dashboardSection">
        <Box className="dashboardIndicatorsRow" display="flex">
          <Box className="dashboardIndicatorsRow__main" display="flex" flexDirection="column">
            <SectionHeading>Additional financial indicators</SectionHeading>
            <Box className="dashboardSection__grid dashboardSection__grid--3">
              {additionalFinancialIndicators.map((card) => (
                <SimpleStatCard
                  key={card.id}
                  title={card.title}
                  value={formatDashboardEuro(card.value)}
                  description={card.description}
                />
              ))}
            </Box>
          </Box>

          <Box className="dashboardIndicatorsRow__quickLinks" display="flex" flexDirection="column">
            <SectionHeading>Quick links</SectionHeading>
            <QuickLinksCard links={dashboardQuickLinks} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
