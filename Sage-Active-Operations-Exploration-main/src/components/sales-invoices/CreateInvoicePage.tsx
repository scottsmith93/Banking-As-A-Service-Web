import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Form from "carbon-react/lib/components/form";
import Icon from "carbon-react/lib/components/icon";
import IconButton from "carbon-react/lib/components/icon-button";
import Message from "carbon-react/lib/components/message";
import Typography from "carbon-react/lib/components/typography";
import InvoiceDetailsHeader from "./InvoiceDetailsHeader";
import InvoiceItemsSection from "./InvoiceItemsSection";
import InvoiceNotesSection from "./InvoiceNotesSection";
import InvoiceCreateFooter from "./InvoiceCreateFooter";
import CustomerDetailsSidebar from "./CustomerDetailsSidebar";
import { customers } from "../../data/customers";
import type { InvoiceLineItem } from "../../data/invoiceCreateForm";
import { calculateInvoiceSummary } from "../../utils/calculateInvoiceTotals";
import { ROUTES } from "../../routes";

const today = new Date();
const defaultDate = `${String(today.getDate()).padStart(2, "0")}/${String(
  today.getMonth() + 1,
).padStart(2, "0")}/${today.getFullYear()}`;

export default function CreateInvoicePage() {
  const navigate = useNavigate();

  const [customerId, setCustomerId] = useState("");
  const [prefix, setPrefix] = useState("inv");
  const [reference, setReference] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(defaultDate);
  const [fulfillmentDate, setFulfillmentDate] = useState(defaultDate);

  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([]);
  const [nextLineId, setNextLineId] = useState(1);
  const [draftProductOrService, setDraftProductOrService] = useState("");
  const [draftQuantity, setDraftQuantity] = useState("1");
  const [draftUnitPrice, setDraftUnitPrice] = useState("0.00");
  const [draftDiscount, setDraftDiscount] = useState("0.00");
  const [draftVat, setDraftVat] = useState("20.00");
  const [customerDiscountPercent, setCustomerDiscountPercent] = useState("0.00");

  const [internalNotes, setInternalNotes] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);

  const hasCustomer = customerId !== "";

  const handleCustomerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCustomerId(value);
    if (!value) {
      setIsCustomerDetailsOpen(false);
    }
  };

  // FilterableSelect's onChange fires on every highlighted-option change while
  // filtering, not just on final selection, so a ref tracks the latest value
  // synchronously — committing on that intermediate value would add a line
  // per keystroke instead of once per actual choice.
  const draftProductOrServiceRef = useRef(draftProductOrService);

  const handleDraftProductOrServiceChange = (value: string) => {
    draftProductOrServiceRef.current = value;
    setDraftProductOrService(value);
  };

  const handleDraftProductOrServiceBlur = () => {
    const value = draftProductOrServiceRef.current;
    if (!value) {
      return;
    }

    // Selecting a product on the empty trailing row commits it as a new line
    // and opens the next empty row, so adding items needs no extra click.
    setLineItems((current) => [
      ...current,
      {
        id: `invoice-line-${String(nextLineId).padStart(3, "0")}`,
        productOrServiceId: value,
        quantity: Number(draftQuantity) || 0,
        unitPriceGbp: Number(draftUnitPrice) || 0,
        discountPercent: Number(draftDiscount) || 0,
        vatPercent: Number(draftVat) || 0,
      },
    ]);
    setNextLineId((current) => current + 1);
    draftProductOrServiceRef.current = "";
    setDraftProductOrService("");
    setDraftQuantity("1");
    setDraftUnitPrice("0.00");
    setDraftDiscount("0.00");
    setDraftVat("20.00");
  };

  const handleRemoveLine = (id: string) => {
    setLineItems((current) => current.filter((item) => item.id !== id));
  };

  const handleUpdateLine = (id: string, patch: Partial<InvoiceLineItem>) => {
    setLineItems((current) =>
      current.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  };

  const handleClose = () => {
    navigate(ROUTES.sales.invoices);
  };

  const handleCreate = () => {
    // PROTOTYPE: simulate successful save — replace with API call
    navigate(ROUTES.sales.invoices);
  };

  const summary = useMemo(
    () => calculateInvoiceSummary(lineItems, Number(customerDiscountPercent) || 0),
    [lineItems, customerDiscountPercent],
  );
  const selectedCustomer = useMemo(
    () => customers.find((customer) => customer.id === customerId),
    [customerId],
  );

  return (
    <Box className="pageContent salesInvoiceCreate">
      <Form
        stickyFooter
        stickyFooterVariant="light"
        height="100%"
        footerPadding={{ py: 0, px: 4 }}
        footerChildren={
          <InvoiceCreateFooter
            summary={summary}
            onCancel={handleClose}
            onCreate={handleCreate}
            showPreview={showPreview}
            onTogglePreview={() => setShowPreview((current) => !current)}
          />
        }
      >
        <Box
          className="salesInvoiceCreate__header"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h1" as="h1" className="salesInvoiceCreate__title">
            New sales invoice
          </Typography>
          <IconButton aria-label="Close new sales invoice" onClick={handleClose}>
            <Icon type="close" />
          </IconButton>
        </Box>

        {showPreview && (
          <Message variant="info">
            {selectedCustomer
              ? `Previewing invoice for ${selectedCustomer.name}. Document preview comes in a later step.`
              : "Select a customer to preview the invoice. Document preview comes in a later step."}
          </Message>
        )}

        <InvoiceDetailsHeader
          fieldIdPrefix="sales-invoice"
          customerId={customerId}
          prefix={prefix}
          reference={reference}
          invoiceDate={invoiceDate}
          fulfillmentDate={fulfillmentDate}
          onCustomerChange={handleCustomerChange}
          onPrefixChange={setPrefix}
          onReferenceChange={setReference}
          onInvoiceDateChange={setInvoiceDate}
          onFulfillmentDateChange={setFulfillmentDate}
          onViewCustomerDetails={() => setIsCustomerDetailsOpen(true)}
        />

        <InvoiceItemsSection
          fieldIdPrefix="sales-invoice"
          hasCustomer={hasCustomer}
          lineItems={lineItems}
          draftProductOrService={draftProductOrService}
          draftQuantity={draftQuantity}
          draftUnitPrice={draftUnitPrice}
          draftDiscount={draftDiscount}
          draftVat={draftVat}
          onDraftProductOrServiceChange={handleDraftProductOrServiceChange}
          onDraftProductOrServiceBlur={handleDraftProductOrServiceBlur}
          onDraftQuantityChange={setDraftQuantity}
          onDraftUnitPriceChange={setDraftUnitPrice}
          onDraftDiscountChange={setDraftDiscount}
          onDraftVatChange={setDraftVat}
          onRemoveLine={handleRemoveLine}
          onUpdateLine={handleUpdateLine}
          summary={summary}
          customerDiscountPercent={customerDiscountPercent}
          onCustomerDiscountPercentChange={setCustomerDiscountPercent}
        />

        <InvoiceNotesSection
          fieldIdPrefix="sales-invoice"
          internalNotes={internalNotes}
          onInternalNotesChange={setInternalNotes}
          onIntroductoryNotesChange={() => undefined}
          onFinalInvoiceNotesChange={() => undefined}
        />
      </Form>

      <CustomerDetailsSidebar
        customer={selectedCustomer}
        open={isCustomerDetailsOpen}
        onCancel={() => setIsCustomerDetailsOpen(false)}
      />
    </Box>
  );
}
