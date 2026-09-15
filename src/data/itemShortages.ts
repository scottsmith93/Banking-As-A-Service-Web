// MOCK DATA — replace with real API responses

export type ItemShortage = {
  /** Matches a `code` in productsAndServices.ts — resolved to the full
   * catalogue item (name, id, image) at render time rather than duplicated
   * here. */
  itemCode: string;
  variant: string;
  shortageQuantity: number;
};

export const itemShortages: ItemShortage[] = [
  { itemCode: "PAPER-A4", variant: "White", shortageQuantity: -113 },
  { itemCode: "KEYB-WL", variant: "Black", shortageQuantity: -64 },
  { itemCode: "IPH15-128", variant: "Midnight", shortageQuantity: -52 },
  { itemCode: "TONER-BK", variant: "Standard yield", shortageQuantity: -31 },
  { itemCode: "COFFEE-1KG", variant: "Whole bean", shortageQuantity: -22 },
];
