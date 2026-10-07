import { Routes, Route, Navigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import LeftNav from "./components/LeftNav";
import RouteErrorBoundary from "./components/RouteErrorBoundary";
import { NavModeProvider } from "./context/NavModeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import { StockAlertProvider } from "./context/StockAlertContext";
import PlaceholderPage from "./pages/PlaceholderPage";
import NavigationPlaceholderPage from "./pages/navigation/NavigationPlaceholderPage";
import DesignPlaygroundPage from "./pages/DesignPlaygroundPage";
import CarbonComponentsPage from "./pages/CarbonComponentsPage";
import DashboardPage from "./pages/portal/DashboardPage";
import ReportsPage from "./pages/reports/ReportsPage";
import FileUploadPage from "./pages/portal/FileUploadPage";
import ProjectsPage from "./pages/portal/ProjectsPage";
import FinancialDocumentsPage from "./pages/portal/FinancialDocumentsPage";
import YearEndMeetingPage from "./pages/portal/YearEndMeetingPage";
import AIAdvisorPage from "./pages/portal/AIAdvisorPage";
import SettingsPage from "./pages/settings/SettingsPage";
import MyProfilePage from "./pages/MyProfilePage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";
import SalesQuotesPage from "./pages/sales/SalesQuotesPage";
import SalesQuoteCreatePage from "./pages/sales/SalesQuoteCreatePage";
import SalesOrderCreatePage from "./pages/sales/SalesOrderCreatePage";
import SalesDeliveryNoteCreatePage from "./pages/sales/SalesDeliveryNoteCreatePage";
import SalesInvoiceCreatePage from "./pages/sales/SalesInvoiceCreatePage";
import SalesRecurringInvoiceCreatePage from "./pages/sales/SalesRecurringInvoiceCreatePage";
import SalesOrdersPage from "./pages/sales/SalesOrdersPage";
import SalesDeliveryNotesPage from "./pages/sales/SalesDeliveryNotesPage";
import SalesInvoicesPage from "./pages/sales/SalesInvoicesPage";
import SalesRecurringInvoicesPage from "./pages/sales/SalesRecurringInvoicesPage";
import PurchaseInvoicesPage from "./pages/purchases/PurchaseInvoicesPage";
import PurchaseInvoiceCreatePage from "./pages/purchases/PurchaseInvoiceCreatePage";
import PurchaseInvoiceDetailPage from "./pages/purchases/PurchaseInvoiceDetailPage";
import PurchaseOrdersPage from "./pages/purchases/PurchaseOrdersPage";
import PurchaseOrderCreatePage from "./pages/purchases/PurchaseOrderCreatePage";
import PurchaseOrderDetailPage from "./pages/purchases/PurchaseOrderDetailPage";
import PurchaseReceiptsPage from "./pages/purchases/PurchaseReceiptsPage";
import PurchaseReceiptDetailPage from "./pages/purchases/PurchaseReceiptDetailPage";
import CustomersPage from "./pages/contacts/customer-management/CustomersPage";
import CustomerCreatePage from "./pages/contacts/CustomerCreatePage";
import SuppliersPage from "./pages/contacts/SuppliersPage";
import SupplierCreatePage from "./pages/contacts/SupplierCreatePage";
import SupplierDetailPage from "./pages/contacts/SupplierDetailPage";
import EmployeesPage from "./pages/contacts/EmployeesPage";
import EmployeeCreatePage from "./pages/contacts/EmployeeCreatePage";
import ProductsAndServicesPage from "./pages/products-and-services/ProductsAndServicesPage";
import ProductDetailPage from "./pages/products-and-services/ProductDetailPage";
import PriceListsPage from "./pages/products-and-services/PriceListsPage";
import PriceListCreatePage from "./pages/products-and-services/PriceListCreatePage";
import DiscountGroupsPage from "./pages/products-and-services/DiscountGroupsPage";
import DiscountGroupCreatePage from "./pages/products-and-services/DiscountGroupCreatePage";
import ProductOrServiceCreatePage from "./pages/products-and-services/ProductOrServiceCreatePage";
import BankMovementsPage from "./pages/banking/BankMovementsPage";
import BankingPage from "./pages/banking/BankingPage";
import JournalEntriesPage from "./pages/accounting/JournalEntriesPage";
import JournalEntryCreatePage from "./pages/accounting/JournalEntryCreatePage";
import FixedAssetsPage from "./pages/accounting/FixedAssetsPage";
import FixedAssetCreatePage from "./pages/accounting/FixedAssetCreatePage";
import FixedAssetTransactionsPage from "./pages/accounting/FixedAssetTransactionsPage";
import TaxReturnsPage from "./pages/compliance/TaxReturnsPage";
import NotFoundPage from "./pages/NotFoundPage";
import LegacyInvoiceRedirect from "./components/LegacyInvoiceRedirect";
import { ROUTES } from "./routes";

// Operations-mode-only screens with no real functionality yet — rendered
// generically via PlaceholderPage rather than one bespoke page component
// each. Update here (and in src/data/operationsNav.ts) as real pages land.
const PLACEHOLDER_ROUTES: { path: string; title: string; section: string }[] = [

  { path: ROUTES.sales.orderMassAllocation, title: "Sales order mass allocation", section: "Sales" },
  { path: ROUTES.sales.deliveryNoteMassShipment, title: "Mass shipment creation", section: "Sales" },
  { path: ROUTES.sales.invoiceMassCreation, title: "Mass invoice creation", section: "Sales" },
  { path: ROUTES.sales.receipts, title: "Sales receipts", section: "Sales" },
  { path: ROUTES.sales.creditNotes, title: "Sales credit notes", section: "Sales" },
  { path: ROUTES.sales.creditNoteReturnRequests, title: "Sales return requests", section: "Sales" },

  { path: ROUTES.purchases.requisition, title: "Purchase requisition", section: "Purchases" },
  { path: ROUTES.purchases.orderPlanning, title: "Purchase order planning", section: "Purchases" },
  { path: ROUTES.purchases.creditNotes, title: "Purchase credit notes", section: "Purchases" },
  { path: ROUTES.purchases.returns, title: "Purchase returns", section: "Purchases" },

  { path: ROUTES.inventory.locations, title: "Location", section: "Inventory" },
  { path: ROUTES.inventory.stockData, title: "Stock data", section: "Inventory" },
  { path: ROUTES.inventory.stockReceipt, title: "Stock receipt", section: "Inventory" },
  { path: ROUTES.inventory.stockAdjustment, title: "Stock adjustment", section: "Inventory" },
  { path: ROUTES.inventory.stockIssue, title: "Stock issue", section: "Inventory" },
  { path: ROUTES.inventory.stockTransfer, title: "Stock transfer", section: "Inventory" },
  { path: ROUTES.inventory.stockValueChange, title: "Stock value change", section: "Inventory" },
  { path: ROUTES.inventory.valuation, title: "Valuation", section: "Inventory" },
  { path: ROUTES.inventory.stockCount, title: "Stock count", section: "Inventory" },
  { path: ROUTES.inventory.reordering, title: "Reordering", section: "Inventory" },
  { path: ROUTES.inventory.stockInquiries, title: "Stock inquiries", section: "Inventory" },

  { path: ROUTES.manufacturing.workOrder, title: "Work order", section: "Manufacturing" },
  { path: ROUTES.manufacturing.workOrderOperationsTab, title: "Operations tab", section: "Manufacturing" },
  { path: ROUTES.manufacturing.workOrderPlanning, title: "Work order planning", section: "Manufacturing" },
  {
    path: ROUTES.manufacturing.workOrderMassAllocation,
    title: "Work order mass allocation",
    section: "Manufacturing",
  },
  { path: ROUTES.manufacturing.productionTracking, title: "Production tracking", section: "Manufacturing" },
  { path: ROUTES.manufacturing.materialTracking, title: "Material tracking", section: "Manufacturing" },
  { path: ROUTES.manufacturing.timeTracking, title: "Time tracking", section: "Manufacturing" },
  { path: ROUTES.manufacturing.inquiries, title: "Manufacturing inquiries", section: "Manufacturing" },

  { path: ROUTES.accounting.matching, title: "Accounting matching", section: "Accounting" },
  { path: ROUTES.accounting.closing, title: "Closing", section: "Accounting" },

  { path: ROUTES.compliance.eReporting, title: "E-reportings", section: "Compliance" },
];

const NAVIGATION_PLACEHOLDER_ROUTES = [
  { path: ROUTES.accounting.matchingThirdParty, titleKey: "appNavigation.primary.thirdParties" },
  { path: ROUTES.accounting.matchingLedgerAccounts, titleKey: "appNavigation.primary.ledgerAccounts" },
  { path: ROUTES.accounting.yearEndClosing, titleKey: "appNavigation.primary.yearEndClosing" },
  { path: ROUTES.accounting.periodicClosing, titleKey: "appNavigation.primary.periodicClosing" },
  { path: ROUTES.accounting.fec, titleKey: "appNavigation.primary.fec" },
  { path: ROUTES.accounting.provisionalFec, titleKey: "appNavigation.primary.provisionalFec" },
  { path: ROUTES.notifications, titleKey: "appNavigation.footer.notifications" },
  { path: ROUTES.tasks, titleKey: "appNavigation.footer.tasks" },
] as const;

export default function App() {
  return (
    <LanguageProvider>
    <SubscriptionProvider>
    <StockAlertProvider>
    <NavModeProvider>
    <Box display="flex" minHeight="100vh" className="appBody">
      <LeftNav />
      <Box as="main" flex={1} className="mainContent">
        <Routes>
            <Route path={ROUTES.home} element={<DashboardPage />} />
            <Route path={ROUTES.myProfile} element={<MyProfilePage />} />
            <Route path={ROUTES.aiAdvisor} element={<AIAdvisorPage />} />
            <Route path={ROUTES.conversations} element={<Navigate to={ROUTES.aiAdvisor} replace />} />
            <Route path={ROUTES.playgroundHome} element={<DesignPlaygroundPage />} />
            <Route
              path="/example-page-1"
              element={<Navigate to={ROUTES.home} replace />}
            />
            <Route
              path={ROUTES.carbonComponents}
              element={
                <RouteErrorBoundary>
                  <CarbonComponentsPage />
                </RouteErrorBoundary>
              }
            />
            <Route
              path="/example-page-2"
              element={<Navigate to={ROUTES.sales.invoices} replace />}
            />
            <Route
              path="/example-page-2/invoices/:invoiceId"
              element={<LegacyInvoiceRedirect />}
            />
            <Route path={ROUTES.sales.quotes} element={<SalesQuotesPage />} />
            <Route path={ROUTES.sales.quoteCreate} element={<SalesQuoteCreatePage />} />
            <Route path={ROUTES.sales.orders} element={<SalesOrdersPage />} />
            <Route path={ROUTES.sales.orderCreate} element={<SalesOrderCreatePage />} />
            <Route
              path={ROUTES.sales.deliveryNotes}
              element={<SalesDeliveryNotesPage />}
            />
            <Route
              path={ROUTES.sales.deliveryNoteCreate}
              element={<SalesDeliveryNoteCreatePage />}
            />
            <Route path={ROUTES.sales.invoices} element={<SalesInvoicesPage />} />
            <Route path={ROUTES.sales.invoiceCreate} element={<SalesInvoiceCreatePage />} />
            <Route
              path="/sales/invoices/:invoiceId"
              element={<InvoiceDetailPage />}
            />
            <Route
              path={ROUTES.sales.recurringInvoices}
              element={<SalesRecurringInvoicesPage />}
            />
            <Route
              path={ROUTES.sales.recurringInvoiceCreate}
              element={<SalesRecurringInvoiceCreatePage />}
            />
            <Route
              path="/example-page-3"
              element={<Navigate to={ROUTES.purchases.invoices} replace />}
            />
            <Route path={ROUTES.purchases.orders} element={<PurchaseOrdersPage />} />
            <Route path={ROUTES.purchases.orderCreate} element={<PurchaseOrderCreatePage />} />
            <Route
              path="/purchases/orders/:orderId"
              element={<PurchaseOrderDetailPage />}
            />
            <Route path={ROUTES.purchases.receipts} element={<PurchaseReceiptsPage />} />
            <Route
              path="/purchases/receipts/:receiptId"
              element={<PurchaseReceiptDetailPage />}
            />
            <Route path={ROUTES.purchases.invoices} element={<PurchaseInvoicesPage />} />
            <Route
              path={ROUTES.purchases.invoiceCreate}
              element={<PurchaseInvoiceCreatePage />}
            />
            <Route
              path="/purchases/invoices/:invoiceId"
              element={<PurchaseInvoiceDetailPage />}
            />
            <Route
              path="/example-page-4"
              element={<Navigate to={ROUTES.contacts.customers} replace />}
            />
            <Route path={ROUTES.contacts.customers} element={<CustomersPage />} />
            <Route path={ROUTES.contacts.customerCreate} element={<CustomerCreatePage />} />
            <Route path={ROUTES.contacts.suppliers} element={<SuppliersPage />} />
            <Route path={ROUTES.contacts.supplierCreate} element={<SupplierCreatePage />} />
            <Route
              path="/contacts/suppliers/:supplierId"
              element={<SupplierDetailPage />}
            />
            <Route path={ROUTES.contacts.employees} element={<EmployeesPage />} />
            <Route path={ROUTES.contacts.employeeCreate} element={<EmployeeCreatePage />} />
            <Route
              path="/example-page-5"
              element={<Navigate to={ROUTES.productsAndServices.catalog} replace />}
            />
            <Route
              path={ROUTES.productsAndServices.catalogCreate}
              element={<ProductOrServiceCreatePage />}
            />
            <Route
              path={ROUTES.productsAndServices.catalog}
              element={<ProductsAndServicesPage />}
            />
            <Route
              path={ROUTES.productsAndServices.catalogDetail(":productId")}
              element={<ProductDetailPage />}
            />
            <Route
              path={ROUTES.productsAndServices.priceLists}
              element={<PriceListsPage />}
            />
            <Route
              path={ROUTES.productsAndServices.priceListCreate}
              element={<PriceListCreatePage />}
            />
            <Route
              path={ROUTES.productsAndServices.discountGroups}
              element={<DiscountGroupsPage />}
            />
            <Route
              path={ROUTES.productsAndServices.discountGroupCreate}
              element={<DiscountGroupCreatePage />}
            />
            <Route
              path="/example-page-6"
              element={<Navigate to={ROUTES.banking.bankMovements} replace />}
            />
            <Route path={ROUTES.banking.bankMovements} element={<BankMovementsPage />} />
            <Route path={ROUTES.banking.overview} element={<BankingPage />} />
            <Route
              path="/example-page-7"
              element={<Navigate to={ROUTES.accounting.journalEntries} replace />}
            />
            <Route
              path={ROUTES.accounting.journalEntries}
              element={<JournalEntriesPage />}
            />
            <Route
              path={ROUTES.accounting.journalEntryCreate}
              element={<JournalEntryCreatePage />}
            />
            <Route path={ROUTES.accounting.fixedAssets} element={<FixedAssetsPage />} />
            <Route
              path={ROUTES.accounting.fixedAssetCreate}
              element={<FixedAssetCreatePage />}
            />
            <Route
              path={ROUTES.accounting.fixedAssetTransactions}
              element={<FixedAssetTransactionsPage />}
            />
            <Route
              path="/example-page-8"
              element={<Navigate to={ROUTES.compliance.taxReturns} replace />}
            />
            <Route path={ROUTES.compliance.taxReturns} element={<TaxReturnsPage />} />
            <Route path={ROUTES.reports} element={<ReportsPage />} />
            <Route path={ROUTES.fileUpload} element={<FileUploadPage />} />
            <Route path={ROUTES.projects} element={<ProjectsPage />} />
            <Route path={ROUTES.financialDocuments} element={<FinancialDocumentsPage />} />
            <Route path={ROUTES.yearEndMeeting} element={<YearEndMeetingPage />} />
            <Route
              path="/example-page-9"
              element={<Navigate to={ROUTES.reports} replace />}
            />
            <Route path={ROUTES.settings} element={<SettingsPage />} />
            <Route
              path="/example-page-10"
              element={<Navigate to={ROUTES.settings} replace />}
            />
            {PLACEHOLDER_ROUTES.map(({ path, title, section }) => (
              <Route key={path} path={path} element={<PlaceholderPage title={title} section={section} />} />
            ))}
            {NAVIGATION_PLACEHOLDER_ROUTES.map(({ path, titleKey }) => (
              <Route key={path} path={path} element={<NavigationPlaceholderPage titleKey={titleKey} />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
      </Box>
    </Box>
    </NavModeProvider>
    </StockAlertProvider>
    </SubscriptionProvider>
    </LanguageProvider>
  );
}
