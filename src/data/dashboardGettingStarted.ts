// MOCK DATA — replace with real API responses
import featureIconItems from "../assets/subscription-flow/feature-icon-items.png";
import featureIconInventory from "../assets/subscription-flow/feature-icon-inventory.png";
import featureIconTracking from "../assets/subscription-flow/feature-icon-tracking.png";
import featureIconManufacturing from "../assets/subscription-flow/feature-icon-manufacturing.png";

export type GettingStartedTask = {
  id: string;
  icon: string;
  title: string;
  description: string;
  actionLabel: string;
};

const baseTasks: GettingStartedTask[] = [
  {
    id: "review-items",
    icon: featureIconItems,
    title: "Review your items",
    description: "We moved your 42 products across. Give them a quick look.",
    actionLabel: "Review items",
  },
  {
    id: "set-up-locations",
    icon: featureIconInventory,
    title: "Set up your locations",
    description: "Add the places you store stock: a shop, a warehouse, a van.",
    actionLabel: "Add a location",
  },
  {
    id: "turn-on-tracking",
    icon: featureIconTracking,
    title: "Turn on stock tracking",
    description: "Start counting what comes in and goes out, in real time.",
    actionLabel: "Turn on tracking",
  },
];

const manufacturingTask: GettingStartedTask = {
  id: "set-up-manufacturing",
  icon: featureIconManufacturing,
  title: "Set up manufacturing",
  description: "Only if you build or assemble what you sell. You can skip this.",
  actionLabel: "Set up manufacturing",
};

// Keyed by SubscriptionPlan.id — only plans with stock capability get a
// checklist; anything else (Starter, Essentials) has nothing to onboard
// into, so the "Getting started" tab simply has no tasks.
export const GETTING_STARTED_TASKS: Record<string, GettingStartedTask[]> = {
  control: baseTasks,
  scale: [...baseTasks, manufacturingTask],
};
