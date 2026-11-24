// Keep checkout totals as the source of truth; only the advertised net amount changes.
export const subscriptionPricing = {
  indoor: { monthlyGrossCents: 3900, yearlyGrossCents: 42900 },
  outdoor: { monthlyGrossCents: 4900, yearlyGrossCents: 53900 },
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