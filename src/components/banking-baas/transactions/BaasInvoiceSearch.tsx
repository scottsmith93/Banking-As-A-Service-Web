import { useEffect, useRef, useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Pager from "carbon-react/lib/components/pager";
import Pill from "../../status-pill/StatusPill";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import { useBankingTransactions } from "../../../context/useBankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { canLinkInvoice } from "../../../utils/transactionMatching";
import type { BankPurchaseInvoice, BankTransaction } from "../../../data/bankingTransactions";

export default function BaasInvoiceSearch({ transaction, onMatch }: { transaction: BankTransaction; onMatch: (invoice: BankPurchaseInvoice) => void }) {
  const { copy, money, invoiceSummary } = useTransactionPresentation();
  const { invoices, transactions } = useBankingTransactions();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { inputRef.current?.focus(); }, []);
  const usedIds = new Set(transactions.map(row => row.invoiceId));
  const available = invoices.filter(invoice => !usedIds.has(invoice.id) && `${invoice.supplier} ${invoice.reference}`.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((first, second) => Number(canLinkInvoice(transaction, second, transactions)) - Number(canLinkInvoice(transaction, first, transactions)) || second.date.localeCompare(first.date));
  return <Box display="flex" flexDirection="column" gap={3}>
    <Typography variant="h3" as="h3">{copy.existingInvoices}</Typography>
    <Textbox ref={inputRef} id="baas-invoice-search" label={copy.existingSearch} inputIcon="search" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} />
    {!available.length && <Typography variant="p" as="p" role="status">{copy.noInvoices}</Typography>}
    {available.slice((page - 1) * 5, page * 5).map(invoice => {
      const eligible = canLinkInvoice(transaction, invoice, transactions);
      return <Box as="article" className="baasInvoiceCandidate" key={invoice.id} display="flex" flexDirection="column" gap={2}>
        <Box display="flex" justifyContent="space-between" gap={2}>
          <Box display="flex" flexDirection="column" gap={1}><Typography variant="strong" as="p">{invoice.supplier}</Typography><Typography variant="small" as="p">{invoice.reference}</Typography></Box>
          <Typography variant="strong" as="p">{money(invoice.amount, invoice.currency)}</Typography>
        </Box>
        <Typography variant="small" as="p">{invoiceSummary(invoice, transaction)}</Typography>
        {eligible ? <Pill pillRole="status" colorVariant="information" size="S">{copy.exactMatch}</Pill> : <Typography variant="small" as="p">{copy.cannotLink}</Typography>}
        <Button variantType="secondary" disabled={!eligible} onClick={() => onMatch(invoice)}>{copy.matchInvoice}</Button>
      </Box>;
    })}
    {available.length > 5 && <Pager currentPage={page} totalRecords={available.length} pageSize={5} showPageSizeSelection={false} onPagination={setPage} />}
  </Box>;
}
