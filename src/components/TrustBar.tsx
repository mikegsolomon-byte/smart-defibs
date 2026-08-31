import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  "Exclusive Amoul® Partner",
  "CE Marked",
  "PHECC Certified Training",
  "IHF Certified Training",
  "HSA Certified Training",
  "Speedy Delivery",
];

export default function TrustBar() {
  return (
    <section className="bg-muted border-y border-border">
      <div className="container mx-auto px-4 lg:px-8 py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {badges.map((badge, i) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="flex items-center gap-2 text-sm font-semibold text-foreground/70"
            >
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-accent flex-shrink-0"><CheckCircle className="h-3.5 w-3.5 text-accent-foreground" strokeWidth={3} /></span>
              <span>{badge}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
