import { useState } from "react";
import CreateFixedAssetFormFields from "../../components/accounting/CreateFixedAssetFormFields";
import CreateRecordPage from "../../components/create-record/CreateRecordPage";
import { ROUTES } from "../../routes";

export default function FixedAssetCreatePage() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState("");
  const [currentValueGbp, setCurrentValueGbp] = useState("");

  return (
    <CreateRecordPage title="Fixed asset" listRoute={ROUTES.accounting.fixedAssets}>
      <CreateFixedAssetFormFields
        code={code}
        name={name}
        category={category}
        acquisitionDate={acquisitionDate}
        currentValueGbp={currentValueGbp}
        onCodeChange={setCode}
        onNameChange={setName}
        onCategoryChange={setCategory}
        onAcquisitionDateChange={setAcquisitionDate}
        onCurrentValueChange={setCurrentValueGbp}
      />
    </CreateRecordPage>
  );
}
