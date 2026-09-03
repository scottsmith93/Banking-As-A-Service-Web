import { useState } from "react";
import CreatePartyFormFields from "../../components/contacts/CreatePartyFormFields";
import CreateRecordPage from "../../components/create-record/CreateRecordPage";
import { ROUTES } from "../../routes";

export default function SupplierCreatePage() {
  const [supplierCode, setSupplierCode] = useState("");
  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [town, setTown] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [balanceOwedGbp, setBalanceOwedGbp] = useState("");
  const [lastActivity, setLastActivity] = useState("");

  return (
    <CreateRecordPage title="Supplier" listRoute={ROUTES.contacts.suppliers}>
      <CreatePartyFormFields
        fieldIdPrefix="supplier"
        codeLabel="Supplier code"
        nameLabel="Supplier"
        balanceLabel="Balance owed"
        code={supplierCode}
        name={name}
        contactName={contactName}
        email={email}
        phone={phone}
        town={town}
        status={status}
        balanceGbp={balanceOwedGbp}
        lastActivity={lastActivity}
        onCodeChange={setSupplierCode}
        onNameChange={setName}
        onContactNameChange={setContactName}
        onEmailChange={setEmail}
        onPhoneChange={setPhone}
        onTownChange={setTown}
        onStatusChange={setStatus}
        onBalanceChange={setBalanceOwedGbp}
        onLastActivityChange={setLastActivity}
      />
    </CreateRecordPage>
  );
}
