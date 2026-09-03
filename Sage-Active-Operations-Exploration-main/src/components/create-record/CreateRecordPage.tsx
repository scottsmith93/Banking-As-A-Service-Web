import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Form from "carbon-react/lib/components/form";
import Icon from "carbon-react/lib/components/icon";
import IconButton from "carbon-react/lib/components/icon-button";
import { Tile, TileContent } from "carbon-react/lib/components/tile";
import Typography from "carbon-react/lib/components/typography";
import CreateRecordFooter from "./CreateRecordFooter";

type CreateRecordPageProps = {
  title: string;
  listRoute: string;
  children: ReactNode;
  createLabel?: string;
};

export default function CreateRecordPage({
  title,
  listRoute,
  children,
  createLabel,
}: CreateRecordPageProps) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(listRoute);
  };

  const handleCreate = () => {
    // PROTOTYPE: simulate successful save — replace with API call
    navigate(listRoute);
  };

  return (
    <Box className="pageContent salesQuoteCreate">
      <Form
        stickyFooter
        stickyFooterVariant="light"
        height="100%"
        footerPadding={{ py: 0, px: 4 }}
        footerChildren={
          <CreateRecordFooter
            onCancel={handleClose}
            onCreate={handleCreate}
            createLabel={createLabel}
          />
        }
      >
        <Box
          className="salesQuoteCreate__header"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h1" as="h1" className="salesQuoteCreate__title">
            {title}
          </Typography>
          <IconButton aria-label={`Close ${title.toLowerCase()}`} onClick={handleClose}>
            <Icon type="close" />
          </IconButton>
        </Box>

        <Box className="salesQuoteCreate__fieldsCard">
          <Tile roundness="default" p={4}>
            <TileContent>{children}</TileContent>
          </Tile>
        </Box>
      </Form>
    </Box>
  );
}
