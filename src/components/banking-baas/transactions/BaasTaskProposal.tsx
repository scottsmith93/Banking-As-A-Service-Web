import Typography from "carbon-react/lib/components/typography";
import Pill from "carbon-react/lib/components/pill";
import type { BankTransaction } from "../../../data/bankingTransactions";
import { useBankingTransactions } from "../../../context/useBankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { transactionProposal } from "../../../utils/transactionProposals";
import { interpolate } from "../../../utils/interpolate";
import { amountDifference } from "../../../utils/transactionMatching";
import BaasTransactionJustification from "./BaasTransactionJustification";
import BaasProposalInvoiceLink from "./BaasProposalInvoiceLink";

export default function BaasTaskProposal({ transaction }: { transaction: BankTransaction }) {
  const { copy, money, invoiceSummary } = useTransactionPresentation();
  const { invoices, transactions, rejectedSuggestions } = useBankingTransactions();
  const proposal = transactionProposal(transaction, invoices, transactions, rejectedSuggestions);
  if (proposal.kind === "complete") return <BaasTransactionJustification transaction={transaction} />;
  if (proposal.kind === "category" || proposal.kind === "missing") return <div className="baasTaskProposal">
    <Pill pillRole="status" size="S" colorVariant="warning">{proposal.kind === "category" ? copy.justification.categoryNeeded : copy.justification.invoiceNeeded}</Pill>
    <Typography variant="small" as="span">{proposal.kind === "category" ? copy.justification.categoryHint : copy.workbench.noSuggestion}</Typography>
  </div>;
  if (proposal.kind === "multiple") return <div className="baasTaskProposal">
    <Typography variant="strong" as="span">{interpolate(copy.workbench.possibleInvoices, { count: proposal.invoices.length })}</Typography>
    <Typography variant="small" as="span">{copy.workbench.chooseInvoice}</Typography>
  </div>;
  const invoice = proposal.invoices[0];
  return <div className="baasTaskProposal baasTaskProposal--invoice">
    <div className="baasTaskProposal__details">
      <BaasProposalInvoiceLink invoice={invoice} />
      <Typography variant="small" as="span">{invoiceSummary(invoice, transaction)}</Typography>
      <Typography variant="small" as="span">{proposal.kind === "invoice" ? copy.workbench.matchReason : invoice.currency === transaction.currency ? interpolate(copy.workbench.amountDifference, { amount: money(Math.abs(amountDifference(transaction, invoice))) }) : copy.workbench.currencyDifference}</Typography>
    </div>
    <span className="numericValue baasTaskProposal__amount">{money(invoice.amount, invoice.currency)}</span>
  </div>;
}
