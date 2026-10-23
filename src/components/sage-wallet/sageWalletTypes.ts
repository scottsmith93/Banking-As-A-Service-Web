import type en from "../../locales/en-GB.json";
import type { DebitCard } from "../../data/bankingBaas";

// Where a physical card is posted.
export type ShippingAddress = {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  county: string;
  country: string; // ISO 3166-1 alpha-2 code selected in the localized country dropdown.
};

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
