import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, Check, FileText, PhoneCall, Award } from "lucide-react";
import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { BuyProductDialog } from "@/components/BuyProductDialog";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { getProduct } from "@/data/products";

export default function ProductDetailPage() {
  const { handle = "" } = useParams<{ handle: string }>();
  const product = getProduct(handle);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO title="Product not found — Smart Defibs LTD" description="This product is no longer available." path={`/product/${handle}`} />
        <SiteHeader />
        <main className="flex-1 bg-surface-soft flex items-center justify-center py-24">
          <div className="text-center">
            <h1 className="font-heading font-extrabold text-2xl mb-2">Product not found</h1>
            <p className="text-muted-foreground mb-6">This product is no longer available.</p>
            <Button asChild><Link to="/products">View all products</Link></Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${product.title} — Smart Defibs LTD Ireland`}
        description={product.shortDescription}
        path={`/product/${product.handle}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.shortDescription,
          brand: { "@type": "Brand", name: product.brand },
          category: product.category,
        }}
      />
      <SiteHeader />
      <PaymentTestModeBanner />
      <main className="flex-1 bg-surface-soft">
        <div className="container mx-auto max-w-6xl px-4 lg:px-8 py-8 lg:py-12">
          <Button asChild variant="ghost" size="sm" className="mb-6">
            <Link to="/products">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to products
            </Link>
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-0 bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
          >
            {/* Image */}
            <div className="relative bg-gradient-to-br from-muted to-background p-8 lg:p-12 flex items-center justify-center min-h-[360px]">
              {product.flagship && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                  <Award className="h-3.5 w-3.5" />
                  Flagship Model
                </div>
              )}
              <img
                src={product.image}
                alt={product.title}
                width={1024}
                height={1024}
                className="max-h-[420px] w-auto object-contain drop-shadow-2xl"
              />
            </div>

            {/* Details */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {product.badges.map((b) => (
                  <span key={b} className="text-[11px] font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {b}
                  </span>
                ))}
              </div>
              <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-card-foreground mb-2">
                {product.title}
              </h1>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-5">{product.subtitle}</p>
              <p className="text-base text-muted-foreground mb-6">{product.longDescription}</p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Direct from Irish importer · genuine manufacturer warranty
              </div>

              <div className="mt-auto pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">From</p>
                <p className="font-heading font-extrabold text-3xl text-primary mb-1">{product.priceFrom}</p>
                <p className="text-xs text-muted-foreground mb-5">{product.priceNote}</p>

                <div className="flex flex-col sm:flex-row gap-2">
                  {product.priceId ? (
                    <BuyProductDialog priceId={product.priceId} productTitle={product.title} />
                  ) : (
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 btn-micro shadow-md flex-1">
                      <Link to={`/quote?product=${product.handle}`}>
                        <FileText className="h-4 w-4 mr-2" /> Request a Quote
                      </Link>
                    </Button>
                  )}
                  <Button asChild size="lg" variant="outline" className="flex-1 border-accent/40 hover:bg-accent/10 hover:border-accent">
                    <Link to={`/quote?product=${product.handle}`}>
                      <FileText className="h-4 w-4 mr-2" /> Request a Quote
                    </Link>
                  </Button>
                </div>
                {product.priceId && (
                  <p className="text-xs text-muted-foreground mt-3 text-center sm:text-left">
                    Secure checkout · ships to Ireland &amp; UK
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Highlights */}
          <section className="mt-12">
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-6">Key features</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.highlights.map((h) => (
                <div key={h.title} className="bg-card border border-border rounded-xl p-5 hover:border-accent transition-colors">
                  <p className="font-heading font-extrabold text-base text-card-foreground mb-1">{h.title}</p>
                  <p className="text-sm text-muted-foreground">{h.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What's included */}
          <section className="mt-12 bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading font-extrabold text-2xl text-card-foreground mb-5">What's included</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                    <Check className="h-3.5 w-3.5 text-accent-foreground" />
                  </span>
                  <span className="text-sm text-card-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <section className="mt-12 bg-secondary text-secondary-foreground rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-secondary-foreground mb-1">
                Need a tailored quote?
              </h3>
              <p className="text-secondary-foreground/80 text-sm max-w-xl">
                We'll bundle pricing for the {product.title}, optional cabinets, consumables and PHECC-aligned training — and confirm next-day delivery anywhere in Ireland.
              </p>
            </div>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-md">
              <Link to={`/quote?product=${product.handle}`}>
                <FileText className="h-4 w-4 mr-2" /> Get my quote
              </Link>
            </Button>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
