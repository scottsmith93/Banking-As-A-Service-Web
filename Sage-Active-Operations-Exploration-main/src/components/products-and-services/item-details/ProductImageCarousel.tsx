import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import { getProductImage } from "../../../data/productImages";

type ProductImageCarouselProps = {
  code: string;
  name: string;
};

export default function ProductImageCarousel({ code, name }: ProductImageCarouselProps) {
  const image = getProductImage(code);

  return (
    <Box className="productDetail__imagesPanel">
      <Box className="productDetail__mainImage">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <Box className="productDetail__mainImage__empty">
            <Icon type="image" />
          </Box>
        )}
      </Box>
    </Box>
  );
}
