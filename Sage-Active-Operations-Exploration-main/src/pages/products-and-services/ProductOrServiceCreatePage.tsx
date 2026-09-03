import { useState } from "react";
import CreateRecordPage from "../../components/create-record/CreateRecordPage";
import CreateProductOrServiceFormFields from "../../components/products-and-services/CreateProductOrServiceFormFields";
import type { ProductOrServiceCategory } from "../../data/productsAndServices";
import { ROUTES } from "../../routes";

export default function ProductOrServiceCreatePage() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ProductOrServiceCategory>("Product");
  const [releaseDate, setReleaseDate] = useState("");
  const [priceWithDiscountGbp, setPriceWithDiscountGbp] = useState("");
  const [status, setStatus] = useState("");

  return (
    <CreateRecordPage
      title="Product or service"
      listRoute={ROUTES.productsAndServices.catalog}
    >
      <CreateProductOrServiceFormFields
        code={code}
        name={name}
        category={category}
        releaseDate={releaseDate}
        priceWithDiscountGbp={priceWithDiscountGbp}
        status={status}
        onCodeChange={setCode}
        onNameChange={setName}
        onCategoryChange={setCategory}
        onReleaseDateChange={setReleaseDate}
        onPriceChange={setPriceWithDiscountGbp}
        onStatusChange={setStatus}
      />
    </CreateRecordPage>
  );
}
