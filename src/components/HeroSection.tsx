import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAedWall from "@/assets/hero-aed-wall.jpg";
import amoulLogo from "@/assets/amoul-logo.png";


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
      {/* Background hero image */}
      <img
        src={heroAedWall}
        alt="AED defibrillator cabinet mounted on a building wall"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover object-[95%_center] opacity-95 pointer-events-none select-none"
      />
      {/* Readability overlays — lightened so the AED stays visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/92 via-background/55 to-background/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--red-brand)/0.10),_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent_60%,_hsl(var(--background)))] pointer-events-none" />

      {/* Amoul corner ribbon — "dog-ear" badge on hero image */}
      <div className="hidden md:block absolute top-0 right-0 z-20 pointer-events-none">
        <div className="relative">
          <div className="bg-primary text-primary-foreground shadow-xl shadow-primary/30 pl-6 pr-5 py-3 flex items-center gap-2.5 rounded-bl-2xl border-l-2 border-b-2 border-white/20">
            <img src={amoulLogo} alt="Amoul" className="h-7 w-auto bg-white rounded-sm px-1 py-0.5" />
            <div className="leading-tight">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-90">Official Irish Importer</p>
              <p className="text-sm font-extrabold font-heading">Amoul® Medical</p>
            </div>
          </div>
          <div className="absolute -bottom-2 right-2 h-2 w-24 bg-black/20 blur-md rounded-full" />
        </div>
      </div>


      <div className="relative container mx-auto px-4 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 max-w-2xl"
          >
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 bg-card text-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-border shadow-sm">
                <img src={amoulLogo} alt="Amoul" className="h-4 w-auto" />
                Official Irish Importer
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
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
