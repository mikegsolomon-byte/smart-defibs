import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "AED Ireland made the whole process seamless — from grant application to installation. Our school is now prepared for any emergency.",
    name: "Mary O'Brien",
    role: "School Principal, Co. Cork",
    sector: "Schools",
    initials: "MO",
  },
  {
    quote: "The HIQA compliance pack saved us weeks of paperwork. Their training was excellent and staff felt confident using the AED.",
    name: "Niall Murphy",
    role: "Nursing Home Manager, Co. Dublin",
    sector: "Nursing",
    initials: "NM",
  },
  {
    quote: "We equipped all 5 sites within a week. The multi-site managed plan gives us total peace of mind on H&S compliance.",
    name: "Sam Kelly",
    role: "H&S Manager, Cork",
    sector: "Workplace",
    initials: "SK",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl text-center mb-12"
        >
          Trusted by organisations across Ireland
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="glass-card p-8 relative hover-lift group"
            >
              <Quote className="h-10 w-10 text-primary/10 absolute top-6 right-6 group-hover:text-primary/20 transition-colors" />
              <p className="text-foreground/80 mb-8 leading-relaxed italic">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/15 text-primary flex items-center justify-center text-sm font-heading font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <span className="inline-block mt-4 text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                {t.sector}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
