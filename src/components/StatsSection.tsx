import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 2900, prefix: "~", suffix: "", label: "OHCA cases attended outside hospital in Ireland (OHCAR 2024)" },
  { value: 70, prefix: "Up to ", suffix: "%", label: "Survival when defibrillation occurs within 3–5 minutes (ERC 2021)" },
  { value: 26, prefix: "", suffix: " min", label: "National average response for Cat. 1 life-threatening calls (NAS, 2022)" },
  { value: null, display: "Best practice", prefix: "", suffix: "", label: "HSA guidance recommends AEDs in workplaces (Section 1.10)" },
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--primary)/0.15),_transparent_60%)] pointer-events-none" />

      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-red-bright mb-3">The facts</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-secondary-foreground mb-3 font-extrabold tracking-tight">
            Why act now
          </h2>
          <p className="text-secondary-foreground/80 max-w-lg mx-auto">
            Every minute without CPR and AED reduces survival chances by 10%
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-center p-6 md:p-8 rounded-2xl bg-secondary-foreground/[0.04] border border-secondary-foreground/10 hover:border-primary/40 transition-colors"
            >
              <p className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-red-bright mb-3">
                {stat.value !== null ? (
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                ) : (
                  stat.display
                )}
              </p>
              <p className="text-sm text-secondary-foreground/85">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
