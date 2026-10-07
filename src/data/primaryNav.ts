import type { IconType } from "carbon-react/lib/components/icon";
import { ROUTES, type PrimaryNavId } from "../routes";

export type SubmenuLink = {
  label: string;
  labelKey?: string;
  path?: string;
  children?: SubmenuLink[];
};

export type PrimaryNavItem = {
  id: PrimaryNavId;
  label: string;
  labelKey?: string;
  iconType: IconType;
  path?: string;
  hasSubmenu: boolean;
  submenu?: SubmenuLink[];
  isActive: (pathname: string) => boolean;
};

export const PRIMARY_NAV_ITEMS: PrimaryNavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    labelKey: "appNavigation.primary.dashboard",
    iconType: "dashboard",
    path: ROUTES.home,
    hasSubmenu: false,
    isActive: (pathname) => pathname === ROUTES.home,
  },
  {
    id: "sales",
    label: "Sales",
    labelKey: "appNavigation.primary.sales",
    iconType: "chart_bar_arrow_up",
    hasSubmenu: true,
    submenu: [
      { label: "Sales quotes", labelKey: "appNavigation.primary.salesQuotes", path: ROUTES.sales.quotes },
      { label: "Sales orders", labelKey: "appNavigation.primary.salesOrders", path: ROUTES.sales.orders },
      { label: "Sales delivery notes", labelKey: "appNavigation.primary.salesDeliveryNotes", path: ROUTES.sales.deliveryNotes },
      { label: "Sales invoices", labelKey: "appNavigation.primary.salesInvoices", path: ROUTES.sales.invoices },
      { label: "Recurring invoices", labelKey: "appNavigation.primary.recurringInvoices", path: ROUTES.sales.recurringInvoices },
    ],
    isActive: (pathname) => pathname.startsWith("/sales"),
  },
  {
    id: "purchases",
    label: "Purchases",
    labelKey: "appNavigation.primary.purchases",
    iconType: "cart",
    path: ROUTES.purchases.orders,
    hasSubmenu: false,
    isActive: (pathname) => pathname.startsWith("/purchases"),
  },
  {
    id: "contacts",
    label: "Contacts",
    labelKey: "appNavigation.primary.contacts",
    iconType: "user_groups",
    hasSubmenu: true,
    submenu: [
      { label: "Customers", labelKey: "appNavigation.primary.customers", path: ROUTES.contacts.customers },
      { label: "Suppliers", labelKey: "appNavigation.primary.suppliers", path: ROUTES.contacts.suppliers },
      { label: "Employees", labelKey: "appNavigation.primary.employees", path: ROUTES.contacts.employees },
    ],
    isActive: (pathname) => pathname.startsWith("/contacts"),
  },
  {
    id: "products-and-services",
    label: "Items",
    labelKey: "appNavigation.primary.items",
    iconType: "job_seeked",
    hasSubmenu: true,
    submenu: [
      {
        label: "Items",
        labelKey: "appNavigation.primary.items",
        path: ROUTES.productsAndServices.catalog,
      },
      {
        label: "Prices and discounts",
        labelKey: "appNavigation.primary.pricesAndDiscounts",
        children: [
          { label: "Prices", labelKey: "appNavigation.primary.prices", path: ROUTES.productsAndServices.priceLists },
          { label: "Discount groups", labelKey: "appNavigation.primary.discountGroups", path: ROUTES.productsAndServices.discountGroups },
        ],
      },
    ],
    isActive: (pathname) => pathname.startsWith("/products-and-services"),
  },
  {
    id: "banking",
    label: "Banking",
    labelKey: "appNavigation.primary.banking",
    iconType: "bank",
    hasSubmenu: true,
    submenu: [
      { label: "Bank movements", labelKey: "appNavigation.primary.bankMovements", path: ROUTES.banking.bankMovements },
      { label: "Banking", labelKey: "appNavigation.primary.banking", path: ROUTES.banking.overview },
    ],
    isActive: (pathname) => pathname.startsWith("/banking"),
  },
  {
    id: "accounting",
    label: "Accounting",
    labelKey: "appNavigation.primary.accounting",
    iconType: "filter_new",
    hasSubmenu: true,
    submenu: [
      { label: "Journal entries", labelKey: "appNavigation.primary.journalEntries", path: ROUTES.accounting.journalEntries },
      {
        label: "Account matching",
        labelKey: "appNavigation.primary.accountMatching",
        children: [
          { label: "Third parties", labelKey: "appNavigation.primary.thirdParties", path: ROUTES.accounting.matchingThirdParty },
          { label: "General ledger accounts", labelKey: "appNavigation.primary.ledgerAccounts", path: ROUTES.accounting.matchingLedgerAccounts },
        ],
      },
      {
        label: "Processing",
        labelKey: "appNavigation.primary.processing",
        children: [
          { label: "Year-end closing", labelKey: "appNavigation.primary.yearEndClosing", path: ROUTES.accounting.yearEndClosing },
          { label: "Periodic closing", labelKey: "appNavigation.primary.periodicClosing", path: ROUTES.accounting.periodicClosing },
          { label: "FEC", labelKey: "appNavigation.primary.fec", path: ROUTES.accounting.fec },
          { label: "Provisional FEC", labelKey: "appNavigation.primary.provisionalFec", path: ROUTES.accounting.provisionalFec },
        ],
      },
    ],
    isActive: (pathname) => pathname.startsWith("/accounting"),
  },
  {
    id: "compliance",
    label: "Compliance",
    labelKey: "appNavigation.primary.compliance",
    iconType: "euro",
    hasSubmenu: true,
    submenu: [{ label: "VAT returns", labelKey: "appNavigation.primary.vatReturns", path: ROUTES.compliance.taxReturns }],
    isActive: (pathname) => pathname.startsWith("/compliance"),
  },
  {
    id: "reports",
    label: "Reports",
    labelKey: "appNavigation.primary.reports",
    iconType: "document_right_align",
    path: ROUTES.reports,
    hasSubmenu: false,
    isActive: (pathname) => pathname === ROUTES.reports,
  },
  {
    id: "settings",
    label: "Settings",
    labelKey: "appNavigation.primary.settings",
    iconType: "settings_old",
    path: ROUTES.settings,
    hasSubmenu: false,
    isActive: (pathname) => pathname === ROUTES.settings,
  },
];
