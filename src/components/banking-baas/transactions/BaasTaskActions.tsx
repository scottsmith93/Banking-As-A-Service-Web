import Button from "carbon-react/lib/components/button/__next__";
import type { BankPurchaseInvoice, BankTransaction } from "../../../data/bankingTransactions";
import { useBankingTransactions } from "../../../context/useBankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { transactionProposal } from "../../../utils/transactionProposals";
import { interpolate } from "../../../utils/interpolate";

export default function BaasTaskActions({ transaction, onReview, onJustify }: { transaction: BankTransaction; onReview: (row: BankTransaction) => void; onJustify: (row: BankTransaction, invoice: BankPurchaseInvoice) => void }) {
  const { copy } = useTransactionPresentation();
  const { invoices, transactions, rejectedSuggestions } = useBankingTransactions();
  const proposal = transactionProposal(transaction, invoices, transactions, rejectedSuggestions);
  const label = proposal.kind === "multiple" ? copy.workbench.reviewMatches : proposal.kind === "difference" ? copy.workbench.reviewDifference : proposal.kind === "category" ? copy.justification.chooseCategory : copy.workbench.linkOrUpload;
  return <div className="baasTaskActions" onClick={event => event.stopPropagation()}>
    {proposal.kind === "complete" ? <Button variantType="secondary" size="small" disabled>{copy.justification.title}</Button> : proposal.kind === "invoice" ? <>
      <Button variantType="primary" size="small" aria-label={interpolate(copy.workbench.justifyInvoice, { reference: proposal.invoices[0].reference, merchant: transaction.merchant })} onClick={() => onJustify(transaction, proposal.invoices[0])}>{copy.workbench.justify}</Button>
      <Button variantType="tertiary" size="small" onClick={() => onReview(transaction)}>{copy.workbench.review}</Button>
    </> : <Button variantType="secondary" size="small" onClick={() => onReview(transaction)}>{label}</Button>}
  </div>;
}
