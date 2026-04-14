import { motion } from "framer-motion";

const stats = [
  { value: "~5,000", label: "Cardiac arrests outside hospital in Ireland p.a." },
  { value: "75%", label: "Survival increase with AED in <5 minutes" },
  { value: "10 min", label: "Average rural ambulance response time" },
  { value: "Legal", label: "HSA guidance on workplace AEDs" },
];

export default function StatsSection() {
  return (
    <section className="bg-secondary section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-center text-secondary-foreground mb-3">
          Why act now
        </h2>
        <p className="text-center text-secondary-foreground/60 mb-12 max-w-lg mx-auto">
          Every minute without an AED reduces survival chances by 10%
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center p-6 rounded-xl bg-secondary-foreground/5 border border-secondary-foreground/10"
            >
              <p className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-secondary-foreground/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
