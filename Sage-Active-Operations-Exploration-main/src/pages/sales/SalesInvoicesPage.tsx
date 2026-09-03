import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import DateInput from "carbon-react/lib/components/date";
import { Option, Select } from "carbon-react/lib/components/select";
import SalesInvoicesGrid from "../../components/sales-invoices/SalesInvoicesGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { invoices } from "../../data/invoices";
import { ROUTES } from "../../routes";

export default function SalesInvoicesPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(invoices.length);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [invoiceOrigin, setInvoiceOrigin] = useState("");

  const headerActions = (
    <>
      <Button variantType="tertiary" iconType="info" iconPosition="before">
        Filter invoices without Cash VAT
      </Button>
      <Button variantType="tertiary" iconType="settings" iconPosition="before">
        Manage online payments
      </Button>
    </>
  );

  const toolbarStart = (
    <Box display="flex" alignItems="end" className="salesListingPage__invoiceFilters">
      <DateInput
        id="sales-invoices-start-date"
        label="Start creation date"
        value={startDate}
        onChange={(event) => setStartDate(event.target.value.formattedValue)}
      />
      <DateInput
        id="sales-invoices-end-date"
        label="End creation date"
        value={endDate}
        onChange={(event) => setEndDate(event.target.value.formattedValue)}
      />
      <Select
        id="sales-invoices-origin"
        label="Invoice origin"
        placeholder="Select..."
        value={invoiceOrigin}
        onChange={(event) => setInvoiceOrigin(event.target.value)}
      >
        <Option text="Manual" value="manual" />
        <Option text="Recurring invoice" value="recurring" />
        <Option text="Sales order" value="order" />
      </Select>
    </Box>
  );

  return (
    <SalesListingPage
      title="Sales invoices"
      searchLabel="Search sales invoices"
      createRoute={ROUTES.sales.invoiceCreate}
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showCopilotInsights
      headerActions={headerActions}
      toolbarStart={toolbarStart}
    >
      <SalesInvoicesGrid
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
