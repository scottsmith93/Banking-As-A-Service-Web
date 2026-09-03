import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import IconButton from "carbon-react/lib/components/icon-button";
import Pill from "carbon-react/lib/components/pill";
import Typography from "carbon-react/lib/components/typography";
import { bankAccounts, formatBankBalanceEur, type BankAccount } from "../../data/bankAccounts";

function BankAccountIcon({ account }: { account: BankAccount }) {
  if (account.type === "connected" && account.providerIconSrc) {
    return (
      <img
        className="bankAccountCard__providerImage"
        src={account.providerIconSrc}
        alt=""
        aria-hidden="true"
      />
    );
  }

  if (account.type === "cash") {
    return (
      <img
        className="bankAccountCard__typeImage"
        src="/banking/cash.svg"
        alt=""
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      className="bankAccountCard__typeImage"
      src="/banking/bank.svg"
      alt=""
      aria-hidden="true"
    />
  );
}

function ConnectedCardFooter() {
  return (
    <Box
      className="bankAccountCard__footerActions"
      display="flex"
      alignItems="center"
      width="100%"
    >
      <Button variantType="tertiary" size="small">
        Sync
      </Button>
      <Button variantType="tertiary" size="small">
        Manage bank movements
      </Button>
      <Button variantType="tertiary" size="small">
        Disconnect
      </Button>
      <Box className="bankAccountCard__footerSpacer" flex="1" />
      <IconButton aria-label="More actions">
        <Icon type="ellipsis_vertical" />
      </IconButton>
    </Box>
  );
}

function ManualCardFooter() {
  return (
    <Box
      className="bankAccountCard__footerActions"
      display="flex"
      alignItems="center"
      width="100%"
    >
      <Button variantType="tertiary" size="small" className="bankAccountCard__connectButton">
        Connect
      </Button>
      <Button variantType="tertiary" size="small" iconType="edit" iconPosition="before">
        Edit
      </Button>
      <Button
        variantType="tertiary"
        size="small"
        iconType="delete"
        iconPosition="before"
        destructive
      >
        Delete
      </Button>
    </Box>
  );
}

function CashCardFooter() {
  return (
    <Box
      className="bankAccountCard__footerActions"
      display="flex"
      alignItems="center"
      width="100%"
    >
      <Button variantType="tertiary" size="small" iconType="edit" iconPosition="before">
        Edit
      </Button>
      <Button
        variantType="tertiary"
        size="small"
        iconType="delete"
        iconPosition="before"
        destructive
      >
        Delete
      </Button>
    </Box>
  );
}

function formatLastUpdated(account: BankAccount): string | null {
  if (account.type === "cash") {
    return null;
  }

  if (account.lastUpdated) {
    return `Last updated: ${account.lastUpdated}`;
  }

  return "Last updated:";
}

function BankAccountCard({ account }: { account: BankAccount }) {
  const isConnected = account.type === "connected";
  const isCash = account.type === "cash";
  const lastUpdated = formatLastUpdated(account);

  const footer = isConnected ? (
    <ConnectedCardFooter />
  ) : isCash ? (
    <CashCardFooter />
  ) : (
    <ManualCardFooter />
  );

  return (
    <Box className="bankAccountCard" as="article">
      <Box className="bankAccountCard__body">
        <Box className="bankAccountCard__iconCell">
          <BankAccountIcon account={account} />
        </Box>

        <Typography variant="strong" as="p" className="bankAccountCard__name">
          {account.name}
        </Typography>

        {isConnected && (
          <Box className="bankAccountCard__status">
            <Pill pillRole="status" colorVariant="positive" size="S">
              Connected
            </Pill>
          </Box>
        )}

        {account.accountNumber ? (
          <Typography variant="small" as="p" className="bankAccountCard__meta bankAccountCard__iban">
            {account.accountNumber}
          </Typography>
        ) : (
          <span className="bankAccountCard__iban bankAccountCard__iban--empty" aria-hidden="true" />
        )}

        <Typography
          variant="strong"
          as="p"
          className={`bankAccountCard__balance numericValue${
            account.balanceEur < 0 ? " bankAccountCard__balance--negative" : ""
          }`}
        >
          {formatBankBalanceEur(account.balanceEur)}
        </Typography>

        <Typography variant="small" as="p" className="bankAccountCard__meta bankAccountCard__ledger">
          Ledger account: {account.ledgerAccount}
        </Typography>

        {lastUpdated ? (
          <Typography variant="small" as="p" className="bankAccountCard__meta bankAccountCard__lastUpdated">
            {lastUpdated}
          </Typography>
        ) : (
          <span className="bankAccountCard__lastUpdated bankAccountCard__lastUpdated--empty" aria-hidden="true" />
        )}
      </Box>

      <Box className="bankAccountCard__footer">{footer}</Box>
    </Box>
  );
}

type BankAccountCardsProps = {
  searchText?: string;
};

export default function BankAccountCards({ searchText = "" }: BankAccountCardsProps) {
  const query = searchText.trim().toLowerCase();
  const visibleAccounts = query
    ? bankAccounts.filter((account) => account.name.toLowerCase().includes(query))
    : bankAccounts;

  return (
    <Box className="bankAccountCards">
      {visibleAccounts.map((account) => (
        <BankAccountCard key={account.id} account={account} />
      ))}
    </Box>
  );
}
