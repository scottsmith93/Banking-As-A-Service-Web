import Box from "carbon-react/lib/components/box";
import Link from "carbon-react/lib/components/link";

type HeaderBackLinkProps = {
  label: string;
  onClick: () => void;
};

/**
 * Replaces the plain back-arrow icon button in second-level page headers
 * (detail pages reached by drilling into a list) with a labelled breadcrumb
 * link back to that list — first-level pages show no breadcrumb at all.
 */
export default function HeaderBackLink({ label, onClick }: HeaderBackLinkProps) {
  return (
    <Box className="headerBackLink">
      <Link icon="chevron_left" onClick={onClick}>
        {label}
      </Link>
    </Box>
  );
}
