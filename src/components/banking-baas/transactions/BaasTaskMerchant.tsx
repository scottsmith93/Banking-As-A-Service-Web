import type { ReactNode } from "react";
import Typography from "carbon-react/lib/components/typography";
import type { BankTransaction } from "../../../data/bankingTransactions";
import BaasTransactionType from "./BaasTransactionType";

export default function BaasTaskMerchant({ transaction, children }: { transaction: BankTransaction; children: ReactNode }) {
  return <div className="baasTaskMerchant">
    {children}
    <Typography variant="p" size="M" as="span" m={0}><BaasTransactionType type={transaction.type} /></Typography>
  </div>;
}
