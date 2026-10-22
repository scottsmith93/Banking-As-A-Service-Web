import Typography from "carbon-react/lib/components/typography";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import type { BankTransaction } from "../../../data/bankingTransactions";
import BaasTransactionType from "./BaasTransactionType";

export default function BaasTransactionFacts({ transaction }: { transaction: BankTransaction }) {
  const { copy } = useTransactionPresentation();
  const wallet = transaction.paymentMethod === "applePay" ? "apple-pay" : transaction.paymentMethod === "googlePay" ? "google-pay" : null;
  return <section aria-label={copy.details}>
    <Typography variant="h3" as="h3">{copy.details}</Typography>
    <dl className="baasTransactionFacts">
      <div><dt>{copy.paymentMethod}</dt><dd className="baasTransactionPaymentMethod">{wallet && <img src={`/assets/banking-baas/${wallet}.png`} alt="" />}{copy.methods[transaction.paymentMethod]}</dd></div>
      <div><dt>{copy.type}</dt><dd><BaasTransactionType type={transaction.type} /></dd></div>
      <div><dt>{copy.merchant}</dt><dd>{transaction.merchant}</dd></div>
      <div><dt>{copy.category}</dt><dd>{copy.categories[transaction.category]}</dd></div>
      <div><dt>{copy.cardholder}</dt><dd>{transaction.cardholder ? `${transaction.cardholder} •••• ${transaction.lastFour}` : "—"}</dd></div>
      <div><dt>{copy.bankReference}</dt><dd>{transaction.reference}</dd></div>
      <div className="baasTransactionFacts__full"><dt>{copy.transactionId}</dt><dd>{transaction.transactionId}</dd></div>
    </dl>
  </section>;
}
