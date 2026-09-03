import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import CategoryLinkMenu from "../../components/directory-menu/CategoryLinkMenu";
import { reportsSections } from "../../data/reports";

export default function ReportsPage() {
  return (
    <Box className="pageContent directoryPage">
      <Box className="directoryPage__intro">
        <Typography variant="h1" as="h1" className="directoryPage__title">
          Reports
        </Typography>
        <Typography variant="p" as="p" className="directoryPage__subtitle">
          Use reports to gain detailed insights into your business and financial information.
        </Typography>
      </Box>

      <CategoryLinkMenu sections={reportsSections} ariaLabel="Report categories" />
    </Box>
  );
}
