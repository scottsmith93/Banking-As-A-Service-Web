import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Form from "carbon-react/lib/components/form";
import Icon from "carbon-react/lib/components/icon";
import IconButton from "carbon-react/lib/components/icon-button";
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "carbon-react/lib/components/tabs/__next__";
import Textarea from "carbon-react/lib/components/textarea";
import Typography from "carbon-react/lib/components/typography";
import CreateSalesQuoteFooter from "../sales-quotes/CreateSalesQuoteFooter";
import CreateSalesQuoteHeaderFields from "../sales-quotes/CreateSalesQuoteHeaderFields";
import CreateSalesQuoteLineItems from "../sales-quotes/CreateSalesQuoteLineItems";
import { calculateQuoteTotals } from "../../utils/calculateQuoteTotals";
import { clients } from "../../data/clients";
import { type QuoteLineItem } from "../../data/salesQuoteForm";

const sampleLineItems: QuoteLineItem[] = [
  {
    id: "line-001",
    productOrService: "Annual support package",
    description: "Priority response and quarterly reviews",
    quantity: 1,
    unitPriceGbp: 1250,
    discountPercent: 0,
  },
];

type CreateSalesDocumentPageProps = {
  documentTitle: string;
  listRoute: string;
  fieldIdPrefix: string;
  tabsAriaLabel: string;
  dateLabel?: string;
};

export default function CreateSalesDocumentPage({
  documentTitle,
  listRoute,
  fieldIdPrefix,
  tabsAriaLabel,
  dateLabel = "Date",
}: CreateSalesDocumentPageProps) {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState("");
  const [prefix, setPrefix] = useState("na");
  const [reference, setReference] = useState("");
  const [documentDate, setDocumentDate] = useState("09/06/2026");
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("FR");
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<QuoteLineItem[]>([]);
  const [nextLineId, setNextLineId] = useState(1);

  const handleCustomerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = event.target.value;
    setCustomerId(selectedId);

    const client = clients.find((entry) => entry.id === selectedId);
    if (!client) {
      return;
    }

    setBusinessName(client.name);
    setContactName(client.contactName);
  };

  const handleAddLine = () => {
    const sample = sampleLineItems[0];
    setLineItems((current) => [
      ...current,
      {
        ...sample,
        id: `line-${String(nextLineId).padStart(3, "0")}`,
      },
    ]);
    setNextLineId((current) => current + 1);
  };

  const handleRemoveLine = (id: string) => {
    setLineItems((current) => current.filter((item) => item.id !== id));
  };

  const handleClose = () => {
    navigate(listRoute);
  };

  const documentTotals = useMemo(() => calculateQuoteTotals(lineItems), [lineItems]);

  return (
    <Box className="pageContent salesQuoteCreate">
      <Form
        stickyFooter
        stickyFooterVariant="light"
        height="100%"
        footerPadding={{ py: 0, px: 4 }}
        footerChildren={
          <CreateSalesQuoteFooter totals={documentTotals} onCancel={handleClose} />
        }
      >
        <Box
          className="salesQuoteCreate__header"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h1" as="h1" className="salesQuoteCreate__title">
            {documentTitle}
          </Typography>
          <IconButton aria-label={`Close ${documentTitle.toLowerCase()}`} onClick={handleClose}>
            <Icon type="close" />
          </IconButton>
        </Box>

        <Box className="salesQuoteCreate__fieldsCard">
          <CreateSalesQuoteHeaderFields
            fieldIdPrefix={fieldIdPrefix}
            dateLabel={dateLabel}
            customerId={customerId}
            prefix={prefix}
            reference={reference}
            quoteDate={documentDate}
            businessName={businessName}
            contactName={contactName}
            email={email}
            phone={phone}
            country={country}
            onCustomerChange={handleCustomerChange}
            onPrefixChange={setPrefix}
            onReferenceChange={setReference}
            onQuoteDateChange={setDocumentDate}
            onBusinessNameChange={setBusinessName}
            onContactNameChange={setContactName}
            onEmailChange={setEmail}
            onPhoneChange={setPhone}
            onCountryChange={setCountry}
          />
        </Box>

        <Box className="salesQuoteCreate__tabs">
          <Tabs>
            <TabList ariaLabel={tabsAriaLabel}>
              <Tab id="products-tab" controls="products-panel" label="Products or services" />
              <Tab id="totals-tab" controls="totals-panel" label="Totals and discounts" />
              <Tab id="notes-tab" controls="notes-panel" label="Notes" />
              <Tab
                id="customer-info-tab"
                controls="customer-info-panel"
                label="Customer information"
              />
            </TabList>

            <TabPanel id="products-panel" tabId="products-tab">
              <CreateSalesQuoteLineItems
                lineItems={lineItems}
                onAddLine={handleAddLine}
                onRemoveLine={handleRemoveLine}
              />
            </TabPanel>

            <TabPanel id="totals-panel" tabId="totals-tab">
              <Typography variant="p" as="p" className="salesQuoteCreate__tabPlaceholder">
                Totals and discounts will appear here once line items are added.
              </Typography>
            </TabPanel>

            <TabPanel id="notes-panel" tabId="notes-tab">
              <Textarea
                id={`${fieldIdPrefix}-notes`}
                label="Notes"
                value={notes}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNotes(event.target.value)
                }
              />
            </TabPanel>

            <TabPanel id="customer-info-panel" tabId="customer-info-tab">
              <Typography variant="p" as="p" className="salesQuoteCreate__tabPlaceholder">
                Customer details are populated from the header fields above.
              </Typography>
            </TabPanel>
          </Tabs>
        </Box>
      </Form>
    </Box>
  );
}
