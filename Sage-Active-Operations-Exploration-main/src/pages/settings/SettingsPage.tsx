import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import CategoryLinkMenu from "../../components/directory-menu/CategoryLinkMenu";
import { settingsSections } from "../../data/settings";
import { useLanguage } from "../../context/useLanguage";

export default function SettingsPage() {
  const { language } = useLanguage();
  const isFrench = language === "French";
  return (
    <Box className="pageContent directoryPage">
      <Box className="directoryPage__intro">
        <Typography variant="h1" as="h1" className="directoryPage__title">
          {isFrench ? "Paramètres" : "Settings"}
        </Typography>
        <Typography variant="p" as="p" className="directoryPage__subtitle">
          {isFrench ? "Personnalisez votre expérience Sage Active pour gagner en efficacité, pour vous et votre entreprise." : "Personalise your Sage Active experience to be more efficient for you and your business."}
        </Typography>
      </Box>

      <CategoryLinkMenu sections={settingsSections} ariaLabel="Settings categories" />
    </Box>
  );
}
