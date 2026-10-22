import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Typography from "carbon-react/lib/components/typography";
import type { BankPurchaseInvoice, BankTransaction } from "../../../data/bankingTransactions";
import { useBankingTransactions } from "../../../context/useBankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { transactionProposal } from "../../../utils/transactionProposals";
import { canLinkInvoice, amountDifference } from "../../../utils/transactionMatching";
import { interpolate } from "../../../utils/interpolate";
import BaasProposalInvoiceLink from "./BaasProposalInvoiceLink";

export default function BaasInvoiceProposals({ transaction, onMatch }: { transaction: BankTransaction; onMatch: (invoice: BankPurchaseInvoice) => void }) {
  const { invoices, transactions, rejectedSuggestions, rejectSuggestion } = useBankingTransactions();
  const { copy, money, invoiceSummary } = useTransactionPresentation();
  const proposal = transactionProposal(transaction, invoices, transactions, rejectedSuggestions);
  if (!proposal.invoices.length) return null;
  return <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="strong" as="p">{proposal.kind === "multiple" ? interpolate(copy.workbench.possibleInvoices, { count: proposal.invoices.length }) : proposal.kind === "difference" ? copy.workbench.relatedInvoice : copy.suggestion}</Typography>
    {proposal.kind === "multiple" && <Typography variant="small" as="p">{copy.workbench.chooseInvoice}</Typography>}
    {proposal.invoices.slice(0, 3).map(invoice => {
      const eligible = canLinkInvoice(transaction, invoice, transactions);
      return <div className="baasInvoiceSuggestion baasTaskProposal" key={invoice.id}>
        <div className="baasTaskProposal__reference"><BaasProposalInvoiceLink invoice={invoice} /><strong className="numericValue">{money(invoice.amount, invoice.currency)}</strong></div>
        <Typography variant="small" as="p">{invoiceSummary(invoice, transaction)}</Typography>
        <Typography variant="small" as="p">{eligible ? copy.workbench.matchReason : interpolate(copy.workbench.amountDifference, { amount: money(Math.abs(amountDifference(transaction, invoice))) })}</Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          <Button variantType="secondary" size="small" disabled={!eligible} aria-label={interpolate(copy.workbench.justifyInvoice, { merchant: transaction.merchant, reference: invoice.reference })} onClick={() => onMatch(invoice)}>{copy.workbench.justify}</Button>
          <Button variantType="tertiary" size="small" onClick={() => rejectSuggestion(transaction.id, invoice.id)}>{copy.workbench.notMatch}</Button>
        </Box>
      </div>;
    })}
    {proposal.invoices.length > 3 && <Typography variant="small" as="p">{copy.workbench.moreInvoices}</Typography>}
  </Box>;
}
