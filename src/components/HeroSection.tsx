import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-community.jpg";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="AED on Irish sports field" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">
            Ireland's Trusted AED Supplier
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-secondary-foreground leading-tight mb-6">
            Prepared communities{" "}
            <span className="text-primary">save lives</span>
          </h1>
          <p className="text-lg text-secondary-foreground/80 mb-8 max-w-xl leading-relaxed">
            AEDs, training & maintenance for schools, workplaces, nursing homes & community groups across Ireland.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-teal-light text-base px-8">
              <Link to="/products">Shop AEDs</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-base px-8">
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-secondary-foreground/80 hover:text-primary"
              onClick={() => document.getElementById("sectors")?.scrollIntoView({ behavior: "smooth" })}
            >
              Find my sector <ArrowDown className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
