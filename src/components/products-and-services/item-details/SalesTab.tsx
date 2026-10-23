import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import {
  FlatTable,
  FlatTableBody,
  FlatTableCell,
  FlatTableHead,
  FlatTableHeader,
  FlatTableRow,
} from "carbon-react/lib/components/flat-table";
import Pill from "../../status-pill/StatusPill";
import { Tab, TabList, TabPanel, Tabs } from "carbon-react/lib/components/tabs/__next__";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import Field from "./Field";
import RowActions from "./RowActions";
import TableToolbar from "./TableToolbar";
import WorkspaceHeader from "./WorkspaceHeader";
import { itemDetailsWorkspace, type RowStatus } from "../../../data/itemDetailsWorkspace";

type SalesSubTab = "sales-pricing" | "customers" | "sales-conditions";

function StatusPill({ status }: { status: RowStatus }) {
  const colorVariant =
    status === "Active" ? ("positive" as const) : status === "Draft" ? ("warning" as const) : undefined;

  return (
    <Pill pillRole="status" colorVariant={colorVariant}>
      {status}
    </Pill>
  );
}

function SalesPricingPanel() {
  const { salesPricing } = itemDetailsWorkspace;

  return (
    <Card>
      <CardContent>
        <TableToolbar
          title="Sales pricing"
          count={salesPricing.length}
          searchLabel="Search sales pricing"
          actionLabel="Add price"
          onAction={() => {
            // PROTOTYPE: wire to an add-price flow when available
          }}
        />
        <FlatTable colorTheme="light" size="large">
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>Price list</FlatTableHeader>
              <FlatTableHeader align="right">Unit price</FlatTableHeader>
              <FlatTableHeader align="right">Discount</FlatTableHeader>
              <FlatTableHeader>Currency</FlatTableHeader>
              <FlatTableHeader>Valid from</FlatTableHeader>
              <FlatTableHeader>Status</FlatTableHeader>
              <FlatTableHeader align="right">Actions</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            {salesPricing.map((row) => (
              <FlatTableRow key={row.id}>
                <FlatTableCell>{row.priceList}</FlatTableCell>
                <FlatTableCell align="right">{row.unitPrice}</FlatTableCell>
                <FlatTableCell align="right">{row.discount}</FlatTableCell>
                <FlatTableCell>{row.currency}</FlatTableCell>
                <FlatTableCell>{row.validFrom}</FlatTableCell>
                <FlatTableCell>
                  <StatusPill status={row.status} />
                </FlatTableCell>
                <FlatTableCell align="right">
                  <RowActions entityLabel={`${row.priceList} sales price`} />
                </FlatTableCell>
              </FlatTableRow>
            ))}
          </FlatTableBody>
        </FlatTable>
      </CardContent>
    </Card>
  );
}

function CustomersPanel() {
  const { customers } = itemDetailsWorkspace;

  return (
    <Card>
      <CardContent>
        <TableToolbar
          title="Customers"
          count={customers.length}
          searchLabel="Search customers"
          actionLabel="Add customer"
          onAction={() => {
            // PROTOTYPE: wire to an add-customer flow when available
          }}
        />
        <FlatTable colorTheme="light" size="large">
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>Customer</FlatTableHeader>
              <FlatTableHeader>Price list</FlatTableHeader>
              <FlatTableHeader align="right">Discount</FlatTableHeader>
              <FlatTableHeader>Payment terms</FlatTableHeader>
              <FlatTableHeader>Status</FlatTableHeader>
              <FlatTableHeader align="right">Actions</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            {customers.map((row) => (
              <FlatTableRow key={row.id}>
                <FlatTableCell>{row.customer}</FlatTableCell>
                <FlatTableCell>{row.priceList}</FlatTableCell>
                <FlatTableCell align="right">{row.discount}</FlatTableCell>
                <FlatTableCell>{row.paymentTerms}</FlatTableCell>
                <FlatTableCell>
                  <StatusPill status={row.status} />
                </FlatTableCell>
                <FlatTableCell align="right">
                  <RowActions entityLabel={`customer ${row.customer}`} />
                </FlatTableCell>
              </FlatTableRow>
            ))}
          </FlatTableBody>
        </FlatTable>
      </CardContent>
    </Card>
  );
}

function SalesConditionsPanel() {
  const { salesConditions } = itemDetailsWorkspace;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales conditions</CardTitle>
      </CardHeader>
      <CardContent>
        <Box className="itemDetailsFieldGrid">
          <Field label="Minimum order quantity" value={salesConditions.minimumOrderQuantity} />
          <Field label="Return policy" value={salesConditions.returnPolicy} />
          <Field label="Warranty" value={salesConditions.warranty} />
          <Field label="Sales channel" value={salesConditions.salesChannel} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default function SalesTab() {
  const [subTab, setSubTab] = useState<SalesSubTab>("sales-pricing");

  return (
    <Box className="itemDetailsWorkspace">
      <WorkspaceHeader
        icon="tag"
        title="Sales"
        description="Pricing, customer terms, and sales conditions for this item."
      />

      <Box className="itemDetailsSegmentedTabs">
        <Tabs selectedTabId={subTab}>
          <TabList ariaLabel="Sales sections" onTabChange={(id) => setSubTab(id as SalesSubTab)}>
            <Tab id="sales-pricing" controls="sales-pricing-panel" label="Sales pricing" />
            <Tab id="customers" controls="customers-panel" label="Customers" />
            <Tab id="sales-conditions" controls="sales-conditions-panel" label="Sales conditions" />
          </TabList>

          <TabPanel id="sales-pricing-panel" tabId="sales-pricing">
            <SalesPricingPanel />
          </TabPanel>
          <TabPanel id="customers-panel" tabId="customers">
            <CustomersPanel />
          </TabPanel>
          <TabPanel id="sales-conditions-panel" tabId="sales-conditions">
            <SalesConditionsPanel />
          </TabPanel>
        </Tabs>
      </Box>
    </Box>
  );
}
