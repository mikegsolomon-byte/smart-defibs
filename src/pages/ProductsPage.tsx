import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, FileText } from "lucide-react";
import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import { Button } from "@/components/ui/button";
import { BuyProductDialog } from "@/components/BuyProductDialog";
import amoulLogoAsset from "@/assets/amoul-logo.png.asset.json";
import { products } from "@/data/products";

const amoulLogo = amoulLogoAsset.url;

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="AEDs & CPR Devices — Smart Defibs LTD Ireland"
        description="Explore CE-marked AEDs and automated CPR devices in Ireland: Amoul i3, Amoul i5 and Chest-ER. Contact us for a tailored quote with training and servicing."
        path="/products"
      />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary section-padding-hero">
          <div className="container mx-auto">
            <div className="inline-flex items-center gap-3 bg-background border border-accent/40 px-4 py-2 rounded-full mb-4 shadow-sm">
              <img src={amoulLogo} alt="Amoul Medical" className="h-6 w-auto" />
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">Exclusive Amoul® Partner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl text-secondary-foreground mb-3 sm:mb-4">
              AEDs, Cabinets & <span className="text-accent">Accessories</span>
            </h1>
            <p className="text-base sm:text-lg text-secondary-foreground/70 max-w-2xl">
              Connected AEDs, cabinets and accessories, backed by our AED Readiness Service to help keep your organisation ready every day. Contact us for a tailored solution.
            </p>
          </div>
        </section>

        {/* Partnership strip */}
        <section className="bg-background border-b border-border">
          <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left">
            <img src={amoulLogo} alt="Amoul Medical official partner" className="h-10 w-auto" />
            <div className="hidden sm:block h-8 w-px bg-border" />
            <p className="text-sm text-muted-foreground max-w-xl">
              <span className="font-semibold text-foreground">Smart Defibs LTD</span> is the official Irish representative for Amoul® Medical and Progetti Medical — direct manufacturer warranty, genuine consumables, and full PHECC-aligned training.
            </p>
          </div>
        </section>

        {/* Product grid */}
        <section className="section-padding bg-surface-soft">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-2">Our Range</p>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-foreground">
                We monitor your AED, <span className="text-primary">so you don't have to.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p, i) => (
                <motion.article
                  key={p.handle}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group flex flex-col bg-card border-2 border-border rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-accent hover:-translate-y-1 transition-all duration-300 focus-within:border-accent"
                >
                  <Link
                    to={`/product/${p.handle}`}
                    aria-label={`View details for ${p.title}`}
                    className="flex flex-col flex-1 rounded-t-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <div className="relative bg-gradient-to-br from-muted to-background aspect-[4/3] flex items-center justify-center overflow-hidden">
                      {p.flagship && (
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-accent text-accent-foreground px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md">
                          <Award className="h-3 w-3" />
                          Flagship
                        </div>
                      )}
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        width={1024}
                        height={1024}
                        className="max-h-[220px] w-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex flex-col flex-1 p-6 pb-0">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {p.badges.slice(0, 3).map((b) => (
                          <span key={b} className="text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {b}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-heading font-extrabold text-xl text-card-foreground mb-1 group-hover:text-primary transition-colors">{p.title}</h3>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">{p.subtitle}</p>
                      <p className="text-sm text-muted-foreground mb-5 flex-1">{p.shortDescription}</p>

                      <div className="mb-5 pt-4 border-t border-border">
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">From</p>
                        <p className="font-heading font-extrabold text-2xl text-primary leading-tight">{p.priceFrom}</p>
                        <p className="text-[11px] text-muted-foreground">{p.priceNote}</p>
                      </div>
                    </div>
                  </Link>

                  <div className="flex flex-col gap-2 p-6 pt-0">
                    {p.priceId && (
                      <BuyProductDialog priceId={p.priceId} productTitle={p.title} />
                    )}
                    <Button asChild variant="outline" className="w-full border-accent/40 text-foreground hover:bg-accent/10 hover:border-accent">
                      <Link to={`/quote?product=${p.handle}`}>
                        <FileText className="h-4 w-4 mr-1.5" /> Contact Us
                      </Link>
                    </Button>
                  </div>
                </motion.article>

              ))}
            </div>

          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
