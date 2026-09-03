// MOCK DATA — replace with real API responses

import type { DirectorySection } from "../components/directory-menu/CategoryLinkMenu";

export const settingsSections: DirectorySection[] = [
  {
    id: "business",
    label: "Business",
    items: [
      {
        id: "business-management",
        title: "Business management",
        description:
          "Set up and manage your business. Configure essential details such as basic information, contacts, legal obligations and email settings.",
        href: "#business-management",
      },
      {
        id: "sequence-numbers",
        title: "Sequence numbers",
        description:
          "Manage your sequence numbers to number and organise journal entries, sales documents and third parties.",
        href: "#sequence-numbers",
      },
    ],
  },
  {
    id: "compliance",
    label: "Compliance",
    items: [
      {
        id: "anti-fraud",
        title: "Anti-fraud invoice verification",
        href: "#anti-fraud-invoice-verification",
      },
      {
        id: "e-invoicing",
        title: "E-Invoicing",
        description:
          "Set up e-invoicing to create, send and track invoices while ensuring compliance with tax regulations.",
        href: "#e-invoicing",
      },
    ],
  },
  {
    id: "accounting",
    label: "Accounting",
    items: [
      {
        id: "accounting-configuration",
        title: "Accounting configuration",
        description:
          "Manage the default ledger accounts for customers, suppliers and sales as well as the default input and output tax accounts for configuring tax rates.",
        href: "#accounting-configuration",
      },
      {
        id: "chart-of-accounts",
        title: "Chart of accounts",
        description:
          "Manage your ledger accounts and view key information associated with them.",
        href: "#chart-of-accounts",
      },
      {
        id: "journals",
        title: "Journals",
        description: "Manage the journals used for recording your journal entries.",
        href: "#journals",
      },
      {
        id: "fiscal-years",
        title: "Fiscal years",
        description: "Manage and define the duration of your fiscal years.",
        href: "#fiscal-years",
      },
      {
        id: "tax-rates",
        title: "Tax rates",
        description: "View a comprehensive list of available tax rates.",
        href: "#tax-rates",
      },
    ],
  },
  {
    id: "banking",
    label: "Banking",
    items: [
      {
        id: "banking-automation",
        title: "Banking automation",
        description: "Set up rules to automate suggestions during reconciliation.",
        href: "#banking-automation",
      },
    ],
  },
  {
    id: "categories",
    label: "Categories",
    items: [
      {
        id: "banking-categories",
        title: "Banking categories",
        description:
          "Set up categories to help record bank movements and manage adjustments during reconciliation.",
        href: "#banking-categories",
      },
      {
        id: "purchase-categories",
        title: "Purchase categories",
        description: "Set up categories to classify items on purchases and expenses.",
        href: "#purchase-categories",
      },
      {
        id: "fixed-asset-categories",
        title: "Fixed asset categories",
        description: "Manage the categories used for recording your fixed assets.",
        href: "#fixed-asset-categories",
      },
    ],
  },
  {
    id: "sales-and-purchases",
    label: "Sales and purchases",
    items: [
      {
        id: "sales-and-purchases-settings",
        title: "Sales and purchases",
        description:
          "Manage your prefixes and workflow preferences for sales and purchases documents.",
        href: "#sales-and-purchases",
      },
      {
        id: "document-preferences",
        title: "Document preferences",
        description: "Personalise the information shown in your sales documents.",
        href: "#document-preferences",
      },
      {
        id: "products-and-services-settings",
        title: "Products and services",
        description:
          "Manage the tax groups for your products and services as well as their units of measurement.",
        href: "#products-and-services-settings",
      },
      {
        id: "email-templates",
        title: "Email templates",
        description: "Create email templates for your sales documents and reminders.",
        href: "#email-templates",
      },
    ],
  },
  {
    id: "contacts",
    label: "Contacts",
    items: [
      {
        id: "payment-terms",
        title: "Payment terms",
        description:
          "Manage the payment methods, structure and deadlines for issued and received payments.",
        href: "#payment-terms",
      },
      {
        id: "payment-methods",
        title: "Payment methods",
        description: "Manage the payment options associated with your business.",
        href: "#payment-methods",
      },
      {
        id: "job-areas",
        title: "Job areas",
        description:
          "Manage job areas to distinguish between third party contacts associated with your business.",
        href: "#job-areas",
      },
      {
        id: "third-party-records",
        title: "Check and update third party records",
        description: "Manage your customer and supplier records using the public directory.",
        href: "#third-party-records",
      },
    ],
  },
  {
    id: "imports",
    label: "Imports",
    items: [
      {
        id: "import-journal-entries",
        title: "Import journal entries",
        description: "Import your existing journal entries with minimal manual data entry.",
        href: "#import-journal-entries",
      },
      {
        id: "import-third-parties",
        title: "Import third parties",
        description: "Import your existing customers and suppliers with minimal manual data.",
        href: "#import-third-parties",
      },
    ],
  },
];
