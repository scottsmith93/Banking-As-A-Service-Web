import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import type { IconType } from "carbon-react/lib/components/icon";
import { useLanguage } from "../../context/useLanguage";

const copilotCards = [
  {
    id: "business-agent",
    iconType: "lightbulb_on" as IconType,
    title: "Business Agent",
    description: "Ask Copilot a question, or choose a task.",
    buttonLabel: "Launch agent",
  },
  {
    id: "copilot-insights",
    iconType: "chart_line" as IconType,
    title: "Copilot Insights",
    description: "View your latest business insights.",
    buttonLabel: "Insights",
  },
];

export default function DashboardCopilotCards() {
  const { language } = useLanguage();
  const isFrench = language === "French";
  const labels = isFrench
    ? [
      { title: "Agent métier", description: "Posez une question à Copilot ou choisissez une tâche.", buttonLabel: "Lancer l’agent" },
      { title: "Analyses Copilot", description: "Consultez vos dernières analyses métier.", buttonLabel: "Analyses" },
    ]
    : copilotCards;

  return (
    <Box className="dashboardCopilotCards" display="flex">
      {copilotCards.map((card, index) => (
        <Box key={card.id} className="dashboardCopilotCards__item" borderRadius="borderRadius100">
          <Box className="dashboardCopilotCards__card" display="flex" flexDirection="column">
            <Box display="flex" alignItems="flex-start" className="dashboardCopilotCards__content">
              <Icon type={card.iconType} aria-hidden className="dashboardCopilotCards__icon" />
              <Box display="flex" flexDirection="column" className="dashboardCopilotCards__text">
                <Typography variant="strong" as="p" className="dashboardCopilotCards__title">
                  {labels[index].title}
                </Typography>
                <Typography variant="p" as="p" className="dashboardCopilotCards__description">
                  {labels[index].description}
                </Typography>
              </Box>
            </Box>
            <button type="button" className="dashboardCopilotCards__aiButton">
              <Icon type={card.iconType} aria-hidden className="dashboardCopilotCards__aiButtonIcon" />
              {labels[index].buttonLabel}
            </button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
