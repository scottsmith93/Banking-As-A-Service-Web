import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import DateInput from "carbon-react/lib/components/date";
import { Option, Select } from "carbon-react/lib/components/select";
import DocumentHeaderCard from "../document-header/DocumentHeaderCard";
import type { PurchaseOrder } from "../../data/purchaseOrders";

const purchasingSiteOptions = [
  "London DC",
  "Manchester Hub",
  "Bristol Warehouse",
  "Leeds Depot",
] as const;

type PurchaseOrderInfoFieldsProps = {
  order: PurchaseOrder;
};

export default function PurchaseOrderInfoFields({ order }: PurchaseOrderInfoFieldsProps) {
  const [supplier, setSupplier] = useState(order.supplier);
  const [purchasingSite, setPurchasingSite] = useState(order.purchasingSite);
  const [orderDate, setOrderDate] = useState(
    new Date(order.orderDate).toLocaleDateString("en-GB"),
  );
  const [earliestExpectedDate, setEarliestExpectedDate] = useState(
    new Date(order.earliestExpectedDate).toLocaleDateString("en-GB"),
  );

  return (
    <DocumentHeaderCard
      showDivider={false}
      sections={[
        <Box key="supplier" className="purchaseOrderDetail__infoFields" display="flex" gap={2}>
          <Box className="purchaseOrderDetail__infoField">
            <Select
              id="purchase-order-supplier"
              label="Supplier"
              required
              value={supplier}
              onChange={(event) => setSupplier(event.target.value as string)}
            >
              <Option text={order.supplier} value={order.supplier} />
            </Select>
          </Box>
          <Box className="purchaseOrderDetail__infoField">
            <Select
              id="purchase-order-purchasing-site"
              label="Purchasing site"
              required
              value={purchasingSite}
              onChange={(event) => setPurchasingSite(event.target.value as string)}
            >
              {purchasingSiteOptions.map((site) => (
                <Option key={site} text={site} value={site} />
              ))}
            </Select>
          </Box>
        </Box>,
        <Box key="dates" className="purchaseOrderDetail__infoFields" display="flex" gap={2}>
          <Box className="purchaseOrderDetail__infoField">
            <DateInput
              id="purchase-order-date"
              label="Order date"
              required
              value={orderDate}
              onChange={(event) => setOrderDate(event.target.value.formattedValue)}
            />
          </Box>
          <Box className="purchaseOrderDetail__infoField">
            <DateInput
              id="purchase-order-earliest-expected-date"
              label="Earliest expected date"
              required
              value={earliestExpectedDate}
              onChange={(event) => setEarliestExpectedDate(event.target.value.formattedValue)}
            />
          </Box>
        </Box>,
      ]}
    />
  );
}
