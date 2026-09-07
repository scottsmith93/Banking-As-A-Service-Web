import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import Switch from "carbon-react/lib/components/switch";
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "carbon-react/lib/components/tabs/__next__";
import DashboardCopilotCards from "../components/dashboard/DashboardCopilotCards";
import DashboardGettingStarted from "../components/dashboard/DashboardGettingStarted";
import DashboardKpiCards from "../components/dashboard/DashboardKpiCards";
import DashboardSalesPurchases from "../components/dashboard/DashboardSalesPurchases";
import PortalDashboard from "../components/dashboard/PortalDashboard";
import { useNavMode } from "../context/useNavMode";
import { useLanguage } from "../context/useLanguage";
import { useSubscription } from "../context/useSubscription";
import { dashboardGreeting } from "../data/dashboard";
import { GETTING_STARTED_TASKS } from "../data/dashboardGettingStarted";

export default function DashboardPage() {
  const { mode } = useNavMode();
  const { language } = useLanguage();
  const { activePlanId } = useSubscription();
  const [showGettingStarted, setShowGettingStarted] = useState(true);
  const isPortal = mode === "portal";
  const hasGettingStartedTasks = (GETTING_STARTED_TASKS[activePlanId]?.length ?? 0) > 0;
  const showGettingStartedTab = isPortal && hasGettingStartedTasks && showGettingStarted;
  const isFrench = language === "French";

  return (
    <Box className="pageContent dashboardPage">
      <Box className="dashboardPage__greeting">
        <Typography variant="h1" as="h1" className="dashboardPage__greetingTitle">
          {isFrench ? "Bonjour" : "Hello"} {dashboardGreeting.name},
        </Typography>
        <Typography variant="p" as="p" className="dashboardPage__greetingSubtitle">
          {isFrench ? "Une vue simple de votre trésorerie, de votre santé financière et des actions qui nécessitent votre attention. Les indicateurs sont mis à jour toutes les 5 minutes." : dashboardGreeting.subtitle}
        </Typography>
      </Box>

      {isPortal ? (
        <PortalDashboard />
      ) : (
        <>
          <DashboardCopilotCards />

          <Box className="dashboardPage__tabs">
            {isPortal && hasGettingStartedTasks && (
              <Box className="dashboardPage__gettingStartedToggle" display="flex" justifyContent="flex-end">
                <Switch
                  checked={showGettingStarted}
                  onChange={(event) => setShowGettingStarted(event.target.checked)}
                  label={isFrench ? "Afficher l’onglet « Bien démarrer »" : "Show 'Getting started' tab"}
                  labelInline
                  size="small"
                />
              </Box>
            )}

            {/* Remount when the Getting started tab changes so Tabs never points
                at an id with no matching panel. */}
            <Tabs key={`${mode}-${showGettingStartedTab}`}>
              <TabList ariaLabel="Dashboard sections">
                {showGettingStartedTab && (
                <Tab id="getting-started-tab" controls="getting-started-panel" label={isFrench ? "Bien démarrer" : "Getting started"} />
              )}
                {mode !== "essentials" && (
                  <Tab id="accounting-tab" controls="accounting-panel" label={isFrench ? "Comptabilité" : "Accounting"} />
                )}
                <Tab
                  id="sales-purchases-tab"
                  controls="sales-purchases-panel"
                  label={isFrench ? "Ventes et achats" : "Sales and purchases"}
                />
                <Tab id="whats-new-tab" controls="whats-new-panel" label={isFrench ? "Nouveautés" : "What's new"} />
              </TabList>

              {showGettingStartedTab && (
                <TabPanel id="getting-started-panel" tabId="getting-started-tab">
                  <DashboardGettingStarted activePlanId={activePlanId} />
                </TabPanel>
              )}

              {mode !== "essentials" && (
                <TabPanel id="accounting-panel" tabId="accounting-tab">
                  <DashboardKpiCards />
                </TabPanel>
              )}

              <TabPanel id="sales-purchases-panel" tabId="sales-purchases-tab">
                <DashboardSalesPurchases />
              </TabPanel>

              <TabPanel id="whats-new-panel" tabId="whats-new-tab">
                <Box className="dashboardTabPlaceholder">
                  <Typography variant="p" as="p">
                    {isFrench ? "Les mises à jour et annonces produit apparaîtront ici." : "Product updates and announcements will appear here."}
                  </Typography>
                </Box>
              </TabPanel>
            </Tabs>
          </Box>
        </>
      )}
    </Box>
  );
}
