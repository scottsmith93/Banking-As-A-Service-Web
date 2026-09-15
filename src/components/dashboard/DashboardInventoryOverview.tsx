import Box from "carbon-react/lib/components/box";
import DashboardLowStockAlert from "./DashboardLowStockAlert";
import DashboardShortagesWidget from "./DashboardShortagesWidget";
import DashboardTopSuppliersWidget from "./DashboardTopSuppliersWidget";
import {
  HeroIndicatorCard,
  PercentageIndicatorCard,
  QuickLinksCard,
  SectionHeading,
  SimpleStatCard,
} from "./DashboardWidgets";
import {
  inventoryPerformanceIndicators,
  inventoryQuickLinks,
  inventoryValueIndicators,
  manufacturingIndicators,
} from "../../data/inventoryOverview";

export default function DashboardInventoryOverview() {
  return (
    <Box className="dashboardSections" display="flex" flexDirection="column">
      <DashboardLowStockAlert />

      <Box className="dashboardSection">
        <SectionHeading>Inventory overview</SectionHeading>
        <Box className="dashboardShortagesRow" display="flex">
          <Box className="dashboardShortagesRow__shortages">
            <DashboardShortagesWidget />
          </Box>
          <Box className="dashboardShortagesRow__side" display="flex" flexDirection="column">
            <DashboardTopSuppliersWidget />
          </Box>
        </Box>
      </Box>

      <Box className="dashboardSection">
        <SectionHeading>Inventory value</SectionHeading>
        <Box className="dashboardSection__grid dashboardSection__grid--2">
          {inventoryValueIndicators.map((card) => (
            <HeroIndicatorCard
              key={card.id}
              iconType={card.iconType}
              title={card.title}
              description={card.description}
              value={card.value}
              breakdown={card.breakdown}
            />
          ))}
        </Box>
      </Box>

      <Box className="dashboardSection">
        <SectionHeading>Inventory performance</SectionHeading>
        <Box className="dashboardSection__grid dashboardSection__grid--3">
          {inventoryPerformanceIndicators.map((card) => (
            <PercentageIndicatorCard
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              percentage={card.percentage}
              breakdown={card.breakdown}
            />
          ))}
        </Box>
      </Box>

      <Box className="dashboardSection">
        <Box className="dashboardIndicatorsRow" display="flex">
          <Box className="dashboardIndicatorsRow__main" display="flex" flexDirection="column">
            <SectionHeading>Manufacturing overview</SectionHeading>
            <Box className="dashboardSection__grid dashboardSection__grid--3">
              {manufacturingIndicators.map((card) => (
                <SimpleStatCard
                  key={card.id}
                  title={card.title}
                  value={card.value}
                  description={card.description}
                />
              ))}
            </Box>
          </Box>

          <Box className="dashboardIndicatorsRow__quickLinks" display="flex" flexDirection="column">
            <SectionHeading>Quick links</SectionHeading>
            <QuickLinksCard links={inventoryQuickLinks} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
