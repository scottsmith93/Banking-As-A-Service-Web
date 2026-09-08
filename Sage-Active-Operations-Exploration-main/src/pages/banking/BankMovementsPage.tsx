import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import DateInput from "carbon-react/lib/components/date";
import Icon from "carbon-react/lib/components/icon";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "carbon-react/lib/components/tabs/__next__";
import Typography from "carbon-react/lib/components/typography";
import BankMovementsEmptyState from "../../components/banking/BankMovementsEmptyState";

const gbpFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export default function BankMovementsPage() {
  const [bankAccount, setBankAccount] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("10/06/2024");
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");
  const [searchText, setSearchText] = useState("");

  return (
    <Box className="pageContent salesListingPage bankMovementsPage">
      <Box className="salesListingPage__titleRow" display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column" className="salesListingPage__titleBlock">
          <Box display="flex" alignItems="center" className="bankMovementsPage__titleGroup">
            <Typography variant="h1" as="h1" className="salesListingPage__title">
              Bank movements
            </Typography>
            <Box className="bankMovementsPage__helpIcon">
              <Icon type="info" />
            </Box>
          </Box>
          <Typography variant="p" as="p" className="salesListingPage__description">
            Reconcile bank movements to check what&apos;s paid and keep your records
            accurate.
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" className="salesListingPage__headerActions">
          <Button variantType="tertiary" iconType="refresh" iconPosition="before">
            Refresh suggestions
          </Button>
          <Button variantType="tertiary" iconType="settings" iconPosition="before">
            Settings
          </Button>
        </Box>
      </Box>

      <Box className="bankMovementsPage__filters" display="flex" flexWrap="wrap" alignItems="end">
        <Box className="bankMovementsPage__bankSelect">
          <Select
            id="bank-movements-account"
            label="Select a bank account"
            placeholder="Select..."
            value={bankAccount}
            onChange={(event) => setBankAccount(event.target.value)}
          >
            <Option text="Anna's Bank" value="bank-001" />
            <Option text="Bank account111" value="bank-002" />
          </Select>
        </Box>

        <Box className="bankMovementsPage__summaryStats" display="flex">
          <Box className="bankMovementsPage__stat">
            <Typography variant="strong" as="p" className="bankMovementsPage__statValue numericValue">
              {gbpFormatter.format(0)}
            </Typography>
            <Typography variant="small" as="p" className="bankMovementsPage__statLabel">
              Bank balance
            </Typography>
          </Box>
          <Box className="bankMovementsPage__stat">
            <Typography variant="strong" as="p" className="bankMovementsPage__statValue numericValue">
              {gbpFormatter.format(0)}
            </Typography>
            <Typography variant="small" as="p" className="bankMovementsPage__statLabel">
              Ledger balance
            </Typography>
          </Box>
          <Box className="bankMovementsPage__stat">
            <Typography variant="strong" as="p" className="bankMovementsPage__statValue numericValue">
              {gbpFormatter.format(0)}
            </Typography>
            <Typography variant="small" as="p" className="bankMovementsPage__statLabel">
              Unreconciled amount
            </Typography>
          </Box>
        </Box>

        <DateInput
          id="bank-movements-date-from"
          label="Date from"
          value={dateFrom}
          onChange={(event) => setDateFrom(event.target.value.formattedValue)}
        />
        <DateInput
          id="bank-movements-date-to"
          label="Date to"
          value={dateTo}
          onChange={(event) => setDateTo(event.target.value.formattedValue)}
        />
        <Textbox
          id="bank-movements-amount-from"
          label="Amount from"
          value={amountFrom}
          onChange={(event) => setAmountFrom(event.target.value)}
        />
        <Textbox
          id="bank-movements-amount-to"
          label="Amount to"
          value={amountTo}
          onChange={(event) => setAmountTo(event.target.value)}
        />

        <Box display="flex" alignItems="end" className="bankMovementsPage__searchActions">
          <Box className="salesListingPage__search">
            <Textbox
              id="bank-movements-search"
              label="Search bank movements"
              placeholder="Search"
              inputIcon="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </Box>
          <Button variantType="secondary" iconType="filter" iconPosition="before">
            Filter
          </Button>
        </Box>
      </Box>

      <Box className="bankMovementsPage__tabs">
        <Tabs>
          <TabList ariaLabel="Bank movement status">
            <Tab
              id="to-reconcile-tab"
              controls="to-reconcile-panel"
              label="To reconcile"
            />
            <Tab id="reconciled-tab" controls="reconciled-panel" label="Reconciled" />
            <Tab id="dismissed-tab" controls="dismissed-panel" label="Dismissed" />
          </TabList>

          <TabPanel id="to-reconcile-panel" tabId="to-reconcile-tab">
            <Box className="bankMovementsPage__tableArea">
              <Box className="bankMovementsPage__tableHeader" display="flex">
                <Typography variant="strong" as="span" className="bankMovementsPage__tableGroup">
                  Bank movements
                </Typography>
                <Typography variant="strong" as="span" className="bankMovementsPage__tableGroup">
                  Suggested transactions
                </Typography>
                <Typography variant="strong" as="span">
                  Reconcile
                </Typography>
                <Typography variant="strong" as="span">
                  Actions
                </Typography>
              </Box>
              <BankMovementsEmptyState />
            </Box>
          </TabPanel>

          <TabPanel id="reconciled-panel" tabId="reconciled-tab">
            <BankMovementsEmptyState />
          </TabPanel>

          <TabPanel id="dismissed-panel" tabId="dismissed-tab">
            <BankMovementsEmptyState />
          </TabPanel>
        </Tabs>
      </Box>
    </Box>
  );
}
