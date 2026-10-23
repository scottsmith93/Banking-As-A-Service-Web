export function cardSpendComparison(current: number, previous: number | null) {
  if (previous === null) return { kind: "unavailable" as const, percentage: 0 };
  const currentCents = Math.round(current * 100), previousCents = Math.round(previous * 100);
  if (currentCents === previousCents) return { kind: "unchanged" as const, percentage: 0 };
  if (previousCents === 0) return { kind: "noPreviousSpend" as const, percentage: 0 };
  return { kind: currentCents > previousCents ? "increase" as const : "decrease" as const, percentage: Math.abs(currentCents - previousCents) / previousCents };
}

export function cardSpendPeriods(asOf: string) {
  const [year, month, day] = asOf.split("-").map(Number);
  const previousDays = new Date(Date.UTC(year, month - 1, 0)).getUTCDate();
  return {
    from: new Date(Date.UTC(year, month - 1, 1)), to: new Date(Date.UTC(year, month - 1, day)),
    previousFrom: new Date(Date.UTC(year, month - 2, 1)), previousTo: new Date(Date.UTC(year, month - 2, Math.min(day, previousDays))),
  };
}
