// Gross (VAT-inclusive) cents match the Stripe checkout amounts; net display is derived.
export const subscriptionPricing = {
  indoor: { monthlyGrossCents: 4797, yearlyGrossCents: 52767 },
  outdoor: { monthlyGrossCents: 6027, yearlyGrossCents: 66297 },
} as const;

export function subscriptionNetCents(grossCents: number): number {
  return Math.round(grossCents / 1.23);
}

export function formatSubscriptionNet(grossCents: number): string {
  return `€${(subscriptionNetCents(grossCents) / 100).toFixed(2)}`;
}

export function formatSubscriptionGross(grossCents: number): string {
  return `€${(grossCents / 100).toFixed(2)}`;
}
