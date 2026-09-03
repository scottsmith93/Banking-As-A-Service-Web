import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import DateInput from "carbon-react/lib/components/date";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import DocumentHeaderCard from "../document-header/DocumentHeaderCard";
import type { PurchaseReceipt } from "../../data/purchaseReceipts";

const receivingSiteOptions = ["London DC", "Manchester Hub", "Bristol Warehouse", "Leeds Depot"] as const;

type PurchaseReceiptInfoFieldsProps = {
  receipt: PurchaseReceipt;
};

export default function PurchaseReceiptInfoFields({ receipt }: PurchaseReceiptInfoFieldsProps) {
  const [receivingSite, setReceivingSite] = useState(receipt.receivingSite);
  const [supplier, setSupplier] = useState(receipt.supplier);
  const [number, setNumber] = useState(receipt.receiptId);
  const [receiptDate, setReceiptDate] = useState(
    new Date(receipt.receiptDate).toLocaleDateString("en-GB"),
  );

  return (
    <DocumentHeaderCard
      showDivider={false}
      sections={[
        <Box key="location" className="purchaseOrderDetail__infoFields" display="flex" gap={2}>
          <Box className="purchaseOrderDetail__infoField">
            <Select
              id="purchase-receipt-receiving-site"
              label="Receiving site"
              required
              value={receivingSite}
              onChange={(event) => setReceivingSite(event.target.value as string)}
            >
              {receivingSiteOptions.map((site) => (
                <Option key={site} text={site} value={site} />
              ))}
            </Select>
          </Box>
          <Box className="purchaseOrderDetail__infoField">
            <Select
              id="purchase-receipt-supplier"
              label="Supplier"
              required
              value={supplier}
              onChange={(event) => setSupplier(event.target.value as string)}
            >
              <Option text={receipt.supplier} value={receipt.supplier} />
            </Select>
          </Box>
        </Box>,
        <Box key="document" className="purchaseOrderDetail__infoFields" display="flex" gap={2}>
          <Box className="purchaseOrderDetail__infoField">
            <Textbox
              id="purchase-receipt-number"
              label="Number"
              required
              value={number}
              onChange={(event) => setNumber(event.target.value)}
            />
          </Box>
          <Box className="purchaseOrderDetail__infoField">
            <DateInput
              id="purchase-receipt-date"
              label="Receipt date"
              required
              value={receiptDate}
              onChange={(event) => setReceiptDate(event.target.value.formattedValue)}
            />
          </Box>
        </Box>,
      ]}
    />
  );
}
