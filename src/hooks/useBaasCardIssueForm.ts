import { useEffect, useRef, useState, type FormEvent } from "react";
import type { BaasCardIssueFormData, CardType, ShippingAddress } from "../components/banking-baas/baasCardIssueTypes";

const emptyAddress: ShippingAddress = { line1: "", line2: "", city: "", postcode: "", county: "", country: "" };
const emptyLimits = { daily: "", monthly: "", perTransaction: "", total: "" };
const defaultPayments = { online: true, recurring: false, atm: true, inStore: true, wallets: false };

export function useBaasCardIssueForm(onIssue: (data: BaasCardIssueFormData) => void) {
  const [stage, setStage] = useState<"editing" | "processing" | "success">("editing");
  const [cardType, setCardType] = useState<CardType | null>(null);
  const [cardholder, setCardholder] = useState("");
  const [nickname, setNickname] = useState("");
  // Sage Wallet issues Mastercard only, so the network is fixed rather than chosen.
  const network = "mastercard" as const;
  const [pin, setPin] = useState("");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(emptyAddress);
  const [payments, setPayments] = useState(defaultPayments);
  const [limits, setLimits] = useState(emptyLimits);
  const [allowedRegions, setAllowedRegions] = useState(["France"]);
  const [blockedCategories, setBlockedCategories] = useState(["Gambling"]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [validationAttempt, setValidationAttempt] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current !== null) clearTimeout(timer.current); }, []);

  const reset = () => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
    setStage("editing"); setCardType(null); setCardholder(""); setNickname("");
    setPin(""); setShippingAddress(emptyAddress); setPayments(defaultPayments); setLimits(emptyLimits);
    setAllowedRegions(["France"]); setBlockedCategories(["Gambling"]); setErrors({}); setValidationAttempt(0);
  };

  const selectType = (type: CardType) => {
    setCardType(type); setPin(""); setShippingAddress(emptyAddress); setErrors({});
  };
  const updatePayment = (key: keyof typeof payments, value: boolean) => setPayments(current => ({ ...current, [key]: value }));
  const updateLimit = (key: keyof typeof limits, value: string) => setLimits(current => ({ ...current, [key]: value }));
  const updateAddress = (key: keyof ShippingAddress, value: string) => {
    setShippingAddress(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: false }));
  };
  const selectCardholder = (name: string) => { setCardholder(name); setErrors(current => ({ ...current, cardholder: false })); };
  const updatePin = (value: string) => { setPin(value.replace(/\D/g, "").slice(0, 4)); setErrors(current => ({ ...current, pin: false })); };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (stage !== "editing" || timer.current !== null || !cardType) return;
    const nextErrors: Record<string, boolean> = { cardholder: !cardholder };
    if (cardType === "physical") {
      nextErrors.pin = !/^\d{4}$/.test(pin);
      for (const key of ["line1", "county", "country"] as const) nextErrors[key] = !shippingAddress[key].trim();
    }
    for (const key of Object.keys(limits) as (keyof typeof limits)[]) {
      nextErrors[key] = limits[key] !== "" && (!Number.isFinite(Number(limits[key])) || Number(limits[key]) < 0);
    }
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) { setValidationAttempt(current => current + 1); return; }
    const amount = (value: string) => value.trim() ? Number(value) : null;
    const data: BaasCardIssueFormData = {
      type: cardType, cardholder, nickname: nickname.trim(), colour: "sage", network,
      digitalWalletsEnabled: payments.wallets, onlinePaymentsEnabled: payments.online, recurringPaymentsEnabled: payments.recurring,
      atmWithdrawalsEnabled: cardType === "physical" && payments.atm,
      inStorePaymentsEnabled: cardType === "physical" && payments.inStore,
      // PROTOTYPE: validate a temporary PIN, but never retain it in demo card data.
      pinConfigured: cardType === "physical",
      ...(cardType === "physical" ? { shippingAddress: Object.fromEntries(Object.entries(shippingAddress).map(([key, value]) => [key, value.trim()])) as ShippingAddress } : {}),
      spendingLimits: { daily: amount(limits.daily), monthly: amount(limits.monthly), perTransaction: amount(limits.perTransaction), total: amount(limits.total) },
      allowedRegions, blockedCategories,
    };
    setStage("processing"); setPin("");
    // PROTOTYPE: simulate issuing; replace with the real API response.
    timer.current = setTimeout(() => { timer.current = null; onIssue(data); setStage("success"); }, 2000);
  };

  return { stage, cardType, cardholder, nickname, network, pin, shippingAddress, payments, limits, allowedRegions, blockedCategories, errors, validationAttempt,
    reset, selectType, backToType: () => setCardType(null), selectCardholder, setNickname, updatePin, updateAddress, updatePayment, updateLimit,
    setAllowedRegions, setBlockedCategories, submit };
}

export type BaasCardIssueFormState = ReturnType<typeof useBaasCardIssueForm>;
