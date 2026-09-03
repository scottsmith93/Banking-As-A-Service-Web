import DateInput from "carbon-react/lib/components/date";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import type { EmployeeStatus } from "../../data/employees";
import {
  fullWidthFieldProps,
  RecordFormCell,
  RecordFormRow,
} from "../create-record/RecordFormLayout";

type CreateEmployeeFormFieldsProps = {
  employeeCode: string;
  name: string;
  jobTitle: string;
  department: string;
  email: string;
  startDate: string;
  status: EmployeeStatus;
  onEmployeeCodeChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onJobTitleChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onStatusChange: (value: EmployeeStatus) => void;
};

export default function CreateEmployeeFormFields({
  employeeCode,
  name,
  jobTitle,
  department,
  email,
  startDate,
  status,
  onEmployeeCodeChange,
  onNameChange,
  onJobTitleChange,
  onDepartmentChange,
  onEmailChange,
  onStartDateChange,
  onStatusChange,
}: CreateEmployeeFormFieldsProps) {
  return (
    <div className="salesQuoteCreate__headerFields">
      <RecordFormRow>
        <RecordFormCell>
          <Textbox
            id="employee-code"
            label="Employee code"
            value={employeeCode}
            onChange={(event) => onEmployeeCodeChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id="employee-name"
            label="Name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id="employee-job-title"
            label="Job title"
            value={jobTitle}
            onChange={(event) => onJobTitleChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
      </RecordFormRow>

      <RecordFormRow>
        <RecordFormCell>
          <Textbox
            id="employee-department"
            label="Department"
            value={department}
            onChange={(event) => onDepartmentChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id="employee-email"
            label="Email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <DateInput
            id="employee-start-date"
            label="Start date"
            value={startDate}
            onChange={(event) => onStartDateChange(event.target.value.formattedValue)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
      </RecordFormRow>

      <RecordFormRow>
        <RecordFormCell>
          <Select
            id="employee-status"
            label="Status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value as EmployeeStatus)}
            {...fullWidthFieldProps}
          >
            <Option text="Active" value="active" />
            <Option text="On leave" value="on-leave" />
            <Option text="Inactive" value="inactive" />
          </Select>
        </RecordFormCell>
      </RecordFormRow>
    </div>
  );
}
