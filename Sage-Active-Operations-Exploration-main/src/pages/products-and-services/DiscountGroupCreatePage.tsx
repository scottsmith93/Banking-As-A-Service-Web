import { useState } from "react";
import CreateRecordPage from "../../components/create-record/CreateRecordPage";
import CreateDiscountGroupFormFields from "../../components/products-and-services/CreateDiscountGroupFormFields";
import { ROUTES } from "../../routes";

export default function DiscountGroupCreatePage() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [active, setActive] = useState(true);

  return (
    <CreateRecordPage
      title="Discount group"
      listRoute={ROUTES.productsAndServices.discountGroups}
    >
      <CreateDiscountGroupFormFields
        code={code}
        name={name}
        startDate={startDate}
        endDate={endDate}
        active={active}
        onCodeChange={setCode}
        onNameChange={setName}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onActiveChange={setActive}
      />
    </CreateRecordPage>
  );
}
