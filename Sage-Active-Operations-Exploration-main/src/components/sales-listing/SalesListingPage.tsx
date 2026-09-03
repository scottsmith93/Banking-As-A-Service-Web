import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";

type SalesListingPageProps = {
  title: string;
  description?: string;
  searchLabel: string;
  createRoute?: string;
  onCreateClick?: () => void;
  createLabel?: string;
  showCreate?: boolean;
  searchText: string;
  onSearchChange: (value: string) => void;
  itemCount: number;
  showCopilotInsights?: boolean;
  showCustomise?: boolean;
  showSettings?: boolean;
  headerActions?: ReactNode;
  toolbarStart?: ReactNode;
  filterBar?: ReactNode;
  children: ReactNode;
};

export default function SalesListingPage({
  title,
  description,
  searchLabel,
  createRoute,
  onCreateClick,
  createLabel = "Create",
  showCreate = true,
  searchText,
  onSearchChange,
  itemCount,
  showCopilotInsights = false,
  showCustomise = true,
  showSettings = true,
  headerActions,
  toolbarStart,
  filterBar,
  children,
}: SalesListingPageProps) {
  const navigate = useNavigate();

  return (
    <Box className="pageContent salesListingPage">
      <Box className="salesListingPage__titleRow" display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column" className="salesListingPage__titleBlock">
          <Box display="flex" alignItems="center" className="salesListingPage__titleGroup">
            <Typography variant="h1" as="h1" className="salesListingPage__title">
              {title}
            </Typography>
            {showCopilotInsights && (
              <Button
                variant="gradient"
                variantType="secondary"
                size="small"
                iconType="filter_new"
                iconPosition="before"
              >
                Copilot Insights
              </Button>
            )}
          </Box>
          {description && (
            <Typography variant="p" as="p" className="salesListingPage__description">
              {description}
            </Typography>
          )}
        </Box>
        <Box display="flex" alignItems="center" className="salesListingPage__headerActions">
          {headerActions}
          {showSettings && (
            <Button variantType="tertiary" iconType="settings" iconPosition="before">
              Settings
            </Button>
          )}
        </Box>
      </Box>

      <Box
        className="salesListingPage__toolbar"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" className="salesListingPage__toolbarStart">
          {showCreate && (createRoute || onCreateClick) && (
            <Button
              variantType="primary"
              iconType="add"
              iconPosition="before"
              onClick={() => (onCreateClick ? onCreateClick() : navigate(createRoute!))}
            >
              {createLabel}
            </Button>
          )}
          {toolbarStart}
        </Box>

        <Box display="flex" alignItems="center" className="salesListingPage__toolbarActions">
          <Box className="salesListingPage__search">
            <Textbox
              id={`${searchLabel.replace(/\s+/g, "-").toLowerCase()}-search`}
              label={searchLabel}
              placeholder="Search"
              inputIcon="search"
              value={searchText}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </Box>
          <Button variantType="secondary" iconType="filter" iconPosition="before">
            Filter
          </Button>
          {showCustomise && (
            <Button variantType="secondary" iconType="dropdown" iconPosition="after">
              Customise
            </Button>
          )}
        </Box>
      </Box>

      {filterBar}

      {children}

      <Typography variant="p" as="p" className="salesListingPage__itemCount">
        Items: {itemCount}
      </Typography>
    </Box>
  );
}
