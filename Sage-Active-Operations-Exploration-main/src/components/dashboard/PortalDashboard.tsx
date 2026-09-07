import { Link } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import type { IconType } from "carbon-react/lib/components/icon";
import { ROUTES } from "../../routes";
import { formatDashboardEuro } from "../../data/dashboard";
import { useLanguage } from "../../context/useLanguage";

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
    id: "cash-position",
    title: "Estimated cash position",
    value: formatDashboardEuro(48_000),
    detail: "Based on your latest available balance",
    iconType: "cash",
    tone: "positive",
  },
  {
    id: "collected-revenue",
    title: "Collected revenue",
    value: formatDashboardEuro(139_022),
    detail: "Year to date",
    iconType: "chart_bar",
    tone: "info",
  },
  {
    id: "overdue-invoices",
    title: "Overdue invoices",
    value: "3",
    detail: `${formatDashboardEuro(12_360)} outstanding`,
    iconType: "alert",
    tone: "caution",
  },
  {
    id: "blocking-documents",
    title: "Blocking documents",
    value: "2",
    detail: "Waiting for information from you",
    iconType: "document_tick",
    tone: "caution",
  },
  {
    id: "health-score",
    title: "Health score",
    value: "82 / 100",
    detail: "Good standing",
    iconType: "chart_line",
    tone: "positive",
  },
];

const priorityActions = [
  {
    label: "Review overdue invoices",
    detail: "3 invoices need your attention",
    path: ROUTES.sales.invoices,
  },
  {
    label: "Upload blocking documents",
    detail: "2 documents are needed by your accountant",
    path: ROUTES.fileUpload,
  },
  {
    label: "Prepare for your year end meeting",
    detail: "Review the checklist and suggested agenda",
    path: ROUTES.yearEndMeeting,
  },
];

const frenchMetricCopy: Record<string, { title: string; detail: string }> = {
  "cash-position": { title: "Position de trésorerie estimée", detail: "Selon votre dernier solde disponible" },
  "collected-revenue": { title: "Chiffre d’affaires encaissé", detail: "Depuis le début de l’année" },
  "overdue-invoices": { title: "Factures en retard", detail: `${formatDashboardEuro(12_360)} en attente` },
  "blocking-documents": { title: "Documents bloquants", detail: "Informations attendues de votre part" },
  "health-score": { title: "Score de santé", detail: "Situation saine" },
};

export default function PortalDashboard() {
  const { language } = useLanguage();
  const isFrench = language === "French";
  const metrics = isFrench
    ? summaryMetrics.map((metric) => ({ ...metric, ...frenchMetricCopy[metric.id] }))
    : summaryMetrics;
  const actions = isFrench
    ? [
      { label: "Vérifier les factures en retard", detail: "3 factures nécessitent votre attention", path: ROUTES.sales.invoices },
      { label: "Téléverser les documents bloquants", detail: "2 documents sont nécessaires à votre comptable", path: ROUTES.fileUpload },
      { label: "Préparer votre réunion de fin d’exercice", detail: "Consultez la liste et l’ordre du jour suggéré", path: ROUTES.yearEndMeeting },
    ]
    : priorityActions;

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
              <div className="portalDashboard__scoreTrack" aria-label={isFrench ? "Score de santé : 82 sur 100" : "Health score 82 out of 100"}>
                <span style={{ width: "82%" }} />
              </div>
            )}
          </Box>
        ))}

        <Box className="portalDashboard__actions">
          <Box className="portalDashboard__actionsHeader">
            <Box>
              <Typography variant="h3" as="h3" className="portalDashboard__actionsTitle">
                {isFrench ? "Actions prioritaires" : "Priority actions"}
              </Typography>
              <Typography variant="p" as="p" className="portalDashboard__actionsSubtitle">
                {isFrench ? "Une courte liste des actions les plus utiles actuellement." : "A short list of the things most likely to help right now."}
              </Typography>
            </Box>
          </Box>
          <Box as="ul" className="portalDashboard__actionList">
            {actions.map((action) => (
              <li key={action.path}>
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
