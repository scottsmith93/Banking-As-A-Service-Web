export type TransactionFilters = { fromDate: string; toDate: string; min: string; max: string; status: string; method: string; category: string };
export const emptyTransactionFilters: TransactionFilters = { fromDate: "", toDate: "", min: "", max: "", status: "", method: "", category: "" };
