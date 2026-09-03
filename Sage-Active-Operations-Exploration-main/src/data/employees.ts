// MOCK DATA — replace with real API responses

export type EmployeeStatus = "active" | "on-leave" | "inactive";

export type Employee = {
  id: string;
  employeeCode: string;
  name: string;
  jobTitle: string;
  department: string;
  email: string;
  /** ISO date string */
  startDate: string;
  status: EmployeeStatus;
};

export const employees: Employee[] = [
  {
    id: "emp-001",
    employeeCode: "E001",
    name: "Charlotte Hughes",
    jobTitle: "Finance Manager",
    department: "Finance",
    email: "charlotte.hughes@company.co.uk",
    startDate: "2019-03-11",
    status: "active",
  },
  {
    id: "emp-002",
    employeeCode: "E002",
    name: "Mohammed Ali",
    jobTitle: "Accounts Assistant",
    department: "Finance",
    email: "mohammed.ali@company.co.uk",
    startDate: "2021-09-06",
    status: "active",
  },
  {
    id: "emp-003",
    employeeCode: "E003",
    name: "Eleanor Price",
    jobTitle: "Sales Director",
    department: "Sales",
    email: "eleanor.price@company.co.uk",
    startDate: "2017-01-16",
    status: "active",
  },
  {
    id: "emp-004",
    employeeCode: "E004",
    name: "Liam O'Connor",
    jobTitle: "Account Executive",
    department: "Sales",
    email: "liam.oconnor@company.co.uk",
    startDate: "2023-04-17",
    status: "active",
  },
  {
    id: "emp-005",
    employeeCode: "E005",
    name: "Amelia Brooks",
    jobTitle: "Purchasing Coordinator",
    department: "Purchasing",
    email: "amelia.brooks@company.co.uk",
    startDate: "2022-02-14",
    status: "on-leave",
  },
  {
    id: "emp-006",
    employeeCode: "E006",
    name: "Ethan Walker",
    jobTitle: "Warehouse Supervisor",
    department: "Operations",
    email: "ethan.walker@company.co.uk",
    startDate: "2020-11-02",
    status: "active",
  },
  {
    id: "emp-007",
    employeeCode: "E007",
    name: "Isla Morgan",
    jobTitle: "HR Business Partner",
    department: "Human Resources",
    email: "isla.morgan@company.co.uk",
    startDate: "2018-07-23",
    status: "active",
  },
  {
    id: "emp-008",
    employeeCode: "E008",
    name: "Benjamin Clarke",
    jobTitle: "IT Support Analyst",
    department: "Technology",
    email: "benjamin.clarke@company.co.uk",
    startDate: "2024-01-08",
    status: "active",
  },
  {
    id: "emp-009",
    employeeCode: "E009",
    name: "Grace Thompson",
    jobTitle: "Marketing Manager",
    department: "Marketing",
    email: "grace.thompson@company.co.uk",
    startDate: "2016-05-09",
    status: "inactive",
  },
  {
    id: "emp-010",
    employeeCode: "E010",
    name: "Oliver Singh",
    jobTitle: "Payroll Administrator",
    department: "Finance",
    email: "oliver.singh@company.co.uk",
    startDate: "2022-10-03",
    status: "active",
  },
  {
    id: "emp-011",
    employeeCode: "E011",
    name: "Hannah Reid",
    jobTitle: "Customer Success Lead",
    department: "Sales",
    email: "hannah.reid@company.co.uk",
    startDate: "2021-06-21",
    status: "active",
  },
  {
    id: "emp-012",
    employeeCode: "E012",
    name: "Jack Morrison",
    jobTitle: "Compliance Officer",
    department: "Compliance",
    email: "jack.morrison@company.co.uk",
    startDate: "2019-08-12",
    status: "active",
  },
];
