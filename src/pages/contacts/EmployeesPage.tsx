import { useState } from "react";
import EmployeesGrid from "../../components/contacts/EmployeesGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { employees } from "../../data/employees";
import { ROUTES } from "../../routes";

export default function EmployeesPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(employees.length);

  return (
    <SalesListingPage
      title="Employees"
      searchLabel="Search employees"
      createRoute={ROUTES.contacts.employeeCreate}
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showCustomise={false}
      showSettings={false}
    >
      <EmployeesGrid
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
