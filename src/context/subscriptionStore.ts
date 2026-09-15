import { createContext } from "react";

export type SubscriptionContextValue = {
  activePlanId: string;
  setActivePlanId: (planId: string) => void;
};

export const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);
