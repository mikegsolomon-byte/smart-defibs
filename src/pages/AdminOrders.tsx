import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, LogOut, RefreshCw, PackageOpen } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { getStripeEnvironment } from "@/lib/stripe";

interface OrderRow {
  id: string;
  product_name: string | null;
  quantity: number;
  amount: number | null;
  currency: string;
  customer_email: string | null;
  customer_name: string | null;
  shipping_address: Record<string, unknown> | null;
  status: string;
  environment: string;
  created_at: string;
  stripe_session_id: string | null;
}

const statusStyles: Record<string, string> = {
  paid: "bg-primary/10 text-primary border-primary/20",
  refunded: "bg-muted text-muted-foreground border-border",
  partially_refunded: "bg-muted text-muted-foreground border-border",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  disputed: "bg-accent/20 text-accent-foreground border-accent/30",
};

const fmtMoney = (amount: number | null, currency: string) => {
  if (amount == null) return "—";
  try {
    return new Intl.NumberFormat("en-IE", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);
  } catch {
    return `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
};

const fmtAddress = (addr: Record<string, unknown> | null) => {
  if (!addr) return "—";
  return ["line1", "line2", "city", "state", "postal_code", "country"]
    .map((k) => addr[k])
    .filter(Boolean)
    .join(", ");
};

export default function AdminOrders() {
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("environment", getStripeEnvironment())
      .order("created_at", { ascending: false });
    if (!error && data) setOrders(data as unknown as OrderRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-surface-soft">
      <SEO title="Orders — Smart Defibs admin" description="Order management" path="/admin/orders" />
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-extrabold text-xl">Orders</h1>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-24">
            <PackageOpen className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No orders yet in this environment.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl shadow-sm overflow-x-auto"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Ship to</th>
                  <th className="px-4 py-3 font-semibold text-right">Amount</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-border/60 last:border-0 align-top">
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                      {new Date(o.created_at).toLocaleDateString("en-IE", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{o.product_name || "—"}</div>
                      <div className="text-xs text-muted-foreground">Qty {o.quantity}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>{o.customer_name || "—"}</div>
                      <div className="text-xs text-muted-foreground">{o.customer_email || ""}</div>
                    </td>
                    <td className="px-4 py-3 max-w-[220px] text-xs text-muted-foreground">{fmtAddress(o.shipping_address)}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap font-semibold tabular-nums">
                      {fmtMoney(o.amount, o.currency)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={statusStyles[o.status] || statusStyles.paid}>
                        {o.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </main>
    </div>
  );
}
