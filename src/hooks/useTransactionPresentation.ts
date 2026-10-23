import { useLanguage } from "../context/useLanguage";
import { getLocale, getLocaleCode } from "../locales";
import type { BankPurchaseInvoice, BankTransaction } from "../data/bankingTransactions";
import { invoiceDaysBeforeTransaction } from "../utils/invoiceTiming";
import { interpolate } from "../utils/interpolate";

export function useTransactionPresentation() {
  const { language } = useLanguage();
  const locale = getLocaleCode(language);
  const copy = getLocale(language).bankingBaas.transactions;
  const money = (amount: number, currency = "EUR") => new Intl.NumberFormat(locale, { style: "currency", currency }).format(amount);
  const date = (value: string) => new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
  const invoiceSummary = (invoice: BankPurchaseInvoice, transaction: BankTransaction) => {
    const days = invoiceDaysBeforeTransaction(invoice.date, transaction.date);
    const message = days === 1 ? copy.workbench.invoiceSummaryEarlierOne : days !== null && days > 1 ? copy.workbench.invoiceSummaryEarlierMany : days !== null && days < 0 ? copy.workbench.invoiceSummaryLater : copy.workbench.invoiceSummary;
    return interpolate(message, { supplier: invoice.supplier, date: date(invoice.date), days: new Intl.NumberFormat(locale).format(days ?? 0) });
  };
  return { copy, locale, money, date, invoiceSummary };
}
