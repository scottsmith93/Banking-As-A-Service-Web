import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import { useLanguage } from "../../context/useLanguage";
import { getTranslation } from "../../locales";

type NavigationPlaceholderPageProps = {
  titleKey: string;
};

export default function NavigationPlaceholderPage({ titleKey }: NavigationPlaceholderPageProps) {
  const { language } = useLanguage();

  return (
    <Box className="pageContent navigationPlaceholderPage">
      <Typography variant="h1" as="h1">
        {getTranslation(language, titleKey)}
      </Typography>
    </Box>
  );
}
