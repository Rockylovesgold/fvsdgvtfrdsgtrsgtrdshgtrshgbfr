export const minutesFromNow = (minutes: number): Date => {
  return new Date(Date.now() + minutes * 60 * 1000);
};

export const formatCurrency = (value: number, currency = "GBP"): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency
  }).format(value);
};
