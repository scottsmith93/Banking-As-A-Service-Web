import { useState } from "react";
import CreateRecordPage from "../../components/create-record/CreateRecordPage";
import CreatePriceListFormFields from "../../components/products-and-services/CreatePriceListFormFields";
import type { PriceListAdjustmentType } from "../../data/priceLists";
import { ROUTES } from "../../routes";

export default function PriceListCreatePage() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [adjustmentType, setAdjustmentType] = useState<PriceListAdjustmentType>("Price");
  const [active, setActive] = useState(true);

  return (
    <CreateRecordPage title="Price list" listRoute={ROUTES.productsAndServices.priceLists}>
      <CreatePriceListFormFields
        code={code}
        name={name}
        startDate={startDate}
        endDate={endDate}
        adjustmentType={adjustmentType}
        active={active}
        onCodeChange={setCode}
        onNameChange={setName}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onAdjustmentTypeChange={setAdjustmentType}
        onActiveChange={setActive}
      />
    </CreateRecordPage>
  );
}
