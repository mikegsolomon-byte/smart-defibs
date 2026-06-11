import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAedWall from "@/assets/hero-aed-wall.jpg";
import AmoulImporterChip from "@/components/AmoulImporterChip";



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

      {/* Credential badge — top right */}
      <AmoulImporterChip />

      <div className="relative container mx-auto px-4 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20 py-[40px]">
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
              Defibrillators AED with <span className="relative inline-block"><span className="relative z-10">Remote Monitoring</span><span aria-hidden className="absolute left-0 right-0 bottom-1 h-3 bg-accent/70 -z-0 rounded-sm" /></span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Defibrillators, training and ongoing servicing for community groups, workplaces, nursing homes and schools across Ireland.
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
