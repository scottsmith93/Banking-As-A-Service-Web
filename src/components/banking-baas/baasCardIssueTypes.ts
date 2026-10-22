export type CardType = "virtual" | "physical";
export type ShippingAddress = {
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  county: string;
  country: string; // ISO 3166-1 alpha-2 code selected in the localized country dropdown.
};

export type BaasCardIssueFormData = {
  type: CardType;
  cardholder: string;
  nickname: string;
  colour: "sage" | "night" | "plum";
  network: "visa" | "mastercard";
  digitalWalletsEnabled: boolean;
  onlinePaymentsEnabled: boolean;
  recurringPaymentsEnabled: boolean;
  atmWithdrawalsEnabled: boolean;
  inStorePaymentsEnabled: boolean;
  pinConfigured: boolean;
  shippingAddress?: ShippingAddress;
  spendingLimits: { daily: number | null; monthly: number | null; perTransaction: number | null; total: number | null };
  allowedRegions: string[];
  blockedCategories: string[];
};
