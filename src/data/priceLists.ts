// MOCK DATA — replace with real API responses

export type PriceListAdjustmentType = "Price" | "Discount";

export type PriceList = {
  id: string;
  code: string;
  name: string;
  /** ISO date string */
  startDate: string;
  /** ISO date string — empty when open-ended */
  endDate: string;
  adjustmentType: PriceListAdjustmentType;
  active: boolean;
};

export const priceLists: PriceList[] = [
  {
    id: "pl-001",
    code: "001",
    name: "00105",
    startDate: "2025-07-09",
    endDate: "2025-06-04",
    adjustmentType: "Price",
    active: true,
  },
  {
    id: "pl-002",
    code: "01",
    name: "SUMMER",
    startDate: "2025-06-04",
    endDate: "",
    adjustmentType: "Price",
    active: true,
  },
];
