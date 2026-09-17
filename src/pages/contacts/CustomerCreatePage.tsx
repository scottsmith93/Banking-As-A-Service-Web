import { useState } from "react";
import CreatePartyFormFields from "../../components/contacts/CreatePartyFormFields";
import CreateRecordPage from "../../components/create-record/CreateRecordPage";
import { ROUTES } from "../../routes";

export default function CustomerCreatePage() {
  const [customerCode, setCustomerCode] = useState("");
  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [town, setTown] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [balanceDueEur, setBalanceDueEur] = useState("");
  const [lastActivity, setLastActivity] = useState("");

  return (
    <CreateRecordPage title="Customer" listRoute={ROUTES.contacts.customers}>
      <CreatePartyFormFields
        fieldIdPrefix="customer"
        codeLabel="Customer code"
        nameLabel="Customer"
        balanceLabel="Balance due"
        code={customerCode}
        name={name}
        contactName={contactName}
        email={email}
        phone={phone}
        town={town}
        status={status}
        balanceGbp={balanceDueEur}
        lastActivity={lastActivity}
        onCodeChange={setCustomerCode}
        onNameChange={setName}
        onContactNameChange={setContactName}
        onEmailChange={setEmail}
        onPhoneChange={setPhone}
        onTownChange={setTown}
        onStatusChange={setStatus}
        onBalanceChange={setBalanceDueEur}
        onLastActivityChange={setLastActivity}
      />
    </CreateRecordPage>
  );
}
