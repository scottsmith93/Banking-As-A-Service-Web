import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import { Checkbox } from "carbon-react/lib/components/checkbox";
import Message from "carbon-react/lib/components/message";
import Pager from "carbon-react/lib/components/pager";
import { Tabs, Tab, TabList, TabPanel } from "carbon-react/lib/components/tabs/__next__";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import BaasTransactionGrid from "../../components/banking-baas/transactions/BaasTransactionGrid";
import BaasTransactionLocale from "../../components/banking-baas/transactions/BaasTransactionLocale";
import BaasTransactionDrawer from "../../components/banking-baas/transactions/BaasTransactionDrawer";
import BaasTransactionFilters from "../../components/banking-baas/transactions/BaasTransactionFilters";
import BaasSuggestedMatchReview from "../../components/banking-baas/transactions/BaasSuggestedMatchReview";
import BankMovementHeader from "../../components/banking-baas/transactions/BankMovementHeader";
import BankMovementMultiSelect from "../../components/banking-baas/transactions/BankMovementMultiSelect";
import { emptyTransactionFilters, type TransactionFilters } from "../../utils/transactionFilters";
import { useBankingTransactions } from "../../context/useBankingTransactions";
import { stagedBaasAccounts } from "../../data/bankingBaas";
import { connectedBankAccounts } from "../../data/bankAccountConnections";
import { bankMovementLedgerBalances } from "../../data/bankMovementBalances";
import type { BankTransaction } from "../../data/bankingTransactions";
import { useInlineJustification } from "../../hooks/useInlineJustification";
import { useTransactionPresentation } from "../../hooks/useTransactionPresentation";
import { isJustified, needsJustification, suggestedInvoices } from "../../utils/transactionMatching";
import { interpolate } from "../../utils/interpolate";
import "../../components/banking-baas/transactions/transactions.css";
import "./bank-movements.css";

type Queue = "all" | "needsAction" | "matched";
const queues: Queue[] = ["all", "needsAction", "matched"];
const PAGE_SIZE = 20;
const accounts = [...stagedBaasAccounts, ...connectedBankAccounts];

// Shared session data is the prototype API boundary; account selection is URL state, not another feed.
export default function BankMovementsPage() {
  const [params, setParams] = useSearchParams();
  const { copy } = useTransactionPresentation();
  const { transactions, invoices, rejectedSuggestions } = useBankingTransactions();
  const accountId = params.get("account") ?? "";
  const requestedQueue = params.get("view");
  const queue: Queue = requestedQueue === "needsAction" || requestedQueue === "matched" ? requestedQueue : "all";
  const inline = useInlineJustification();
  const [withSuggestions, setWithSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCardholders, setCardholders] = useState<string[]>([]);
  const [selectedTypes, setTypes] = useState<string[]>([]);
  const isSageAccount = stagedBaasAccounts.some(account => account.id === accountId);
  const [filters, setFilters] = useState<TransactionFilters>(emptyTransactionFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [requestedPage, setPage] = useState(1);
  const accountRows = transactions.filter(row => !accountId || row.accountId === accountId);
  const actionRows = accountRows.filter(needsJustification);
  const suggestedRows = actionRows.filter(row => suggestedInvoices(row, invoices, transactions, rejectedSuggestions).length);
  const counts = { all: accountRows.length, needsAction: actionRows.length, matched: accountRows.filter(isJustified).length };
  const activeFilterCount = Number(queue === "needsAction" && withSuggestions) + Object.values(filters).filter(Boolean).length + Number(isSageAccount && selectedCardholders.length > 0) + Number(selectedTypes.length > 0);
  const baseRows = accountRows.filter(row => {
    const invoice = invoices.find(item => item.id === row.invoiceId);
    const search = `${row.merchant} ${row.reference} ${row.transactionId} ${row.cardholder ?? ""} ${invoice?.reference ?? ""}`.toLowerCase();
    return search.includes(query.trim().toLowerCase())
      && (!isSageAccount || !selectedCardholders.length || (row.cardholder !== null && selectedCardholders.includes(row.cardholder)))
      && (!selectedTypes.length || selectedTypes.includes(row.type))
      && (!filters.fromDate || row.date >= filters.fromDate) && (!filters.toDate || row.date <= filters.toDate)
      && (!filters.status || row.paymentStatus === filters.status) && (!filters.method || row.paymentMethod === filters.method)
      && (!filters.category || row.category === filters.category)
      && (!filters.min || Math.abs(row.amount) >= Number(filters.min)) && (!filters.max || Math.abs(row.amount) <= Number(filters.max));
  });
  const rows = baseRows.filter(row => queue === "all" || (queue === "needsAction"
    ? (needsJustification(row) || inline.completedIds.includes(row.id)) && (!withSuggestions || suggestedRows.some(item => item.id === row.id) || inline.completedIds.includes(row.id))
    : isJustified(row)));
  const page = Math.min(requestedPage, Math.max(1, Math.ceil(rows.length / PAGE_SIZE)));
  const selected = accountRows.find(row => row.id === params.get("transaction"));
  const next = baseRows.filter(needsJustification).sort((a, b) => a.date.localeCompare(b.date)).find(row => row.id !== selected?.id);
  const cardholders = [...new Set(accountRows.map(row => row.cardholder).filter((name): name is string => Boolean(name)))];
  const openTransaction = useCallback((transaction: BankTransaction) => {
    setParams(current => { current.set("transaction", transaction.id); return current; }, { replace: true });
  }, [setParams]);
  const clearFilters = () => { setWithSuggestions(false); setQuery(""); setCardholders([]); setTypes([]); setFilters(emptyTransactionFilters); setPage(1); };
  const selectedAccounts = accounts.filter(account => !accountId || account.id === accountId);
  const sumCents = (values: number[]) => values.reduce((sum, value) => sum + Math.round(value * 100), 0) / 100;
  const allDone = queue === "needsAction" && actionRows.length === 0;
  return <BaasTransactionLocale><Box className="bankingBaasDetailPage baasTransactionsPage bankMovementsWorkspace">
    <Box className="bankingBaasDetailPage__content" display="flex" flexDirection="column" gap={2}>
      <BankMovementHeader accountId={accountId} accounts={accounts}
        bankBalance={sumCents(selectedAccounts.map(account => account.balanceEur))}
        ledgerBalance={sumCents(selectedAccounts.map(account => bankMovementLedgerBalances[account.id] ?? 0))}
        amountToJustify={sumCents(actionRows.map(row => Math.abs(row.amount)))}
        suggestedCount={suggestedRows.length} onReview={() => setReviewOpen(true)}
        onAccountChange={id => {
          if (id === accountId) return;
          clearFilters(); inline.clearFeedback(); setReviewOpen(false);
          setParams(current => { if (id) current.set("account", id); else current.delete("account"); current.delete("transaction"); current.set("view", "all"); return current; });
        }}>
      <Box className="baasTransactionToolbar" display="grid" gap={2}>
        <div className="bankMovementFilterField"><Textbox id="baas-transaction-search" size="small" label={copy.search} placeholder={copy.searchPlaceholder} inputIcon="search" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} /></div>
        {isSageAccount && <div className="bankMovementFilterField"><BankMovementMultiSelect id="bank-movements-cardholders" label={copy.cardholder} allLabel={copy.allCardholders} values={selectedCardholders} options={cardholders.map(name => ({ value: name, text: name }))} onChange={values => { setCardholders(values); setPage(1); }} /></div>}
        <div className="bankMovementFilterField" data-filter-pill-style="subtle"><BankMovementMultiSelect id="bank-movements-types" label={copy.type} allLabel={copy.allTypes} values={selectedTypes} options={Object.entries(copy.types).map(([value, text]) => ({ value, text }))} onChange={values => { setTypes(values); setPage(1); }} /></div>
        <Button variantType="secondary" size="small" iconType="filter" iconPosition="before" onClick={() => setFiltersOpen(true)}>{copy.filters}</Button>
      </Box>
      </BankMovementHeader>
      {(activeFilterCount > 0 || query) && <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
        <Typography variant="small" as="span">{interpolate(copy.filtersApplied, { count: activeFilterCount + Number(Boolean(query)) })}</Typography>
        <Button variantType="tertiary" size="small" onClick={clearFilters}>{copy.clearFilters}</Button>
      </Box>}
      <Tabs selectedTabId={queue}>
        <TabList ariaLabel={copy.queueAria} onTabChange={id => { if (id === queue) return; setParams(current => { current.set("view", id); return current; }); setPage(1); }}>
          {queues.map(id => <Tab key={id} id={id} controls={`transactions-${id}`} label={interpolate(copy.tabs[id], { count: counts[id] })} />)}
        </TabList>
        {queues.map(id => <TabPanel key={id} id={`transactions-${id}`} tabId={id}>{queue === id && <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} flexWrap="wrap">
            <Typography variant="small" as="p" role="status">{interpolate(copy.resultCount, { count: rows.length })}</Typography>
            {queue === "needsAction" && <Checkbox label={copy.workbench.withSuggestions} checked={withSuggestions} onChange={event => { setWithSuggestions(event.target.checked); setPage(1); }} />}
          </Box>
          {inline.notice && (!accountId || inline.noticeAccountId === accountId) && <div role="status"><Message variant="success-subtle">{inline.notice}</Message></div>}
          {inline.error && <div role="alert"><Message variant="error">{inline.error}</Message></div>}
          {rows.length ? <><BaasTransactionGrid key={`${accountId}-${queue}`} rows={rows} page={page} pageSize={PAGE_SIZE} oldestFirst={queue === "needsAction"} taskMode={queue === "needsAction"} summaryMode={queue === "all"} onJustify={inline.justify} selectedId={selected?.id} onOpen={openTransaction} /><Pager currentPage={page} totalRecords={rows.length} pageSize={PAGE_SIZE} showPageSizeSelection={false} smallScreenBreakpoint="1100px" onPagination={setPage} /></> : <Box className="baasTransactionsEmpty" display="flex" flexDirection="column" gap={2}><Typography variant="h3" as="h2">{allDone ? copy.emptyQueue : copy.noResults}</Typography><Typography variant="p" as="p">{allDone ? copy.emptyQueueHint : copy.noResultsHint}</Typography>{!allDone && <Button variantType="secondary" onClick={clearFilters}>{copy.clearFilters}</Button>}</Box>}
        </Box>}</TabPanel>)}
      </Tabs>
    </Box>
    {selected && <BaasTransactionDrawer key={selected.id} transaction={selected} next={next} onNext={openTransaction} onClose={() => setParams(current => { current.delete("transaction"); return current; }, { replace: true })} />}
    {filtersOpen && <BaasTransactionFilters initial={filters} onClose={() => setFiltersOpen(false)} onApply={value => { setFilters(value); setPage(1); setFiltersOpen(false); }} />}
    {reviewOpen && <BaasSuggestedMatchReview key={accountId} rows={suggestedRows} onClose={() => setReviewOpen(false)} />}
  </Box></BaasTransactionLocale>;
}
