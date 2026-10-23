import "./money-value.css";

type Props = { amount: number; locale: string; currency?: string; direction?: "in" | "out"; signed?: boolean };

// Intl parts keep signs, currency placement and separators correct in every locale, without string surgery.
// An explicit direction is for unsigned spend aggregates; an actual negative value is always money out.
export default function MoneyValue({ amount, locale, currency = "EUR", direction, signed = false }: Props) {
  const out = amount < 0 || direction === "out" && amount !== 0;
  const parts = new Intl.NumberFormat(locale, { style: "currency", currency, signDisplay: signed ? "exceptZero" : "auto" }).formatToParts(amount);
  return <span className={`numericValue moneyValue${out ? " moneyValue--out" : (direction === "in" || signed) && amount > 0 ? " moneyValue--in" : ""}`}>
    {parts.map((part, index) => part.type === "minusSign" || part.type === "plusSign" ? <span className="moneyValue__sign" key={index}>{part.value}</span> : part.value)}
  </span>;
}
