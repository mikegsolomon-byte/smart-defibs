import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 5000, prefix: "~", suffix: "", label: "Cardiac arrests outside hospital in Ireland p.a." },
  { value: 75, prefix: "", suffix: "%", label: "Survival increase with AED in <5 minutes" },
  { value: 10, prefix: "", suffix: " min", label: "Average rural ambulance response time" },
  { value: null, display: "Legal", prefix: "", suffix: "", label: "HSA guidance on workplace AEDs" },
];

function AnimatedCounter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 1.5, ease: "easeOut" });
    }
  }, [isInView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function StatsSection() {
  return (
    <section className="bg-secondary section-padding relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-secondary-foreground mb-3">
            Why act now
          </h2>
          <p className="text-secondary-foreground/60 max-w-lg mx-auto">
            Every minute without an AED reduces survival chances by 10%
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-8 rounded-2xl bg-secondary-foreground/5 border border-secondary-foreground/10 backdrop-blur-sm hover-lift"
            >
              <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-3">
                {stat.value !== null ? (
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                ) : (
                  stat.display
                )}
              </p>
              <p className="text-sm text-secondary-foreground/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
