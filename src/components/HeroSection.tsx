import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-community.jpg";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="AED on Irish sports field" className="w-full h-full object-cover" width={1920} height={1080} loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/50" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-primary/15 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-primary/20">
                <Shield className="h-3.5 w-3.5" />
                Ireland's Trusted AED Supplier
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-secondary-foreground leading-[1.08] mb-6 tracking-tight">
              Prepared communities{" "}
              <span className="text-primary">save lives</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg lg:text-xl text-secondary-foreground/75 mb-10 max-w-xl leading-relaxed">
              AEDs, training & maintenance for schools, workplaces, nursing homes & community groups across Ireland.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-teal-light text-base px-8 btn-micro">
                <Link to="/products">Shop AEDs</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 text-base px-8 btn-micro backdrop-blur-sm">
                <Link to="/quote">Get a Free Quote</Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-secondary-foreground/70 hover:text-primary btn-micro"
                onClick={() => document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth" })}
              >
                Find my sector <ArrowDown className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating trust card on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <div className="glass-card p-8 shadow-2xl">
              <h3 className="font-heading text-lg text-card-foreground mb-6">Why choose AED Ireland?</h3>
              <ul className="space-y-4">
                {[
                  "CE-marked defibrillators",
                  "PHECC-certified training",
                  "Next-day delivery nationwide",
                  "Ongoing maintenance plans",
                  "Grant application support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-card-foreground/80">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
