import { Link } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import type { IconType } from "carbon-react/lib/components/icon";
import { ROUTES } from "../../routes";
import { formatDashboardEuro } from "../../data/dashboard";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";

type SummaryMetric = {
  id: string;
  title: string;
  value: string;
  detail: string;
  iconType: IconType;
  tone: "positive" | "neutral" | "caution" | "info";
};

const summaryMetrics: SummaryMetric[] = [
  {
    id: "collected-revenue",
    title: "collectedRevenue",
    value: formatDashboardEuro(139_022),
    detail: "",
    iconType: "chart_bar",
    tone: "info",
  },
  {
    id: "overdue-invoices",
    title: "overdueInvoices",
    value: "3",
    detail: "",
    iconType: "alert",
    tone: "caution",
  },
  {
    id: "blocking-documents",
    title: "blockingDocuments",
    value: "2",
    detail: "",
    iconType: "document_tick",
    tone: "caution",
  },
  {
    id: "health-score",
    title: "healthScore",
    value: "82 / 100",
    detail: "",
    iconType: "chart_line",
    tone: "positive",
  },
];

export default function PortalDashboard() {
  const { language } = useLanguage();
  const copy = getLocale(language).dashboard;
  const metrics = summaryMetrics.map((metric) => ({
    ...metric,
    title: copy.portalMetrics[metric.title as keyof typeof copy.portalMetrics].title,
    detail: metric.id === "overdue-invoices"
      ? copy.portalMetrics.overdueInvoices.detail
      : copy.portalMetrics[metric.title as keyof typeof copy.portalMetrics].detail,
  }));
  const actions = copy.actions.map((action, index) => ({
    ...action,
    path: index === 0 ? ROUTES.fileUpload : ROUTES.yearEndMeeting,
  }));

  return (
    <Box className="portalDashboard">
      <Box className="portalDashboard__grid">
        {metrics.map((metric) => (
          <Box key={metric.id} className={`portalDashboard__metric portalDashboard__metric--${metric.tone}`}>
            <Box className="portalDashboard__metricHeader">
              <Box className={`portalDashboard__metricIcon portalDashboard__metricIcon--${metric.tone}`}>
                <Icon type={metric.iconType} aria-hidden />
              </Box>
              <Typography variant="p" as="p" className="portalDashboard__metricTitle">
                {metric.title}
              </Typography>
            </Box>
            <Typography variant="strong" as="p" className="portalDashboard__metricValue">
              {metric.value}
            </Typography>
            <Typography variant="p" as="p" className="portalDashboard__metricDetail">
              {metric.detail}
            </Typography>
            {metric.id === "health-score" && (
                <div className="portalDashboard__scoreTrack" aria-label={copy.healthScoreLabel}>
                <span style={{ width: "82%" }} />
              </div>
            )}
          </Box>
        ))}

        <Box className="portalDashboard__actionsSection">
          <Box className="portalDashboard__actionsHeader">
            <Box>
              <Typography variant="h3" as="h3" className="portalDashboard__actionsTitle">
                {copy.priorityActions}
              </Typography>
              <Typography variant="p" as="p" className="portalDashboard__actionsSubtitle">
                {copy.priorityActionsSubtitle}
              </Typography>
            </Box>
          </Box>
          <Box as="ul" className="portalDashboard__actionList">
            {actions.map((action) => (
              <li key={action.path} className="portalDashboard__actionTile">
                <Link to={action.path} className="portalDashboard__actionLink">
                  <span>
                    <strong>{action.label}</strong>
                    <small>{action.detail}</small>
                  </span>
                  <Icon type="chevron_right" aria-hidden />
                </Link>
              </li>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
