// MOCK DATA — replace with real API responses

export type DiscountGroup = {
  id: string;
  code: string;
  name: string;
  /** ISO date string */
  startDate: string;
  /** ISO date string — empty when open-ended */
  endDate: string;
  active: boolean;
};

export const discountGroups: DiscountGroup[] = [
  {
    id: "dg-001",
    code: "01",
    name: "SUMMER",
    startDate: "2025-06-04",
    endDate: "",
    active: true,
  },
];
