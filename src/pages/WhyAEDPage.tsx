import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CTABanner from "@/components/CTABanner";
import StatsSection from "@/components/StatsSection";
import { motion } from "framer-motion";
import { Heart, AlertTriangle, Scale, Clock } from "lucide-react";

const reasons = [
  {
    icon: AlertTriangle,
    title: "Sudden Cardiac Arrest Is Unpredictable",
    desc: "Around 2,900 out-of-hospital cardiac arrests are attended by EMS in Ireland each year (OHCAR 2024). SCA can happen to anyone, anywhere, at any age.",
  },
  {
    icon: Clock,
    title: "Every Minute Counts",
    desc: "For every minute without defibrillation, survival chances drop by up to 10%. The national average response for life-threatening (Cat. 1) calls exceeds 20 minutes.",
  },
  {
    icon: Heart,
    title: "AEDs Save Lives",
    desc: "When defibrillation occurs within 3–5 minutes of collapse, survival rates of 50–70% have been documented in witnessed cases (ERC 2021). AEDs are designed for use by anyone.",
  },
  {
    icon: Scale,
    title: "Compliance & Legal Guidance",
    desc: "HSA guidance (Section 1.10) recommends AEDs wherever a workplace first-aider is in place. HIQA standards expect documented emergency response arrangements in care settings.",
  },
];

export default function WhyAEDPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-secondary section-padding pb-12">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl text-secondary-foreground mb-4">Why an AED?</h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl">Understanding why automated external defibrillators are essential for your organisation.</p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              {reasons.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-8"
                >
                  <div className="p-3 rounded-lg bg-primary/10 inline-flex mb-4">
                    <r.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-card-foreground mb-3">{r.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{r.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <StatsSection />
        <CTABanner />
      </main>
      <SiteFooter />
    </div>
  );
}
