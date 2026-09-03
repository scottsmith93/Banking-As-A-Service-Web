import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import { suppliers } from "../../data/suppliers";
import { formatCurrencyGbp } from "../sales-listing/salesGridShared";

// Ring-chart hues from @sage/design-tokens-fusion's dataviz.chart.donut set
// (imported in index.css), applied in a fixed rotation across segments.
const SEGMENT_HUES = ["slate", "navy", "blue", "teal", "purple"] as const;

const TOP_SUPPLIER_COUNT = 5;

const topSuppliers = suppliers
  .filter((supplier) => supplier.balanceOwedGbp > 0)
  .sort((a, b) => b.balanceOwedGbp - a.balanceOwedGbp)
  .slice(0, TOP_SUPPLIER_COUNT)
  .map((supplier, index) => ({
    id: supplier.id,
    name: supplier.name,
    amount: supplier.balanceOwedGbp,
    hue: SEGMENT_HUES[index % SEGMENT_HUES.length],
  }));

const totalOwed = topSuppliers.reduce((sum, supplier) => sum + supplier.amount, 0);

// SVG ring built from stacked stroke-dasharray arcs — one <circle> per
// segment, each offset to continue where the previous one ended, with a
// small gap between segments for visual separation. Computed once here as
// plain derived data (not inside the component) so rendering the ring is
// just a map over pre-computed values.
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 3;

const { segments: donutSegments } = topSuppliers.reduce<{
  cumulative: number;
  segments: { id: string; hue: (typeof SEGMENT_HUES)[number]; dashArray: string; dashOffset: number }[];
}>(
  (acc, supplier) => {
    const share = supplier.amount / totalOwed;
    const segmentLength = Math.max(share * CIRCUMFERENCE - GAP, 0);
    return {
      cumulative: acc.cumulative + share * CIRCUMFERENCE,
      segments: [
        ...acc.segments,
        {
          id: supplier.id,
          hue: supplier.hue,
          dashArray: `${segmentLength} ${CIRCUMFERENCE - segmentLength}`,
          dashOffset: -acc.cumulative,
        },
      ],
    };
  },
  { cumulative: 0, segments: [] },
);

function DonutChart() {
  return (
    <svg
      className="dashboardTopSuppliers__donut"
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Top suppliers by amount owed, ${formatCurrencyGbp(totalOwed)} total`}
    >
      {donutSegments.map((segment) => (
        <circle
          key={segment.id}
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke={`var(--dataviz-chart-donut-${segment.hue}-bg-default)`}
          strokeWidth="14"
          strokeDasharray={segment.dashArray}
          strokeDashoffset={segment.dashOffset}
          transform="rotate(-90 50 50)"
        />
      ))}
    </svg>
  );
}

export default function DashboardTopSuppliersWidget() {
  return (
    <Box className="dashboardKpiCard dashboardTopSuppliers">
      <Typography variant="strong" as="p" className="dashboardKpiCard__title">
        Top suppliers
      </Typography>

      <Box className="dashboardTopSuppliers__chart">
        <DonutChart />
        <Box className="dashboardTopSuppliers__chartCenter">
          <Typography variant="p" as="p" className="dashboardTopSuppliers__chartCenterLabel">
            Total owed
          </Typography>
          <Typography variant="strong" as="p" className="dashboardTopSuppliers__chartCenterValue">
            {formatCurrencyGbp(totalOwed)}
          </Typography>
        </Box>
      </Box>

      <Box className="dashboardTopSuppliers__legend">
        {topSuppliers.map((supplier) => (
          <Box key={supplier.id} className="dashboardTopSuppliers__legendRow">
            <span
              className="dashboardTopSuppliers__swatch"
              style={{ backgroundColor: `var(--dataviz-chart-donut-${supplier.hue}-bg-default)` }}
              aria-hidden
            />
            <Typography variant="p" as="p" className="dashboardTopSuppliers__legendName">
              {supplier.name}
            </Typography>
            <Typography variant="strong" as="p" className="dashboardTopSuppliers__legendAmount">
              {formatCurrencyGbp(supplier.amount)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
