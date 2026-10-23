import type en from "../../locales/en-GB.json";
import type { DebitCard } from "../../data/bankingBaas";
import type { ShippingAddress } from "../banking-baas/baasCardIssueTypes";

export type SageWalletCopy = typeof en.bankingBaas.walletOnboarding;

// The modal moves forward through these views; "opening" is the short loader
// between submitting the form and the success screen.
export type SageWalletView = "account" | "opening" | "ready" | "card" | "done";

export type SageWalletCardDraft = {
  type: DebitCard["type"];
  cardholder: string;
  monthlyLimitEur: number;
  colour: DebitCard["colour"];
  deliveryAddress: ShippingAddress;
};
