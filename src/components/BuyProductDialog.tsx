import { useState } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";

interface BuyProductDialogProps {
  priceId: string;
  productTitle: string;
}

export function BuyProductDialog({ priceId, productTitle }: BuyProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [checkout, setCheckout] = useState(false);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setCheckout(false);
      setQuantity(1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 btn-micro shadow-md flex-1 w-full h-14 text-base sm:text-lg font-bold rounded-xl"
        >
          <ShoppingCart className="h-5 w-5 mr-2" /> Buy Now
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading font-extrabold">
            {checkout ? "Complete your purchase" : `Buy ${productTitle}`}
          </DialogTitle>
        </DialogHeader>

        {!checkout ? (
          <div className="space-y-6 py-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Quantity</span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold tabular-nums">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              You'll enter delivery and payment details on the next step. Prices include VAT.
            </p>
            <Button size="lg" className="w-full" onClick={() => setCheckout(true)}>
              Continue to payment
            </Button>
          </div>
        ) : (
          <StripeEmbeddedCheckout priceId={priceId} quantity={quantity} />
        )}
      </DialogContent>
    </Dialog>
  );
}
