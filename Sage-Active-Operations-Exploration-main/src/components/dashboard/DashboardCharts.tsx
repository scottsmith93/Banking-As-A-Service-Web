import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import { formatDashboardEuro } from "../../data/dashboard";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";

const chartTheme = {
  text: {
    fill: "#52636a",
    fontFamily: "Sage UI, Arial, sans-serif",
    fontSize: 11,
  },
  axis: {
    domain: { line: { stroke: "#cbd7dc", strokeWidth: 1 } },
    ticks: { line: { stroke: "#cbd7dc", strokeWidth: 1 }, text: { fill: "#52636a" } },
  },
  grid: { line: { stroke: "#e6ebed", strokeWidth: 1 } },
  legends: { text: { fill: "#354349", fontSize: 12 } },
};

const cashTrend = [
  {
    id: "Cash position",
    data: [
      { x: "Apr", y: 32_500 },
      { x: "May", y: 38_400 },
      { x: "Jun", y: 35_200 },
      { x: "Jul", y: 42_800 },
      { x: "Aug", y: 45_600 },
      { x: "Sep", y: 48_000 },
    ],
  },
];

const salesAndPurchases = [
  { month: "Apr", sales: 21_400, purchases: 15_600 },
  { month: "May", sales: 24_100, purchases: 16_900 },
  { month: "Jun", sales: 22_800, purchases: 17_200 },
  { month: "Jul", sales: 26_500, purchases: 18_400 },
  { month: "Aug", sales: 28_200, purchases: 19_100 },
  { month: "Sep", sales: 30_400, purchases: 20_300 },
];

function formatAxisEuro(value: number) {
  return `${Math.round(value / 1000)}k €`;
}

export default function DashboardCharts() {
  const { language } = useLanguage();
  const copy = getLocale(language).dashboard;
  return (
    <Box className="dashboardCharts" display="flex" flexDirection="column">
      <Box className="dashboardCharts__header">
        <Typography variant="h2" as="h2" className="dashboardCharts__title">
          {copy.financialTrends}
        </Typography>
        <Typography variant="p" as="p" className="dashboardCharts__subtitle">
          {copy.financialTrendsSubtitle}
        </Typography>
      </Box>

      <Box className="dashboardCharts__grid">
        <Box className="dashboardChartCard dashboardChartCard--cash" as="section" aria-labelledby="cash-trend-title">
          <Box className="dashboardChartCard__header">
            <Box>
              <Typography variant="h3" as="h3" id="cash-trend-title" className="dashboardChartCard__title">
                {copy.cashPosition}
              </Typography>
              <Typography variant="p" as="p" className="dashboardChartCard__meta">
                {copy.lastSixMonths}
              </Typography>
            </Box>
            <Typography variant="strong" as="p" className="dashboardChartCard__value">
              {formatDashboardEuro(48_000)}
            </Typography>
          </Box>
          <Box className="dashboardChartCard__chart" aria-label={copy.cashTrendLabel}>
            <ResponsiveLine
              data={cashTrend}
              margin={{ top: 12, right: 12, bottom: 28, left: 48 }}
              xScale={{ type: "point" }}
              yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
              curve="monotoneX"
              colors={["#00854a"]}
              lineWidth={3}
              enableArea={false}
              enablePoints
              pointSize={7}
              pointColor="#ffffff"
              pointBorderWidth={2}
              pointBorderColor="#00854a"
              enableGridX={false}
              enableSlices="x"
              axisTop={null}
              axisRight={null}
              axisBottom={{ tickSize: 0, tickPadding: 10 }}
              axisLeft={{ tickSize: 0, tickPadding: 8, tickValues: 3, format: formatAxisEuro }}
              theme={chartTheme}
              useMesh
              animate={false}
              tooltip={({ point }) => (
                <strong className="dashboardChartTooltip">{point.data.xFormatted}: {formatDashboardEuro(Number(point.data.y))}</strong>
              )}
            />
          </Box>
        </Box>

        <Box className="dashboardChartCard dashboardChartCard--sales-purchases" as="section" aria-labelledby="sales-purchases-title">
          <Box className="dashboardChartCard__header">
            <Box>
              <Typography variant="h3" as="h3" id="sales-purchases-title" className="dashboardChartCard__title">
                {copy.salesAndPurchases}
              </Typography>
              <Typography variant="p" as="p" className="dashboardChartCard__meta">
                {copy.postedValueByMonth}
              </Typography>
            </Box>
            <Typography variant="strong" as="p" className="dashboardChartCard__value">
              {formatDashboardEuro(30_400)}
            </Typography>
          </Box>
          <Box className="dashboardChartCard__chart" aria-label={copy.salesPurchasesChartLabel}>
            <ResponsiveBar
              data={salesAndPurchases}
              keys={["sales", "purchases"]}
              indexBy="month"
              margin={{ top: 12, right: 12, bottom: 36, left: 48 }}
              padding={0.28}
              groupMode="grouped"
              colors={["#00854a", "#20617b"]}
              borderRadius={2}
              enableLabel={false}
              enableGridX={false}
              axisTop={null}
              axisRight={null}
              axisBottom={{ tickSize: 0, tickPadding: 10 }}
              axisLeft={{ tickSize: 0, tickPadding: 8, tickValues: 3, format: formatAxisEuro }}
              legends={[{
                dataFrom: "keys",
                anchor: "bottom-left",
                direction: "row",
                translateY: 52,
                itemWidth: 90,
                itemHeight: 18,
                symbolSize: 9,
                symbolShape: "circle",
              }]}
              theme={chartTheme}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              role="img"
              ariaLabel={copy.salesPurchasesChartLabel}
              tooltip={({ id, value, indexValue }) => (
                <strong className="dashboardChartTooltip">{indexValue} · {id}: {formatDashboardEuro(Number(value))}</strong>
              )}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
