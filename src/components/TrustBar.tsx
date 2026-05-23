import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  "CE Marked",
  "Irish Heart Foundation",
  "HSE Recommended",
  "PHECC Certified",
  "Next-Day Delivery IE",
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
              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
              <span>{badge}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
