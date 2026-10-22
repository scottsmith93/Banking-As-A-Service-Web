import Icon from "carbon-react/lib/components/icon";
import type { IconType } from "carbon-react/lib/components/icon/icon-type";
import type { BankTransaction } from "../../../data/bankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import "./transaction-type.css";

const typeIcons: Record<BankTransaction["type"], IconType> = {
  cardPurchase: "credit_card",
  atmWithdrawal: "hand_cash_note",
  transfer: "arrows_left_right",
  refund: "u_turn_left",
  fee: "coins",
  directDebit: "calendar_pay_date",
};

export default function BaasTransactionType({ type }: { type: BankTransaction["type"] }) {
  const { copy } = useTransactionPresentation();
  return <span className="baasTransactionType"><Icon type={typeIcons[type]} aria-hidden /><span>{copy.types[type]}</span></span>;
}
