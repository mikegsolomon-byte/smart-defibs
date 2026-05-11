import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 lg:px-16 lg:py-20 shadow-xl shadow-primary/20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(0_0%_100%/0.15),_transparent_60%)]" />
          <div className="relative grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary-foreground font-extrabold tracking-tight mb-3">
                Ready to protect your community?
              </h2>
              <p className="text-primary-foreground/85 text-lg max-w-xl">
                Get a free, no-obligation quote tailored to your sector. We respond within 4 business hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-stretch">
              <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90 text-base px-8 btn-micro shadow-md">
                <Link to="/quote">
                  Get a Free Quote <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary text-base px-8 btn-micro">
                <a href="tel:+353894992903">
                  <Phone className="mr-2 h-4 w-4" /> Call Us
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
