import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";


const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0, 0, 0.2, 1] as const } },
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface-soft">
      {/* Soft red wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--red-brand)/0.10),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent,_hsl(var(--background)))] pointer-events-none" />

      <div className="relative container mx-auto px-4 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 max-w-2xl"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-red-soft text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6 border border-primary/15">
                <ShieldCheck className="h-3.5 w-3.5" />
                Ireland's Trusted AED Supplier
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.05] mb-6 tracking-tight font-extrabold"
            >
              Every second counts.
              <br />
              <span className="text-primary">Be ready to save a life.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Defibrillators, training and ongoing servicing for schools, workplaces, nursing homes and community groups across Ireland.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-red-deep text-base px-8 btn-micro shadow-md shadow-primary/20">
                <Link to="/quote">
                  Get a Free Quote <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-foreground/40 text-foreground hover:bg-muted text-base px-8 btn-micro">
                <Link to="/products">Browse AEDs</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-foreground hover:text-primary btn-micro"
              >
                <a href="tel:+353894992903">
                  <Phone className="mr-1 h-4 w-4" /> +353 89 499 2903
                </a>
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["CE Marked", "PHECC Certified", "Next-day delivery", "Grant support"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
