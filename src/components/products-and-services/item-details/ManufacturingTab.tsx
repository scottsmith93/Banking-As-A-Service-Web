import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
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
import Typography from "carbon-react/lib/components/typography";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import Field from "./Field";
import RowActions from "./RowActions";
import TableToolbar from "./TableToolbar";
import WorkspaceHeader from "./WorkspaceHeader";
import { itemDetailsWorkspace, type RowStatus } from "../../../data/itemDetailsWorkspace";

export type ManufacturingSubTab = "bom" | "routing" | "revisions" | "production-parameters";

type ManufacturingTabProps = {
  enabled: boolean;
  sub: ManufacturingSubTab;
  setSub: (sub: ManufacturingSubTab) => void;
  onEnable: () => void;
};

function StatusPill({ status }: { status: RowStatus }) {
  return (
    <Pill pillRole="status" colorVariant={status === "Active" ? "positive" : undefined}>
      {status}
    </Pill>
  );
}

function BomPanel() {
  const { bom } = itemDetailsWorkspace;

  return (
    <Card>
      <CardContent>
        <TableToolbar
          title="Bill of materials"
          count={bom.length}
          searchLabel="Search components"
          actionLabel="Add component"
          onAction={() => {
            // PROTOTYPE: wire to an add-component flow when available
          }}
        />
        <FlatTable colorTheme="light" size="large">
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>Component</FlatTableHeader>
              <FlatTableHeader align="right">Quantity</FlatTableHeader>
              <FlatTableHeader>Unit</FlatTableHeader>
              <FlatTableHeader align="right">Waste</FlatTableHeader>
              <FlatTableHeader>Status</FlatTableHeader>
              <FlatTableHeader align="right">Actions</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            {bom.map((row) => (
              <FlatTableRow key={row.id}>
                <FlatTableCell>{row.component}</FlatTableCell>
                <FlatTableCell align="right">{row.quantity}</FlatTableCell>
                <FlatTableCell>{row.unit}</FlatTableCell>
                <FlatTableCell align="right">{row.waste}</FlatTableCell>
                <FlatTableCell>
                  <StatusPill status={row.status} />
                </FlatTableCell>
                <FlatTableCell align="right">
                  <RowActions entityLabel={`component ${row.component}`} />
                </FlatTableCell>
              </FlatTableRow>
            ))}
          </FlatTableBody>
        </FlatTable>
      </CardContent>
    </Card>
  );
}

function RoutingPanel() {
  const { routing } = itemDetailsWorkspace;

  return (
    <Card>
      <CardContent>
        <TableToolbar
          title="Routing"
          count={routing.length}
          searchLabel="Search operations"
          actionLabel="Add operation"
          onAction={() => {
            // PROTOTYPE: wire to an add-operation flow when available
          }}
        />
        <FlatTable colorTheme="light" size="large">
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>Operation</FlatTableHeader>
              <FlatTableHeader>Work center</FlatTableHeader>
              <FlatTableHeader align="right">Duration</FlatTableHeader>
              <FlatTableHeader align="right">Sequence</FlatTableHeader>
              <FlatTableHeader>Status</FlatTableHeader>
              <FlatTableHeader align="right">Actions</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            {routing.map((row) => (
              <FlatTableRow key={row.id}>
                <FlatTableCell>{row.operation}</FlatTableCell>
                <FlatTableCell>{row.workCenter}</FlatTableCell>
                <FlatTableCell align="right">{row.duration}</FlatTableCell>
                <FlatTableCell align="right">{row.sequence}</FlatTableCell>
                <FlatTableCell>
                  <StatusPill status={row.status} />
                </FlatTableCell>
                <FlatTableCell align="right">
                  <RowActions entityLabel={`operation ${row.operation}`} />
                </FlatTableCell>
              </FlatTableRow>
            ))}
          </FlatTableBody>
        </FlatTable>
      </CardContent>
    </Card>
  );
}

function RevisionsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revisions</CardTitle>
      </CardHeader>
      <CardContent>
        <Typography variant="p" as="p" className="itemDetailsManufacturing__emptyState">
          No revisions yet.
        </Typography>
      </CardContent>
    </Card>
  );
}

function ProductionParametersPanel() {
  const { productionParameters } = itemDetailsWorkspace;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Production parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <Box className="itemDetailsFieldGrid">
          <Field label="Lot size" value={productionParameters.lotSize} />
          <Field label="Setup time" value={productionParameters.setupTime} />
          <Field label="Scrap allowance" value={productionParameters.scrapAllowance} />
          <Field label="Production warehouse" value={productionParameters.productionWarehouse} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ManufacturingTab({ enabled, sub, setSub, onEnable }: ManufacturingTabProps) {
  if (!enabled) {
    return (
      <Box className="itemDetailsManufacturing__disabled" display="flex" justifyContent="center">
        <Card className="itemDetailsManufacturing__disabledCard">
          <CardContent>
            <Box className="itemDetailsManufacturing__disabledIconTile">
              <Icon type="factory" fontSize="extra-large" />
            </Box>
            <Typography variant="h3" as="h2" className="itemDetailsManufacturing__disabledTitle">
              Manufacturing is not enabled for this item
            </Typography>
            <Typography variant="p" as="p" className="itemDetailsManufacturing__disabledDescription">
              Turn on manufacturing to define a bill of materials, routing, revisions, and
              production parameters for this item.
            </Typography>
            <Button variantType="primary" onClick={onEnable}>
              Enable manufacturing
            </Button>
            <Typography variant="p" as="p" className="itemDetailsManufacturing__disabledHint">
              You can turn this off again at any time from the Overview tab.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box className="itemDetailsWorkspace">
      <WorkspaceHeader
        icon="factory"
        title="Manufacturing"
        description="Bill of materials, routing, revisions, and production parameters."
      />

      <Box className="itemDetailsSegmentedTabs">
        <Tabs selectedTabId={sub}>
          <TabList
            ariaLabel="Manufacturing sections"
            onTabChange={(id) => setSub(id as ManufacturingSubTab)}
          >
            <Tab id="bom" controls="bom-panel" label="BOM" />
            <Tab id="routing" controls="routing-panel" label="Routing" />
            <Tab id="revisions" controls="revisions-panel" label="Revisions" />
            <Tab
              id="production-parameters"
              controls="production-parameters-panel"
              label="Production parameters"
            />
          </TabList>

          <TabPanel id="bom-panel" tabId="bom">
            <BomPanel />
          </TabPanel>
          <TabPanel id="routing-panel" tabId="routing">
            <RoutingPanel />
          </TabPanel>
          <TabPanel id="revisions-panel" tabId="revisions">
            <RevisionsPanel />
          </TabPanel>
          <TabPanel id="production-parameters-panel" tabId="production-parameters">
            <ProductionParametersPanel />
          </TabPanel>
        </Tabs>
      </Box>
    </Box>
  );
}
