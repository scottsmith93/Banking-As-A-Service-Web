import { createContext, useMemo, useState, type ReactNode } from "react";
import { stagedBaasAccounts, type BaaSAccount } from "../data/bankingBaas";

type BankingBaasContextValue = {
  accounts: BaaSAccount[];
  completeOnboarding: () => void;
};

const BankingBaasContext = createContext<BankingBaasContextValue | undefined>(undefined);

export function BankingBaasProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<BaaSAccount[]>([]);

  const value = useMemo(
    () => ({
      accounts,
      completeOnboarding: () => setAccounts(stagedBaasAccounts),
    }),
    [accounts],
  );

  return <BankingBaasContext.Provider value={value}>{children}</BankingBaasContext.Provider>;
}

export { BankingBaasContext };
