import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import Button from "carbon-react/lib/components/button/__next__";
import Switch from "carbon-react/lib/components/switch";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";

export default function AIAdvisorPage() {
  const { language } = useLanguage();
  const copy = getLocale(language).aiAdvisor;
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
        <span className={`portalLanguageSwitch${language === "French" ? " portalLanguageSwitch--french" : ""}${isEnabled ? " portalLanguageSwitch--on" : " portalLanguageSwitch--off"}`}>
          <Switch
            checked={isEnabled}
            onChange={(event) => setIsEnabled(event.target.checked)}
            label={copy.enabledSwitch}
            labelInline
            size="small"
          />
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
            {copy.threads.map((thread) => <Box className="aiAdvisorPage__thread" key={thread.title}><Typography variant="h3" as="h3">{thread.title}</Typography><Typography variant="p" as="p">{thread.body}</Typography>{thread.items.length > 0 && <ul>{thread.items.map((item) => <li key={item}><Icon type="tick" aria-hidden />{item}</li>)}</ul>}<Box className="aiAdvisorPage__threadFooter"><Typography variant="p" as="p">{thread.time && `${copy.estimatedTime} ${thread.time}`}</Typography><Button variant="default" variantType="secondary" size="small">{thread.action}</Button><span aria-hidden="true">⋮</span></Box></Box>)}
          </Box>
          </Box>
          <Box className="aiAdvisorPage__activity"><Typography variant="h2" as="h2">{copy.recentActivity}</Typography><ol>{copy.activity.map(([author, time, message]) => <li key={`${author}-${time}`}><span className="aiAdvisorPage__activityDot" aria-hidden="true" /><Box><Typography variant="small" as="p"><strong>{author}</strong> {time}</Typography><Typography variant="p" as="p">{message}</Typography><Typography variant="small" as="p">{copy.activityBasis}</Typography></Box></li>)}</ol><a href="#activity">{copy.viewActivity}</a></Box>
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
