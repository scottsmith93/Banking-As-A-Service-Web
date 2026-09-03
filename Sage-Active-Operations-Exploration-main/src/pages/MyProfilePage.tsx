import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import SubscriptionPlanCard from "../components/profile/SubscriptionPlanCard";
import SubscriptionFooter from "../components/profile/SubscriptionFooter";
import SubscriptionUpgradeDialog from "../components/profile/SubscriptionUpgradeDialog";
import { subscriptionPlans, SUBSCRIPTION_VAT_RATE } from "../data/subscriptionPlans";
import { useSubscription } from "../context/useSubscription";
import { useNavMode } from "../context/useNavMode";
import { ROUTES } from "../routes";

export default function MyProfilePage() {
  const navigate = useNavigate();
  const { activePlanId, setActivePlanId } = useSubscription();
  const { mode, setMode } = useNavMode();
  const defaultPlanId = subscriptionPlans.find((plan) => plan.isActive)?.id ?? subscriptionPlans[0].id;
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [upgradeDialogPlanId, setUpgradeDialogPlanId] = useState<string | null>(null);

  const selectedPlan = subscriptionPlans.find((plan) => plan.id === selectedPlanId) ?? null;
  const upgradeDialogPlan = subscriptionPlans.find((plan) => plan.id === upgradeDialogPlanId) ?? null;
  const currentPlanId = mode === "portal" ? "portal" : activePlanId;
  const monthlyCost = selectedPlan?.priceAmount ?? 0;
  const vatAmount = Math.round(monthlyCost * SUBSCRIPTION_VAT_RATE * 100) / 100;

  return (
    <Box className="pageContent directoryPage myProfilePage">
      <Box className="myProfilePage__content">
        <Box className="directoryPage__intro">
          <Typography variant="h1" as="h1" className="directoryPage__title">
            Manage Sage Active subscription
          </Typography>
          <Typography variant="p" as="p" className="directoryPage__subtitle">
            Manage your Sage Active subscription and see what's included in each plan.
          </Typography>
        </Box>

        <Box className="subscriptionPlans">
          {subscriptionPlans.map((plan) => {
            const state = plan.id === currentPlanId ? "current" : plan.id === selectedPlanId ? "selected" : "default";

            return (
              <SubscriptionPlanCard
                key={plan.id}
                plan={plan}
                state={state}
                onSelect={() => setSelectedPlanId(plan.id)}
                onDeselect={() => setSelectedPlanId(null)}
                onCancelSubscription={() => {
                  // PROTOTYPE: no downgrade flow yet — cancelling just
                  // returns to the original Essentials subscription and
                  // the Essentials-only (non-Operations) nav mode.
                  setActivePlanId(defaultPlanId);
                  setMode("essentials");
                  setSelectedPlanId(null);
                }}
              />
            );
          })}
        </Box>
      </Box>

      <SubscriptionFooter
        monthlyCost={monthlyCost}
        vatAmount={vatAmount}
        subscribeDisabled={!selectedPlan}
        onCancel={() => setSelectedPlanId(null)}
        onSubscribe={() => setUpgradeDialogPlanId(selectedPlanId)}
      />

      <SubscriptionUpgradeDialog
        key={upgradeDialogPlanId ?? "closed"}
        open={upgradeDialogPlan !== null}
        plan={upgradeDialogPlan}
        onClose={() => setUpgradeDialogPlanId(null)}
        onComplete={() => {
          if (upgradeDialogPlanId) {
            setActivePlanId(upgradeDialogPlanId);
          }
          setSelectedPlanId(null);
          setUpgradeDialogPlanId(null);
          // Scale/Control unlock Portal-mode features (inventory, stock
          // tracking, manufacturing) — land back on the Dashboard in that
          // mode so the new "Getting started" tab is right there.
          setMode("portal");
          navigate(ROUTES.home);
        }}
      />
    </Box>
  );
}
