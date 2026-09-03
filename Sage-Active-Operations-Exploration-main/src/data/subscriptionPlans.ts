// MOCK DATA — replace with real API responses

export type SubscriptionPlan = {
  id: string;
  name: string;
  isActive: boolean;
  description: string;
  allowanceBullets: string[];
  /** Breakdown of the user roles included in this tier's total user count
   * (first entry of allowanceBullets) — counts sum to that total. */
  userRoleBullets: string[];
  /** Monthly cost in EUR, excluding VAT. */
  priceAmount: number;
  priceLabel?: string;
};

// General VAT rate applied across the app's mock data (see productsAndServices.ts).
export const SUBSCRIPTION_VAT_RATE = 0.21;

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "portal",
    name: "Portal",
    isActive: false,
    description:
      "A lightweight business overview with file sharing capabilities to support communication between Client and Accountant.",
    allowanceBullets: ["1 user"],
    userRoleBullets: ["1 Admin", "1 Accountant"],
    priceAmount: 0,
    priceLabel: "Free with GE",
  },
  {
    id: "starter",
    name: "Starter",
    isActive: false,
    description:
      "Standard features for new businesses and also for those that outsource accounting management to an advisor.",
    allowanceBullets: ["5 users", "300 invoices", "10 Online Payments"],
    userRoleBullets: ["1 Admin", "1 Accountant", "3 Staff users"],
    priceAmount: 25,
  },
  {
    id: "essentials",
    name: "Essentials",
    isActive: true,
    description:
      "More advanced features for demanding businesses and companies with in-house accounting management.",
    allowanceBullets: ["10 users", "500 invoices", "20 Online Payments"],
    userRoleBullets: ["2 Admins", "2 Accountants", "6 Staff users"],
    priceAmount: 49,
  },
  {
    id: "control",
    name: "Standard",
    isActive: false,
    description:
      "Advanced inventory and stock management for businesses tracking stock across multiple locations, warehouses, and channels.",
    allowanceBullets: ["15 users", "1000 invoices", "30 Online Payments"],
    userRoleBullets: ["2 Admins", "3 Accountants", "10 Staff users"],
    priceAmount: 69,
  },
  {
    id: "scale",
    name: "Advanced",
    isActive: false,
    description:
      "Full manufacturing capabilities for businesses managing production, work orders, and materials from raw stock to finished goods.",
    allowanceBullets: ["20 users", "1200 invoices", "40 Online Payments"],
    userRoleBullets: ["2 Admins", "3 Accountants", "15 Staff users"],
    priceAmount: 89,
  },
];
