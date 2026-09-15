// MOCK DATA — seeds the Item Details capability workspace (Balay 3KFE361WI door-seal item).
// Not wired to individual catalogue rows — this is a review-ready static mockup.

export type RowStatus = "Active" | "Inactive" | "Draft";

export type Supplier = {
  id: string;
  name: string;
  preferred: boolean;
  leadTimeDays: number;
  minimumQuantity: string;
  status: RowStatus;
};

export type PurchasePriceRow = {
  id: string;
  supplier: string;
  unitPrice: string;
  currency: string;
  minimumQuantity: string;
  validFrom: string;
  validTo: string;
};

export type SalesPriceRow = {
  id: string;
  priceList: string;
  unitPrice: string;
  discount: string;
  currency: string;
  validFrom: string;
  status: RowStatus;
};

export type CustomerPriceRow = {
  id: string;
  customer: string;
  priceList: string;
  discount: string;
  paymentTerms: string;
  status: RowStatus;
};

export type BomRow = {
  id: string;
  component: string;
  quantity: string;
  unit: string;
  waste: string;
  status: RowStatus;
};

export type RoutingRow = {
  id: string;
  operation: string;
  workCenter: string;
  duration: string;
  sequence: number;
  status: RowStatus;
};

export const itemDetailsWorkspace = {
  suppliers: [
    {
      id: "supplier-1",
      name: "ACME Distribution",
      preferred: true,
      leadTimeDays: 5,
      minimumQuantity: "50 each",
      status: "Active",
    },
    {
      id: "supplier-2",
      name: "Iberia Parts",
      preferred: false,
      leadTimeDays: 8,
      minimumQuantity: "100 each",
      status: "Active",
    },
    {
      id: "supplier-3",
      name: "Norte Components",
      preferred: false,
      leadTimeDays: 12,
      minimumQuantity: "200 each",
      status: "Inactive",
    },
  ] satisfies Supplier[],

  purchasePricing: [
    {
      id: "purchase-price-1",
      supplier: "ACME Distribution",
      unitPrice: "€1.85",
      currency: "EUR",
      minimumQuantity: "50 each",
      validFrom: "01 Jan 2026",
      validTo: "31 Dec 2026",
    },
    {
      id: "purchase-price-2",
      supplier: "Iberia Parts",
      unitPrice: "€2.10",
      currency: "EUR",
      minimumQuantity: "100 each",
      validFrom: "01 Mar 2026",
      validTo: "31 Aug 2026",
    },
  ] satisfies PurchasePriceRow[],

  supplyRules: {
    defaultSupplier: "ACME Distribution",
    defaultLeadTimeDays: "5 days",
    orderMultiple: "50 each",
    allowSubstitutes: "Yes",
  },

  salesPricing: [
    {
      id: "sales-price-1",
      priceList: "Standard",
      unitPrice: "€4.50",
      discount: "0%",
      currency: "EUR",
      validFrom: "01 Jan 2026",
      status: "Active",
    },
    {
      id: "sales-price-2",
      priceList: "Wholesale",
      unitPrice: "€3.75",
      discount: "15%",
      currency: "EUR",
      validFrom: "01 Jan 2026",
      status: "Active",
    },
    {
      id: "sales-price-3",
      priceList: "Seasonal",
      unitPrice: "€3.95",
      discount: "10%",
      currency: "EUR",
      validFrom: "01 Nov 2026",
      status: "Draft",
    },
  ] satisfies SalesPriceRow[],

  customers: [
    {
      id: "customer-1",
      customer: "Electrodomésticos Ibáñez S.L.",
      priceList: "Wholesale",
      discount: "15%",
      paymentTerms: "30 days net",
      status: "Active",
    },
    {
      id: "customer-2",
      customer: "Reparaciones del Sur S.A.",
      priceList: "Standard",
      discount: "0%",
      paymentTerms: "15 days net",
      status: "Active",
    },
  ] satisfies CustomerPriceRow[],

  salesConditions: {
    minimumOrderQuantity: "1 each",
    returnPolicy: "30-day return window",
    warranty: "12 months manufacturer warranty",
    salesChannel: "Direct and distributor",
  },

  stockRules: {
    stockManagementEnabled: true,
    safetyStock: "25 each",
    reorderPoint: "50 each",
  },

  tracking: {
    batchTracking: true,
    serialNumberTracking: false,
    expiryDateTracking: false,
    barcodeScanning: true,
  },

  replenishment: {
    method: "Reorder point",
    orderQuantity: "200 each",
    leadTimeBuffer: "3 days",
    preferredWarehouse: "Madrid Central",
  },

  valuation: {
    method: "Average cost",
    standardCost: "€1.60",
    lastCost: "€1.85",
    averageCost: "€1.72",
  },

  bom: [
    {
      id: "bom-1",
      component: "Rubber gasket",
      quantity: "1",
      unit: "each",
      waste: "2%",
      status: "Active",
    },
    {
      id: "bom-2",
      component: "Adhesive strip",
      quantity: "0.15",
      unit: "metre",
      waste: "5%",
      status: "Active",
    },
    {
      id: "bom-3",
      component: "Fixing clip",
      quantity: "4",
      unit: "each",
      waste: "0%",
      status: "Active",
    },
  ] satisfies BomRow[],

  routing: [
    {
      id: "routing-1",
      operation: "Cutting",
      workCenter: "WC-01",
      duration: "3 min",
      sequence: 10,
      status: "Active",
    },
    {
      id: "routing-2",
      operation: "Assembly",
      workCenter: "WC-03",
      duration: "6 min",
      sequence: 20,
      status: "Active",
    },
    {
      id: "routing-3",
      operation: "Quality check",
      workCenter: "WC-QA",
      duration: "2 min",
      sequence: 30,
      status: "Active",
    },
  ] satisfies RoutingRow[],

  productionParameters: {
    lotSize: "500 each",
    setupTime: "20 minutes",
    scrapAllowance: "2%",
    productionWarehouse: "Madrid Central",
  },

  keyFigures: {
    lastPurchasePrice: "€1.85",
    onHand: "320 each",
    available: "295 each",
    reserved: "25 each",
  },

  summary: {
    procurement: [
      { label: "Preferred supplier", value: "ACME Distribution" },
      { label: "Lead time", value: "5 days" },
      { label: "Last purchase price", value: "€1.85" },
    ],
    sales: [
      { label: "Standard price", value: "€4.50" },
      { label: "Active price lists", value: "2" },
      { label: "Customers", value: "2" },
    ],
    inventory: [
      { label: "On hand", value: "320 each" },
      { label: "Safety stock", value: "25 each" },
      { label: "Reorder point", value: "50 each" },
    ],
    manufacturing: [
      { label: "BOM components", value: "3" },
      { label: "Routing operations", value: "3" },
      { label: "Lot size", value: "500 each" },
    ],
  },
};
