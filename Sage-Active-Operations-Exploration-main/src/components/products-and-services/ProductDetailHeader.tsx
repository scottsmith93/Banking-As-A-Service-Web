import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Divider from "carbon-react/lib/components/divider";
import Typography from "carbon-react/lib/components/typography";
import HeaderBackLink from "../HeaderBackLink";

type ProductDetailHeaderProps = {
  title: string;
  onBack: () => void;
};

export default function ProductDetailHeader({ title, onBack }: ProductDetailHeaderProps) {
  return (
    <Box className="productDetail__header">
      <HeaderBackLink label="Items" onClick={onBack} />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h1" as="h1" className="productDetail__title">
          {title}
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variantType="tertiary"
            iconType="attach"
            iconPosition="before"
            onClick={() => {
              // PROTOTYPE: wire to view/attach files flow when available
            }}
          >
            View or attach files
          </Button>
          <Divider type="vertical" h={32} />
          <Button
            variantType="tertiary"
            iconType="ellipsis_vertical"
            aria-label="More actions"
            onClick={() => {
              // PROTOTYPE: wire to a more-actions menu (duplicate, delete) when available
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
