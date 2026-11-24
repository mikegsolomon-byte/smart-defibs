import { describe, expect, it } from "vitest";
import { subscriptionNetCents, subscriptionPricing } from "@/lib/subscriptionPricing";

describe("subscription prices excluding 23% VAT with unchanged checkout totals", () => {
  it("shows indoor monthly as €31.71 while keeping the €39 payment", () => {
    expect(subscriptionPricing.indoor.monthlyGrossCents).toBe(3900);
    expect(subscriptionNetCents(subscriptionPricing.indoor.monthlyGrossCents)).toBe(3171);
  });
  it("shows outdoor monthly as €39.84 while keeping the €49 payment", () => {
    expect(subscriptionPricing.outdoor.monthlyGrossCents).toBe(4900);
    expect(subscriptionNetCents(subscriptionPricing.outdoor.monthlyGrossCents)).toBe(3984);
  });
  it("shows indoor yearly as €348.78 while keeping the €429 payment", () => {
    expect(subscriptionPricing.indoor.yearlyGrossCents).toBe(42900);
    expect(subscriptionNetCents(subscriptionPricing.indoor.yearlyGrossCents)).toBe(34878);
  });
  it("shows outdoor yearly as €438.21 while keeping the €539 payment", () => {
    expect(subscriptionPricing.outdoor.yearlyGrossCents).toBe(53900);
    expect(subscriptionNetCents(subscriptionPricing.outdoor.yearlyGrossCents)).toBe(43821);
  });
});