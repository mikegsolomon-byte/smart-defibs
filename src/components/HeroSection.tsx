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
        className="absolute inset-0 w-full h-full object-cover object-[95%_center] opacity-70 pointer-events-none select-none"
      />
      {/* Readability overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--red-brand)/0.10),_transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent,_hsl(var(--background)))] pointer-events-none" />

      {/* Bookmark ribbon — top right */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
        className="absolute top-0 right-2 sm:right-8 lg:right-16 z-20"
      >
        <div className="relative bg-gradient-to-b from-primary to-red-deep text-primary-foreground shadow-2xl shadow-primary/30 pl-2 pr-2.5 sm:pl-4 sm:pr-5 pt-2 pb-3 sm:pt-3 sm:pb-6">
          {/* Ribbon V-cut at bottom */}
          <div
            className="absolute -bottom-px left-0 right-0 h-2 sm:h-3 bg-background"
            style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
          />
          <div className="flex items-center gap-1.5 sm:gap-3 relative z-10">
            <div className="bg-white rounded p-0.5 sm:p-1 shadow-sm shrink-0">
              <img src={amoulLogo} alt="Amoul" className="h-4 sm:h-6 w-auto" />
            </div>
            <div className="leading-tight">
              <div className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] opacity-90">
                Official Irish
              </div>
              <div className="text-[10px] sm:text-sm font-extrabold uppercase tracking-wide sm:tracking-wider">
                Importer
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative container mx-auto px-4 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 max-w-2xl"
          >

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
