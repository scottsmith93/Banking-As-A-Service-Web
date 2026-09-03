import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import SplitButton from "carbon-react/lib/components/split-button";
import FooterKpiTile from "../FooterKpiTile";
import type { ProductOrService } from "../../data/productsAndServices";
import { formatCurrencyGbp } from "../sales-listing/salesGridShared";

type ProductDetailFooterProps = {
  product: ProductOrService;
  onCancel: () => void;
};

export default function ProductDetailFooter({ product, onCancel }: ProductDetailFooterProps) {
  return (
    <Box
      className="productDetail__footer"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
    >
      <Box className="productDetail__kpis" display="flex" alignItems="center" gap={2}>
        <FooterKpiTile amount={formatCurrencyGbp(product.priceWithDiscountGbp)} label="Price" />
        <FooterKpiTile
          amount={formatCurrencyGbp(product.priceWithDiscountGbp)}
          label="Price with discount"
        />
      </Box>

      <Box className="productDetail__footerActions" display="flex" alignItems="center" gap={2}>
        <Button variantType="tertiary" onClick={onCancel}>
          Cancel
        </Button>
        <SplitButton text="Update" buttonType="primary">
          <Button
            onClick={() => {
              // PROTOTYPE: replace with update-and-close flow
            }}
          >
            Update and close
          </Button>
          <Button
            onClick={() => {
              // PROTOTYPE: replace with update-and-duplicate flow
            }}
          >
            Update and duplicate
          </Button>
        </SplitButton>
      </Box>
    </Box>
  );
}
