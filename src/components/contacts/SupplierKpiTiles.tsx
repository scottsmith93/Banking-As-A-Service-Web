import Box from "carbon-react/lib/components/box";
import { Tile, TileContent } from "carbon-react/lib/components/tile";
import Typography from "carbon-react/lib/components/typography";
import { formatCurrencyGbp } from "../sales-listing/salesGridShared";

type SupplierKpiTilesProps = {
  accountingBalanceGbp: number;
  overdueOpenItemsGbp: number;
};

export default function SupplierKpiTiles({
  accountingBalanceGbp,
  overdueOpenItemsGbp,
}: SupplierKpiTilesProps) {
  return (
    <Box className="supplierDetail__kpis" display="flex" gap={2}>
      <Box className="supplierDetail__kpiTile">
        <Tile variant="grey" px={2} py={1} roundness="default">
          <TileContent>
            <Typography variant="strong" as="p" className="supplierDetail__kpiAmount">
              {formatCurrencyGbp(accountingBalanceGbp)}
            </Typography>
            <Typography variant="small" as="p" className="supplierDetail__kpiLabel">
              Accounting balance
            </Typography>
          </TileContent>
        </Tile>
      </Box>
      <Box className="supplierDetail__kpiTile">
        <Tile variant="grey" px={2} py={1} roundness="default">
          <TileContent>
            <Typography variant="strong" as="p" className="supplierDetail__kpiAmount">
              {formatCurrencyGbp(overdueOpenItemsGbp)}
            </Typography>
            <Typography variant="small" as="p" className="supplierDetail__kpiLabel">
              Overdue open items
            </Typography>
          </TileContent>
        </Tile>
      </Box>
    </Box>
  );
}
