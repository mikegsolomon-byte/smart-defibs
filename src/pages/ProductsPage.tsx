import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CTABanner from "@/components/CTABanner";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const products = [
  { name: "HeartSine 360P", desc: "Fully automatic AED — ideal for untrained users", price: "From €1,095", tags: ["Schools", "Community"], indoor: true },
  { name: "HeartSine 500P", desc: "CPR feedback AED — real-time coaching for rescuers", price: "From €1,395", tags: ["Nursing", "Workplace"], indoor: true },
  { name: "ZOLL AED 3", desc: "Premium AED with real-time feedback & Wi-Fi monitoring", price: "From €1,695", tags: ["Workplace", "Nursing"], indoor: true },
  { name: "Outdoor Heated Cabinet", desc: "Weatherproof cabinet with alarm & heating element", price: "From €395", tags: ["Community", "Schools"], indoor: false },
  { name: "Responder Bag Kit", desc: "Complete first responder kit — AED, mask, gloves, scissors", price: "From €1,295", tags: ["Community"], indoor: false },
  { name: "Replacement Pads & Battery", desc: "Genuine replacement pads and battery for all major AED brands", price: "From €95", tags: ["All sectors"], indoor: true },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-secondary section-padding-hero">
          <div className="container mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-5xl text-secondary-foreground mb-3 sm:mb-4">AEDs & Accessories</h1>
            <p className="text-base sm:text-lg text-secondary-foreground/70 max-w-2xl">CE-marked defibrillators, cabinets, and accessories — all with transparent pricing and next-day delivery across Ireland.</p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="glass-card p-8 flex flex-col hover-lift group"
                >
                  {/* Image placeholder */}
                  <div className="h-40 rounded-xl bg-muted/50 mb-6 flex items-center justify-center">
                    <Shield className="h-12 w-12 text-primary/20 group-hover:text-primary/30 transition-colors" />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">CE Marked</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-card-foreground mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6 flex-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <p className="font-heading font-bold text-lg text-primary">{p.price}</p>
                    <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-teal-light btn-micro">
                      <Link to="/quote">Add to Quote</Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <SiteFooter />
    </div>
  );
}
