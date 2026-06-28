import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import AmoulImporterChip from "@/components/AmoulImporterChip";
import SiteFooter from "@/components/SiteFooter";
import CTABanner from "@/components/CTABanner";
import { motion } from "framer-motion";
import {
  HeartPulse,
  Radio,
  Bell,
  CalendarClock,
  Award,
  FileText,
  PackageCheck,
  LifeBuoy,
  Thermometer,
} from "lucide-react";

const services = [
  {
    icon: HeartPulse,
    title: "Defibrillator AED",
    desc: "A semi-automated external defibrillator with integrated 4G connectivity, enabling self-reporting to the Smart Defibs platform.",
  },
  {
    icon: Radio,
    title: "Remote Monitoring",
    desc: "Connectivity that allows AED status, alerts and readiness checks to be monitored remotely.",
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Email alerts if the AED is removed from its location, fails a self-test, has low battery, goes offline, or if pad or battery expiry dates are approaching.",
  },
  {
    icon: CalendarClock,
    title: "Expiry Date Tracking",
    desc: "Monitoring of defibrillator, electrode pad and battery expiry dates to ensure the AED remains ready for use.",
  },
  {
    icon: Award,
    title: "Certificate Date Tracking",
    desc: "Tracks staff and responder training certificates and provides visibility of upcoming expiry dates to support ongoing compliance.",
  },
  {
    icon: FileText,
    title: "Monthly Readiness Report",
    desc: "A detailed monthly report confirming AED readiness status.",
  },
  {
    icon: PackageCheck,
    title: "Consumables",
    desc: "Full management and replacement support for defibrillator pads and batteries when required, ensuring the AED remains continuously ready for use.",
  },
  {
    icon: LifeBuoy,
    title: "Post-Event Support",
    desc: "Support following AED use, including battery status checks and consumable replacement. Event summary and ECG data provision on request.",
  },
  {
    icon: Thermometer,
    title: "Environmental Monitoring",
    desc: "Continuously monitors temperature, humidity and AED movement, sending alerts if environmental conditions exceed manufacturer limits or if the AED is moved.",
  },
];

export default function ServicingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="AED Lifecycle Management — Smart Defibs Ireland"
        description="A fully managed AED service combining connected technology, remote monitoring, compliance management and ongoing support — keeping your defibrillator ready, compliant and operational every day."
        path="/servicing"
        jsonLd={{ "@context": "https://schema.org", "@type": "Service", serviceType: "AED Lifecycle Management", provider: { "@type": "Organization", name: "Smart Defibs LTD" }, areaServed: "IE" }}
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-secondary section-padding-hero">
          <div className="container mx-auto">
            <AmoulImporterChip />
            <h1 className="text-2xl sm:text-3xl md:text-5xl text-secondary-foreground mb-3 sm:mb-4">
              AED Lifecycle Management Service
            </h1>
            <p className="text-base sm:text-lg text-secondary-foreground/80 max-w-2xl mb-3">
              We keep your AED ready, compliant and operational — every day.
            </p>
            <p className="text-sm sm:text-base text-secondary-foreground/70 max-w-2xl">
              A fully managed service combining connected AED technology, remote monitoring, compliance management and ongoing support to ensure your defibrillator is always ready when it is needed most.
            </p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container mx-auto max-w-5xl">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="clinical-card p-6 hover:border-accent transition-colors"
                >
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-card-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="font-heading font-extrabold text-2xl md:text-3xl text-foreground">
                One service. Complete AED readiness management.
              </p>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <SiteFooter />
    </div>
  );
}
