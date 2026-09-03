import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Form from "carbon-react/lib/components/form";
import { Tab, TabList, TabPanel, Tabs } from "carbon-react/lib/components/tabs/__next__";
import Typography from "carbon-react/lib/components/typography";
import PurchaseOrderCommentsTab from "../../components/purchase-orders/PurchaseOrderCommentsTab";
import PurchaseOrderDetailFooter from "../../components/purchase-orders/PurchaseOrderDetailFooter";
import PurchaseOrderDetailHeader from "../../components/purchase-orders/PurchaseOrderDetailHeader";
import PurchaseOrderInfoFields from "../../components/purchase-orders/PurchaseOrderInfoFields";
import PurchaseOrderInformationTab from "../../components/purchase-orders/PurchaseOrderInformationTab";
import PurchaseOrderLinesGrid from "../../components/purchase-orders/PurchaseOrderLinesGrid";
import PurchaseOrderStepSequence from "../../components/purchase-orders/PurchaseOrderStepSequence";
import PurchaseOrderTimelineTab from "../../components/purchase-orders/PurchaseOrderTimelineTab";
import PurchaseOrderTotalsPanel from "../../components/purchase-orders/PurchaseOrderTotalsPanel";
import CreatePurchaseReceiptPanel from "../../components/purchase-receipts/CreatePurchaseReceiptPanel";
import { purchaseOrders, type PurchaseOrderStatus } from "../../data/purchaseOrders";
import { createStockReceiptJournalEntries } from "../../data/journalEntries";
import { useStockAlert } from "../../context/useStockAlert";
import { ROUTES } from "../../routes";

export default function PurchaseOrderDetailPage() {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const { receiveStock } = useStockAlert();

  const order = useMemo(() => purchaseOrders.find((item) => item.id === orderId), [orderId]);

  const [status, setStatus] = useState<PurchaseOrderStatus | undefined>(order?.status);
  const [receiptPanelOpen, setReceiptPanelOpen] = useState(false);

  const handleBack = () => navigate(ROUTES.purchases.orders);

  if (!order || !status) {
    return (
      <Box className="pageContent">
        <Typography variant="h1" as="h1">
          Purchase order not found
        </Typography>
        <Typography variant="p" as="p">
          We could not find this purchase order in the prototype data set.
        </Typography>
        <Box>
          <Button variantType="secondary" onClick={handleBack}>
            Back to purchase orders
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
          <PurchaseOrderDetailFooter
            order={{ ...order, status }}
            onCancel={handleBack}
            onReject={() => {
              // PROTOTYPE: rejecting removes the order from the approval queue in a real flow
              setStatus("awaiting-approval");
            }}
            onApprove={() => setStatus("approved")}
            onGenerateReceipt={() => setReceiptPanelOpen(true)}
          />
        }
      >
        <PurchaseOrderDetailHeader orderId={order.orderId} status={status} onBack={handleBack} />

        <Box className="purchaseOrderDetail__topRow" display="flex" gap={3}>
          <Box className="purchaseOrderDetail__stepCard">
            <PurchaseOrderStepSequence status={status} />
          </Box>
          <Box className="purchaseOrderDetail__infoCard" flex="1 1 auto" minWidth={0}>
            <PurchaseOrderInfoFields order={order} />
          </Box>
        </Box>

        <Tabs>
          <TabList ariaLabel="Purchase order sections">
            <Tab id="lines-tab" controls="lines-panel" label="Lines" />
            <Tab id="information-tab" controls="information-panel" label="Information" />
            <Tab id="totals-tab" controls="totals-panel" label="Totals" />
            <Tab id="comments-tab" controls="comments-panel" label="Comments" />
            <Tab id="timeline-tab" controls="timeline-panel" label="Timeline" />
          </TabList>

          <TabPanel id="lines-panel" tabId="lines-tab">
            <PurchaseOrderLinesGrid lines={order.lines} />
          </TabPanel>

          <TabPanel id="information-panel" tabId="information-tab">
            <PurchaseOrderInformationTab order={order} />
          </TabPanel>

          <TabPanel id="totals-panel" tabId="totals-tab">
            <PurchaseOrderTotalsPanel order={order} />
          </TabPanel>

          <TabPanel id="comments-panel" tabId="comments-tab">
            <PurchaseOrderCommentsTab />
          </TabPanel>

          <TabPanel id="timeline-panel" tabId="timeline-tab">
            <PurchaseOrderTimelineTab order={{ ...order, status }} />
          </TabPanel>
        </Tabs>
      </Form>

      {receiptPanelOpen && (
        <CreatePurchaseReceiptPanel
          open={receiptPanelOpen}
          order={order}
          onCancel={() => setReceiptPanelOpen(false)}
          onConfirm={(receipt) => {
            const receivedQuantity = receipt.lines.reduce(
              (sum, line) => sum + line.quantityPurchaseUnit,
              0,
            );
            receiveStock(receivedQuantity);
            createStockReceiptJournalEntries(receipt);
            setReceiptPanelOpen(false);
            navigate(ROUTES.purchases.receiptDetail(receipt.id), {
              state: { justCreated: true },
            });
          }}
        />
      )}
    </Box>
  );
}
