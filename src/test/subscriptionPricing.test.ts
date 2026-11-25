import { describe, expect, it } from "vitest";
import { subscriptionNetCents, subscriptionPricing } from "@/lib/subscriptionPricing";

describe("subscription prices: €39 / €49 excl. 23% VAT", () => {
  it("indoor monthly is €39 excl. VAT, €47.97 incl. VAT", () => {
    expect(subscriptionPricing.indoor.monthlyGrossCents).toBe(4797);
    expect(subscriptionNetCents(subscriptionPricing.indoor.monthlyGrossCents)).toBe(3900);
  });
  it("outdoor monthly is €49 excl. VAT, €60.27 incl. VAT", () => {
    expect(subscriptionPricing.outdoor.monthlyGrossCents).toBe(6027);
    expect(subscriptionNetCents(subscriptionPricing.outdoor.monthlyGrossCents)).toBe(4900);
  });
  it("indoor yearly is €429 excl. VAT (1 month free)", () => {
    expect(subscriptionNetCents(subscriptionPricing.indoor.yearlyGrossCents)).toBe(42900);
  });
  it("outdoor yearly is €539 excl. VAT (1 month free)", () => {
    expect(subscriptionNetCents(subscriptionPricing.outdoor.yearlyGrossCents)).toBe(53900);
  });
});
