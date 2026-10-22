import { useState, type FormEvent } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import DateInput from "carbon-react/lib/components/date";
import Decimal from "carbon-react/lib/components/decimal";
import Message from "carbon-react/lib/components/message";
import { Option, Select } from "carbon-react/lib/components/select";
import Sidebar from "carbon-react/lib/components/sidebar";
import Typography from "carbon-react/lib/components/typography";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { emptyTransactionFilters, type TransactionFilters } from "../../../utils/transactionFilters";

export default function BaasTransactionFilters({ initial, onClose, onApply }: { initial: TransactionFilters; onClose: () => void; onApply: (filters: TransactionFilters) => void }) {
  const { copy, locale } = useTransactionPresentation();
  const [filters, setFilters] = useState(initial);
  const [dateText, setDateText] = useState({ fromDate: initial.fromDate, toDate: initial.toDate });
  const [error, setError] = useState(false);
  const change = (key: keyof TransactionFilters, value: string) => setFilters(current => ({ ...current, [key]: value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if ((dateText.fromDate && !filters.fromDate) || (dateText.toDate && !filters.toDate) || (filters.fromDate && filters.toDate && filters.fromDate > filters.toDate) || (filters.min && filters.max && Number(filters.min) > Number(filters.max)) || Number(filters.min) < 0 || Number(filters.max) < 0) { setError(true); return; }
    onApply(filters);
  };
  return <Sidebar open width="480px" onCancel={onClose} header={<Typography variant="h2" as="h2">{copy.filters}</Typography>} aria-label={copy.filters}>
    <form className="baasTransactionFilterForm" onSubmit={submit}>
      {error && <div role="alert"><Message variant="error">{copy.invalidRange}</Message></div>}
      <Box className="baasTransactionFilterDates" display="grid" gap={2}>
        <DateInput label={copy.fromDate} value={dateText.fromDate} allowEmptyValue onChange={event => { setDateText(current => ({ ...current, fromDate: event.target.value.formattedValue })); change("fromDate", event.target.value.rawValue ?? ""); }} />
        <DateInput label={copy.toDate} value={dateText.toDate} allowEmptyValue onChange={event => { setDateText(current => ({ ...current, toDate: event.target.value.formattedValue })); change("toDate", event.target.value.rawValue ?? ""); }} />
      </Box>
      {([
        ["status", copy.paymentStatus, copy.paymentStatuses],
        ["method", copy.paymentMethod, copy.methods],
        ["category", copy.category, copy.categories],
      ] as const).map(([key, label, choices]) => <Select key={key} label={label} placeholder={copy.allOptions} value={filters[key]} onChange={event => change(key, event.target.value)}>
        <Option value="" text={copy.allOptions} />
        {Object.entries(choices).map(([value, text]) => <Option key={value} value={value} text={text} />)}
      </Select>)}
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="small" as="p">{copy.amountHint}</Typography>
        <Decimal label={copy.minimumAmount} value={filters.min} locale={locale} allowEmptyValue onChange={event => change("min", event.target.value.rawValue)} />
        <Decimal label={copy.maximumAmount} value={filters.max} locale={locale} allowEmptyValue onChange={event => change("max", event.target.value.rawValue)} />
      </Box>
      <Box display="flex" justifyContent="space-between" gap={2}>
        <Button type="button" variantType="tertiary" onClick={() => { setFilters(emptyTransactionFilters); setDateText({ fromDate: "", toDate: "" }); setError(false); }}>{copy.clearFilters}</Button>
        <Button type="submit" variantType="primary">{copy.applyFilters}</Button>
      </Box>
    </form>
  </Sidebar>;
}
