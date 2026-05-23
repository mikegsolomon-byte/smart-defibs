import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CTABanner from "@/components/CTABanner";
import AmoulImporterChip from "@/components/AmoulImporterChip";
import { motion } from "framer-motion";
import { Shield, Award, Droplets, Battery, Radio, Baby, Zap, Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import amoulI3 from "@/assets/amoul-i3.jpg";
import amoulLogo from "@/assets/amoul-logo.png";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";

const i3Features = [
  { icon: Zap, title: "200J adult / 50J paediatric", desc: "Smart escalating biphasic shock" },
  { icon: Baby, title: "Adult & paediatric pads", desc: "Both included as standard" },
  { icon: Droplets, title: "IP54 rated", desc: "Dust & water resistant" },
  { icon: Battery, title: "5-year battery life", desc: "Long-life disposable battery" },
  { icon: Radio, title: "Optional 4G connectivity", desc: "Remote management & daily self-tests" },
  { icon: Shield, title: "EMS-trusted", desc: "Clear multilingual voice & visual prompts" },
];


export default function ProductsPage() {
  const { data: products, isLoading } = useShopifyProducts();
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);

  // Match by handle; fallback to first product
  const shopifyProduct = products?.find((p) => p.node.handle === "amoul-i3-aed") ?? products?.[0];
  const variant = shopifyProduct?.node.variants.edges[0]?.node;
  const livePrice = variant ? `${variant.price.currencyCode === "EUR" ? "€" : variant.price.currencyCode} ${Math.round(parseFloat(variant.price.amount)).toLocaleString()}` : "€1,295";

  const handleAddToCart = async () => {
    if (!shopifyProduct || !variant) {
      toast.error("Product unavailable", { description: "Please request a quote instead." });
      return;
    }
    await addItem({
      product: shopifyProduct,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Added to cart", { description: "Amoul i3 AED added — open cart to checkout." });
  };
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Amoul i3 AED — CE-Marked Defibrillator from €1,295"
        description="Amoul i3 AED: 200J adult / 50J paediatric shock, IP54, 5-year battery, adult & paediatric pads included. Optional 4G connectivity. From €1,295 in Ireland."
        path="/products"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Amoul i3 AED",
          description: "CE-marked automated external defibrillator with 200J adult / 50J paediatric shock, IP54 rating, 5-year battery, adult & paediatric pads included.",
          brand: { "@type": "Brand", name: "Amoul" },
          offers: { "@type": "Offer", price: "1295", priceCurrency: "EUR", availability: "https://schema.org/InStock", url: "https://smartdefibs.ie/products" },
        }}
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary section-padding-hero">
          <div className="container mx-auto">
            <AmoulImporterChip variant="dark" />

            <h1 className="text-2xl sm:text-3xl md:text-5xl text-secondary-foreground mb-3 sm:mb-4">AEDs & Accessories</h1>
            <p className="text-base sm:text-lg text-secondary-foreground/70 max-w-2xl">
              We are the sole Irish representative and importer of Amoul® medical defibrillators — CE-marked, EMS-trusted, with transparent pricing and next-day delivery across Ireland.
            </p>
          </div>
        </section>

        {/* Amoul partnership strip */}
        <section className="bg-background border-b border-border">
          <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left">
            <img src={amoulLogo} alt="Amoul Medical official partner" className="h-10 w-auto" />
            <div className="hidden sm:block h-8 w-px bg-border" />
            <p className="text-sm text-muted-foreground max-w-xl">
              <span className="font-semibold text-foreground">Smart Defibs LTD</span> is the official Irish representative and importer for Amoul® Medical — direct manufacturer warranty, genuine consumables, and full PHECC-aligned training.
            </p>
          </div>
        </section>

        {/* Featured product: Amoul i3 */}
        <section className="section-padding bg-surface-soft">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative bg-gradient-to-br from-muted to-background p-8 lg:p-12 flex items-center justify-center min-h-[360px]">
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                    <Award className="h-3.5 w-3.5" />
                    Flagship Model
                  </div>
                  <img src={amoulI3} alt="Amoul i3 Semi-Automatic AED" className="max-h-[340px] w-auto object-contain drop-shadow-2xl" />
                </div>

                {/* Details */}
                <div className="p-8 lg:p-12 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={amoulLogo} alt="Amoul" className="h-7 w-auto" />
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">CE Marked</span>
                    <span className="text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full">IP54</span>
                  </div>
                  <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-card-foreground mb-2">Amoul® i3 AED</h2>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Semi-Automatic External Defibrillator</p>
                  <p className="text-base text-muted-foreground mb-6">
                    Smart ECG analysis with real-time visual and voice guidance for both CPR and defibrillation. Ships with adult and paediatric pads as standard, IP54 rated for Irish conditions, and backed by a 5-year battery and full manufacturer warranty.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {i3Features.map((f) => (
                      <div key={f.title} className="flex items-start gap-2.5">
                        <f.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-card-foreground leading-tight">{f.title}</p>
                          <p className="text-xs text-muted-foreground">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Direct from Irish importer</p>
                      <p className="font-heading font-extrabold text-3xl text-primary">{isLoading ? "—" : livePrice}</p>
                      <p className="text-xs text-muted-foreground">ex. VAT · includes pads & 5yr battery</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        size="lg"
                        onClick={handleAddToCart}
                        disabled={isLoading || cartLoading || !variant}
                        className="bg-primary text-primary-foreground hover:bg-red-deep btn-micro shadow-md"
                      >
                        {cartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><ShoppingCart className="h-4 w-4 mr-2" />Buy now</>}
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <Link to="/quote">Request a Quote</Link>
                      </Button>
                      {shopifyProduct && (
                        <Button asChild size="lg" variant="ghost">
                          <Link to={`/product/${shopifyProduct.node.handle}`}>View details</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        <CTABanner />
      </main>
      <SiteFooter />
    </div>
  );
}
