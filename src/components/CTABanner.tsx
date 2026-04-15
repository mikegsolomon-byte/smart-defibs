import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-teal to-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--teal-light)/0.3),_transparent_70%)]" />

      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4">
            Ready to protect your community?
          </h2>
          <p className="text-primary-foreground/80 mb-10 max-w-md mx-auto text-lg">
            Get a free, no-obligation quote tailored to your sector. We respond within 4 business hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-navy-light text-base px-8 btn-micro shadow-lg">
              <Link to="/quote">Get a Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 btn-micro backdrop-blur-sm">
              <a href="tel:01234567">
                <Phone className="mr-2 h-4 w-4" /> Call Us
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
