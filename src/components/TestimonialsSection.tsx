import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Peace of mind that your defibrillator is always in good working condition and ready to use. That is the single biggest benefit our team has seen from remote monitoring.",
    name: "Tom Garvey",
    role: "Kilbride Defibrillator Group",
    initials: "TG",
  },
  {
    quote:
      "I would definitely recommend it to all groups buying new units. For a minimal cost it's reassuring to know that your defibs are being monitored regularly by professionals who notify you immediately in the event of a malfunction. In most cases they can also recommend a fix or replacement. A genuinely great service to have.",
    name: "Sandra Kenny",
    role: "Roscommon Rapid Response",
    initials: "SK",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="px-4 sm:px-8 lg:px-8 py-8 sm:py-10 lg:py-16 bg-muted/50 border-y border-border">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] bg-accent text-accent-foreground px-3 py-1 rounded-full mb-2">
            Testimonials
          </span>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Trusted by communities across Ireland
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="clinical-card p-6 md:p-8 relative text-center flex flex-col"
            >
              <Quote className="h-8 w-8 text-primary/15 mx-auto mb-4" />
              <p className="font-heading text-base md:text-lg leading-relaxed text-foreground mb-5 flex-1">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-heading font-extrabold flex-shrink-0">
                  {testimonial.initials}
                </div>
                <div className="text-left">
                  <p className="font-heading font-bold text-sm text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}


