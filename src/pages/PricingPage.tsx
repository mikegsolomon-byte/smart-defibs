import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import AmoulImporterChip from "@/components/AmoulImporterChip";
import SiteFooter from "@/components/SiteFooter";
import CTABanner from "@/components/CTABanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Minus } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Indoor Defibrillator Package",
    monthly: "€39",
    yearly: "€429",
    desc: "Your defibrillator, indoor cabinet, pads and consumables — fully supplied and monitored, ready to use in sheltered indoor locations.",
    highlight: false,
    key: "indoor" as const,
  },
  {
    name: "Outdoor Defibrillator Package",
    monthly: "€49",
    yearly: "€539",
    desc: "Your defibrillator, plus a heated, weatherproof outdoor cabinet with climate monitoring — built for exposed, all-weather locations.",
    highlight: true,
    key: "outdoor" as const,
  },
];

type Cell = boolean | string;

const matrix: {
  group: string;
  rows: { label: string; indoor: Cell; outdoor: Cell; note: string }[];
}[] = [
  {
    group: "Hardware",
    rows: [
      { label: "AED unit (Amoul)", indoor: true, outdoor: true, note: "Device remains supplier property during term" },
      { label: "Cabinet", indoor: "Indoor wall cabinet", outdoor: "Heated outdoor cabinet", note: "Outdoor incl. thermostat-controlled heating" },
      { label: "Environmental sensor", indoor: false, outdoor: true, note: "Temp/humidity monitoring of cabinet" },
    ],
  },
  {
    group: "Monitoring & Reporting",
    rows: [
      { label: "Defib monitoring", indoor: true, outdoor: true, note: "Device readiness status" },
      { label: "Alerts (device)", indoor: true, outdoor: true, note: "Fault / readiness alerts" },
      { label: "Expiry date tracking — consumables", indoor: true, outdoor: true, note: "Pads & battery expiry" },
      { label: "Expiry date tracking — certs", indoor: true, outdoor: true, note: "Responder cert renewals" },
      { label: "Monthly readiness report", indoor: true, outdoor: true, note: "Compliance/audit trail" },
      { label: "Environmental alerts", indoor: false, outdoor: true, note: "Out-of-range temp/humidity alerts" },
      { label: "Environmental monthly report", indoor: false, outdoor: true, note: "Cabinet climate log" },
    ],
  },
  {
    group: "Consumables & Events",
    rows: [
      { label: "All-Inclusive Consumables (FUP)", indoor: true, outdoor: true, note: "Scheduled expiry + genuine rescue use only" },
      { label: "Post-event consumable replacement", indoor: true, outdoor: true, note: "Pads/battery replaced after deployment" },
      { label: "Post-event readiness report", indoor: true, outdoor: true, note: "Unit re-certified ready" },
      { label: "Post-event report (Device log & ECG)", indoor: true, outdoor: true, note: "GDPR-compliant handling — see contract" },
    ],
  },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="inline-flex h-5 w-5 rounded-full bg-accent/20 items-center justify-center">
        <Check className="h-3 w-3 text-accent-foreground" strokeWidth={3} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-5 w-5 rounded-full bg-muted items-center justify-center">
        <Minus className="h-3 w-3 text-muted-foreground" />
      </span>
    );
  }
  return <span className="text-xs sm:text-sm text-card-foreground">{value}</span>;
}

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Pricing — AED Subscription Plans | Smart Defibs Ireland"
        description="Simple AED subscription plans from Smart Defibs. Indoor from €39/mo, Outdoor from €49/mo — connected AED, monitoring, all-inclusive consumables and Irish-based support included."
        path="/pricing"
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-secondary section-padding-hero">
          <div className="container mx-auto">
            <AmoulImporterChip />
            <h1 className="text-2xl sm:text-3xl md:text-5xl text-secondary-foreground mb-3 sm:mb-4">
              Own a defibrillator, the easy way
            </h1>
            <p className="text-base sm:text-lg text-secondary-foreground/70 max-w-2xl">
              Every plan includes your defibrillator, cabinet, pads and full remote monitoring — one easy monthly payment, no upfront cost, and nothing for you to manage.
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

                  <div className="mb-2">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading font-extrabold text-4xl text-foreground">{plan.monthly}</span>
                      <span className="text-sm text-muted-foreground">/ month</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-heading font-bold text-xl text-primary">{plan.yearly}</span>
                      <span className="text-sm text-muted-foreground">/ year</span>
                      <span className="bg-accent/20 text-primary text-xs font-semibold px-2 py-0.5 rounded-full">
                        1 month free
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    <Button asChild size="lg" className={`w-full ${plan.highlight ? "bg-accent text-accent-foreground hover:bg-accent/90 font-bold" : "bg-primary text-primary-foreground hover:bg-red-deep"}`}>
                      <Link to="/quote">Get Started</Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Perks matrix */}
            <div className="mt-12 clinical-card overflow-hidden">
              <div className="grid grid-cols-[1.6fr_0.7fr_0.7fr] sm:grid-cols-[2fr_1fr_1fr] bg-secondary text-secondary-foreground">
                <div className="p-4 font-heading font-bold text-sm sm:text-base">Perks Matrix</div>
                <div className="p-4 text-center font-heading font-bold text-sm sm:text-base">Indoor</div>
                <div className="p-4 text-center font-heading font-bold text-sm sm:text-base">Outdoor</div>
              </div>

              {matrix.map((section) => (
                <div key={section.group}>
                  <div className="bg-muted/60 px-4 py-2 font-heading font-bold text-xs uppercase tracking-wider text-foreground">
                    {section.group}
                  </div>
                  {section.rows.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-[1.6fr_0.7fr_0.7fr] sm:grid-cols-[2fr_1fr_1fr] border-t border-border items-center"
                    >
                      <div className="p-4">
                        <p className="text-sm text-card-foreground font-medium">{row.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{row.note}</p>
                      </div>
                      <div className="p-4 flex justify-center text-center">
                        <CellValue value={row.indoor} />
                      </div>
                      <div className="p-4 flex justify-center text-center">
                        <CellValue value={row.outdoor} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Fair Usage Policy</p>
              <p>
                Covers scheduled expiry replacements and genuine deployment/rescue use. Excludes loss,
                theft, vandalism, tampering and training use. Training consumables available at list price.
              </p>
              <p>Device remains supplier property during the subscription term.</p>
            </div>

          </div>
        </section>

        <CTABanner />
      </main>
      <SiteFooter />
    </div>
  );
}
