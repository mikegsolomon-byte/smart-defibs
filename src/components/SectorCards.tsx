import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { School, Users, Stethoscope, Shield, ArrowRight } from "lucide-react";

const sectors = [
  {
    icon: School,
    title: "A School or Crèche",
    description: "Grants, installation, AED for Schools programme",
    color: "border-sector-schools",
    bgColor: "bg-sector-schools/10",
    iconColor: "text-sector-schools",
    slug: "schools",
  },
  {
    icon: Stethoscope,
    title: "A Nursing Home",
    description: "HIQA-compliant AEDs & training",
    color: "border-sector-nursing",
    bgColor: "bg-sector-nursing/10",
    iconColor: "text-sector-nursing",
    slug: "nursing",
  },
  {
    icon: Shield,
    title: "A Workplace",
    description: "H&S compliance, multi-site bundles",
    color: "border-sector-workplace",
    bgColor: "bg-sector-workplace/10",
    iconColor: "text-sector-workplace",
    slug: "workplace",
  },
  {
    icon: Users,
    title: "A CFR Group",
    description: "Responder kits & community AEDs",
    color: "border-sector-community",
    bgColor: "bg-sector-community/10",
    iconColor: "text-sector-community",
    slug: "community",
  },
];

export default function SectorCards() {
  return (
    <section id="sectors" className="section-padding bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-center mb-3">I'm looking for…</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
          Select your sector and we'll guide you to the right AED solution
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/sectors?tab=${sector.slug}`}
                className={`group block rounded-xl bg-card border-l-4 ${sector.color} p-6 hover:shadow-lg transition-all duration-300 h-full`}
              >
                <div className={`inline-flex p-3 rounded-lg ${sector.bgColor} mb-4`}>
                  <sector.icon className={`h-6 w-6 ${sector.iconColor}`} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2 text-card-foreground">
                  {sector.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{sector.description}</p>
                <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
