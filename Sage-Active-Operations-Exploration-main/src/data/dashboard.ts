// MOCK DATA — replace with real API responses

import { ROUTES } from "../routes";

/** Format amounts to match the dashboard design (EUR, space thousands separator). */
export function formatDashboardEuro(amount: number, locale = "fr-FR"): string {
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${formatted}\u00a0€`;
}

export const dashboardGreeting = {
  name: "Nadia",
  subtitle:
    "A simple view of your cash position, financial health and the actions that need your attention. KPIs update every 5 minutes.",
};

export type DashboardBreakdownLine = {
  label: string;
  value: number;
};

export type DashboardProfitLossCard = {
  id: string;
  title: string;
  description: string;
  iconType: "chart_bar" | "chart_line";
  total: number;
  breakdown: DashboardBreakdownLine[];
};

export const profitLossIndicators: DashboardProfitLossCard[] = [
  {
    id: "gross-profit",
    title: "Gross profit",
    description: "Total value of all sales minus purchases (year to date).",
    iconType: "chart_bar",
    total: 138_412.67,
    breakdown: [
      { label: "Sales", value: 139_021.72 },
      { label: "Purchases", value: 609.05 },
    ],
  },
  {
    id: "result-before-tax",
    title: "Result before taxes on profits",
    description:
      "Total value of the operating result, financial result and exceptional result before taxes and profits (year to date).",
    iconType: "chart_line",
    total: 139_156.42,
    breakdown: [
      { label: "Operating result", value: 138_646.67 },
      { label: "Financial result", value: 9.75 },
      { label: "Exceptional result", value: 500.0 },
    ],
  },
];

export type DashboardPerformanceCard = {
  id: string;
  title: string;
  subtitle: string;
  percentage: string;
  breakdown: DashboardBreakdownLine[];
};

export const performanceIndicators: DashboardPerformanceCard[] = [
  {
    id: "return-on-sales",
    title: "Return on sales",
    subtitle: "(Calculated from operating result and sales)",
    percentage: "100%",
    breakdown: [
      { label: "Operating result", value: 138_646.67 },
      { label: "Sales", value: 139_021.72 },
    ],
  },
  {
    id: "return-on-assets",
    title: "Return on assets",
    subtitle: "(Calculated from operating result and assets)",
    percentage: "82%",
    breakdown: [
      { label: "Operating result", value: 138_646.67 },
      { label: "Assets", value: 168_591.05 },
    ],
  },
  {
    id: "return-on-equity",
    title: "Return on equity",
    subtitle: "(Calculated from net result and equity)",
    percentage: "139156%",
    breakdown: [
      { label: "Net result", value: 139_156.42 },
      { label: "Equity", value: 100.0 },
    ],
  },
];

export type DashboardFinancialCard = {
  id: string;
  title: string;
  value: number;
  description: string;
};

export const additionalFinancialIndicators: DashboardFinancialCard[] = [
  {
    id: "available-funds",
    title: "Available funds",
    value: 3_993.7,
    description: "Considers cash on hand and available bank funds",
  },
  {
    id: "working-capital",
    title: "Working capital",
    value: 140_256.42,
    description: "Current assets less short-term liabilities",
  },
  {
    id: "staff-costs",
    title: "Staff costs",
    value: 0,
    description: "Shows staff costs in the current financial year",
  },
];

export const dashboardQuickLinks = [
  { label: "Create a journal entry", path: ROUTES.accounting.journalEntryCreate },
  { label: "Go to Account matching", path: ROUTES.banking.bankMovements },
  { label: "View your General ledger report", path: "/reports" },
] as const;
