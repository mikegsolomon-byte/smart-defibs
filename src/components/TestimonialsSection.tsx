import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Peace of mind that your defibrillator is always in good working condition and ready to use. That is the single biggest benefit our team has seen from remote monitoring.",
    name: "Tom Garvey",
    role: "Kilbride Defibrillator Group",
    sector: "Community",
    initials: "TG",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="px-4 sm:px-8 lg:px-8 py-6 sm:py-8 lg:py-12 bg-muted/50 border-y border-border">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] bg-accent text-accent-foreground px-3 py-1 rounded-full mb-3">Testimonials</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Trusted by organisations across Ireland
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="clinical-card p-10 md:p-12 relative text-center"
            >
              <Quote className="h-12 w-12 text-primary/15 mx-auto mb-6" />
              <p className="font-heading text-xl md:text-2xl leading-relaxed text-foreground mb-8">
                "{testimonials[0].quote}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-heading font-extrabold flex-shrink-0">
                  {testimonials[0].initials}
                </div>
                <div className="text-left">
                  <p className="font-heading font-bold text-foreground">{testimonials[0].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[0].role}</p>
                </div>
              </div>
            </motion.blockquote>
        </div>
        {/* legacy grid removed */}
        <div className="hidden">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="clinical-card p-8 relative group"
            >
              <Quote className="h-10 w-10 text-primary/15 absolute top-6 right-6 group-hover:text-primary/30 transition-colors" />
              <p className="text-foreground/80 mb-8 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-heading font-extrabold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <span className="inline-block mt-5 text-xs font-bold uppercase tracking-wider bg-red-soft text-primary px-3 py-1 rounded-full">
                {t.sector}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
