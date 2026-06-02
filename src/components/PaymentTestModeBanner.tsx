const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;

export function PaymentTestModeBanner() {
  if (!clientToken) {
    return (
      <div className="w-full bg-destructive/10 border-b border-destructive/30 px-4 py-2 text-center text-sm text-destructive">
        Production checkout is not configured. Complete go-live in your Lovable project to accept real payments.
      </div>
    );
  }
  if (clientToken.startsWith("pk_test_")) {
    return (
      <div className="w-full bg-accent/20 border-b border-accent/40 px-4 py-2 text-center text-sm text-foreground">
        Test mode — all payments made here are simulated. Use card 4242 4242 4242 4242.
      </div>
    );
  }
  return null;
}
