import { Dl, Dt, Dd } from "carbon-react/lib/components/definition-list";
import type { PurchaseOrder } from "../../data/purchaseOrders";
import { formatListingDate } from "../sales-listing/salesGridShared";

type PurchaseOrderInformationTabProps = {
  order: PurchaseOrder;
};

export default function PurchaseOrderInformationTab({ order }: PurchaseOrderInformationTabProps) {
  return (
    <Dl>
      <Dt>Buyer reference</Dt>
      <Dd>{order.buyerReference}</Dd>
      <Dt>Supplier</Dt>
      <Dd>{order.supplier}</Dd>
      <Dt>Purchasing site</Dt>
      <Dd>{order.purchasingSite}</Dd>
      <Dt>Order date</Dt>
      <Dd>{formatListingDate(order.orderDate)}</Dd>
      <Dt>Earliest expected date</Dt>
      <Dd>{formatListingDate(order.earliestExpectedDate)}</Dd>
    </Dl>
  );
}
