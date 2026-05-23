import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ShoppingCart, ArrowLeft, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";

export default function ProductDetailPage() {
  const { handle = "" } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useShopifyProduct(handle);
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);

  const variant = product?.node.variants.edges[0]?.node;
  const image = product?.node.images.edges[0]?.node;
  const price = variant
    ? `${variant.price.currencyCode === "EUR" ? "€" : variant.price.currencyCode} ${parseFloat(variant.price.amount).toFixed(2)}`
    : "";

  const handleAddToCart = async () => {
    if (!product || !variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: `${product.node.title} added — open cart to checkout.` });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={product ? `${product.node.title} — Smart Defibs LTD` : "Product — Smart Defibs LTD"}
        description={product?.node.description.slice(0, 155) ?? "AED defibrillator product details."}
        path={`/product/${handle}`}
      />
      <SiteHeader />
      <main className="flex-1 bg-surface-soft">
        <div className="container mx-auto max-w-6xl px-4 lg:px-8 py-8 lg:py-12">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to="/products">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to products
            </Link>
          </Button>

          {isLoading && (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {!isLoading && !product && (
            <div className="text-center py-24">
              <h1 className="text-2xl font-heading font-extrabold mb-2">Product not found</h1>
              <p className="text-muted-foreground mb-6">This product is no longer available.</p>
              <Button asChild><Link to="/products">View all products</Link></Button>
            </div>
          )}

          {product && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="bg-gradient-to-br from-muted to-background p-8 lg:p-12 flex items-center justify-center min-h-[360px]">
                {image && (
                  <img
                    src={image.url}
                    alt={image.altText ?? product.node.title}
                    className="max-h-[400px] w-auto object-contain drop-shadow-2xl"
                  />
                )}
              </div>
              <div className="p-8 lg:p-12 flex flex-col">
                <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-card-foreground mb-3">
                  {product.node.title}
                </h1>
                <p className="font-heading font-extrabold text-3xl text-primary mb-6">{price}</p>
                <div
                  className="prose prose-sm max-w-none text-muted-foreground mb-8"
                  dangerouslySetInnerHTML={{ __html: product.node.description.replace(/\n/g, "<br/>") }}
                />

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Direct from Irish importer · genuine warranty
                </div>

                <div className="mt-auto pt-6 border-t border-border flex flex-col sm:flex-row gap-2">
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={cartLoading || !variant?.availableForSale}
                    className="bg-primary text-primary-foreground hover:bg-red-deep btn-micro shadow-md flex-1"
                  >
                    {cartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ShoppingCart className="h-4 w-4 mr-2" />Buy now</>}
                  </Button>
                  <Button asChild size="lg" variant="outline" className="flex-1">
                    <Link to="/quote">Request a Quote</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
