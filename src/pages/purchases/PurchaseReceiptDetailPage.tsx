import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Form from "carbon-react/lib/components/form";
import { Tab, TabList, TabPanel, Tabs } from "carbon-react/lib/components/tabs/__next__";
import Toast from "carbon-react/lib/components/toast";
import Typography from "carbon-react/lib/components/typography";
import PurchaseReceiptCommentsTab from "../../components/purchase-receipts/PurchaseReceiptCommentsTab";
import PurchaseReceiptDetailFooter from "../../components/purchase-receipts/PurchaseReceiptDetailFooter";
import PurchaseReceiptDetailHeader from "../../components/purchase-receipts/PurchaseReceiptDetailHeader";
import PurchaseReceiptInfoFields from "../../components/purchase-receipts/PurchaseReceiptInfoFields";
import PurchaseReceiptInformationTab from "../../components/purchase-receipts/PurchaseReceiptInformationTab";
import PurchaseReceiptLinesGrid from "../../components/purchase-receipts/PurchaseReceiptLinesGrid";
import PurchaseReceiptStepSequence from "../../components/purchase-receipts/PurchaseReceiptStepSequence";
import PurchaseReceiptTimelineTab from "../../components/purchase-receipts/PurchaseReceiptTimelineTab";
import PurchaseReceiptTotalsPanel from "../../components/purchase-receipts/PurchaseReceiptTotalsPanel";
import { purchaseReceipts, type PurchaseReceiptStatus } from "../../data/purchaseReceipts";
import { ROUTES } from "../../routes";

type PurchaseReceiptLocationState = {
  justCreated?: boolean;
};

export default function PurchaseReceiptDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { receiptId } = useParams<{ receiptId: string }>();

  const receipt = useMemo(
    () => purchaseReceipts.find((item) => item.id === receiptId),
    [receiptId],
  );

  const [status, setStatus] = useState<PurchaseReceiptStatus | undefined>(receipt?.status);
  const [showCreatedToast, setShowCreatedToast] = useState(
    () => ((location.state as PurchaseReceiptLocationState | null)?.justCreated ?? false),
  );

  const handleBack = () => navigate(ROUTES.purchases.receipts);

  if (!receipt || !status) {
    return (
      <Box className="pageContent">
        <Typography variant="h1" as="h1">
          Purchase receipt not found
        </Typography>
        <Typography variant="p" as="p">
          We could not find this purchase receipt in the prototype data set.
        </Typography>
        <Box>
          <Button variantType="secondary" onClick={handleBack}>
            Back to purchase receipts
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="pageContent purchaseOrderDetail">
      <Form
        stickyFooter
        stickyFooterVariant="light"
        height="100%"
        footerPadding={{ py: 0, px: 3 }}
        footerChildren={
          <PurchaseReceiptDetailFooter
            receipt={{ ...receipt, status }}
            onCancel={handleBack}
            onCreateInvoice={() => {
              setStatus("invoiced");
              // PROTOTYPE: hands off to the existing purchase invoice create
              // flow rather than pre-filling it from this receipt.
              navigate(ROUTES.purchases.invoiceCreate);
            }}
            onProcessReturn={() => setStatus("returned")}
          />
        }
      >
        <PurchaseReceiptDetailHeader
          receiptId={receipt.receiptId}
          status={status}
          onBack={handleBack}
        />

        <Box className="purchaseOrderDetail__topRow" display="flex" gap={3}>
          <Box className="purchaseOrderDetail__stepCard">
            <PurchaseReceiptStepSequence status={status} />
          </Box>
          <Box className="purchaseOrderDetail__infoCard" flex="1 1 auto" minWidth={0}>
            <PurchaseReceiptInfoFields receipt={receipt} />
          </Box>
        </Box>

        <Tabs>
          <TabList ariaLabel="Purchase receipt sections">
            <Tab id="lines-tab" controls="lines-panel" label="Lines" />
            <Tab id="information-tab" controls="information-panel" label="Information" />
            <Tab id="totals-tab" controls="totals-panel" label="Totals" />
            <Tab id="comments-tab" controls="comments-panel" label="Comments" />
            <Tab id="timeline-tab" controls="timeline-panel" label="Timeline" />
          </TabList>

          <TabPanel id="lines-panel" tabId="lines-tab">
            <PurchaseReceiptLinesGrid lines={receipt.lines} />
          </TabPanel>

          <TabPanel id="information-panel" tabId="information-tab">
            <PurchaseReceiptInformationTab receipt={receipt} />
          </TabPanel>

          <TabPanel id="totals-panel" tabId="totals-tab">
            <PurchaseReceiptTotalsPanel receipt={receipt} />
          </TabPanel>

          <TabPanel id="comments-panel" tabId="comments-tab">
            <PurchaseReceiptCommentsTab />
          </TabPanel>

          <TabPanel id="timeline-panel" tabId="timeline-tab">
            <PurchaseReceiptTimelineTab receipt={{ ...receipt, status }} />
          </TabPanel>
        </Tabs>
      </Form>

      {showCreatedToast && (
        <Toast
          open
          variant="success"
          align="right"
          alignY="top"
          timeout={6000}
          onDismiss={() => setShowCreatedToast(false)}
        >
          Purchase receipt {receipt.receiptId} created. Stock increased and the accounting entry
          for the stock movement has been recorded.
        </Toast>
      )}
    </Box>
  );
}
