import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import BankAccountCards from "../../components/banking/BankAccountCards";
import { bankAccounts } from "../../data/bankAccounts";

export default function BankingPage() {
  const [searchText, setSearchText] = useState("");

  return (
    <Box className="pageContent salesListingPage bankingAccountsPage">
      <Box className="salesListingPage__titleRow" display="flex" justifyContent="space-between">
        <Typography variant="h1" as="h1" className="salesListingPage__title">
          Bank accounts and cash
        </Typography>
        <Box display="flex" alignItems="center" className="bankingAccountsPage__headerActions">
          <Button variantType="tertiary" iconType="refresh" iconPosition="before">
            Sync all
          </Button>
          <Box className="salesListingPage__search">
            <Textbox
              id="bank-accounts-search"
              label="Search bank accounts"
              placeholder="Search"
              inputIcon="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </Box>
        </Box>
      </Box>

      <Box className="salesListingPage__toolbar" display="flex" alignItems="center">
        <Button variantType="primary" iconType="add" iconPosition="before">
          Create
        </Button>
      </Box>

      <BankAccountCards searchText={searchText} />

      <Typography variant="p" as="p" className="salesListingPage__itemCount">
        Items:{" "}
        {searchText.trim()
          ? bankAccounts.filter((account) =>
              account.name.toLowerCase().includes(searchText.trim().toLowerCase()),
            ).length
          : bankAccounts.length}
      </Typography>
    </Box>
  );
}
