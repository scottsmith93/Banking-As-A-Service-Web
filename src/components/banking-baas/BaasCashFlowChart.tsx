import { useEffect, useId, useRef, useState } from "react";
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import { useLanguage } from "../../context/useLanguage";
import { getLocale, getLocaleCode } from "../../locales";
import { interpolate } from "../../utils/interpolate";
import type { CashFlowPeriod } from "../../utils/bankCashFlow";
import { useChartPointInspection } from "../../hooks/useChartPointInspection";
import BaasChartPointTooltip from "./BaasChartPointTooltip";
import "./cash-flow.css";

// Candidate composed Sage pattern: Carbon has no chart export in the installed package.
// Native SVG supplies data-driven geometry; Carbon text and Sage tokens supply visual styling.
export default function BaasCashFlowChart({ periods }: { periods: CashFlowPeriod[] }) {
  const [inspectedChart, setInspectedChart] = useState<"movements" | "balance" | null>(null);
  // Two views of the same ledger avoid a stretched chart with competing scales.
  return <div className="baasOverviewCharts">
    <BaasDailyChart periods={periods} variant="movements" inspected={inspectedChart === "movements"} onInspect={() => setInspectedChart("movements")} />
    <BaasDailyChart periods={periods} variant="balance" inspected={inspectedChart === "balance"} onInspect={() => setInspectedChart("balance")} />
  </div>;
}

function BaasDailyChart({ periods, variant, inspected, onInspect }: { periods: CashFlowPeriod[]; variant: "movements" | "balance"; inspected: boolean; onInspect: () => void }) {
  const { language } = useLanguage();
  const locale = getLocaleCode(language);
  const copy = getLocale(language).bankingBaas.dashboard.cashFlow;
  const balance = variant === "balance";
  const title = balance ? copy.balanceTitle : copy.title;
  const id = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(400);
  const money = (value: number) => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(value);
  const dates = new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", timeZone: "UTC" });
  const label = (period: CashFlowPeriod) => dates.format(new Date(period.from + "T12:00:00Z"));
  const month = periods[0] ? new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(periods[0].from + "T12:00:00Z")) : "";
  const maximum = Math.max(1, ...periods.flatMap(period => [period.moneyIn, period.moneyOut]));
  const ceiling = maximum > 1 ? Math.ceil(maximum / 500) * 500 : 1;
  const pointSummary = (period: CashFlowPeriod) => interpolate(balance ? copy.balancePointSummary : copy.pointSummary, { period: label(period), moneyIn: money(period.moneyIn), moneyOut: money(period.moneyOut), balance: money(period.closingBalance) });
  const summary = periods.map(pointSummary).join(" ");
  const balances = periods.map(period => period.closingBalance);
  const balanceMinimum = Math.floor((balances.length ? Math.min(...balances) : 0) / 1000) * 1000 - 1000;
  const balanceMaximum = Math.ceil((balances.length ? Math.max(...balances) : 0) / 1000) * 1000 + 1000;
  const minimum = balance ? balanceMinimum : 0;
  const maximumY = balance ? balanceMaximum : ceiling;
  const axisValues = [minimum, (minimum + maximumY) / 2, maximumY];
  const compact = (value: number) => new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 }).format(value);
  // SVG coordinates are chart geometry, not CSS spacing or typography decisions.
  // Reserve sufficient glyph room for localized ticks (e.g. German 101.000).
  const left = Math.max(56, ...axisValues.map(value => compact(value).length * 9 + 16));
  const plot = { left, right: Math.max(left + 1, width - 12), top: 8, bottom: 110 };
  const groupWidth = (plot.right - plot.left) / Math.max(1, periods.length);
  const y = (value: number) => plot.bottom - (value - minimum) / (maximumY - minimum) * (plot.bottom - plot.top);
  const balancePoints = periods.map((period, index) => `${plot.left + groupWidth * (index + 0.5)},${y(period.closingBalance)}`).join(" ");
  const tickEvery = Math.max(1, Math.ceil(periods.length / Math.max(2, Math.floor((plot.right - plot.left) / 60))));
  const hasMovements = periods.some(period => period.moneyIn || period.moneyOut);
  const hasData = balance ? periods.some(period => period.closingBalance !== 0) || hasMovements : hasMovements;
  const inspection = useChartPointInspection(periods.length, plot, width, 136, onInspect);
  const activeIndex = inspected ? inspection.activeIndex : null;
  const active = activeIndex === null ? undefined : periods[activeIndex];
  useEffect(() => {
    const element = svgRef.current;
    if (!element) return;
    // Observe each plot independently, including parent/sidebar width changes.
    const observer = new ResizeObserver(([entry]) => { if (entry.contentRect.width > 0) setWidth(entry.contentRect.width); });
    observer.observe(element);
    return () => observer.disconnect();
  }, [hasData]);
  return <Box as="section" className={`baasCashFlow baasCashFlow--${variant}`} aria-labelledby={id + "-heading"}>
    <Box className="baasCashFlow__heading" display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={0.5}>
      <Typography variant="small" as="h2" id={id + "-heading"}>{title}<span className="baasCashFlow__period">{interpolate(copy.period, { month })}</span></Typography>
      <div className="baasCashFlow__legend" aria-hidden="true">
        {balance ? <span><i className="baasCashFlow__balanceKey" />{copy.balance}</span> : <>
          <span><i className="baasCashFlow__in" />{copy.moneyIn}</span>
          <span><i className="baasCashFlow__out" />{copy.moneyOut}</span>
        </>}
      </div>
    </Box>
    {hasData ? <div className="baasCashFlow__frame" tabIndex={0} role="group" aria-label={title} aria-describedby={id + "-help"} {...inspection.interactionProps}>
    <span id={id + "-help"} className="baasCashFlow__srOnly">{copy.exploreHelp}</span>
    <span className="baasCashFlow__srOnly" role="status">{inspection.keyboard && active ? pointSummary(active) : ""}</span>
    <svg ref={svgRef} className="baasCashFlow__plot" viewBox={`0 0 ${width} 136`} preserveAspectRatio="none" role="img" aria-labelledby={id + "-title"} aria-describedby={id + "-description"}>
      <title id={id + "-title"}>{title}</title>
      <desc id={id + "-description"}>{balance ? copy.balanceAxes : copy.axes} {summary}</desc>
      {axisValues.map(value => <g key={value}><line className="baasCashFlow__rule" x1={plot.left} x2={plot.right} y1={y(value)} y2={y(value)} /><text className="baasCashFlow__axis" x={plot.left - 8} y={y(value) + 3} textAnchor="end">{compact(value)}</text></g>)}
      {balance && <polyline className="baasCashFlow__balanceLine" points={balancePoints} />}
      {activeIndex !== null && <line className="baasCashFlow__cursor" x1={plot.left + groupWidth * (activeIndex + 0.5)} x2={plot.left + groupWidth * (activeIndex + 0.5)} y1={plot.top} y2={plot.bottom} />}
      {periods.map((period, index) => {
        const x = plot.left + groupWidth * (index + 0.5);
        const width = Math.min(16, groupWidth * 0.32);
        const gap = Math.min(2, groupWidth * 0.06);
        const showTick = index === periods.length - 1 || index % tickEvery === 0 && (index === 0 || periods.length - 1 - index >= tickEvery / 2);
        return <g key={period.from}>
          {balance ? <circle className="baasCashFlow__balancePoint" cx={x} cy={y(period.closingBalance)} r={6} /> : <>
            <rect className="baasCashFlow__in" x={x - width - gap} y={y(period.moneyIn)} width={width} height={plot.bottom - y(period.moneyIn)} />
            <rect className="baasCashFlow__out" x={x + gap} y={y(period.moneyOut)} width={width} height={plot.bottom - y(period.moneyOut)} />
          </>}
          {showTick && <text className="baasCashFlow__axis" x={x} y={130} textAnchor="middle">{new Intl.DateTimeFormat(locale, { day: "2-digit", timeZone: "UTC" }).format(new Date(period.from + "T12:00:00Z"))}</text>}
        </g>;
      })}
    {active && activeIndex !== null && <BaasChartPointTooltip id={id + "-popup"}
      x={plot.left + groupWidth * (activeIndex + 0.5)}
      y={y(balance ? active.closingBalance : Math.max(active.moneyIn, active.moneyOut))}
      date={new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(active.from + "T12:00:00Z"))}
      values={balance ? [{ label: copy.balance, value: money(active.closingBalance), kind: "balance" }] : [{ label: copy.moneyIn, value: money(active.moneyIn), kind: "in" }, { label: copy.moneyOut, value: money(active.moneyOut), kind: "out" }]}
      onEnter={inspection.keepOpen} onLeave={inspection.closeSoon} />}
    </svg>
    </div> : <Typography variant="small" as="p" className="baasCashFlow__empty">{balance ? copy.balanceEmpty : copy.empty}</Typography>}
  </Box>;
}
