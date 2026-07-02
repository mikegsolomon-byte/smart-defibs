import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import AmoulImporterChip from "@/components/AmoulImporterChip";
import SiteFooter from "@/components/SiteFooter";
import CTABanner from "@/components/CTABanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck, HeartPulse, Stethoscope, Check, Baby, Syringe, Cross, Award, Activity } from "lucide-react";
import { motion } from "framer-motion";

const heartSafeIncludes = [
  "OHCA Readiness Assessment",
  "AED Readiness Service (Tier 2 or Tier 3)",
  "CFR Training for designated responders",
  "CPR & AED Awareness for all staff",
  "Heart Safe Team Champion support",
  "Emergency response planning",
  "Regular drills and refresher sessions",
  "Internal communication resources",
  "Heart Safe Team Recognition Pack",
  "Annual programme review",
  "2-Year Heart Safe Team Certification",
];

const courses = [
  {
    icon: HeartPulse,
    title: "Cardiac First Responder (CFR) Training",
    desc: "Equips individuals with the essential skills to recognise cardiac arrest, perform high-quality CPR and use an AED confidently in the critical first minutes of an emergency. Delivered in line with PHECC CFR standards, it prepares responders to act quickly and effectively until emergency services arrive — helping to improve survival outcomes through early intervention.",
    tags: ["PHECC CFR"],
  },
  {
    icon: Stethoscope,
    title: "First Aid Response (FAR)",
    desc: "Comprehensive workplace first aid training delivered in accordance with PHECC FAR standards and supporting Health and Safety Authority (HSA) requirements for occupational first aid. The course prepares participants to respond to a wide range of medical emergencies — including cardiac arrest, trauma and other life-threatening conditions — and supports emergency preparedness within healthcare and care environments, including nursing homes, where appropriate.",
    tags: ["PHECC FAR", "HSA Aligned"],
  },
];

const courseTiles = [
  { icon: HeartPulse, title: "CFR", desc: "Cardiac First Responder" },
  { icon: Activity, title: "CFR-A", desc: "Cardiac First Responder — Advanced" },
  { icon: Stethoscope, title: "FAR", desc: "First Aid Response" },
  { icon: Cross, title: "Emergency First Aid", desc: "Emergency First Aid at work" },
  { icon: Baby, title: "Paediatric First Aid", desc: "First aid for infants & children" },
  { icon: Syringe, title: "Anaphylaxis — EpiPen", desc: "EpiPen management & administration" },
  { icon: Award, title: "EFR", desc: "Emergency First Response" },
];

export default function TrainingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Training & Awareness — Heart Safe Team, CFR & FAR | Smart Defibs"
        description="PHECC-aligned training and awareness from Smart Defibs: the Heart Safe Team Programme, Cardiac First Responder (CFR) and First Aid Response (FAR) courses for organisations across Ireland."
        path="/training"
        jsonLd={{ "@context": "https://schema.org", "@type": "Service", serviceType: "CPR and AED Training", provider: { "@type": "Organization", name: "Smart Defibs LTD" }, areaServed: "IE" }}
      />
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-secondary section-padding-hero">
          <div className="container mx-auto">
            <AmoulImporterChip />
            <h1 className="text-2xl sm:text-3xl md:text-5xl text-secondary-foreground mb-3 sm:mb-4">Training & Awareness</h1>
            <p className="text-base sm:text-lg text-secondary-foreground/70 max-w-2xl">
              Build a team ready to respond — through structured programmes, certified training and a lasting culture of emergency preparedness.
            </p>
          </div>
        </section>

        {/* Heart Safe Team Programme */}
        <section className="section-padding bg-background">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="clinical-card p-8 lg:p-10"
            >
              <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
                <ShieldCheck className="h-3.5 w-3.5" /> Flagship Programme
              </span>
              <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2">Heart Safe Team Programme</h2>
              <p className="text-primary font-semibold mb-4">Build a team ready to respond.</p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Heart Safe Team Programme is a service that helps organisations develop a confident, coordinated response to out-of-hospital cardiac arrest (OHCA). Combining training, AED readiness, emergency planning and ongoing support, it creates a lasting culture of emergency preparedness.
              </p>

              <h3 className="font-heading font-bold text-lg text-foreground mb-3">Includes</h3>
              <ul className="grid sm:grid-cols-2 gap-2.5 mb-6">
                {heartSafeIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-card-foreground">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-accent-foreground" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-muted-foreground leading-relaxed mb-4">
                The Heart Safe Team Programme enhances your organisation's reputation by demonstrating a clear commitment to saving lives and community safety, improving public trust, visibility and local PR. It also strengthens staff morale, engagement and retention by involving teams in meaningful, life-saving activity and training.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Beyond internal benefits, it positions your organisation as an active community asset, supporting CSR goals and creating valuable marketing and recognition opportunities.
              </p>

              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-red-deep">
                <Link to="/quote">Enquire about the programme</Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CFR + FAR */}
        <section className="section-padding bg-surface-soft">
          <div className="container mx-auto max-w-4xl">
            <div className="space-y-6">
              {courses.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-8 flex flex-col md:flex-row gap-6 items-start"
                >
                  <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                    <c.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-xl text-card-foreground mb-2">{c.title}</h3>
                    <p className="text-muted-foreground mb-3 leading-relaxed">{c.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {c.tags.map((t) => (
                        <span key={t} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="shrink-0 bg-primary text-primary-foreground hover:bg-teal-light">
                    <Link to="/quote">Book Now</Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certified courses */}
        <section className="section-padding bg-background">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-foreground mb-2">Certified courses</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A full range of PHECC-aligned first aid and responder training, delivered on-site or at your premises.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {courseTiles.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="clinical-card p-5 flex flex-col items-start gap-3 h-full"
                >
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <c.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-base text-card-foreground leading-tight">{c.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
                  </div>
                  <Link to="/quote" className="text-sm font-semibold text-primary hover:underline focus-ring rounded">Book now</Link>
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
