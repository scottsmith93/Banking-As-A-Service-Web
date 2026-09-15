import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import { getOrderTimeline, type PurchaseOrder } from "../../data/purchaseOrders";
import { formatListingDate } from "../sales-listing/salesGridShared";

type PurchaseOrderTimelineTabProps = {
  order: PurchaseOrder;
};

export default function PurchaseOrderTimelineTab({ order }: PurchaseOrderTimelineTabProps) {
  const events = getOrderTimeline(order);

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
