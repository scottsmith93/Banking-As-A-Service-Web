import Icon from "carbon-react/lib/components/icon";
import Tooltip from "carbon-react/lib/components/tooltip";
import Typography from "carbon-react/lib/components/typography";
import BankLogo from "../../banking/BankLogo";
import { useBankingBaas } from "../../../context/useBankingBaas";
import BaasCardholderAvatar from "../BaasCardholderAvatar";
import type { BankTransaction } from "../../../data/bankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { transactionSource } from "../../../utils/transactionSource";
import { interpolate } from "../../../utils/interpolate";

// Carbon Portrait and Tooltip compose a read-only provenance pattern, not another row action.
export default function BaasTransactionSource({ transaction, hideBank = false }: { transaction: BankTransaction; hideBank?: boolean }) {
  const { copy } = useTransactionPresentation();
  const { cards } = useBankingBaas();
  const source = transactionSource(transaction);
  const card = source.cardholder ? cards.find(item => item.lastFour === transaction.lastFour && item.cardholder === source.cardholder) : undefined;
  const bank = source.isSage ? copy.movements.sageBank : source.bank?.name ?? copy.movements.bank;
  const label = interpolate(source.cardholder ? copy.movements.cardSource : copy.movements.bankSource, { bank, account: source.account, cardholder: source.cardholder ?? "" });
  const logo = source.isSage ? "/banking/sage-demo-bank-icon.svg" : source.bank?.logo;
  const bankMark = <BankLogo src={logo} className={`baasTransactionSource__bank baasTransactionSource__bank--${source.isSage ? "sage" : source.bank?.id ?? "unknown"}`} />;
  const person = source.cardholder ? <BaasCardholderAvatar name={source.cardholder} className="baasTransactionSource__portrait" /> : null;
  const hasSecondary = Boolean(source.cardholder || transaction.type === "invoicePayment");
  return <Tooltip id={`transaction-source-${transaction.id}`} message={label} position="top">
    <span className={`baasTransactionSource${hideBank ? "" : " baasTransactionSource--badged"}`} tabIndex={0} role="group" aria-label={label}>
      {hideBank ? <>
        {transaction.type === "invoicePayment" && <span className="baasTransactionSource__avatar" aria-hidden="true"><Icon type="shop" /></span>}
        {transaction.type === "transfer" && !source.cardholder && <span className="baasTransactionSource__avatar" aria-hidden="true"><Icon type="bank" /></span>}
        {source.cardholder && person}
      </> : <span className="baasTransactionSource__cluster">
        {bankMark}
        {hasSecondary && <span className="baasTransactionSource__badge" aria-hidden="true">{source.cardholder ? person : <Icon type="shop" />}</span>}
      </span>}
      <span className="baasTransactionSource__details">
        <Typography variant="small" as="span">{transaction.type === "invoicePayment" ? transaction.merchant : card?.nickname ?? (source.isSage ? copy.types[transaction.type] : source.account)}</Typography>
        {source.cardholder && <Typography variant="small" as="span" className="baasTransactionSource__cardholder">{source.cardholder}</Typography>}
      </span>
    </span>
  </Tooltip>;
}
