import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";

type PlaceholderPageProps = {
  title: string;
  section?: string;
};

export default function PlaceholderPage({ title, section }: PlaceholderPageProps) {
  return (
    <Box className="pageContent placeholderPage">
      <Box className="placeholderPage__intro">
        {section && (
          <Typography variant="small" as="p" className="placeholderPage__eyebrow">
            {section}
          </Typography>
        )}
        <Typography variant="h1" as="h1" className="placeholderPage__title">
          {title}
        </Typography>
      </Box>

      <Box className="placeholderPage__panel">
        <Box className="placeholderPage__icon">
          <Icon type="placeholder" />
        </Box>
        <Typography variant="p" as="p" className="placeholderPage__panelTitle">
          Screen not built yet
        </Typography>
        <Typography variant="p" as="p" className="placeholderPage__panelMessage">
          This is a placeholder for the "{title}" screen in the Operations navigation.
        </Typography>
      </Box>
    </Box>
  );
}
