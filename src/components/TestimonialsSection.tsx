import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "AED Ireland made the whole process seamless — from grant application to installation. Our school is now prepared for any emergency.",
    name: "Mary O'Brien",
    role: "School Principal, Co. Cork",
    sector: "Schools",
  },
  {
    quote: "The HIQA compliance pack saved us weeks of paperwork. Their training was excellent and staff felt confident using the AED.",
    name: "Niall Murphy",
    role: "Nursing Home Manager, Co. Dublin",
    sector: "Nursing",
  },
  {
    quote: "We equipped all 5 sites within a week. The multi-site managed plan gives us total peace of mind on H&S compliance.",
    name: "Sam Kelly",
    role: "H&S Manager, Cork",
    sector: "Workplace",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-center mb-12">
          Trusted by organisations across Ireland
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-card rounded-xl p-8 border border-border relative"
            >
              <Quote className="h-8 w-8 text-primary/20 absolute top-6 right-6" />
              <p className="text-foreground/80 mb-6 leading-relaxed italic">"{t.quote}"</p>
              <div>
                <p className="font-heading font-semibold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
                <span className="inline-block mt-2 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {t.sector}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
