import type { BankTransaction } from "../data/bankingTransactions";
import { stagedBaasAccounts } from "../data/bankingBaas";
import { connectedBankAccounts, connectedBanks } from "../data/bankAccountConnections";

// Account ownership determines provenance; a cardholder is optional, never a substitute for the bank.
export function transactionSource(transaction: BankTransaction) {
  const sageAccount = stagedBaasAccounts.find(account => account.id === transaction.accountId);
  const connectedAccount = connectedBankAccounts.find(account => account.id === transaction.accountId);
  const bank = connectedBanks.find(item => item.id === connectedAccount?.bankId);
  const cardholder = sageAccount && transaction.lastFour ? transaction.cardholder : null;
  const initials = cardholder?.trim().split(/\s+/u).filter(Boolean).filter((_, index, parts) => index === 0 || index === parts.length - 1).map(part => Array.from(part)[0]).join("").toLocaleUpperCase() ?? "";
  return { isSage: Boolean(sageAccount), account: sageAccount?.name ?? connectedAccount?.name ?? transaction.accountId, bank, cardholder, initials };
}
