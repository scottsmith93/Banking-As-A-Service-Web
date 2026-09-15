import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import Button from "carbon-react/lib/components/button/__next__";
import Pill from "carbon-react/lib/components/pill";
import Switch from "carbon-react/lib/components/switch";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";
import { formatEur } from "../../utils/formatCurrency";

type ActivityItem = {
  author: string;
  time: string;
  message: string;
  amount: number | null;
};

export default function AIAdvisorPage() {
  const { language } = useLanguage();
  const copy = getLocale(language).aiAdvisor;
  const activity = copy.activity as ActivityItem[];
  const [question, setQuestion] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <Box className="pageContent aiAdvisorPage">
      <Box className="aiAdvisorPage__header">
        <Box>
          <Typography variant="h1" as="h1">{copy.title}</Typography>
          <Typography variant="p" as="p" className="aiAdvisorPage__subtitle">
            {copy.subtitle}
          </Typography>
        </Box>
        <span className={`portalLanguageSwitch${isEnabled ? " portalLanguageSwitch--on" : " portalLanguageSwitch--off"}`}>
          <Switch
            checked={isEnabled}
            onChange={(event) => setIsEnabled(event.target.checked)}
            label={copy.enabledSwitch}
            labelInline
            size="small"
          />
          <span className="portalLanguageSwitch__state" aria-hidden="true">
            {isEnabled ? getLocale(language).dashboard.switchOn : getLocale(language).dashboard.switchOff}
          </span>
        </span>
      </Box>

      {isEnabled ? (
        <Box className="aiAdvisorPage__layout">
          <Box className="aiAdvisorPage__main">
          <Box className="aiAdvisorPage__composer">
            <textarea id="advisor-question" aria-label={copy.messageLabel} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={copy.placeholder} />
            <Box className="aiAdvisorPage__composerActions"><Button variant="default" variantType="tertiary" size="small" aria-label={copy.add}>+</Button><Button variant="default" variantType="primary" size="small" aria-label={copy.send} disabled={!question.trim()}>↑</Button></Box>
          </Box>
          <Box className="aiAdvisorPage__sectionHeader"><Typography variant="h2" as="h2">{copy.forYou}</Typography></Box>
          <Box className="aiAdvisorPage__threads">
            {copy.threads.map((thread) => <Box className="aiAdvisorPage__thread" key={thread.title}><Typography variant="h3" as="h3">{thread.title}</Typography><Typography variant="p" as="p">{thread.body}</Typography>{thread.items.length > 0 && <Box className="aiAdvisorPage__threadTags" aria-label={copy.relatedTopics}>{thread.items.map((item) => <Pill key={item} pillRole="tag" colorVariant="neutral" size="S">{item}</Pill>)}</Box>}<Box className="aiAdvisorPage__threadFooter"><Typography variant="p" as="p">{thread.time}</Typography><Button variant="default" variantType="secondary" size="small">{thread.action}</Button><span aria-hidden="true">⋮</span></Box></Box>)}
          </Box>
          </Box>
          <Box className="aiAdvisorPage__activity">
            <Typography variant="h2" as="h2">{copy.recentActivity}</Typography>
            <ol>
              {activity.map((item) => {
                const message = item.amount === null
                  ? item.message
                  : item.message.replace("{amount}", formatEur(item.amount, language));

                return (
                  <li key={`${item.author}-${item.time}`}>
                    <span className="aiAdvisorPage__activityDot" aria-hidden="true" />
                    <Box>
                      <Typography variant="small" as="p"><strong>{item.author}</strong> {item.time}</Typography>
                      <Typography variant="p" as="p">{message}</Typography>
                      <Typography variant="small" as="p">{copy.activityBasis}</Typography>
                    </Box>
                  </li>
                );
              })}
            </ol>
            <a href="#activity">{copy.viewActivity}</a>
          </Box>
        </Box>
      ) : (
        <Box className="aiAdvisorPage__emptyState" display="flex" flexDirection="column" alignItems="center">
          <Box className="aiAdvisorPage__emptyIcon" aria-hidden="true"><Icon type="chat" /></Box>
          <Typography variant="h2" as="h2">{copy.emptyTitle}</Typography>
          <Typography variant="p" as="p">
            {copy.emptyBody}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
