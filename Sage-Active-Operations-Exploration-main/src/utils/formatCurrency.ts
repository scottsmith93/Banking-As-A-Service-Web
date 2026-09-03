const eurFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

export function formatEur(amount: number): string {
  return eurFormatter.format(amount);
}
