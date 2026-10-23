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

type ProcurementSubTab = "suppliers" | "purchase-pricing" | "supply-rules";

function StatusPill({ status }: { status: RowStatus }) {
  return (
    <Pill pillRole="status" colorVariant={status === "Active" ? "positive" : undefined}>
      {status}
    </Pill>
  );
}

function SuppliersPanel() {
  const { suppliers } = itemDetailsWorkspace;

  return (
    <Card>
      <CardContent>
        <TableToolbar
          title="Suppliers"
          count={suppliers.length}
          searchLabel="Search suppliers"
          actionLabel="Add supplier"
          onAction={() => {
            // PROTOTYPE: wire to an add-supplier flow when available
          }}
        />
        <FlatTable colorTheme="light" size="large">
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>Supplier</FlatTableHeader>
              <FlatTableHeader>Preferred</FlatTableHeader>
              <FlatTableHeader align="right">Lead time</FlatTableHeader>
              <FlatTableHeader align="right">Minimum quantity</FlatTableHeader>
              <FlatTableHeader>Status</FlatTableHeader>
              <FlatTableHeader align="right">Actions</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            {suppliers.map((supplier) => (
              <FlatTableRow key={supplier.id}>
                <FlatTableCell>{supplier.name}</FlatTableCell>
                <FlatTableCell>
                  {supplier.preferred ? <Pill pillRole="status" colorVariant="positive">Preferred</Pill> : "—"}
                </FlatTableCell>
                <FlatTableCell align="right">{supplier.leadTimeDays} days</FlatTableCell>
                <FlatTableCell align="right">{supplier.minimumQuantity}</FlatTableCell>
                <FlatTableCell>
                  <StatusPill status={supplier.status} />
                </FlatTableCell>
                <FlatTableCell align="right">
                  <RowActions entityLabel={`supplier ${supplier.name}`} />
                </FlatTableCell>
              </FlatTableRow>
            ))}
          </FlatTableBody>
        </FlatTable>
      </CardContent>
    </Card>
  );
}

function PurchasePricingPanel() {
  const { purchasePricing } = itemDetailsWorkspace;

  return (
    <Card>
      <CardContent>
        <TableToolbar
          title="Purchase pricing"
          count={purchasePricing.length}
          searchLabel="Search purchase pricing"
          actionLabel="Add price"
          onAction={() => {
            // PROTOTYPE: wire to an add-price flow when available
          }}
        />
        <FlatTable colorTheme="light" size="large">
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>Supplier</FlatTableHeader>
              <FlatTableHeader align="right">Unit price</FlatTableHeader>
              <FlatTableHeader>Currency</FlatTableHeader>
              <FlatTableHeader align="right">Minimum qty</FlatTableHeader>
              <FlatTableHeader>Valid from</FlatTableHeader>
              <FlatTableHeader>Valid to</FlatTableHeader>
              <FlatTableHeader align="right">Actions</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            {purchasePricing.map((row) => (
              <FlatTableRow key={row.id}>
                <FlatTableCell>{row.supplier}</FlatTableCell>
                <FlatTableCell align="right">{row.unitPrice}</FlatTableCell>
                <FlatTableCell>{row.currency}</FlatTableCell>
                <FlatTableCell align="right">{row.minimumQuantity}</FlatTableCell>
                <FlatTableCell>{row.validFrom}</FlatTableCell>
                <FlatTableCell>{row.validTo}</FlatTableCell>
                <FlatTableCell align="right">
                  <RowActions entityLabel={`purchase price for ${row.supplier}`} />
                </FlatTableCell>
              </FlatTableRow>
            ))}
          </FlatTableBody>
        </FlatTable>
      </CardContent>
    </Card>
  );
}

function SupplyRulesPanel() {
  const { supplyRules } = itemDetailsWorkspace;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supply rules</CardTitle>
      </CardHeader>
      <CardContent>
        <Box className="itemDetailsFieldGrid">
          <Field label="Default supplier" value={supplyRules.defaultSupplier} />
          <Field label="Default lead time" value={supplyRules.defaultLeadTimeDays} />
          <Field label="Order multiple" value={supplyRules.orderMultiple} />
          <Field label="Allow substitutes" value={supplyRules.allowSubstitutes} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ProcurementTab() {
  const [subTab, setSubTab] = useState<ProcurementSubTab>("suppliers");

  return (
    <Box className="itemDetailsWorkspace">
      <WorkspaceHeader
        icon="cart"
        title="Procurement"
        description="Suppliers, purchase pricing, and supply rules for this item."
      />

      <Box className="itemDetailsSegmentedTabs">
        <Tabs selectedTabId={subTab}>
          <TabList
            ariaLabel="Procurement sections"
            onTabChange={(id) => setSubTab(id as ProcurementSubTab)}
          >
            <Tab id="suppliers" controls="suppliers-panel" label="Suppliers" />
            <Tab id="purchase-pricing" controls="purchase-pricing-panel" label="Purchase pricing" />
            <Tab id="supply-rules" controls="supply-rules-panel" label="Supply rules" />
          </TabList>

          <TabPanel id="suppliers-panel" tabId="suppliers">
            <SuppliersPanel />
          </TabPanel>
          <TabPanel id="purchase-pricing-panel" tabId="purchase-pricing">
            <PurchasePricingPanel />
          </TabPanel>
          <TabPanel id="supply-rules-panel" tabId="supply-rules">
            <SupplyRulesPanel />
          </TabPanel>
        </Tabs>
      </Box>
    </Box>
  );
}
