import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import { useLanguage } from "../context/useLanguage";
import { getTranslation } from "../locales";
import { translateNavLabel } from "../components/navigation/navTranslation";
import { interpolate } from "../utils/interpolate";

type PlaceholderPageProps = {
  title: string;
  section?: string;
};

export default function PlaceholderPage({ title, section }: PlaceholderPageProps) {
  const { language } = useLanguage();
  const localizedTitle = translateNavLabel(title, language);
  const localizedSection = section ? translateNavLabel(section, language) : undefined;
  const placeholderTitle = getTranslation(language, "placeholder.title");
  const placeholderMessage = interpolate(getTranslation(language, "placeholder.message"), {
    screen: localizedTitle,
  });

  return (
    <Box className="pageContent placeholderPage">
      <Box className="placeholderPage__intro">
        {localizedSection && (
          <Typography variant="small" as="p" className="placeholderPage__eyebrow">
            {localizedSection}
          </Typography>
        )}
        <Typography variant="h1" as="h1" className="placeholderPage__title">
          {localizedTitle}
        </Typography>
      </Box>

      <Box className="placeholderPage__panel">
        <Box className="placeholderPage__icon">
          <Icon type="placeholder" />
        </Box>
        <Typography variant="p" as="p" className="placeholderPage__panelTitle">
          {placeholderTitle}
        </Typography>
        <Typography variant="p" as="p" className="placeholderPage__panelMessage">
          {placeholderMessage}
        </Typography>
      </Box>
    </Box>
  );
}
