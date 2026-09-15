// MOCK DATA — replace with real API responses

import { ROUTES } from "../routes";

/** Format a plain count (no currency) with a thousands separator. */
export function formatDashboardCount(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount);
}

export type InventoryValueCard = {
  id: string;
  title: string;
  description: string;
  iconType: "stacked_boxes" | "in_transit";
  value: string;
  breakdown: { label: string; value: string }[];
};

export const inventoryValueIndicators: InventoryValueCard[] = [
  {
    id: "stock-value",
    title: "Total stock value",
    description: "Total value of stock on hand across all locations (as of today).",
    iconType: "stacked_boxes",
    value: "245 890,00 €",
    breakdown: [
      { label: "Raw materials", value: "102 340,00 €" },
      { label: "Finished goods", value: "143 550,00 €" },
    ],
  },
  {
    id: "stock-movements",
    title: "Stock movements",
    description: "Stock receipts and issues recorded this month.",
    iconType: "in_transit",
    value: "1 284",
    breakdown: [
      { label: "Receipts", value: "612" },
      { label: "Issues", value: "672" },
    ],
  },
];

export type InventoryPerformanceCard = {
  id: string;
  title: string;
  subtitle: string;
  percentage: string;
  breakdown: { label: string; value: string }[];
};

export const inventoryPerformanceIndicators: InventoryPerformanceCard[] = [
  {
    id: "inventory-turnover",
    title: "Inventory turnover",
    subtitle: "(Cost of goods sold divided by average inventory value)",
    percentage: "4.2x",
    breakdown: [
      { label: "COGS (YTD)", value: "1 032 000,00 €" },
      { label: "Avg. inventory", value: "245 890,00 €" },
    ],
  },
  {
    id: "stock-accuracy",
    title: "Stock accuracy",
    subtitle: "(From the most recent cycle count)",
    percentage: "97%",
    breakdown: [
      { label: "Items counted", value: "1 850" },
      { label: "Variances found", value: "56" },
    ],
  },
  {
    id: "order-fill-rate",
    title: "Order fill rate",
    subtitle: "(Orders fulfilled from available stock)",
    percentage: "94%",
    breakdown: [
      { label: "Orders fulfilled", value: "329" },
      { label: "Orders backordered", value: "21" },
    ],
  },
];

export type ManufacturingStatCard = {
  id: string;
  title: string;
  value: string;
  description: string;
};

export const manufacturingIndicators: ManufacturingStatCard[] = [
  {
    id: "open-work-orders",
    title: "Open work orders",
    value: "18",
    description: "Work orders currently in progress or scheduled.",
  },
  {
    id: "on-time-completion",
    title: "On-time completion",
    value: "89%",
    description: "Work orders completed by their scheduled date (last 30 days).",
  },
  {
    id: "material-shortages",
    title: "Material shortages",
    value: "3",
    description: "Work orders currently blocked by insufficient stock.",
  },
];

export const inventoryQuickLinks = [
  { label: "Go to stock count", path: ROUTES.inventory.stockCount },
  { label: "Go to reordering", path: ROUTES.inventory.reordering },
  { label: "Go to work order", path: ROUTES.manufacturing.workOrder },
  { label: "View stock inquiries", path: ROUTES.inventory.stockInquiries },
] as const;
