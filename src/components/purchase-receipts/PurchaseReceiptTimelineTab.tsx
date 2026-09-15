import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import { getReceiptTimeline, type PurchaseReceipt } from "../../data/purchaseReceipts";
import { formatListingDate } from "../sales-listing/salesGridShared";

type PurchaseReceiptTimelineTabProps = {
  receipt: PurchaseReceipt;
};

export default function PurchaseReceiptTimelineTab({ receipt }: PurchaseReceiptTimelineTabProps) {
  const events = getReceiptTimeline(receipt);

  return (
    <Box className="purchaseOrderDetail__timeline">
      {events.map((event) => (
        <Box key={event.label} className="purchaseOrderDetail__timelineEvent" display="flex" gap={2}>
          <Icon type="tick_circle" color="--colorsSemanticPositive500" />
          <Box>
            <Typography variant="strong" as="p" className="purchaseOrderDetail__timelineLabel">
              {event.label}
            </Typography>
            <Typography variant="p" as="p" className="purchaseOrderDetail__timelineDate">
              {formatListingDate(event.date)}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
