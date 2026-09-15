import type { ReactNode } from "react";
import Box from "carbon-react/lib/components/box";
import Icon, { type IconType } from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";

type WorkspaceHeaderProps = {
  icon: IconType;
  title: string;
  description: string;
  right?: ReactNode;
};

export default function WorkspaceHeader({ icon, title, description, right }: WorkspaceHeaderProps) {
  return (
    <Box
      className="itemDetailsWorkspaceHeader"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box display="flex" gap={2} alignItems="flex-start">
        <Box className="itemDetailsWorkspaceHeader__iconTile">
          <Icon type={icon} />
        </Box>
        <Box>
          <Typography variant="h3" as="h2" className="itemDetailsWorkspaceHeader__title">
            {title}
          </Typography>
          <Typography variant="p" as="p" className="itemDetailsWorkspaceHeader__description">
            {description}
          </Typography>
        </Box>
      </Box>
      {right && <Box className="itemDetailsWorkspaceHeader__right">{right}</Box>}
    </Box>
  );
}
