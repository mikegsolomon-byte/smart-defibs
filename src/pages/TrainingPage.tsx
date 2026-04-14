import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CTABanner from "@/components/CTABanner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Users, Monitor, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const courses = [
  {
    icon: GraduationCap,
    title: "Onsite CPR / AED Awareness",
    desc: "Half-day · up to 12 staff · cert issued · PHECC aligned",
    personas: ["Schools", "Nursing", "Workplace"],
  },
  {
    icon: Users,
    title: "PHECC CFR Certification",
    desc: "Full CFR course · PHECC registered · renewal cycles · perfect for volunteer groups",
    personas: ["Community"],
  },
  {
    icon: Monitor,
    title: "Online Refresher",
    desc: "E-learning · staff self-service · certificate download · ideal for high-turnover settings",
    personas: ["Nursing", "Workplace"],
  },
];

export default function TrainingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-secondary section-padding pb-12">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl text-secondary-foreground mb-4">Training & Certification</h1>
            <p className="text-lg text-secondary-foreground/70 max-w-2xl">PHECC-aligned CPR/AED training courses for every sector — onsite, online, or certified CFR programmes.</p>
          </div>
        </section>

        <section className="section-padding bg-background">
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
                    <p className="text-muted-foreground mb-3">{c.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {c.personas.map((p) => (
                        <span key={p} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{p}</span>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="shrink-0 bg-primary text-primary-foreground hover:bg-teal-light">
                    <Link to="/quote">Book Now</Link>
                  </Button>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 bg-muted rounded-xl p-8 flex flex-col md:flex-row items-center gap-6">
              <Calendar className="h-10 w-10 text-primary shrink-0" />
              <div className="flex-1">
                <h3 className="font-heading font-bold text-xl mb-1">Book a Training Session</h3>
                <p className="text-muted-foreground">Choose your date, location, and staff count — we'll confirm same-day.</p>
              </div>
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-teal-light">
                <Link to="/quote">Request Training</Link>
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
