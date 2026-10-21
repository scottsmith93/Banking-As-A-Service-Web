import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import Pill from "carbon-react/lib/components/pill";
import Typography from "carbon-react/lib/components/typography";
import type { BaaSAccount, LegacyBankAccount } from "../../data/bankingBaas";

type BaasBankAccountCardProps = {
  account: BaaSAccount | LegacyBankAccount;
  copy: {
    sageAccount: string;
    pending: string;
    active: string;
    realTime: string;
    poweredByAdyen: string;
    balance: string;
    accountEnding: string;
    ledgerAccount: string;
    lastUpdated: string;
    openAccount: string;
    viewAccount: string;
    manageMovements: string;
    edit: string;
    delete: string;
    cashAccount: string;
    existingBankAccount: string;
  };
  locale: string;
  onOpen?: () => void;
  onDelete?: () => void;
};

function isBaasAccount(account: BaaSAccount | LegacyBankAccount): account is BaaSAccount {
  return "status" in account;
}

export default function BaasBankAccountCard({ account, copy, locale, onOpen, onDelete }: BaasBankAccountCardProps) {
  const isBaas = isBaasAccount(account);
  const isPending = isBaas && account.status === "pending";
  const legacyAccount = !isBaas ? account : null;
  const formattedBalance = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(isBaas ? account.balanceEur : account.balanceEur);

  return (
    <Box className={`baasAccountCard${isBaas ? " baasAccountCard--sage" : ""}`} as="article">
      <Box className="baasAccountCard__body" display="flex" flexDirection="column">
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <Box className={`baasAccountCard__icon${isBaas ? " baasAccountCard__icon--sage" : ""}`} aria-hidden="true">
              <Icon type={isBaas ? "credit_card" : "bank"} />
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="strong" as="p" className="baasAccountCard__name">
                {account.name}
              </Typography>
              <Typography variant="small" as="p" className="baasAccountCard__type">
                {isBaas ? `${copy.sageAccount} · ${copy.poweredByAdyen}` : account.kind === "cash" ? copy.cashAccount : copy.existingBankAccount}
              </Typography>
            </Box>
          </Box>
          {isBaas && (
            <Pill
              pillRole="status"
              colorVariant={isPending ? "neutral" : "positive"}
              size="S"
            >
              {isPending ? copy.pending : copy.active}
            </Pill>
          )}
        </Box>

        {isBaas && <Typography variant="small" as="p" className="baasAccountCard__realtime">{copy.realTime}</Typography>}

        <Box className="baasAccountCard__summary" display="flex" justifyContent="space-between" alignItems="flex-end">
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="small" as="p" className="baasAccountCard__label">
              {isBaas ? `${copy.accountEnding} ${account.accountEnding}` : legacyAccount?.accountNumber || "—"}
            </Typography>
            <Typography variant="small" as="p" className="baasAccountCard__label">
              {copy.ledgerAccount}: {isBaas ? "57200000" : legacyAccount?.ledgerAccount}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
            <Typography variant="small" as="p" className="baasAccountCard__label">
              {copy.balance}
            </Typography>
            <Typography variant="h3" as="p" className="baasAccountCard__balance numericValue">
              {formattedBalance}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className="baasAccountCard__footer" display="flex" alignItems="center" gap={2}>
        {isBaas ? (
          isPending ? (
            <Typography variant="small" as="p" className="baasAccountCard__pendingCopy">
              {copy.pending}
            </Typography>
          ) : (
            <Button variantType="primary" size="small" onClick={onOpen}>
              {copy.viewAccount}
            </Button>
          )
        ) : (
          <>
            <Button variantType="tertiary" size="small">
              {copy.manageMovements}
            </Button>
            <Button variantType="tertiary" size="small">
              {copy.edit}
            </Button>
            <Button variantType="tertiary" size="small" destructive onClick={onDelete}>
              {copy.delete}
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
