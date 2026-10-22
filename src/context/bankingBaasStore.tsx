import { createContext, useMemo, useState, type ReactNode } from "react";
import { debitCards, stagedBaasAccounts, type BaaSAccount, type DebitCard } from "../data/bankingBaas";
import { BankingTransactionsProvider } from "./bankingTransactionsStore";

type BankingBaasContextValue = {
  accounts: BaaSAccount[];
  completeOnboarding: () => void;
  cards: DebitCard[];
  addCard: (card: Pick<DebitCard, "cardholder" | "nickname" | "colour" | "type" | "network">) => DebitCard;
};

const BankingBaasContext = createContext<BankingBaasContextValue | undefined>(undefined);

export function BankingBaasProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<BaaSAccount[]>([]);
  // PROTOTYPE: shared session state survives route changes; refreshing resets the demo.
  const [cards, setCards] = useState<DebitCard[]>(debitCards);

  const value = useMemo(
    () => ({
      accounts,
      cards,
      addCard: (draft: Pick<DebitCard, "cardholder" | "nickname" | "colour" | "type" | "network">) => {
        const card: DebitCard = {
          ...draft, id: `card-demo-${crypto.randomUUID()}`, lastFour: String(1200 + cards.length * 37).slice(-4),
          status: draft.type === "physical" ? "ordered" : "issued", monthlySpendEur: 0, validThrough: "11/30",
        };
        setCards(current => [card, ...current]);
        return card;
      },
      completeOnboarding: () => setAccounts(stagedBaasAccounts),
    }),
    [accounts, cards],
  );

  return <BankingBaasContext.Provider value={value}><BankingTransactionsProvider>{children}</BankingTransactionsProvider></BankingBaasContext.Provider>;
}

export { BankingBaasContext };
