// MOCK DATA — replace with real API responses

import type { DirectorySection } from "../components/directory-menu/CategoryLinkMenu";

export const reportsSections: DirectorySection[] = [
  {
    id: "financial",
    label: "Financial reports",
    items: [
      {
        id: "balance-sheet",
        title: "Balance sheet",
        description:
          "Generate an overview of your assets and liabilities for a chosen period.",
        href: "#balance-sheet",
      },
      {
        id: "profit-and-loss",
        title: "Profit and loss",
        description:
          "Generate an overview of the revenues, costs, and expenses incurred during a fiscal year or period of your choice.",
        href: "#profit-and-loss",
      },
    ],
  },
  {
    id: "general-accounting",
    label: "General accounting reports",
    items: [
      {
        id: "journals",
        title: "Journals",
        description:
          "Generate an overview of the entries recorded in one or more of your journals for a chosen period.",
        href: "#journals",
      },
      {
        id: "general-ledger",
        title: "General ledger",
        description:
          "Generate an overview of the movements on your ledger accounts for a chosen period.",
        href: "#general-ledger",
      },
      {
        id: "trial-balance",
        title: "Trial balance",
        description:
          "Generate an overview of your ledger account balances and compare them with the cumulative values for a chosen period.",
        href: "#trial-balance",
      },
    ],
  },
  {
    id: "third-party",
    label: "Third-party reports",
    items: [
      {
        id: "third-party-ledger",
        title: "Third-party ledger",
        description:
          "Generate an overview of the movements on your ledger accounts associated with third parties for a chosen period.",
        href: "#third-party-ledger",
      },
      {
        id: "third-party-balance",
        title: "Third-party balance",
        description:
          "Generate an overview of the balances for third parties and compare them with the cumulative values for a chosen period.",
        href: "#third-party-balance",
      },
      {
        id: "open-items",
        title: "Open items",
        description:
          "Generate an overview of the open items for customers and suppliers and easily identify those that are overdue.",
        href: "#open-items",
      },
      {
        id: "aging-balance",
        title: "Aging balance",
        description:
          "Generate an overview of the open items for customers and suppliers to determine any outstanding amounts and their deadlines.",
        href: "#aging-balance",
      },
    ],
  },
  {
    id: "other",
    label: "Other reports",
    items: [
      {
        id: "invoice-tax-summary",
        title: "Invoice tax summary",
        description:
          "Generate an overview of the tax details associated with the entries in your invoice journals to easily identify any missing information.",
        href: "#invoice-tax-summary",
      },
    ],
  },
  {
    id: "file-management",
    label: "File management",
    items: [
      {
        id: "file-management",
        title: "File management",
        description: "Upload and manage files for your business.",
        href: "/file-upload",
      },
    ],
  },
  {
    id: "exports",
    label: "Exports",
    items: [
      {
        id: "export-fec",
        title: "Export entries in FEC format",
        description:
          "Generate an export file of journal entries for the selected month. The format of the generated file is similar to the FEC format but does not respect DGFIP requirements. It cannot therefore be transmitted to the tax authorities.",
        href: "#export-fec",
      },
      {
        id: "export-tax-auditor",
        title: "Export for tax auditor",
        description: "Export your business data for selected fiscal years.",
        href: "#export-tax-auditor",
      },
      {
        id: "export-all-business-data",
        title: "Export all business data",
        description:
          "Export all your business data for archiving or to use in other applications.",
        href: "#export-all-business-data",
      },
    ],
  },
];
