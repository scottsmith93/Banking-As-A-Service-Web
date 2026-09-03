import { useMemo, useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import { Tile, TileContent } from "carbon-react/lib/components/tile";
import Typography from "carbon-react/lib/components/typography";
import FixedAssetTransactionsGrid from "../../components/accounting/FixedAssetTransactionsGrid";
import { fixedAssetOptions, fixedAssets } from "../../data/fixedAssets";
import { fixedAssetTransactions } from "../../data/fixedAssetTransactions";

const gbpFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
});

export default function FixedAssetTransactionsPage() {
  const [selectedAssetId, setSelectedAssetId] = useState(fixedAssets[0]?.id ?? "");
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(0);

  const selectedAsset = useMemo(
    () => fixedAssets.find((asset) => asset.id === selectedAssetId),
    [selectedAssetId],
  );

  const filteredTransactions = useMemo(
    () =>
      fixedAssetTransactions.filter(
        (transaction) => transaction.fixedAssetId === selectedAssetId,
      ),
    [selectedAssetId],
  );

  const netBookValue = selectedAsset?.currentValueGbp ?? 0;

  return (
    <Box className="pageContent salesListingPage fixedAssetTransactionsPage">
      <Box className="salesListingPage__titleRow" display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column" className="salesListingPage__titleBlock">
          <Typography variant="h1" as="h1" className="salesListingPage__title">
            Fixed asset transactions
          </Typography>
          <Typography variant="p" as="p" className="salesListingPage__description">
            Select a fixed asset to create and manage its transactions.
          </Typography>
        </Box>
      </Box>

      <Box
        className="fixedAssetTransactionsPage__controls"
        display="flex"
        justifyContent="space-between"
        alignItems="end"
      >
        <Box className="fixedAssetTransactionsPage__select">
          <Select
            id="fixed-asset-select"
            label="Select a fixed asset"
            required
            value={selectedAssetId}
            onChange={(event) => setSelectedAssetId(event.target.value)}
          >
            {fixedAssetOptions.map((option) => (
              <Option key={option.value} text={option.text} value={option.value} />
            ))}
          </Select>
        </Box>

        <Box display="flex" className="fixedAssetTransactionsPage__summaryGroup">
          <Box className="fixedAssetTransactionsPage__summaryTile">
            <Tile variant="grey" px={2} py={1} roundness="default">
              <TileContent>
                <Typography
                  variant="strong"
                  as="p"
                  className="fixedAssetTransactionsPage__summaryAmount numericValue"
                >
                  {gbpFormatter.format(netBookValue)}
                </Typography>
                <Typography variant="small" as="p" className="fixedAssetTransactionsPage__summaryLabel">
                  Current net book value
                </Typography>
              </TileContent>
            </Tile>
          </Box>
          <Box className="fixedAssetTransactionsPage__summaryTile">
            <Tile variant="grey" px={2} py={1} roundness="default">
              <TileContent>
                <Typography
                  variant="strong"
                  as="p"
                  className="fixedAssetTransactionsPage__summaryAmount numericValue"
                >
                  {gbpFormatter.format(0)}
                </Typography>
                <Typography variant="small" as="p" className="fixedAssetTransactionsPage__summaryLabel">
                  Accumulated depreciation
                </Typography>
              </TileContent>
            </Tile>
          </Box>
        </Box>
      </Box>

      <Box
        className="salesListingPage__toolbar"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button variantType="primary" iconType="add" iconPosition="before">
          Create
        </Button>

        <Box display="flex" alignItems="center" className="salesListingPage__toolbarActions">
          <Box className="salesListingPage__search">
            <Textbox
              id="fixed-asset-transactions-search"
              label="Search fixed asset transactions"
              placeholder="Search"
              inputIcon="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </Box>
          <Button variantType="secondary" iconType="filter" iconPosition="before">
            Filter
          </Button>
        </Box>
      </Box>

      <FixedAssetTransactionsGrid
        rowData={filteredTransactions}
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />

      <Typography variant="p" as="p" className="salesListingPage__itemCount">
        Items: {displayedCount}
      </Typography>
    </Box>
  );
}
