import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";

export default function CheckoutReturn() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Order confirmation — Smart Defibs LTD" description="Your order has been received." path="/checkout/return" />
      <SiteHeader />
      <main className="flex-1 bg-surface-soft flex items-center justify-center py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
          transition={{ duration: 0.4 }}
          className="bg-card border border-border rounded-2xl shadow-lg p-10 max-w-lg w-full text-center"
        >
          {sessionId ? (
            <>
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-9 w-9 text-primary" />
              </div>
              <h1 className="font-heading font-extrabold text-2xl md:text-3xl mb-3">Thank you for your order</h1>
              <p className="text-muted-foreground mb-2">
                Your payment was successful and a confirmation email is on its way.
              </p>
              <p className="text-muted-foreground mb-8">
                Our team will be in touch shortly to arrange delivery and any training you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg"><Link to="/products">Continue browsing</Link></Button>
                <Button asChild size="lg" variant="outline"><Link to="/">Back to home</Link></Button>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                <AlertCircle className="h-9 w-9 text-destructive" />
              </div>
              <h1 className="font-heading font-extrabold text-2xl mb-3">No order found</h1>
              <p className="text-muted-foreground mb-8">We couldn't find any order information for this page.</p>
              <Button asChild size="lg"><Link to="/products">View products</Link></Button>
            </>
          )}
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
}
