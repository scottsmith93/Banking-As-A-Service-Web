import type { IconType } from "carbon-react/lib/components/icon";
import iconBuy from "../../../assets/capability-icons/icon-buy.png";
import iconMake from "../../../assets/capability-icons/icon-make.png";
import iconSell from "../../../assets/capability-icons/icon-sell.png";
import iconStore from "../../../assets/capability-icons/icon-store.png";

export type Capability = "buy" | "sell" | "store" | "make";

export type ItemWorkspaceTab = "overview" | "procurement" | "sales" | "inventory" | "manufacturing";

type CapabilityMeta = {
  label: string;
  description: string;
  /** Carbon icon used in smaller, secondary contexts (e.g. SummaryCard). */
  icon: IconType;
  /** Full-colour illustration used on the capability tile itself, matching Figma. */
  image: string;
  tab: ItemWorkspaceTab;
  /** Display title of the workspace this capability unlocks, e.g. "Procurement". */
  workspaceTitle: string;
};

export const CAPABILITY_ORDER: Capability[] = ["buy", "sell", "store", "make"];

export const CAPABILITY_META: Record<Capability, CapabilityMeta> = {
  buy: {
    label: "Buy",
    description: "Purchase this item from suppliers.",
    icon: "cart",
    image: iconBuy,
    tab: "procurement",
    workspaceTitle: "Procurement",
  },
  sell: {
    label: "Sell",
    description: "Sell this item to customers.",
    icon: "tag",
    image: iconSell,
    tab: "sales",
    workspaceTitle: "Sales",
  },
  store: {
    label: "Store",
    description: "Track stock levels and locations.",
    icon: "stacked_boxes",
    image: iconStore,
    tab: "inventory",
    workspaceTitle: "Inventory",
  },
  make: {
    label: "Make",
    description: "Manufacture this item in-house.",
    icon: "spanner",
    image: iconMake,
    tab: "manufacturing",
    workspaceTitle: "Manufacturing",
  },
};
