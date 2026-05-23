import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import AmoulImporterChip from "@/components/AmoulImporterChip";
import SiteFooter from "@/components/SiteFooter";
import CTABanner from "@/components/CTABanner";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = ["Plan 1", "Plan 2", "Plan 3", "POA"] as const;

const matrix: { feature: string; included: boolean[] }[] = [
  { feature: "Monthly readiness report", included: [true, true, true, true] },
  { feature: "Expiry dates tracking", included: [true, true, true, true] },
  { feature: "Responder cert expiry dates", included: [true, true, true, true] },
  { feature: "Free replacement AED in case of failure", included: [true, true, true, true] },
  { feature: "All-you-can-eat consumables", included: [false, true, true, true] },
  { feature: "Annual check", included: [false, false, true, true] },
  { feature: "Bi-annual training", included: [false, false, false, true] },
];

export default function ServicingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="AED Servicing & Maintenance Plans — Smart Defibs Ireland"
        description="AED maintenance plans with monthly readiness reports, consumables, annual checks and free replacement on failure. Keep your defibrillator rescue-ready."
        path="/servicing"
        jsonLd={{ "@context": "https://schema.org", "@type": "Service", serviceType: "AED Maintenance and Servicing", provider: { "@type": "Organization", name: "Smart Defibs LTD" }, areaServed: "IE" }}
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-secondary section-padding-hero">
          <div className="container mx-auto">
            <AmoulImporterChip />
            <h1 className="text-2xl sm:text-3xl md:text-5xl text-secondary-foreground mb-3 sm:mb-4">Servicing & Maintenance</h1>
            <p className="text-base sm:text-lg text-secondary-foreground/70 max-w-2xl">
              Choose the level of cover that suits your site. HIQA & HSA compliance documentation included across all plans.
            </p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="clinical-card overflow-hidden"
            >
              {/* Desktop / tablet table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-4 lg:p-5 font-heading font-extrabold text-foreground text-sm uppercase tracking-wider">
                        Servicing
                      </th>
                      {plans.map((p) => (
                        <th
                          key={p}
                          className="p-4 lg:p-5 text-center font-heading font-extrabold text-foreground text-sm uppercase tracking-wider w-24"
                        >
                          {p}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.map((row, idx) => (
                      <tr
                        key={row.feature}
                        className={`border-b border-border/60 ${idx % 2 === 1 ? "bg-muted/40" : ""}`}
                      >
                        <td className="p-4 lg:p-5 text-sm lg:text-base text-foreground font-medium">
                          {row.feature}
                        </td>
                        {row.included.map((on, i) => (
                          <td key={i} className="p-4 lg:p-5 text-center">
                            <span
                              className={`inline-flex items-center justify-center h-7 w-7 rounded-md border ${
                                on
                                  ? "bg-primary border-primary text-primary-foreground"
                                  : "bg-background border-border"
                              }`}
                              aria-label={on ? "Included" : "Not included"}
                            >
                              {on && <Check className="h-4 w-4" strokeWidth={3} />}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile stacked view */}
              <div className="sm:hidden divide-y divide-border">
                {plans.map((p, planIdx) => (
                  <div key={p} className="p-5">
                    <h3 className="font-heading font-extrabold text-foreground text-base uppercase tracking-wider mb-3">
                      {p}
                    </h3>
                    <ul className="space-y-2">
                      {matrix.map((row) => (
                        <li
                          key={row.feature}
                          className={`flex items-start gap-3 text-sm ${
                            row.included[planIdx] ? "text-foreground" : "text-muted-foreground/60"
                          }`}
                        >
                          <span
                            className={`mt-0.5 inline-flex items-center justify-center h-5 w-5 rounded-md border shrink-0 ${
                              row.included[planIdx]
                                ? "bg-primary border-primary text-primary-foreground"
                                : "bg-background border-border"
                            }`}
                          >
                            {row.included[planIdx] && <Check className="h-3 w-3" strokeWidth={3} />}
                          </span>
                          {row.feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Contact us for a tailored quote based on your number of sites and devices.
            </p>
          </div>
        </section>

        <CTABanner />
      </main>
      <SiteFooter />
    </div>
  );
}
