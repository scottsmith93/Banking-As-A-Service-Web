export type ExamplePageNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type PrimaryNavId =
  | "dashboard"
  | "sales"
  | "purchases"
  | "contacts"
  | "products-and-services"
  | "items"
  | "inventory"
  | "manufacturing"
  | "banking"
  | "accounting"
  | "compliance"
  | "reports"
  | "settings"
  | "sales-invoices"
  | "file-upload"
  | "projects"
  | "financial-documents"
  | "year-end-meeting"
  | "conversations"
  | "ai-advisor";

export const ROUTES = {
  home: "/",
  playgroundHome: "/playground-home",
  carbonComponents: "/carbon-components",
  example: (n: ExamplePageNumber) =>
    n === 1 ? "/" : `/example-page-${n}`,
  sales: {
    quotes: "/sales/quotes",
    quoteCreate: "/sales/quotes/new",
    orders: "/sales/orders",
    orderCreate: "/sales/orders/new",
    orderMassAllocation: "/sales/orders/mass-allocation",
    deliveryNotes: "/sales/delivery-notes",
    deliveryNoteCreate: "/sales/delivery-notes/new",
    deliveryNoteMassShipment: "/sales/delivery-notes/mass-shipment",
    invoices: "/sales/invoices",
    invoiceCreate: "/sales/invoices/new",
    invoiceMassCreation: "/sales/invoices/mass-creation",
    recurringInvoices: "/sales/recurring-invoices",
    recurringInvoiceCreate: "/sales/recurring-invoices/new",
    invoiceDetail: (invoiceId: string) => `/sales/invoices/${invoiceId}`,
    receipts: "/sales/receipts",
    creditNotes: "/sales/credit-notes",
    creditNoteReturnRequests: "/sales/credit-notes/return-requests",
  },
  purchases: {
    invoices: "/purchases/invoices",
    invoiceCreate: "/purchases/invoices/new",
    invoiceDetail: (invoiceId: string) => `/purchases/invoices/${invoiceId}`,
    requisition: "/purchases/requisition",
    orders: "/purchases/orders",
    orderCreate: "/purchases/orders/new",
    orderDetail: (orderId: string) => `/purchases/orders/${orderId}`,
    orderPlanning: "/purchases/orders/planning",
    receipts: "/purchases/receipts",
    receiptDetail: (receiptId: string) => `/purchases/receipts/${receiptId}`,
    creditNotes: "/purchases/credit-notes",
    returns: "/purchases/returns",
  },
  contacts: {
    customers: "/contacts/customers",
    customerCreate: "/contacts/customers/new",
    suppliers: "/contacts/suppliers",
    supplierCreate: "/contacts/suppliers/new",
    supplierDetail: (supplierId: string) => `/contacts/suppliers/${supplierId}`,
    employees: "/contacts/employees",
    employeeCreate: "/contacts/employees/new",
  },
  productsAndServices: {
    catalog: "/products-and-services",
    priceLists: "/products-and-services/price-lists",
    discountGroups: "/products-and-services/discount-groups",
    catalogCreate: "/products-and-services/new",
    catalogDetail: (productId: string) => `/products-and-services/${productId}`,
    priceListCreate: "/products-and-services/price-lists/new",
    discountGroupCreate: "/products-and-services/discount-groups/new",
  },
  inventory: {
    locations: "/inventory/locations",
    stockData: "/inventory/stock-data",
    stockReceipt: "/inventory/stock-receipt",
    stockAdjustment: "/inventory/stock-adjustment",
    stockIssue: "/inventory/stock-issue",
    stockTransfer: "/inventory/stock-transfer",
    stockValueChange: "/inventory/stock-value-change",
    valuation: "/inventory/valuation",
    stockCount: "/inventory/stock-count",
    reordering: "/inventory/reordering",
    stockInquiries: "/inventory/stock-inquiries",
  },
  manufacturing: {
    workOrder: "/manufacturing/work-order",
    workOrderOperationsTab: "/manufacturing/work-order/operations",
    workOrderPlanning: "/manufacturing/work-order-planning",
    workOrderMassAllocation: "/manufacturing/work-order-mass-allocation",
    productionTracking: "/manufacturing/production-tracking",
    materialTracking: "/manufacturing/material-tracking",
    timeTracking: "/manufacturing/time-tracking",
    inquiries: "/manufacturing/inquiries",
  },
  banking: {
    bankMovements: "/banking/bank-movements",
    overview: "/banking",
  },
  accounting: {
    journalEntries: "/accounting/journal-entries",
    journalEntryCreate: "/accounting/journal-entries/new",
    matching: "/accounting/matching",
    closing: "/accounting/closing",
    fixedAssets: "/accounting/fixed-assets",
    fixedAssetCreate: "/accounting/fixed-assets/new",
    fixedAssetTransactions: "/accounting/fixed-asset-transactions",
  },
  compliance: {
    taxReturns: "/compliance/tax-returns",
    eReporting: "/compliance/e-reporting",
  },
  settings: "/settings",
  reports: "/reports",
  fileUpload: "/file-upload",
  projects: "/projects",
  financialDocuments: "/financial-documents",
  yearEndMeeting: "/year-end-meeting",
  conversations: "/conversations",
  myProfile: "/my-profile",
} as const;
