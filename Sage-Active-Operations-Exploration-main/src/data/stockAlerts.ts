// MOCK DATA — replace with real API responses

// The single low-stock item driving the "low stock → purchase order →
// receipt" journey on the Inventory dashboard. Deliberately reuses the
// supplier/item vocabulary already established in purchaseOrders.ts /
// purchaseReceipts.ts (Office Supplies Direct's "A4 copier paper") so the
// order and receipt this journey creates look at home next to the existing
// mock data.
export const lowStockItem = {
  itemName: "A4 copier paper - box of 5",
  itemCode: "ITM-2501",
  supplier: "Office Supplies Direct",
  purchasingSite: "London DC",
  reorderThreshold: 25,
  suggestedOrderQuantity: 100,
  unitCostGbp: 12.5,
};
