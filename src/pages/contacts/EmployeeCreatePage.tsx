import { useState } from "react";
import CreateEmployeeFormFields from "../../components/contacts/CreateEmployeeFormFields";
import CreateRecordPage from "../../components/create-record/CreateRecordPage";
import type { EmployeeStatus } from "../../data/employees";
import { ROUTES } from "../../routes";

export default function EmployeeCreatePage() {
  const [employeeCode, setEmployeeCode] = useState("");
  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [status, setStatus] = useState<EmployeeStatus>("active");

  return (
    <CreateRecordPage title="Employee" listRoute={ROUTES.contacts.employees}>
      <CreateEmployeeFormFields
        employeeCode={employeeCode}
        name={name}
        jobTitle={jobTitle}
        department={department}
        email={email}
        startDate={startDate}
        status={status}
        onEmployeeCodeChange={setEmployeeCode}
        onNameChange={setName}
        onJobTitleChange={setJobTitle}
        onDepartmentChange={setDepartment}
        onEmailChange={setEmail}
        onStartDateChange={setStartDate}
        onStatusChange={setStatus}
      />
    </CreateRecordPage>
  );
}
