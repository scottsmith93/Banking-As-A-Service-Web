// MOCK DATA — replace with real API responses
import featureIconItems from "../assets/subscription-flow/feature-icon-items.png";
import featureIconInventory from "../assets/subscription-flow/feature-icon-inventory.png";
import featureIconManufacturing from "../assets/subscription-flow/feature-icon-manufacturing.png";

export type UpgradeFeature = {
  icon: string;
  title: string;
  description: string;
  pillLabel: string;
};

export type UpgradeChange = {
  label: string;
  title: string;
  description: string;
};

export type SubscriptionUpgradeCopy = {
  stepOneTitle: string;
  stepOneDescription: string;
  features: UpgradeFeature[];
  stepTwoTitle: string;
  changes: UpgradeChange[];
};

const stockFeatures: UpgradeFeature[] = [
  {
    icon: featureIconItems,
    title: "Organise what you sell",
    description: "Manage products, prices, discounts and variants in one clean list. No more spreadsheets.",
    pillLabel: "Items included",
  },
  {
    icon: featureIconInventory,
    title: "Know what you have",
    description: "Track stock across locations, follow every movement, and never run out unexpectedly again.",
    pillLabel: "Inventory included",
  },
];

const manufacturingFeature: UpgradeFeature = {
  icon: featureIconManufacturing,
  title: "Manage production",
  description:
    "Only if you build or assemble what you sell. You can enable this any time — you don't have to decide today.",
  pillLabel: "Manufacturing included",
};

const stockChanges: UpgradeChange[] = [
  {
    label: "Products",
    title: "Your products become Items",
    description:
      "Everything you've already set up carries over. We just call them Items now, with more fields available.",
  },
  {
    label: "Stock flow",
    title: "Stock gets a default location",
    description: "Your current stock will be assigned to a default location. You can add more locations later.",
  },
];

// Scale/Advanced is the only tier that unlocks manufacturing, so its
// "what changes" step calls that out explicitly instead of the generic
// stock-only copy above.
const manufacturingChanges: UpgradeChange[] = [
  {
    label: "Items",
    title: "Products can now be marked as Manufactured Items",
    description:
      "Products you manufacture can now be configured with Bills of Materials, components and production settings.",
  },
  {
    label: "Stock Flow",
    title: "Stock gets a default location",
    description:
      "Your current stock will be assigned to a default location, ready for more advanced inventory processes.",
  },
  {
    label: "Manufacturing",
    title: "A new area to manage manufacturing and assembly",
    description:
      "Create Bills of Materials, plan production and track the assembly of products from raw materials to finished goods.",
  },
];

const upgradeStepOneCopy: Pick<SubscriptionUpgradeCopy, "stepOneTitle" | "stepOneDescription" | "stepTwoTitle"> = {
  stepOneTitle: "Ready to keep proper track of your stock?",
  stepOneDescription:
    "You just tried to track stock in more than one place. That's a great sign your business is growing — and it needs a bit more than your current plan can offer.",
  stepTwoTitle: "What changes and what doesn't",
};

// Keyed by SubscriptionPlan.id — only plans with a genuine "what you'll get"
// story (Control, Scale) get bespoke copy; anything else falls back to
// DEFAULT_UPGRADE_COPY below.
export const SUBSCRIPTION_UPGRADE_COPY: Record<string, SubscriptionUpgradeCopy> = {
  control: { ...upgradeStepOneCopy, features: stockFeatures, changes: stockChanges },
  scale: {
    ...upgradeStepOneCopy,
    features: [...stockFeatures, manufacturingFeature],
    changes: manufacturingChanges,
  },
};

export const DEFAULT_UPGRADE_COPY: SubscriptionUpgradeCopy = {
  stepOneTitle: "Ready to switch plans?",
  stepOneDescription:
    "Switching plans updates your monthly allowance and available features. Your existing data stays exactly where it is.",
  features: [],
  stepTwoTitle: "What changes and what doesn't",
  changes: [
    {
      label: "Plan",
      title: "Your monthly allowance updates",
      description: "Users, invoices and online payments switch to your new plan's limits immediately.",
    },
  ],
};
