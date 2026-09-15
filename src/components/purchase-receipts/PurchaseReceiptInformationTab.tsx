import { Dl, Dt, Dd } from "carbon-react/lib/components/definition-list";
import type { PurchaseReceipt } from "../../data/purchaseReceipts";
import { formatListingDate } from "../sales-listing/salesGridShared";

type PurchaseReceiptInformationTabProps = {
  receipt: PurchaseReceipt;
};

export default function PurchaseReceiptInformationTab({ receipt }: PurchaseReceiptInformationTabProps) {
  return (
    <Dl>
      <Dt>Receipt ID</Dt>
      <Dd>{receipt.receiptId}</Dd>
      <Dt>Supplier</Dt>
      <Dd>{receipt.supplier}</Dd>
      <Dt>Receiving site</Dt>
      <Dd>{receipt.receivingSite}</Dd>
      <Dt>Receipt date</Dt>
      <Dd>{formatListingDate(receipt.receiptDate)}</Dd>
    </Dl>
  );
}
