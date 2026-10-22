import { MultiSelect, Option } from "carbon-react/lib/components/select";
import { Checkbox } from "carbon-react/lib/components/checkbox";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";

type Props = {
  id: string; label: string; allLabel: string; values: string[];
  options: { value: string; text: string }[]; onChange: (values: string[]) => void;
};
const ALL = "all-options";

// An empty domain selection means no restriction. Carbon still receives a real selected All option.
export default function BankMovementMultiSelect({ id, label, allLabel, values, options, onChange }: Props) {
  const { copy } = useTransactionPresentation();
  // The option owns interaction/aria-selected. Its Carbon checkbox mirrors that state without a second tab stop.
  const optionContent = (text: string, checked: boolean) => <div className="bankMovementMultiSelectOption">
    <div className="bankMovementMultiSelectOption__checkbox" aria-hidden="true"><Checkbox checked={checked} onChange={() => {}} tabIndex={-1} /></div>
    <span>{text}</span>
  </div>;
  return <MultiSelect id={id} label={label} size="small" value={values.length ? values : [ALL]} wrapPillText={values.length > 0}
    onChange={event => {
      const raw: unknown = event.target.value;
      const next = Array.isArray(raw) ? raw.filter((value): value is string => typeof value === "string") : [];
      // Choosing All replaces specific choices; choosing a specific option replaces All.
      onChange(values.length && next.includes(ALL) ? [] : next.filter(value => value !== ALL));
    }}>
    <Option value={ALL} text={copy.movements.all} aria-label={allLabel}>{optionContent(allLabel, !values.length)}</Option>
    {options.map(option => <Option key={option.value} value={option.value} text={option.text}>{optionContent(option.text, values.includes(option.value))}</Option>)}
  </MultiSelect>;
}
