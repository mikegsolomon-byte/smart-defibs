import SiteHeader from "@/components/SiteHeader";
import AmoulImporterChip from "@/components/AmoulImporterChip";
import SiteFooter from "@/components/SiteFooter";
import CTABanner from "@/components/CTABanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    title: "Basic Annual Check",
    price: "€99/yr",
    features: ["Visual inspection", "Readiness report", "Certificate issued"],
    personas: ["Schools"],
    popular: false,
  },
  {
    title: "Full Service Plan",
    price: "€199/yr",
    features: ["Annual inspection", "Pads & battery replacement", "Priority support", "Compliance documentation"],
    personas: ["Nursing", "Workplace"],
    popular: true,
  },
  {
    title: "Multi-Site Managed",
    price: "POA",
    features: ["Dedicated account manager", "All sites covered", "Compliance docs package", "24/7 priority support"],
    personas: ["Workplace"],
    popular: false,
  },
];

export default function ServicingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-secondary section-padding-hero">
          <div className="container mx-auto">
            <AmoulImporterChip />
            <h1 className="text-2xl sm:text-3xl md:text-5xl text-secondary-foreground mb-3 sm:mb-4">Servicing & Maintenance</h1>
            <p className="text-base sm:text-lg text-secondary-foreground/70 max-w-2xl">No hidden fees. All pricing transparent. HIQA & HSA compliance docs included with all plans.</p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-card border rounded-xl p-8 flex flex-col ${
                    plan.popular ? "border-primary ring-2 ring-primary/20" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <span className="text-xs font-semibold bg-primary text-primary-foreground px-3 py-1 rounded-full self-start mb-4">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-heading font-bold text-xl text-card-foreground mb-2">{plan.title}</h3>
                  <p className="text-3xl font-heading font-bold text-primary mb-6">{plan.price}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {plan.personas.map((p) => (
                      <span key={p} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{p}</span>
                    ))}
                  </div>
                  <Button asChild className={plan.popular ? "bg-primary text-primary-foreground hover:bg-teal-light" : "bg-muted text-foreground hover:bg-muted/80"}>
                    <Link to="/quote">Get Started</Link>
                  </Button>
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
