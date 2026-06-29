import { motion } from "framer-motion";
import { MapPin, Heart, Users, Monitor, GraduationCap, ClipboardCheck, ShieldCheck, Globe2, Cpu, Factory } from "lucide-react";
import amoulLogoAsset from "@/assets/amoul-logo.png.asset.json";
import amoulI3 from "@/assets/amoul-i3.jpg";

const amoulLogo = amoulLogoAsset.url;

const fadeIn = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

export default function AboutPartnership() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* About Smart Defibs Ltd */}
        <motion.div
          {...fadeIn}
          className="clinical-card p-8 lg:p-12 mb-12 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <MapPin className="h-3.5 w-3.5" /> Proudly Irish
          </span>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mb-4">
            About Smart Defibs Ltd
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
            Every AED ready. Every day. Every time.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Smart Defibs Ltd is an Irish company specialising in connected defibrillators,
            AED readiness management, and emergency response training for organisations across
            Ireland. Founded by{" "}
            <strong className="text-foreground">Maciej Koczur</strong>, National Ambulance Service
            Paramedic Supervisor with over 20 years’ experience across public, private and
            voluntary emergency care, Smart Defibs was created to solve a simple problem: AEDs are
            often installed, but not actively managed or checked when they are needed most.
          </p>
        </motion.div>

        {/* What We Do */}
        <motion.div
          {...fadeIn}
          className="mb-12 lg:mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-6">
            What We Do
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            We provide a complete AED readiness ecosystem that combines technology, training and ongoing support.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Monitor, text: "Supply of connected AEDs with 4G monitoring" },
              { icon: ClipboardCheck, text: "AED Lifecycle Management and compliance reporting" },
              { icon: ShieldCheck, text: "Consumables and maintenance support" },
              { icon: GraduationCap, text: "CPR/AED, CFR, FAR training" },
              { icon: Users, text: "Emergency readiness planning and consultation" },
              { icon: Heart, text: "Heart Safe Team Programme for organisations" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="clinical-card p-5 flex items-start gap-3">
                <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mt-6">
            Our approach ensures AEDs are not just installed — they are monitored, maintained and ready for use every day.
          </p>
        </motion.div>

        {/* Our Mission */}
        <motion.div
          {...fadeIn}
          className="clinical-card p-8 lg:p-12 mb-12 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            Our Mission
          </span>
          <p className="text-muted-foreground leading-relaxed mb-6">
            To improve survival from out-of-hospital cardiac arrest by reducing response time to defibrillation
            and increasing the quality and availability of CPR in communities and workplaces across Ireland.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We aim to support a future where more lives are saved through:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              "Faster access to defibrillation",
              "Better trained responders",
              "Higher AED readiness standards",
            ].map((item) => (
              <div key={item} className="bg-muted/50 border border-border rounded-lg p-4 text-center">
                <p className="text-sm font-semibold text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Our Approach */}
        <motion.div
          {...fadeIn}
          className="mb-12 lg:mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-6">
            Our Approach
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">We combine:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              "Connected AED technology",
              "Real-time monitoring and alerts",
              "Structured training programmes",
              "Practical emergency planning",
              "Ongoing organisational support",
            ].map((item) => (
              <div key={item} className="clinical-card p-4 text-center">
                <p className="text-sm font-semibold text-foreground">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            This creates a continuous cycle of assess — equip — train — monitor — improve.
          </p>
        </motion.div>

        {/* Heart Safe Programme */}
        <motion.div
          {...fadeIn}
          className="clinical-card p-8 lg:p-12 mb-12 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            <Heart className="h-3.5 w-3.5" /> Heart Safe Programme
          </span>
          <p className="text-muted-foreground leading-relaxed">
            Our Heart Safe Team Programme helps organisations build trained internal responders, improve
            emergency coordination and maintain AED readiness through ongoing support, drills and
            certification. It transforms workplace safety from a compliance requirement into an active,
            visible commitment to saving lives.
          </p>
        </motion.div>

        {/* Why Smart Defibs */}
        <motion.div
          {...fadeIn}
          className="mb-12 lg:mb-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-6">
            Why Smart Defibs
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Irish-based specialist AED provider",
              "Real-world emergency service experience behind every system",
              "Focus on readiness, not just equipment supply",
              "Fully managed AED lifecycle support",
              "Designed for community organisations, healthcare providers, workplaces, and schools",
            ].map((item) => (
              <div key={item} className="clinical-card p-5 flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Our Vision */}
        <motion.div
          {...fadeIn}
          className="clinical-card p-8 lg:p-12 mb-16 lg:mb-24"
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
            Our Vision
          </span>
          <p className="text-lg sm:text-xl font-heading font-extrabold text-foreground tracking-tight">
            A future where every AED in Ireland is connected, monitored and ready.
          </p>
        </motion.div>

        {/* Amoul partnership */}
        <motion.div
          {...fadeIn}
          className="clinical-card overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative bg-muted flex items-center justify-center p-8 lg:p-12">
              <img
                src={amoulI3}
                alt="Amoul i3 AED defibrillator"
                className="max-h-80 w-auto object-contain"
                loading="lazy"
              />
              <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                Exclusive Partnership
              </span>
            </div>

            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-5">
                <img src={amoulLogo} alt="Amoul" className="h-9 w-auto bg-white rounded-md px-2 py-1 border border-border" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Exclusive Amoul® Partner</span>
              </div>

              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mb-4">
                Exclusive Irish partner of Amoul®
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Smart Defibs LTD is the exclusive Irish importer and representative for
                Amoul® — the global emergency care brand of Ambulanc (Shenzhen) Tech. Co., Ltd.
                Every Amoul device sold in Ireland comes through us, with full warranty,
                genuine consumables and Irish-based service support.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded in 2001 by a team of emergency care specialists, Amoul designs and
                manufactures life support, CPR, anaesthesia and critical care devices used
                in hospitals and public spaces in over 100 countries.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Factory, k: "Since 2001", v: "Established" },
                  { icon: Globe2, k: "100+", v: "Countries" },
                  { icon: Cpu, k: "1,000+", v: "Patents" },
                ].map(({ icon: Icon, k, v }) => (
                  <div key={v} className="bg-muted/60 border border-border rounded-lg p-3 text-center">
                    <Icon className="h-4 w-4 text-primary mx-auto mb-1.5" />
                    <div className="font-heading font-extrabold text-sm text-foreground">{k}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{v}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {["ISO 13485", "CE Marked", "FDA (EUA)", "700+ Staff"].map((b) => (
                  <span key={b} className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1.5 rounded-full">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
