import { Award, ShieldCheck, Truck, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import amoulLogo from "@/assets/amoul-logo.png";
import amoulI3 from "@/assets/amoul-i3.jpg";

const points = [
  { icon: ShieldCheck, text: "Direct manufacturer warranty" },
  { icon: Truck, text: "Genuine pads & batteries in stock" },
  { icon: Wrench, text: "PHECC-aligned training & servicing" },
];

export default function AmoulPartnerBanner() {
  return (
    <section className="section-padding bg-surface-soft">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden grid lg:grid-cols-2"
        >
          <div className="relative bg-gradient-to-br from-muted to-background p-8 lg:p-12 flex items-center justify-center min-h-[280px]">
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
              <Award className="h-3.5 w-3.5" />
              Official Irish Importer
            </div>
            <img src={amoulI3} alt="Amoul i3 AED" className="max-h-[260px] w-auto object-contain drop-shadow-2xl" />
          </div>

          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <img src={amoulLogo} alt="Amoul Medical" className="h-9 w-auto mb-5" />
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-card-foreground mb-3">
              Ireland's official partner for Amoul® AEDs
            </h2>
            <p className="text-base text-muted-foreground mb-6">
              Smart Defibs LTD is the sole Irish representative and importer of Amoul® Medical defibrillators — supplying schools, nursing homes, workplaces and communities nationwide with EMS-trusted, CE-marked devices.
            </p>
            <ul className="space-y-3 mb-8">
              {points.map((p) => (
                <li key={p.text} className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <p.icon className="h-4 w-4 text-primary" />
                  </span>
                  <span className="text-sm font-semibold text-card-foreground">{p.text}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-red-deep btn-micro shadow-md">
                <Link to="/products">View the Amoul i3</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/quote">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
