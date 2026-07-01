import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import AmoulImporterChip from "@/components/AmoulImporterChip";
import SiteFooter from "@/components/SiteFooter";
import CTABanner from "@/components/CTABanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Minus } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { label: "Connected 4G AED", clinical: true, plus: true },
  { label: "Remote monitoring", clinical: true, plus: true },
  { label: "Email notifications & alerts", clinical: true, plus: true },
  { label: "Expiry & certificate date tracking", clinical: true, plus: true },
  { label: "Monthly readiness report", clinical: true, plus: true },
  { label: "Unlimited consumables (pads & batteries)*", clinical: true, plus: true },
  { label: "Post-event support", clinical: true, plus: true },
  { label: "Climate & motion monitoring", clinical: false, plus: true },
];

const plans = [
  {
    name: "Clinical",
    upfront: "€1,499",
    monthly: "€34",
    desc: "Everything you need to keep a single AED ready, compliant and supported.",
    highlight: false,
    key: "clinical" as const,
  },
  {
    name: "Clinical Plus",
    upfront: "€1,990",
    monthly: "€39",
    desc: "Our complete package — adds climate and motion monitoring for total peace of mind.",
    highlight: true,
    key: "plus" as const,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Pricing — AED Plans | Smart Defibs Ireland"
        description="Simple, transparent AED plans from Smart Defibs. Clinical and Clinical Plus include connected AED technology, monitoring, unlimited consumables and ongoing support."
        path="/pricing"
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-secondary section-padding-hero">
          <div className="container mx-auto">
            <AmoulImporterChip />
            <h1 className="text-2xl sm:text-3xl md:text-5xl text-secondary-foreground mb-3 sm:mb-4">
              Simple, transparent <span className="text-accent">pricing</span>
            </h1>
            <p className="text-base sm:text-lg text-secondary-foreground/70 max-w-2xl">
              One managed service that keeps your AED ready every day — connected technology,
              monitoring, unlimited consumables and Irish-based support, all included.
            </p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-6">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative clinical-card p-8 flex flex-col ${
                    plan.highlight ? "border-2 border-accent shadow-lg" : ""
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h2 className="font-heading font-extrabold text-2xl text-foreground mb-2">{plan.name}</h2>
                  <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading font-extrabold text-4xl text-foreground">{plan.monthly}</span>
                      <span className="text-sm text-muted-foreground">/ month</span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="font-heading font-bold text-xl text-primary">{plan.upfront}</span>
                      <span className="text-sm text-muted-foreground">upfront**</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {features.map((f) => {
                      const included = f[plan.key];
                      return (
                        <li key={f.label} className={`flex items-start gap-3 text-sm ${included ? "text-card-foreground" : "text-muted-foreground/50"}`}>
                          <span className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mt-0.5 ${included ? "bg-accent/20" : "bg-muted"}`}>
                            {included ? (
                              <Check className="h-3 w-3 text-accent-foreground" strokeWidth={3} />
                            ) : (
                              <Minus className="h-3 w-3 text-muted-foreground" />
                            )}
                          </span>
                          {f.label}
                        </li>
                      );
                    })}
                  </ul>

                  <Button asChild size="lg" className={plan.highlight ? "bg-accent text-accent-foreground hover:bg-accent/90 font-bold" : "bg-primary text-primary-foreground hover:bg-red-deep"}>
                    <Link to="/quote">Get Started</Link>
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 clinical-card p-6 text-center">
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">Multi-site, training & Heart Safe programmes</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Multi-site deployments (3+ units), training packages and the Heart Safe Team Programme are
                priced on application. Tell us about your organisation and we'll tailor a quote.
              </p>
              <Button asChild variant="outline">
                <Link to="/quote">Request a tailored quote</Link>
              </Button>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <SiteFooter />
    </div>
  );
}
