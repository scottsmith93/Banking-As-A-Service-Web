import type { IconType } from "carbon-react/lib/components/icon";
import { ROUTES, type PrimaryNavId } from "../routes";

export type SubmenuLink = {
  label: string;
  path?: string;
  children?: SubmenuLink[];
};

export type PrimaryNavItem = {
  id: PrimaryNavId;
  label: string;
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
    iconType: "boxed_shapes",
    path: ROUTES.home,
    hasSubmenu: false,
    isActive: (pathname) => pathname === ROUTES.home,
  },
  {
    id: "sales",
    label: "Sales",
    iconType: "chart_bar_arrow_up",
    hasSubmenu: true,
    submenu: [
      { label: "Sales quotes", path: ROUTES.sales.quotes },
      { label: "Sales orders", path: ROUTES.sales.orders },
      { label: "Sales delivery notes", path: ROUTES.sales.deliveryNotes },
      { label: "Sales invoices", path: ROUTES.sales.invoices },
      { label: "Recurring invoices", path: ROUTES.sales.recurringInvoices },
    ],
    isActive: (pathname) => pathname.startsWith("/sales"),
  },
  {
    id: "purchases",
    label: "Purchases",
    iconType: "cart",
    hasSubmenu: true,
    submenu: [
      { label: "Purchase orders", path: ROUTES.purchases.orders },
      { label: "Purchase invoices", path: ROUTES.purchases.invoices },
    ],
    isActive: (pathname) => pathname.startsWith("/purchases"),
  },
  {
    id: "contacts",
    label: "Contacts",
    iconType: "people",
    hasSubmenu: true,
    submenu: [
      { label: "Customers", path: ROUTES.contacts.customers },
      { label: "Suppliers", path: ROUTES.contacts.suppliers },
      { label: "Employees", path: ROUTES.contacts.employees },
    ],
    isActive: (pathname) => pathname.startsWith("/contacts"),
  },
  {
    id: "products-and-services",
    label: "Items",
    iconType: "business",
    hasSubmenu: true,
    submenu: [
      {
        label: "Items",
        path: ROUTES.productsAndServices.catalog,
      },
      { label: "Price lists", path: ROUTES.productsAndServices.priceLists },
      {
        label: "Discount groups",
        path: ROUTES.productsAndServices.discountGroups,
      },
    ],
    isActive: (pathname) => pathname.startsWith("/products-and-services"),
  },
  {
    id: "banking",
    label: "Banking",
    iconType: "bank",
    hasSubmenu: true,
    submenu: [
      { label: "Bank movements", path: ROUTES.banking.bankMovements },
      { label: "Banking", path: ROUTES.banking.overview },
    ],
    isActive: (pathname) => pathname.startsWith("/banking"),
  },
  {
    id: "accounting",
    label: "Accounting",
    iconType: "filter_new",
    hasSubmenu: true,
    submenu: [
      { label: "Journal entries", path: ROUTES.accounting.journalEntries },
      {
        label: "Account matching",
        children: [{ label: "By third party" }, { label: "By ledger accounts" }],
      },
      { label: "Fixed assets", path: ROUTES.accounting.fixedAssets },
      {
        label: "Fixed asset transactions",
        path: ROUTES.accounting.fixedAssetTransactions,
      },
    ],
    isActive: (pathname) => pathname.startsWith("/accounting"),
  },
  {
    id: "compliance",
    label: "Compliance",
    iconType: "euro",
    hasSubmenu: true,
    submenu: [{ label: "Tax returns", path: ROUTES.compliance.taxReturns }],
    isActive: (pathname) => pathname.startsWith("/compliance"),
  },
  {
    id: "reports",
    label: "Reports",
    iconType: "document_right_align",
    path: ROUTES.reports,
    hasSubmenu: false,
    isActive: (pathname) => pathname === ROUTES.reports,
  },
  {
    id: "settings",
    label: "Settings",
    iconType: "settings",
    path: ROUTES.settings,
    hasSubmenu: false,
    isActive: (pathname) => pathname === ROUTES.settings,
  },
];
