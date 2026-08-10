import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";

interface PlanCheckoutDialogProps {
  planName: string;
  monthlyPriceId: string;
  yearlyPriceId: string;
  monthlyLabel: string;
  yearlyLabel: string;
  triggerClassName?: string;
  triggerLabel?: string;
}

export function PlanCheckoutDialog({
  planName,
  monthlyPriceId,
  yearlyPriceId,
  monthlyLabel,
  yearlyLabel,
  triggerClassName,
  triggerLabel = "Get Started",
}: PlanCheckoutDialogProps) {
  const [open, setOpen] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [email, setEmail] = useState("");
  const [checkout, setCheckout] = useState(false);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setCheckout(false);
      setBilling("monthly");
      setEmail("");
    }
  };

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const priceId = billing === "monthly" ? monthlyPriceId : yearlyPriceId;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className={triggerClassName}>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading font-extrabold">
            {checkout ? "Complete your subscription" : planName}
          </DialogTitle>
        </DialogHeader>

        {!checkout ? (
          <div className="space-y-6 py-2">
            <div className="space-y-2">
              <span className="text-sm font-semibold">Billing period</span>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { key: "monthly" as const, label: monthlyLabel },
                    { key: "yearly" as const, label: yearlyLabel },
                  ]
                ).map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setBilling(opt.key)}
                    aria-pressed={billing === opt.key}
                    className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                      billing === opt.key
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-accent"
                    }`}
                  >
                    <span className="block text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                      {opt.key === "monthly" ? "Monthly" : "Yearly"}
                    </span>
                    <span className="block font-heading font-extrabold text-lg text-foreground">
                      {opt.label}
                    </span>
                    {opt.key === "yearly" && (
                      <span className="block text-xs text-primary font-semibold">1 month free</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="plan-email">Email *</Label>
              <Input
                id="plan-email"
                type="email"
                placeholder="you@example.ie"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-ring"
              />
              <p className="text-xs text-muted-foreground">
                We'll use this for your subscription receipts and to arrange installation.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full"
              disabled={!emailValid}
              onClick={() => setCheckout(true)}
            >
              Continue to payment
            </Button>
          </div>
        ) : (
          <StripeEmbeddedCheckout priceId={priceId} customerEmail={email} />
        )}
      </DialogContent>
    </Dialog>
  );
}
