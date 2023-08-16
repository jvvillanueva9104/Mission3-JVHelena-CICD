export type ValueInput = {
  value: number;
  rate: number;
};

//carOutput structure
export type QuoteOutput = {
  yearly: number;
  monthly: number;
};

//
export function finalQuote({ value, rate }: ValueInput): QuoteOutput | string {
  // validate input value
  if (!value || typeof value !== "number" || value <= 0 || !rate || typeof rate !== "number" || rate <= 0) {
    return "Invalid input. Please provide a valid car value and risk rate.";
  }

  const annualPrem = Math.floor((value * rate) / 100);

  const monthlyPrem = annualPrem / 12;

  return {
    yearly: annualPrem,
    monthly: monthlyPrem,
  };
}
