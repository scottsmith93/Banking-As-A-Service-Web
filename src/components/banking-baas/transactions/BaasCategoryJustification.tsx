import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import { Option, Select } from "carbon-react/lib/components/select";
import Typography from "carbon-react/lib/components/typography";
import { useBankingTransactions } from "../../../context/useBankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import type { BankTransaction, TransactionCategory } from "../../../data/bankingTransactions";
import { needsCategory } from "../../../utils/transactionMatching";
import BaasTransactionJustification from "./BaasTransactionJustification";

export default function BaasCategoryJustification({ transaction }: { transaction: BankTransaction }) {
  const { copy } = useTransactionPresentation();
  const { categoriseTransaction } = useBankingTransactions();
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  return <Box display="flex" flexDirection="column" gap={2}>
    <Typography variant="p" as="p">{copy.justification.categoryHint}</Typography>
    {needsCategory(transaction) ? <>
      <Select id="baas-justification-category" label={copy.category} placeholder={copy.justification.chooseCategory} value={category} onChange={event => setCategory(event.target.value)}>
        {Object.entries(copy.categories).filter(([key]) => key !== "uncategorised").map(([value, text]) => <Option key={value} value={value} text={text} />)}
      </Select>
      <Button variantType="primary" disabled={!category} onClick={() => { categoriseTransaction(transaction.id, category as TransactionCategory); setMessage(copy.justification.categorySaved); }}>{copy.justification.saveCategory}</Button>
    </> : <BaasTransactionJustification transaction={transaction} />}
    <Typography variant="small" as="p" role="status">{message}</Typography>
  </Box>;
}
