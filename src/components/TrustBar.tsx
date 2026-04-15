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
    <section className="bg-card/80 backdrop-blur-sm border-y border-border/50">
      <div className="container mx-auto px-4 lg:px-8 py-5">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {badges.map((badge, i) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="trust-badge"
            >
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>{badge}</span>
              {i < badges.length - 1 && (
                <span className="hidden sm:inline ml-6 w-px h-4 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
