import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import DateInput from "carbon-react/lib/components/date";
import { Option, Select } from "carbon-react/lib/components/select";
import JournalEntriesGrid from "../../components/accounting/JournalEntriesGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { journalEntryLines } from "../../data/journalEntries";
import { ROUTES } from "../../routes";

export default function JournalEntriesPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(journalEntryLines.length);
  const [journal, setJournal] = useState("");
  const [fiscalYear, setFiscalYear] = useState("2026");
  const [month, setMonth] = useState("June");
  const [dateFrom, setDateFrom] = useState("01/06/2026");
  const [dateTo, setDateTo] = useState("30/06/2026");

  const headerActions = (
    <Button variantType="tertiary" iconType="upload" iconPosition="before">
      Import journal entries
    </Button>
  );

  const filterBar = (
    <Box display="flex" alignItems="end" className="journalEntriesPage__filters">
      <Select
        id="journal-entries-journal"
        label="Journal"
        placeholder="Select..."
        value={journal}
        onChange={(event) => setJournal(event.target.value)}
      >
        <Option text="VTE" value="VTE" />
        <Option text="ACH" value="ACH" />
        <Option text="BNK" value="BNK" />
      </Select>
      <Select
        id="journal-entries-fiscal-year"
        label="Fiscal year"
        value={fiscalYear}
        onChange={(event) => setFiscalYear(event.target.value)}
      >
        <Option text="2026" value="2026" />
        <Option text="2025" value="2025" />
      </Select>
      <Select
        id="journal-entries-month"
        label="Month"
        value={month}
        onChange={(event) => setMonth(event.target.value)}
      >
        <Option text="June" value="June" />
        <Option text="May" value="May" />
        <Option text="April" value="April" />
      </Select>
      <DateInput
        id="journal-entries-date-from"
        label="Date from"
        value={dateFrom}
        onChange={(event) => setDateFrom(event.target.value.formattedValue)}
      />
      <DateInput
        id="journal-entries-date-to"
        label="Date to"
        value={dateTo}
        onChange={(event) => setDateTo(event.target.value.formattedValue)}
      />
    </Box>
  );

  return (
    <SalesListingPage
      title="Journal entries"
      searchLabel="Search journal entries"
      createRoute={ROUTES.accounting.journalEntryCreate}
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showCustomise={false}
      headerActions={headerActions}
      toolbarStart={
        <Button variantType="secondary" iconType="dropdown" iconPosition="after">
          Bulk actions
        </Button>
      }
      filterBar={filterBar}
    >
      <JournalEntriesGrid
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
