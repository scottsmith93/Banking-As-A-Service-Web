import { useState } from "react";
import Icon from "carbon-react/lib/components/icon";
import Portrait from "carbon-react/lib/components/portrait";
import Tooltip from "carbon-react/lib/components/tooltip";
import type { BankTransaction } from "../../../data/bankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { transactionSource } from "../../../utils/transactionSource";
import { interpolate } from "../../../utils/interpolate";

// Carbon Portrait and Tooltip compose a read-only provenance pattern, not another row action.
export default function BaasTransactionSource({ transaction }: { transaction: BankTransaction }) {
  const { copy } = useTransactionPresentation();
  const source = transactionSource(transaction);
  const [failedLogo, setFailedLogo] = useState<string | null>(null);
  const bank = source.isSage ? copy.movements.sageBank : source.bank?.name ?? copy.movements.bank;
  const label = interpolate(source.cardholder ? copy.movements.cardSource : copy.movements.bankSource, { bank, account: source.account, cardholder: source.cardholder ?? "" });
  const logo = source.isSage ? "/banking/sage-demo-bank-icon.svg" : source.bank?.logo;
  return <Tooltip id={`transaction-source-${transaction.id}`} message={label} position="top">
    <span className="baasTransactionSource" tabIndex={0} role="img" aria-label={label}>
      <span className={`baasTransactionSource__bank baasTransactionSource__bank--${source.isSage ? "sage" : source.bank?.id ?? "unknown"}`} aria-hidden="true">
        {logo && failedLogo !== logo ? <img src={logo} alt="" referrerPolicy="no-referrer" onError={() => setFailedLogo(logo)} /> : <Icon type="bank" />}
      </span>
      {source.cardholder && <span aria-hidden="true"><Portrait size="XS" initials={source.initials} /></span>}
    </span>
  </Tooltip>;
}
