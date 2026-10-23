// MOCK DATA — replace with real API responses
import { baasBusinessProfile, debitCards, stagedBaasAccounts } from "./bankingBaas";
import type { ShippingAddress } from "../components/sage-wallet/sageWalletTypes";

export type SageWalletUsage = "customerPayments" | "teamExpenses" | "supplierPayments";
export type SageWalletCardStyle = "sage" | "night" | "plum";

const operatingAccount = stagedBaasAccounts[0];

// What Sage already knows about the business, so the form arrives pre-filled.
export const sageWalletPrefill = {
  firstName: "Oscar",
  businessName: baasBusinessProfile.businessName,
  companyNumber: "09482716",
  representative: "Oscar Hairless",
  email: "oscar.hairless@northstarcyclecoffee.co.uk",
  usage: ["customerPayments", "teamExpenses"] as SageWalletUsage[],
  // The registered business address, used as the default card delivery address.
  businessAddress: {
    line1: "14 Rue Sainte-Catherine",
    line2: "",
    city: "Bordeaux",
    postcode: "33000",
    county: "Gironde",
    country: "FR",
  } satisfies ShippingAddress,
};

// The account the demo opens: it matches the staged Sage operating account.
export const sageWalletOpenedAccount = {
  id: operatingAccount.id,
  maskedIban: `FR76 3000 •••• •••• ${operatingAccount.accountEnding}`,
  // PROTOTYPE: a plausible full IBAN for the copy action; not a real account.
  iban: `FR76 3000 6000 0112 3456 789${operatingAccount.accountEnding}`,
  openingBalanceEur: 0,
};

export const sageWalletCardholders = [
  sageWalletPrefill.representative,
  ...new Set(debitCards.map(card => card.cardholder)),
];

export const sageWalletMonthlyLimitsEur = [500, 1000, 2000, 5000];
export const sageWalletDefaultLimitEur = 2000;

// Decorative payment shown landing on the hero card while the user fills in the form.
export const sageWalletHeroPayment = { amountEur: 1250, invoiceNumber: "INV-0142" };
