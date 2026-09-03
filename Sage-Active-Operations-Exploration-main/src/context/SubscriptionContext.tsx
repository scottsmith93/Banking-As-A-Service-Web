import { useEffect, useState, type ReactNode } from "react";
import { SubscriptionContext } from "./subscriptionStore";
import { subscriptionPlans } from "../data/subscriptionPlans";

const STORAGE_KEY = "active-plan-id";

function readStoredPlanId(): string {
  const fallback = subscriptionPlans.find((plan) => plan.isActive)?.id ?? subscriptionPlans[0].id;
  if (typeof window === "undefined") return fallback;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && subscriptionPlans.some((plan) => plan.id === stored) ? stored : fallback;
}

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [activePlanId, setActivePlanId] = useState<string>(readStoredPlanId);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, activePlanId);
  }, [activePlanId]);

  return (
    <SubscriptionContext.Provider value={{ activePlanId, setActivePlanId }}>
      {children}
    </SubscriptionContext.Provider>
  );
}
