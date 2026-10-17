export function formatCurrencyId(value, convert) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const cheking = convert ? value * 16300 : value;

  return formatter.format(cheking);
}
