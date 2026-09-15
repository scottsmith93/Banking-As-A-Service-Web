import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import type { IconType } from "carbon-react/lib/components/icon";
import { Link } from "react-router-dom";

// Shared building blocks for every dashboard tab widget — extracted so the
// Accounting tab (DashboardKpiCards) and any other tab (e.g. Inventory
// overview) render pixel-identical cards without duplicating markup/CSS.

export type DashboardStatLine = {
  label: string;
  value: string;
};

export function SectionHeading({ children }: { children: string }) {
  return (
    <Typography variant="h2" as="h2" className="dashboardSection__heading">
      {children}
    </Typography>
  );
}

export function BreakdownRows({ lines }: { lines: DashboardStatLine[] }) {
  return (
    <Box className="dashboardKpiCard__breakdown" display="flex">
      {lines.map((line, index) => (
        <Box
          key={line.label}
          className={`dashboardKpiCard__breakdownItem${
            index > 0 ? " dashboardKpiCard__breakdownItem--divided" : ""
          }`}
          flex="1"
        >
          <Box
            className="dashboardKpiCard__breakdownRow"
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Typography variant="p" as="span" className="dashboardKpiCard__breakdownLabel">
              {line.label}
            </Typography>
            <Typography variant="p" as="span" className="dashboardKpiCard__breakdownValue">
              {line.value}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

type HeroIndicatorCardProps = {
  iconType: IconType;
  title: string;
  description: string;
  value: string;
  breakdown: DashboardStatLine[];
};

/** Icon + title/description on the left, a large value on the right, KPI
 * breakdown along the bottom — e.g. "Gross profit", "Total stock value". */
export function HeroIndicatorCard({
  iconType,
  title,
  description,
  value,
  breakdown,
}: HeroIndicatorCardProps) {
  return (
    <Box className="dashboardKpiCard dashboardKpiCard--profitLoss">
      <Box
        className="dashboardKpiCard__header"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box display="flex" alignItems="flex-start" className="dashboardKpiCard__titleRow">
          <Icon type={iconType} className="dashboardKpiCard__chartIcon" aria-hidden />
          <Box display="flex" flexDirection="column" className="dashboardKpiCard__titleBlock">
            <Typography variant="strong" as="p" className="dashboardKpiCard__title">
              {title}
            </Typography>
            <Typography variant="p" as="p" className="dashboardKpiCard__subtitle">
              {description}
            </Typography>
          </Box>
        </Box>
        <Typography variant="strong" as="p" className="dashboardKpiCard__heroValue">
          {value}
        </Typography>
      </Box>
      <BreakdownRows lines={breakdown} />
    </Box>
  );
}

type PercentageIndicatorCardProps = {
  title: string;
  subtitle: string;
  percentage: string;
  breakdown: DashboardStatLine[];
};

/** Title/subtitle at top, a large centered muted stat, KPI breakdown along
 * the bottom — e.g. "Return on sales", "Inventory turnover rate". */
export function PercentageIndicatorCard({
  title,
  subtitle,
  percentage,
  breakdown,
}: PercentageIndicatorCardProps) {
  return (
    <Box
      className="dashboardKpiCard dashboardKpiCard--performance"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box display="flex" flexDirection="column" className="dashboardKpiCard__titleBlock">
        <Typography variant="strong" as="p" className="dashboardKpiCard__title">
          {title}
        </Typography>
        <Typography variant="p" as="p" className="dashboardKpiCard__subtitle">
          {subtitle}
        </Typography>
      </Box>
      <Typography variant="strong" as="p" className="dashboardKpiCard__percentage">
        {percentage}
      </Typography>
      <BreakdownRows lines={breakdown} />
    </Box>
  );
}

type SimpleStatCardProps = {
  title: string;
  value: string;
  description: string;
};

/** Title, bold value, description — e.g. "Available funds", "Open work
 * orders". No icon, no breakdown. */
export function SimpleStatCard({ title, value, description }: SimpleStatCardProps) {
  return (
    <Box className="dashboardKpiCard dashboardKpiCard--financial">
      <Typography variant="strong" as="p" className="dashboardKpiCard__title">
        {title}
      </Typography>
      <Typography variant="strong" as="p" className="dashboardKpiCard__financialValue">
        {value}
      </Typography>
      <Typography variant="p" as="p" className="dashboardKpiCard__subtitle">
        {description}
      </Typography>
    </Box>
  );
}

type QuickLinksCardProps = {
  links: readonly { label: string; path: string }[];
};

export function QuickLinksCard({ links }: QuickLinksCardProps) {
  return (
    <Box className="dashboardKpiCard dashboardKpiCard--quickLinks">
      <Box as="ul" className="dashboardQuickLinks" display="flex" flexDirection="column">
        {links.map((link) => (
          <Box as="li" key={link.path}>
            <Link to={link.path} className="dashboardQuickLinks__link">
              {link.label}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
