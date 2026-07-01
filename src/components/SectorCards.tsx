import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { School, Users, Stethoscope, Shield, Dumbbell, ArrowRight } from "lucide-react";

const sectors = [
  {
    icon: Users,
    title: "CFR Group",
    description: "Responder kits & community AEDs",
    color: "border-sector-community",
    bgColor: "bg-sector-community/10",
    iconColor: "text-sector-community",
    slug: "community",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    description: "HIQA-compliant AEDs & training",
    color: "border-sector-nursing",
    bgColor: "bg-sector-nursing/10",
    iconColor: "text-sector-nursing",
    slug: "nursing",
  },
  {
    icon: Shield,
    title: "Workplace",
    description: "H&S compliance, multi-site bundles",
    color: "border-sector-workplace",
    bgColor: "bg-sector-workplace/10",
    iconColor: "text-sector-workplace",
    slug: "workplace",
  },
  {
    icon: School,
    title: "School or Crèche",
    description: "Grants, installation, AED for Schools programme",
    color: "border-sector-schools",
    bgColor: "bg-sector-schools/10",
    iconColor: "text-sector-schools",
    slug: "schools",
  },
  {
    icon: Dumbbell,
    title: "Gym or Fitness Facility",
    description: "Member safety, insurance & staff training",
    color: "border-sector-gyms",
    bgColor: "bg-sector-gyms/10",
    iconColor: "text-sector-gyms",
    slug: "gyms",
  },
];

export default function SectorCards() {
  return (
    <section id="sectors" className="px-4 sm:px-8 lg:px-8 py-6 lg:py-14 bg-background sm:py-[30px]">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] bg-accent text-accent-foreground px-3 py-1 rounded-full mb-3">Sectors</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-3 font-extrabold tracking-tight">Solutions for every sector</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Select your sector and we'll guide you to the right AED solution
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                to={`/sectors?tab=${sector.slug}`}
                className="group relative block rounded-2xl p-8 focus-ring h-full overflow-hidden bg-card border-2 border-border hover:border-accent shadow-md hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative">
                  <div className="inline-flex p-4 rounded-xl bg-primary mb-6 shadow-lg shadow-primary/30 ring-4 ring-accent/30 group-hover:bg-accent group-hover:ring-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <sector.icon className="h-7 w-7 text-primary-foreground group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl mb-2 text-card-foreground tracking-tight">
                    {sector.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{sector.description}</p>
                  <span className="inline-flex items-center text-sm font-bold text-primary group-hover:text-accent-foreground group-hover:bg-accent px-3 py-1.5 rounded-full bg-accent/10 transition-all duration-300">
                    Learn more <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
