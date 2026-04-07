export const USD_RATES_BY_CURRENCY: Record<string, number> = {
  EUR: 0.92,
  PEN: 3.8,
  CLP: 800,
  MXN: 18,
  COP: 4200,
  ARS: 1000,
  BRL: 5.2,
  USD: 1,
};

export function convertUsdToLocal(amountUsd: number, currency: string) {
  const rate = USD_RATES_BY_CURRENCY[currency] ?? 1;
  return Math.round(amountUsd * rate);
}
