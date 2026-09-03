import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";

const copilotCards = [
  {
    id: "business-agent",
    icon: "/spot-idea.svg",
    title: "Business Agent",
    description: "Ask Copilot a question, or choose a task.",
    buttonLabel: "Launch agent",
  },
  {
    id: "copilot-insights",
    icon: "/spot-infotip.svg",
    title: "Copilot Insights",
    description: "View your latest business insights.",
    buttonLabel: "Insights",
  },
];

function AiSparkleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="dashboardCopilotCards__aiButtonIcon"
    >
      <path d="M12 1L15 9L23 12L15 15L12 23L9 15L1 12L9 9Z" fill="currentColor" />
      <circle cx="19.5" cy="4.5" r="2" fill="#00D639" />
    </svg>
  );
}

export default function DashboardCopilotCards() {
  return (
    <Box className="dashboardCopilotCards" display="flex">
      {copilotCards.map((card) => (
        <Box key={card.id} className="dashboardCopilotCards__item" borderRadius="borderRadius100">
          <Box className="dashboardCopilotCards__card" display="flex" flexDirection="column">
            <Box display="flex" alignItems="flex-start" className="dashboardCopilotCards__content">
              <img src={card.icon} alt="" className="dashboardCopilotCards__icon" />
              <Box display="flex" flexDirection="column" className="dashboardCopilotCards__text">
                <Typography variant="strong" as="p" className="dashboardCopilotCards__title">
                  {card.title}
                </Typography>
                <Typography variant="p" as="p" className="dashboardCopilotCards__description">
                  {card.description}
                </Typography>
              </Box>
            </Box>
            <button type="button" className="dashboardCopilotCards__aiButton">
              <AiSparkleIcon />
              {card.buttonLabel}
            </button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
